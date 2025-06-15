import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Requests from './pages/Requests';
import Reports from './pages/Reports';
import RequestDetail from './pages/RequestDetail';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route path="/users" element={<Users />} />
        <Route path="/Requests" element={<Requests />} />
        <Route path="/Reports" element={<Reports />} />
        <Route
          path="/requests/:request_idx"
          element={<RequestDetail />}
        />
      </Routes>
    </BrowserRouter>
  );
}