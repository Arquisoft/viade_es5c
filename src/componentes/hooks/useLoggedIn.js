import { useDebugValue } from 'react';
import useWebId from './useWebId';

const isNotNull = (_, id) => id === undefined ? undefined : id !== null;

/**
 * Returns whether the user is logged in,
 * or `undefined` if the user state is pending.
 */
function useLoggedIn() {
  const loggedIn = useWebId(isNotNull);
  useDebugValue(loggedIn);
  return loggedIn;
}
export default useLoggedIn;