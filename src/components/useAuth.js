import { useMemo } from 'react'
import { useSelector } from 'react-redux'


export const useAuth = () => {
  const username = useSelector((state) => state.user.username);
  // useMemo will only recompute the memoized value when the dependency has changed. 
  return useMemo( () => ({username}), [username]);
}