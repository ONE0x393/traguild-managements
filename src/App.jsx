import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Requests from './pages/Requests';
import RequestDetail from './pages/RequestDetail';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/Requests" element={<Requests />} />
        <Route
          path="/requests/:request_idx"
          element={<RequestDetail />}
        />
      </Routes>
    </BrowserRouter>
  );
}