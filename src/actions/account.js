import { ADD_BALENCE, UPDATE_USER } from "./types";
import AccountService from "../services/account.service.js"
import { notification } from 'antd'

const openNotification = () => {
  notification.open({
    message: 'Notification Title',
    description:
      'State: Successfully',
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
};

//narrate section recucing balence
export const addBalence = (balence) => (dispatch) => {
  var temp = {
    language: balence.language,
    // sentence: balence.sentence.slice(0, 30) + ' ...',
    sentence: balence.sentence,
    user_id: balence.user_id,
    balance: balence.balence,
    voicer: balence.voicer,
    url: balence.url,
    page_id: balence.page_id,
    cut_balance: balence.cut_balence,
  }
  console.log(temp)
  // dispatch({
  //   type: ADD_BALENCE,
  //   payload: balence,
  // });
  return AccountService.addAccount(temp).then(
    (data) => {
        dispatch({
          type: ADD_BALENCE,
          payload: balence,
        });
      return Promise.resolve();
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export const userUpdateBalance = (balence) => (dispatch) => {
  var temp = {
    user_id: balence.user_id,
    balance: balence.balence
  }
  return AccountService.userUpdateBalance(temp).then(
    ({data}) => {
      if(data.affected === 1){
        dispatch({
          type: ADD_BALENCE,
          payload: balence,
        });
        openNotification()
      }
      return Promise.resolve();
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}

// get origin user data from database
export const getUser = () => async (dispatch) => {
    var user = JSON.parse(localStorage.getItem("user"));
    if (!user) return false
    return await AccountService.getUser().then(
      ({data}) => {
        dispatch({
          type: UPDATE_USER,
          payload: data,
        });
        return Promise.resolve();
      },
      (error) => {
        return Promise.reject(error);
      }
    );
}

export const getAccountUserID = () => (dispatch) => {
  var user = JSON.parse(localStorage.getItem("user"));
    return AccountService.getAccountUserID(user.sub).then(
      ({data}) => {
        return Promise.resolve(data);
      },
      (error) => {
        return Promise.reject(error);
      }
    );
}
