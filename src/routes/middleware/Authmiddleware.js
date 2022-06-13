import React from "react"
import PropTypes from "prop-types"
import { Route, Redirect } from "react-router-dom"
// import { history } from '../../helpers/history';
import { useDispatch } from "react-redux";
import { getUser } from "../../actions/account";

const Authmiddleware = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  ...rest
}) => {
  const dispatch = useDispatch();
  dispatch(getUser())
  return (
    <Route
      {...rest}
      render={props => {
        if (isAuthProtected && !localStorage.getItem("user")) {
          return (
            <Redirect
              to={{ pathname: "/login" }}
            />
          )
        }

        const parseJwt = (token) => {
          try {
            return JSON.parse(atob(token.split('.')[1]));
          } catch (e) {
            return null;
          }
        };

        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
          const decodedJwt = parseJwt(user.access_token);
          if ((Number(decodedJwt?.exp) * 1000) < Date.now()) {
            localStorage.removeItem("user");
            // // history.push('/login')  
            return (
              <Redirect
                to={{ pathname: "/login" }}
              />
            )
          }
        }

        return (
          <Layout>
              <Component {...props} />
          </Layout>
        )
      }}
    />
  )
}

Authmiddleware.propTypes = {
  isAuthProtected: PropTypes.bool,
  component: PropTypes.any,
  location: PropTypes.object,
  layout: PropTypes.any,
}

export default Authmiddleware;
