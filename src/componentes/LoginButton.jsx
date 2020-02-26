import React from 'react';
import auth from 'solid-auth-client';

/** Button that lets the user log in with Solid. */
function LoginButton({
  popup,
  children = 'Log in',
  className = 'solid auth login',
}) {
  return <button
    className={className}
    onClick={() => auth.popupLogin({ popupUri: "https://solid.github.io/solid-auth-client/dist/popup.html" })}>{children}</button>;
}

export default LoginButton;