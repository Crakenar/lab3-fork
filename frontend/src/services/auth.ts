import http from '../http-common';

interface User {
  username: string;
  password: string;
}

export function login(user: User) {
  return http
    .post('api/auth/login', {
      username: user.username,
      password: user.password
    })
    .then((response: { data: any; }) => {
      return response.data;
    });
}

export function logout() {
  return http.post('api/auth/logout');
}

export async function isUserAuthentificated() {
  try {
    const response = await http.get('/api/auth/check', { withCredentials: true });
    if(response.status === 200) {
      console.log('authenticated');
    }
    return response.status === 200;
  } catch (error) {
    return false;
  }
}