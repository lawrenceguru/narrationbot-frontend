import axios from "axios";
import jwt from 'jwt-decode' 

const API_URL = `${process.env.REACT_APP_API_URL}/auth/`

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "sign-in", { email, password })
      .then((response) => {
        if (response.data.access_token) {
          const user = jwt(response.data.access_token);
          if (user.verified) {
            localStorage.setItem("user", JSON.stringify({access_token: response.data.access_token}));
          }
          return user
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register({firstname, lastname, email, password}) {
    return axios.post(API_URL + "sign-up", {
      firstname,
      lastname,
      email,
      password,
    });
  }
}

export default new AuthService();
