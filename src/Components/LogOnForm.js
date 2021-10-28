import { useState, useRef } from "react";

const LogOnForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    console.log(email, password);
  };
  return (
    <form onSubmit={onSubmitHandler}>
      <div>
        <h3>Email</h3>
        <input type="text" id="username" ref={emailRef} />
        <h3>Password</h3>
        <input type="text" id="password" ref={passwordRef} />
      </div>
      <button type="submit" id="submit">
        <h3>Submit</h3>
      </button>
    </form>
  );
};

export default LogOnForm;
