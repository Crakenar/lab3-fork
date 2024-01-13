import http from '../http-common';
import { type User, type UserRegister} from '@/interfaces/authInterfaces';
import cookieService from '@/services/cookie'; 
export function login(user: User) {
  return http
    .post('api/auth/login', {
      username: user.username,
      password: user.password
    })
    .then((response: { data: any; }) => {
      cookieService.setCookie('jwt', response.data.token, 1);
      return response.data;
    });
}

export function register(user: UserRegister) {
  return http
    .post('api/auth/register', {
      username: user.username,
      email: user.email,
      password: user.password
    })
    .then((response: { data: any; }) => {
      cookieService.setCookie('jwt', response.data.token, 1);
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