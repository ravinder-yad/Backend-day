import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3001/api' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('token')) {
        req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    return req;
});

export const login = (formData) => API.post('/login', formData);
export const register = (formData) => API.post('/register', formData);
export const forgotPassword = (email) => API.post('/forgot-password', { Email: email });
export const getTasks = () => API.get('/tasks');
export const addTask = (task) => API.post('/tasks', task);
export const updateTask = (id, task) => API.put(`/tasks/${id}`, task);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
