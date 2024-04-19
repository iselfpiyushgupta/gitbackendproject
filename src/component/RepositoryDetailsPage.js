import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function RepositoryDetailsPage() {
  const { repositoryId } = useParams();
  const [repository, setRepository] = useState(null);

  useEffect(() => {
    fetch(`https://api.github.com/repositories/${repositoryId}`)
      .then(response => response.json())
      .then(data => setRepository(data))
      .catch(error => console.error('Error fetching repository details:', error));
  }, [repositoryId]);

  if (!repository) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{repository.name}</h2>
      <p>Description: {repository.description}</p>
    </div>
  );
}

export default RepositoryDetailsPage;
