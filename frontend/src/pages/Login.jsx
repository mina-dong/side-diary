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
    <form onSubmit={handleSubmit} className="flex flex-col w-1/2 mx-auto mt-10">
        <input type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="Email" className="mb-2 border p-2 rounded-md" />

        <input type="password" value={password} onChange={e=> setPassword(e.target.value)}
            placeholder="password" className="mb-2 border p-2 rounded-md" />

        <button type="submit" className="rounded-md bg-blue-500 text-white p-2">Login</button>
    </form>
);
};

export default Login;