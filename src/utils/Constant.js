
//export const API_URL = 'http://localhost:3001';
export const API_URL = 'https://maintenance-app-node.herokuapp.com';

export const API_URL_COMPANY = () => { 
    return `${API_URL}/company/${localStorage.getItem('slug')}`
};