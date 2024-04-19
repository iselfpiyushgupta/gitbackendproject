import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function RepositoryListPage() {
  const { username } = useParams();
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/repos`)
      .then(response => response.json())
      .then(data => setRepositories(data))
      .catch(error => console.error('Error fetching repositories:', error));
  }, [username]);

  return (
    <div>
      <h2>Repositories for {username}</h2>
      <ul>
        {repositories.map(repo => (
          <li key={repo.id}>
            <Link to={`/repository/${repo.id}`}>{repo.name}</Link>
          </li>
        ))}
      </ul>
      <Link to={`/followers/${username}`}>View Followers</Link>
    </div>
  );
}

export default RepositoryListPage;
