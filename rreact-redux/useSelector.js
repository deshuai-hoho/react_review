/**
 * e.g.
 * const num = useSelector((state) => state.num)
 * 
 * <div>
 *    <h1>Number: {num}</h1>
 *    <button onClick={() => dispatch(increment())}</div>
 */

import { useContext, useEffect, useReducer } from "react";
import { ReduxContext } from "./provider";

export default function useSelector(selector) {
  const { store } = useContext(ReduxContext);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      forceUpdate();
    });
    return unsubscribe;
  }, [store]);

  return selector(store.getState());
}