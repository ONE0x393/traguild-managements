// src/pages/Requests.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import withLayout from '../hoc/withLayout';

function Requests() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    api.post('/requestInfo/all').then(res => setItems(res.data));
  }, []);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = items.slice(indexOfFirst, indexOfLast);

  const statusStyles = {
    모집: 'bg-request-proceed text-white',
    진행중: 'bg-request-detail text-default-btn',
    완료: 'bg-request-done text-white',
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">의뢰 게시물</h2>
      <ul className="space-y-2">
        {currentItems.map(r => (
          <li key={`${r.request_idx}-${r.user_idx}`} className="relative">
            {r.is_deleted && (
              <span className="absolute top-2 right-2 bg-reject-btn text-default-btn text-xs font-medium py-1 px-2 rounded-full">
                삭제됨
              </span>
            )}
            <Link
              to={`/requests/${r.request_idx}`}
              className="block p-4 bg-white rounded shadow hover:bg-filter-btn transition-colors"
            >
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-2 ${statusStyles[r.request_state]}`}
              >
                {r.request_state}
              </span>
              <div className="text-sm text-gray-500">
                사용자 번호: {r.user_idx}· 요청번호: {r.request_idx}
              </div>
              <div className="mt-2 text-sm text-apply-title font-bold">
                {r.request_title.slice(0, 60)}...
              </div>
              <div className="mt-1 text-sm text-gray-500">
                {r.request_content.slice(0, 60)}...
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex justify-center space-x-2 mt-4">
        {currentPage > 1 && (
          <button
            onClick={() => setCurrentPage(prev => prev - 1)}
            className="px-3 py-1 bg-default-btn text-white rounded"
          >
            이전
          </button>
        )}
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx + 1}
            onClick={() => setCurrentPage(idx + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === idx + 1
                ? 'bg-filter-btn text-white'
                : 'bg-default-bg text-default-btn hover:bg-filter-btn'
            }`}
          >
            {idx + 1}
          </button>
        ))}
        {currentPage < totalPages && (
          <button
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="px-3 py-1 bg-default-btn text-white rounded"
          >
            다음
          </button>
        )}
      </div>
    </div>
  );
}

export default withLayout(Requests);