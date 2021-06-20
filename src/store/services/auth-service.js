import axios from 'axios';

const API_URL = 'http://propster-nova.hs/api/dashboard/';

class AuthService {
  login(user) {
    console.log(user)
    const config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    };

    return axios
      .post(API_URL + 'login', {
        email: user.email,
        password: user.password
      }, config)
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();
