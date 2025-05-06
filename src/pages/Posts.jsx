import React, { useEffect, useState } from 'react';
import api from '../api';
import withLayout from '../hoc/withLayout';

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get('/posts').then(res => setPosts(res.data));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Posts</h2>
      <ul className="space-y-2">
        {posts.map(p => (
          <li key={p.id} className="p-4 bg-white rounded shadow">
            <div className="font-medium">{p.title}</div>
            <div className="text-sm text-gray-500">{p.body?.slice(0, 100)}...</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default withLayout(Posts);