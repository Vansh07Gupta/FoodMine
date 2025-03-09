import axios from 'axios';

axios.interceptors.request.use(
  req => {
    const user = localStorage.getItem('user');
    const token = user && JSON.parse(user).token;

    if (token) {
      req.headers['Authorization'] = `Bearer ${token}`;
    }

    console.log('🔍 Axios Request Headers:', req.headers);  // ✅ Debugging log

    return req;
  },
  error => Promise.reject(error)
);
