import axios from 'axios';

export const getDiaryList = async ()=>{
    const response = await axios.get('/api/diary');
    return response.data
}