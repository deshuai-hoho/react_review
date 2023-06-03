// Store
// * store state of the application
// * notify component to update per state change
// * return {
//      getState,
//      dispatch(action),
//      subscribe(listner),
//      
// }

export default function createStore(reducer, enhancer) {
    if (enhancer) {
        return enhancer(createStore)(reducer);
    }

    let currentState = null;
    let currentListeners = [];


    function dispatch(action) {
        currentState = reducer(currentState, action);

        currentListeners.forEach((listen) => listen());
    }

    function getState() {
        return currentState;
    }

    function subscribe(listner) {
        currentListeners.push(listner);

        return function unsubscribe() {
            const index = currentListeners.indexOf(listner);
            currentListeners.splice(index, 1);
        }
    }

    // 获取初始值 在redux中会在combineReduces中进行reduce的调用获取初始值
    dispatch({type: 'REDUX/XXX'});

    return {
        dispatch,
        getState,
        subscribe
    };
}