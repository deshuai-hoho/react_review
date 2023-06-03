function middleware({ dispatch, getState }) {
    return (next) => {
        return (action) => {
            return next(action);
        }
    }
}

function compose(...funcs) {
    if (funcs.length === 0) {
        return arg => arg
    }

    if (funcs.length === 1) {
        return funcs[0]
    }

    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}


export default function applyMiddleware(...middlewares) {
    return (createStore) => (reducer) => {
        const store = createStore(reducer);

        const middlewareApi = {
            getState: store.getState,
            dispatch: (action, ...args) => store.dispatch(action, ...args)
        }

        const middlewareChain = middlewares.map(middleware => middleware(middlewareApi));

        const dispatch = compose(...middlewareChain)(store.dispatch);

        return {
            ...store,
            dispatch
        }
    }
}