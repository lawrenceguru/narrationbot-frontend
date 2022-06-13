import { SELECT_DIRECTORIES } from "./types";
import AccountService from "../services/account.service.js"

export const selectDirectories = (res) => (dispatch) => {
  // var temp = {
  //   user_id: balence.user_id,
  //   balance: balence.balence
  // }
  // return AccountService.userUpdateBalance(temp).then(
  //   ({data}) => {
  //     if(data.affected === 1){
  //       dispatch({
  //         type: ADD_BALENCE,
  //         payload: balence,
  //       });
  //       openNotification()
  //     }
  //     return Promise.resolve();
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );
  dispatch({
    type: SELECT_DIRECTORIES,
    payload: res,
  });
}

