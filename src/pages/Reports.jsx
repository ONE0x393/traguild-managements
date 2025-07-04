// src/pages/Reports.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import withLayout from '../hoc/withLayout';

function formatToKST(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);

  const year = String(date.getFullYear()).slice(2); // 두 자리 연도
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 2자리 월
  const day = String(date.getDate()).padStart(2, '0'); // 2자리 일

  // 시간과 분을 KST로 가져오기 위해 toLocaleString 사용
  const options = { timeZone: 'Asia/Seoul', hour12: false, hour: '2-digit', minute: '2-digit' };
  const [hour, minute] = date.toLocaleTimeString('ko-KR', options).split(':');

  return `${year}-${month}-${day} ${hour}:${minute}`;
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

  const handleComplete = async (report_user_idx, reported_request_idx) => {
    try {
      await api.post('/report/update', {
        report_user_idx,
        reported_request_idx,
        is_complete: true,
      });
      // 성공 후 목록 갱신
      setItems(prev =>
        prev.map(r =>
          r.report_user_idx === report_user_idx && r.reported_request_idx === reported_request_idx
            ? { ...r, is_complete: true }
            : r
        )
      );
    } catch (err) {
      alert('처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">신고 내역</h2>
      <ul className="space-y-2">
        {currentItems.length === 0 ? (
          <li className="text-center text-gray-400 py-8">
            신고 내역이 없습니다.
          </li>
        ) : (
          currentItems.map(r => (
            <li key={`${r.reported_request_idx}-${r.report_user_idx}`} className="relative">
              <Link
                to={`/requests/${r.reported_request_idx}`}
                className="block p-4 bg-white rounded shadow hover:bg-filter-btn transition-colors"
              >
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-2 ${statusStyles[r.is_complete == 0 ? false : true]}`}
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
              {!r.is_complete && (
                <button
                  onClick={() => handleComplete(r.report_user_idx, r.reported_request_idx)}
                  className="absolute top-4 right-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors duration-200"
                >
                  처리완료
                </button>
              )}
            </li>
          ))
        )}
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
            className={`px-3 py-1 rounded ${currentPage === idx + 1
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