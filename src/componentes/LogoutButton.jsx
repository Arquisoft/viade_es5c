import React from 'react';
import auth from 'solid-auth-client';

/** Button that lets the user log out with Solid. */
function LogoutButton({
  children = 'Log out',
  className = 'solid auth logout',
}) {
  return <button
    className={className}
    onClick={() => auth.logout()}>{children}</button>;
}
export default LogoutButton;