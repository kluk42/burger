import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-feca9-default-rtdb.firebaseio.com/',
})

export default instance;
