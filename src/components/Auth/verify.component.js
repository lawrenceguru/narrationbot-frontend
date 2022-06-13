import React, { useState, useEffect } from "react";
import { Redirect, useParams, useHistory } from "react-router-dom";
import Api from "../../ApiConfig";
import * as Actions from "../../actions";
import { useSelector, useDispatch } from "react-redux";

const VerifyEmail = () => {
  const { token } = useParams();
  console.log(token)
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(Actions.verifyEmail(token));
  }, [token]);
  return (
    <div
      style={{
        height: 'calc(100vh - 75px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'PoppinsBold',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '45px'
      }}
    >
      {message !== "" ? (
        message === 'Email Verification was failed!' ? (
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        ) : (
          <>
            <div className="alert alert-success" role="alert">
              {message}
            </div>
          </>
        )
        
      ) : (
        <div className="alert alert-primary" role="alert">
          Verifying your email....
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
