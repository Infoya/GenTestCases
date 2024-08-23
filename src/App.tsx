

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChatInterface, LandingPage } from './pages';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatInterface />} />
        <Route path="/bot-test" element={<ChatInterface />} />
      </Routes>
    </Router>
  );
};

export default App;