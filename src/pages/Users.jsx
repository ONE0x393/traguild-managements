import React, { useEffect, useState } from 'react';
import api from '../api';
import withLayout from '../hoc/withLayout';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.post('/userInfo/all').then(res => setUsers(res.data));
  }, []);

  const toggleAvailability = (user_nickname, user_idx, current) => {
    const state = ["활성화", "비활성화"];  
    if(!confirm(`${user_nickname}님의 상태를 ${state[current ? 1 : 0]}로 전환하시겠습니까?`)) return;

    api.post(`/userInfo/update`, { user_idx, is_available: !current })
      .then(() => {
        setUsers(prev => prev.map(u => u.user_idx === user_idx ? { ...u, is_available: !current } : u));
      });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-default-btn">사용자 관리</h2>
      <div className="overflow-x-auto border border-home-border rounded shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-filter-btn">
            <tr>
              <th className="px-3 py-3 text-left text-xs font-medium text-white uppercase">사용자 번호</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-white uppercase">프로필 사진</th>
              <th className="px-2 py-3 text-left text-xs font-medium text-white uppercase">닉네임</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-white uppercase">지역</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-white uppercase">활성화 여부</th>
            </tr>
          </thead>
          <tbody className="bg-home-bg divide-y divide-gray-200">
            {users.map(u => (
              <tr key={u.user_idx} className={u.is_available ? '' : 'opacity-50'}>
                <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-900">{u.user_idx}</td>
                <td className="px-3 py-4 whitespace-nowrap">
                  {u.user_img
                    ? <img src={`https://traguild.kro.kr/api/userInfo/userImg/${u.user_idx}`} alt="avatar" className="h-16 w-16 rounded-full object-cover" />
                    : <img src="LOGO.png" alt="avatar" className="h-16 w-16 rounded-full object-cover" />
                  }
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-900">{u.user_nickname || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{u.user_region}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={u.is_available}
                      onChange={() => toggleAvailability(u.user_nickname, u.user_idx, u.is_available)}
                      className="form-checkbox h-5 w-5 text-default-btn"
                    />
                    <span className="ml-2 text-default-border">{u.is_available ? 'On' : 'Off'}</span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default withLayout(Users);