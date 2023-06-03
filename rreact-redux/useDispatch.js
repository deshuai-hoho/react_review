import { useContext } from "react";
import { ReduxContext } from "./provider";

export default function useDispatch() {
  const { dispatch } = useContext(ReduxContext);
  return dispatch;
}