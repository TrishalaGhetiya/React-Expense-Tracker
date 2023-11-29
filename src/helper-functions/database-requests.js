import axios from 'axios';

export const userSignUp = (email, password) => {
  return fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBaMjEyYa1-VQ3dRX6GfB9u_vd7uM8God4",
    {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const userLogin = (email, password) => {
  return fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBaMjEyYa1-VQ3dRX6GfB9u_vd7uM8God4",
    {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
const token = localStorage.getItem('token');

export const userUpdateProfile = (userName, photoURL) => {
  return fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBaMjEyYa1-VQ3dRX6GfB9u_vd7uM8God4', {
    method: "POST",
      body: JSON.stringify({
        idToken: token,
        displayName: userName,
        photoUrl: photoURL,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
  })
}

export const getUserData = () => {
  return fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBaMjEyYa1-VQ3dRX6GfB9u_vd7uM8God4', {
    method: "POST",
      body: JSON.stringify({
        idToken: token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
  })
}

export const emailVerification = () => {
  return fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBaMjEyYa1-VQ3dRX6GfB9u_vd7uM8God4', {
    method: "POST",
      body: JSON.stringify({
        requestType: 'VERIFY_EMAIL',
        idToken: token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
  })
}

export const passwordReset = (email) => {
  return fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBaMjEyYa1-VQ3dRX6GfB9u_vd7uM8God4', {
    method: "POST",
      body: JSON.stringify({
        requestType: 'PASSWORD_RESET',
        email: email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
  })
}

export const getExpenses = () => {
  return axios.get('https://react-http-ff156-default-rtdb.firebaseio.com/expenses');
}

export const addExpense = (expense) => {
  return axios.post('https://react-http-ff156-default-rtdb.firebaseio.com/expenses', expense);
}
