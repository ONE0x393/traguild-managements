import React from 'react';
import withLayout from '../hoc/withLayout';

function Dashboard() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Total Users</div>
          <div className="text-2xl font-semibold">--</div>
        </div>
        <div className="p-6 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Total Posts</div>
          <div className="text-2xl font-semibold">--</div>
        </div>
        <div className="p-6 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Active Sessions</div>
          <div className="text-2xl font-semibold">--</div>
        </div>
      </div>
    </div>
  );
}

export default withLayout(Dashboard);