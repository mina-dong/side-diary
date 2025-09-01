import { useState } from "react";
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import { register } from "../api/auth";

function Register(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [invitationCode, setInvitationCode] = useState('');

    const navigate = useNavigate(); // 2. Initialize the hook

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            const data = await register(email, password,nickname, invitationCode);
            alert('회원가입 성공');
            navigate('/');
        } catch(err){
            alert('회원가입 실패');
        }
    };

return(
    <div className="flex flex-col items-center mt-16">
  <h2 className="text-4xl font-bold text-orange-500 mb-6 font-handwriting">회원가입</h2>

  <form onSubmit={handleSubmit} className="flex flex-col w-80 bg-white p-6 rounded-2xl shadow-lg">
    <input
      type="text"
      value={nickname}
      onChange={e => setNickname(e.target.value)}
      placeholder="닉네임"
      className="mb-4 border border-orange-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 placeholder-orange-400"
    />

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

    <input
      type="text"
      value={invitationCode}
      onChange={e => setInvitationCode(e.target.value)}
      placeholder="초대코드"
      className="mb-4 border border-orange-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 placeholder-orange-400"
    />

    <button
      type="submit"
      className="bg-orange-500 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-orange-600 transition-colors"
    >
      회원가입
    </button>
  </form>
</div>

);
};

export default Register;