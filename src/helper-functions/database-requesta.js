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

export const userUpdateProfile = (userName, photoURL) => {
  const token = localStorage.getItem('token');
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
