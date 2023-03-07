import { ActionCreator, ActionCreatorsMapObject, bindActionCreators } from "redux";

import { useAppDispatch } from "./useAppDispatch";

export function useActions<T extends ActionCreatorsMapObject>(actions: T) {
    const dispatch = useAppDispatch();
    return bindActionCreators(actions, dispatch);
}
