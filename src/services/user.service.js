import axios from "axios";
import authHeader from "./auth-header";
import { history } from '../helpers/history';
import { LOGIN_SUCCESS } from "../actions/types";

const API_URL = `${process.env.REACT_APP_API_URL}/`;

class UserService {

  getPublicContent() {
    return axios.get(API_URL + "all");
  }

  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + "mod", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }

  getProfile() {
    return axios.get(API_URL + "profile", { headers: authHeader() });
  }

  async getVoiceUser(LanguageCode) {
    return await axios.post(API_URL + "getVoiceUser", {LanguageCode}, { headers: authHeader() });
  }

  listenToSpeech(text, language, sendVoicer) {
    return axios.post(API_URL + "listenToSpeech", {text, language, sendVoicer}, { headers: authHeader() });
  }


  saveToSpeech(text, language, sendVoicer) {
    return axios.post(API_URL + "saveToSpeech", {text, language, sendVoicer}, { headers: authHeader() });
  }
  
}

export default new UserService();
