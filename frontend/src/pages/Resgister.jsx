import { useState } from "react";
import { login } from "../api/auth";

function Register(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            const data = await register(email, password);
            alert('회원가입 성공');
        } catch(err){
            alert('회원가입 실패');
        }
    };
return(
    <form onSubmit={handleSubmit} className="flex flex-col w-1/2 mx-auto mt-10">
        <input type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="Email" className="mb-2 border p-2 rounded-md" />

        <input type="password" value={password} onChange={e=> setPassword(e.target.value)}
            placeholder="password" className="mb-2 border p-2 rounded-md" />

        <button type="submit" className="rounded-md bg-green-500 text-white p-2">Register</button>
    </form>
);
};

export default Register;