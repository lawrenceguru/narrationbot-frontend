import React, { Component } from "react";
import { history } from '../helpers/history';

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

class AuthVerify extends Component {
  constructor(props) {
    super(props);
    history.listen(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        const decodedJwt = parseJwt(user.access_token);
        console.log((Number(decodedJwt?.exp) * 1000), Date.now())
        if ((Number(decodedJwt?.exp) * 1000) < Date.now()) {
          localStorage.removeItem("user");
          history.push('/login')  
        }
      }
    });
  }

  render() {
    return <div></div>;
  }
}

export default AuthVerify;
