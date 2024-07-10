// src/services/api.js

import axios from "axios";

const baseURL =
  "http://ec2-3-36-117-96.ap-northeast-2.compute.amazonaws.com:3000"; // 서버의 baseURL 설정

const registerUser = async (username, password) => {
  try {
    const response = await axios.post(`${baseURL}/register`, {
      username,
      password,
    });
    console.log(response.data);
    // 성공적으로 등록된 경우, 다음 로직 실행
  } catch (error) {
    console.error("Error:", error);
    // 오류 처리 로직
  }
};

export { registerUser };
