import React from "react";
import { Link } from "react-router-dom";

function LoginPopup() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        <p className="text-lg font-semibold mb-4 text-black">
          로그인이 필요합니다.
        </p>
        <p className="text-sm text-gray-600 mb-6">
          서비스를 이용하려면 로그인이 필요합니다.
        </p>
        <div className="flex justify-center">
          <Link
            to="/login"
            className="bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-900 mr-4 focus:outline-none"
          >
            로그인 하러 가기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPopup;
