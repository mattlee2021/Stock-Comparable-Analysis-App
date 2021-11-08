import { useRef, useState } from "react";

const LogOnForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false); //use loading state to conditionally render loading

  const changeAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    setIsLoading(true);
    let apiURL;
    if (isLogin) {
      apiURL =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAapwykxzCrhSRZM7sRNY4zz47rcBE-aDo";
    } else {
      apiURL =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAapwykxzCrhSRZM7sRNY4zz47rcBE-aDo";
    }

    fetch(apiURL, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setIsLoading(false);
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((data) => {
            let errorMessage = "Authentication Error";

            // if (data && data.error && data.error.message) {
            //   errorMessage = data.error.message;
            // }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
        setIsLogin(true);
        if (data.idToken) {
        }
      })
      .catch((error) => {
        setIsLoading(false);
        alert(error);
      });
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div>
        <h3>Email</h3>
        <input type="email" id="email" required ref={emailRef} />
        <h3>Password</h3>
        <input type="password" id="password" ref={passwordRef} />
      </div>
      {!isLoading ? (
        <button type="submit" id="submit">
          Submit
        </button>
      ) : (
        <p>Loading</p>
      )}
    </form>
  );
};

export default LogOnForm;
