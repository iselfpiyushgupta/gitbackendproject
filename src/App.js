import React from 'react';  
import HomePage from './component/HomePage';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import RepositoryListPage from './component/RepositoryListPage';
import RepositoryDetailsPage from './component/RepositoryDetailsPage';
import FollowersPage from './component/FollowersPage';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/repositories/:username" element={<RepositoryListPage />} />
          <Route path="/repository/:repositoryId" element={<RepositoryDetailsPage />} />
          <Route path="/followers/:username" element={<FollowersPage />} />
        </Routes>
    </Router>
  );
}

export default App;
