const express=require('express');
const axios=require('axios');
const mongoose = require('mongoose');

const User=require('./models/User');
const app=express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/github_users', {
    useUnifiedTopology: true,
  });

app.get('/api/users/:username', async(req,res)=>{
    const {username}=req.params;
    try{
        let user=await User.findOne({username});

        if(!user){
            const response=await axios.get(`https://api.github.com/users/${username}`);
            const userData=response.data;

            user=new User({
                username:userData.login,
                name:userData.name,
                avatarUrl: userData.avatar_url,

            });
            await user.save();

        }
        res.status(200).json(user);

    }
    catch(err){
        console.error('Error saving user data:', err);
        res.status(500).json({error: 'Failed to save user data'});

    }
})
async function findMutualFollowers(req, res) {
    try {
        const mutualFollowers = await User.aggregate([
            {
                $lookup: {
                    from: 'users',
                    let: { username: '$username' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $in: ['$username', '$followers.username'] },
                                        { $in: ['$$username', '$followers.username'] }
                                    ]
                                }
                            }
                        }
                    ],
                    as: 'mutualFollowers'
                }
            },
            {
                $match: {
                    mutualFollowers: { $ne: [] }
                }
            }
        ]);

        res.status(200).json(mutualFollowers);
    } catch (error) {
        console.error('Error finding mutual followers:', error);
        res.status(500).json({ error: 'Failed to find mutual followers' });
    }
}

app.get('/api/users/mutual-followers', findMutualFollowers);

app.get('/api/users/search', async (req, res) => {
    const { username, location } = req.query;

    try {
        const users = await User.find({
            $or: [
                { username: { $regex: username, $options: 'i' } },
                { location: { $regex: location, $options: 'i' } }
            ]
        });

        res.status(200).json(users);
    } catch (error) {
        console.error('Error searching user data:', error);
        res.status(500).json({ error: 'Failed to search user data' });
    }
});


app.delete('/api/users/:username', async (req, res) => {
    const { username } = req.params;

    try {
        await User.findOneAndUpdate({ username }, { deleted: true });

        res.status(200).json({ message: 'User record soft deleted successfully' });
    } catch (error) {
        console.error('Error soft deleting user record:', error);
        res.status(500).json({ error: 'Failed to soft delete user record' });
    }
});



app.put('/api/users/:username', async (req, res) => {
    const { username } = req.params;
    const { location, blog, bio } = req.body;

    try {
        await User.findOneAndUpdate({ username }, { location, blog, bio });

        res.status(200).json({ message: 'User fields updated successfully' });
    } catch (error) {
        console.error('Error updating user fields:', error);
        res.status(500).json({ error: 'Failed to update user fields' });
    }
});

app.get('/api/users', async (req, res) => {
    const { sortBy } = req.query;

    try {
        const users = await User.find().sort(sortBy);

        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});



app.listen(5000,()=>{
    console.log('Server is running on port 5000');
});
