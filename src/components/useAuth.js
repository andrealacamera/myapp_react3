import { useMemo } from 'react'
import { useSelector } from 'react-redux'


export const useAuth = () => {
  // ok... the naming is very stupid!              
  //                                             store  user
  //                                               |     |
  const user = useSelector((state) => state.user.user);
  // useMemo will only recompute the memoized value when the dependency has changed. 
  return useMemo( () => ({user}), [user]);
}