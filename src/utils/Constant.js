
//export const API_URL = 'http://localhost:3001';
export const API_URL = 'https://cars-maintenance-backend.onrender.com';

export const API_URL_COMPANY = () => { 
    return `${API_URL}/company/${localStorage.getItem('slug')}`
};