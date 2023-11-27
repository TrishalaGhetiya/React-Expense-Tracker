export const userSignUp = (userData) => {
  const { email, password } = userData;
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
