import React from 'react';
import { NavLink } from 'react-router-dom';

const linkClass = ({ isActive }) =>
  `block px-4 py-2 rounded-xl transition-colors ${
    isActive
      ? 'w-56 mx-auto bg-default-btn text-white'
      : 'text-default-btn hover:bg-filter-btn'
  }`;

export default function Sidebar() {
  return (
    <aside className="w-64 bg-default-bg border-r border-default-border text-default-btn shadow-sm">
      <nav className="mt-6">
        <ul>
          <li className="mb-2">
            <NavLink to="/" className={linkClass}>대시보드</NavLink>
          </li>
          <li className="mb-2">
            <NavLink to="/users" className={linkClass}>사용자 관리</NavLink>
          </li>
          <li className="mb-2">
            <NavLink to="/requests" className={linkClass}>게시물 관리</NavLink>
          </li>
          <li className="mb-2">
            <NavLink to="/reports" className={linkClass}>신고 관리</NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
