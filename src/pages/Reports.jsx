// src/pages/Reports.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import withLayout from '../hoc/withLayout';

function formatToKST(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul', hour12: false });
}

function Reports() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    api.post('/report/allHistory', { page: currentPage, limit: itemsPerPage }).then(res => setItems(res.data));
  }, []);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = items.slice(indexOfFirst, indexOfLast);

  const statusStyles = {
    false: 'bg-request-detail text-default-btn',
    true: 'bg-request-done text-white',
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">의뢰 게시물</h2>
      <ul className="space-y-2">
        {currentItems.map(r => (
          <li key={`${r.reported_request_idx}-${r.report_user_idx}`} className="relative">
            <Link
              to={`/requests/${r.reported_request_idx}`}
              className="block p-4 bg-white rounded shadow hover:bg-filter-btn transition-colors"
            ><span
                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-2 ${statusStyles[r.is_complete==0?false:true]}`}
              >
                {r.is_complete ? '처리완료' : '접수중'}
              </span>
              <div className="text-sm text-gray-500 font-bold">
                신고자: {r.report_user_nickname}[{r.report_user_idx}]
              </div>
              <div className="mt-2 text-sm text-apply-title font-bold">
                게시글: {r.reported_request_title}...   (작성자: {r.reported_user_nickname}[{r.reported_user_idx}])
              </div>
              <div className="mt-1 text-sm text-gray-500 flex justify-between items-center">
                <span className="text-red-500">신고종류: {r.report_type.slice(0, 60)}...</span>
                <span>{formatToKST(r.created_time)}</span>
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

export default withLayout(Reports);