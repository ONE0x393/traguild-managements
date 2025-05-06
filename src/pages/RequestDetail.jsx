// src/pages/RequestDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import withLayout from "../hoc/withLayout";
import Button from "../components/common/Button";

function RequestDetail() {
  const { request_idx } = useParams();
  const [data, setData] = useState(null);
  const [postUserInfo, setPostUserInfo] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    api.post("/requestInfo", { request_idx }).then(res => {
      const rd = Array.isArray(res.data) ? res.data[0] : res.data;
      setData(rd);
      api.post("/userInfo", { user_idx: rd.user_idx }).then(res2 => {
        const ui = Array.isArray(res2.data) ? res2.data[0] : res2.data;
        setPostUserInfo(ui);
      });
    });
    api.post("/requestComment/all", { request_idx }).then(res => setComments(res.data));
  }, [request_idx]);

  const handleDelete = () => {
    if (!confirm("정말 이 게시글을 삭제하시겠습니까?")) return;
    api
      .post("/requestInfo/update", { request_idx, is_deleted: true })
      .then(() => setData(prev => ({ ...prev, is_deleted: true })));
  };

  if (!data || !postUserInfo) return null;

  const statusStyles = {
    모집: "bg-request-proceed text-white",
    진행중: "bg-request-detail text-default-btn",
    완료: "bg-request-done text-white",
  };

  return (
    <div className="overflow-x-hidden">
      <div className="max-w-4xl w-full mx-auto p-6 rounded shadow">
        <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center mb-6">
          <div className="flex items-center space-x-4 mb-4 xl:mb-0">
            <img
              src={
                postUserInfo.user_img
                  ? `https://traguild.kro.kr/api/userInfo/userImg/${postUserInfo.user_idx}`
                  : "/LOGO.png"
              }
              alt="avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="min-w-0">
              <div className="font-medium truncate">{postUserInfo.user_nickname || "-"}</div>
              <div className="text-sm text-gray-500">요청자</div>
            </div>
          </div>
          {data.is_deleted ? (
            <Button disabled>삭제됨</Button>
          ) : (
            <Button variant="reject" onClick={handleDelete}>삭제</Button>
          )}
        </div>

        <div className="flex flex-col xl:flex-row xl:space-x-6">
          <img
            src={
              data.request_img
                ? `https://traguild.kro.kr/api/requestInfo/getImage/${data.request_idx}`
                : "/LOGO.png"
            }
            alt="request"
            className="w-full xl:w-1/2 object-cover rounded mb-6 xl:mb-0"
          />
          <div className="w-full xl:w-1/2 min-w-0 space-y-4">
            <span
              className={`inline-block px-3 py-1 rounded-full ${statusStyles[data.request_state]}`}
            >
              {data.request_state}
            </span>
            <h2 className="text-2xl font-semibold truncate">{data.request_title}</h2>
            <div className="flex flex-wrap items-center space-x-4">
              <div className="text-lg font-medium">{data.request_cost.toLocaleString()}원</div>
              <div className="text-sm text-gray-500">{data.request_category}</div>
            </div>
            <p className="text-gray-800 whitespace-pre-wrap break-words">
              {data.request_content}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl w-full mx-auto p-6 space-y-6">
        <h3 className="text-lg font-semibold">댓글</h3>
        {comments.length === 0 ? (
          <div className="text-gray-500">댓글이 없습니다.</div>
        ) : (
          <ul className="space-y-4">
            {comments.map(c => (
              <li key={c.comment_idx} className="p-4 bg-white rounded shadow">
                <div className="flex items-center mb-2 space-x-2">
                  <img
                    src={
                      c.user_img
                        ? `https://traguild.kro.kr/api/userInfo/userImg/${c.user_idx}`
                        : "/LOGO.png"
                    }
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="font-medium truncate">{c.user_nickname}</span>
                </div>
                <p className="text-gray-800 whitespace-pre-wrap break-words">
                  {c.comment_content}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default withLayout(RequestDetail);
