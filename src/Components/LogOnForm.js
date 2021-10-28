import { useRef, useState } from "react";

const LogOnForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isLogin, setIsLogin] = useState(false);

  const changeAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (isLogin) {
    } else {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAapwykxzCrhSRZM7sRNY4zz47rcBE-aDo",
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
      ).then((response) => {
        if (response.ok) {
          console.log("Success");
        } else {
          response.json().then((data) => {
            console.log(data);
          });
        }
      });
    }
  };
  return (
    <form onSubmit={onSubmitHandler}>
      <div>
        <h3>Email</h3>
        <input type="email" id="email" required ref={emailRef} />
        <h3>Password</h3>
        <input type="password" id="password" ref={passwordRef} />
      </div>
      <button type="submit" id="submit">
        <h3>Submit</h3>
      </button>
    </form>
  );
};

export default LogOnForm;
