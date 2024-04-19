import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function FollowersPage() {
  const { username } = useParams();
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/followers`)
      .then(response => response.json())
      .then(data => setFollowers(data))
      .catch(error => console.error('Error fetching followers:', error));
  }, [username]);

  return (
    <div>
      <h2>Followers of {username}</h2>
      <ul>
        {followers.map(follower => (
          <li key={follower.id}>
            <Link to={`/repositories/${follower.login}`}>{follower.login}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FollowersPage;
