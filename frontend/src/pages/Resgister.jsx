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
    <form onSubmit={handleSubmit} className="flex flex-col w-1/2 mx-auto mt-10">
       <input type="text" value={nickname} onChange={e => setNickname(e.target.value)} 
            placeholder="nickname" className="mb-2 border p-2 rounded-md" />
       
        <input type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="Email" className="mb-2 border p-2 rounded-md" />

        <input type="password" value={password} onChange={e=> setPassword(e.target.value)}
            placeholder="password" className="mb-2 border p-2 rounded-md" />

        <input type="text" value={invitationCode} onChange={e=> setInvitationCode(e.target.value)}
            placeholder="초대코드" className="mb-2 border p-2 rounded-md" />

        <button type="submit" className="rounded-md bg-green-500 text-white p-2">Register</button>
    </form>
);
};

export default Register;