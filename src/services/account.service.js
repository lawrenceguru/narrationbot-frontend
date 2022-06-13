import axios from "axios";
import authHeader from "./auth-header";

const API_URL = `${process.env.REACT_APP_API_URL}/`;

class AccountService {
  addAccount(data) {
    return axios.post(API_URL + "account/addAccount", {...data}, { headers: authHeader() });
  }
  userUpdateBalance(data) {
    return axios.post(API_URL + "account/userUpdateBalance", {...data}, { headers: authHeader() });
  }
  getUser() {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.access_token
    return axios.post(API_URL + "account/getUser", {token}, { headers: authHeader() });
  }
  getAccountUserID(user_id) {
    return axios.post(API_URL + "account/getAccountUserID", {user_id}, { headers: authHeader() });
  }
  accountDel(id) {
    return axios.post(API_URL + "account/accountDel", {id}, { headers: authHeader() });
  }
  
}

export default new AccountService();
