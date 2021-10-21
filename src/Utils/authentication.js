export const APP_USER_KEY = "@rpsgame-AppUserKey";
export const isAuthenticated = () => localStorage.getItem(APP_USER_KEY) !== null;
export const getToken = () => {

  var output = '';

  //Por enquanto, a API é aberta, descomentar o código abaixo quando isso mudar

  // var output = null, currentUser = getUser();
  // if (currentUser !== null) {
  //   output = currentUser.access_token;
  // }

  return output;
};

export const getUser = () => {
  var output = null, rawUser = localStorage.getItem(APP_USER_KEY);
  if (rawUser !== null) {
    var currentUser = JSON.parse(rawUser);
    output = currentUser;
  }
  return output;
};

export const login = userInfo => {
  var userToSave = JSON.stringify(userInfo);
  localStorage.setItem(APP_USER_KEY, userToSave);
};

export const logout = () => {
  localStorage.removeItem(APP_USER_KEY);
};
