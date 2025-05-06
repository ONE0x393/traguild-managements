import React from 'react';
import { NavLink } from 'react-router-dom';

const linkClass = ({ isActive }) =>
  `block px-4 py-2 rounded transition-colors ${
    isActive
      ? 'bg-default-btn text-white'
      : 'text-default-btn hover:bg-filter-btn'
  }`;

export default function Sidebar() {
  return (
    <aside className="w-64 bg-default-bg border-r border-default-border text-default-btn shadow-sm">
      <nav className="mt-6">
        <ul>
          <li className="mb-2">
            <NavLink to="/" className={linkClass}>Dashboard</NavLink>
          </li>
          <li className="mb-2">
            <NavLink to="/users" className={linkClass}>Users</NavLink>
          </li>
          <li>
            <NavLink to="/posts" className={linkClass}>Posts</NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
