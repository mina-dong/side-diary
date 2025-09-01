import { useState } from "react";
import { login } from "../api/auth";
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import { jwtDecode } from "jwt-decode";

function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // 2. Initialize the hook

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            const token = await login(email, password);
            // console.log(token); //디버깅용 
            localStorage.setItem('authToken', token);
            const decoded = jwtDecode(token);
            // console.log('decoded:', decoded.id);  //디버깅용
            localStorage.setItem('userNickname', decoded.nickname);
            localStorage.setItem('userId', decoded.id);
            alert('로그인 성공');
            navigate('/');
        } catch(err){
            alert('로그인 실패');
        }
    };
return(
<div className="flex flex-col items-center mt-16">
  <h2 className="text-4xl font-bold text-orange-500 mb-6 font-handwriting"> 로그인</h2>

  <form onSubmit={handleSubmit} className="flex flex-col w-80 bg-white p-6 rounded-2xl shadow-lg">
    <input
      type="email"
      value={email}
      onChange={e => setEmail(e.target.value)}
      placeholder="이메일"
      className="mb-4 border border-orange-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 placeholder-orange-400"
    />

    <input
      type="password"
      value={password}
      onChange={e => setPassword(e.target.value)}
      placeholder="비밀번호"
      className="mb-4 border border-orange-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 placeholder-orange-400"
    />

    <button
      type="submit"
      className="bg-orange-500 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-orange-600 transition-colors"
    >
      로그인
    </button>
  </form>
</div>

);
};

export default Login;