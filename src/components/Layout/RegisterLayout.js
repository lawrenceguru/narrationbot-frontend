import React from "react";

import LoginHeader from './Header/LoginHeader'

const RegisterLayout = ({ children }) => {
  return (
    <React.Fragment>
      <div>
        <LoginHeader />
        {children}
      </div>
    </React.Fragment>
  );
}

export default RegisterLayout