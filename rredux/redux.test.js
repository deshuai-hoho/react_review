import createStore from './createStore';
import applyMiddleware from './middleware';
import logger from './redux-logger';


function testReducer(state = 0, action) {
    if (action.type === 'INCREMENT') {
        return state + 1;
    }
    return state;
}

test('createStore', () => {
    
    const {
        dispatch,
        subscribe,
        getState
    } = createStore(testReducer);

    const unsubscribe = subscribe(() => {
        console.log(getState());
    });

    dispatch({type: 'INCREMENT'});

    unsubscribe();
})

test('middleware', () => {
    const {
        dispatch,
        getState,
        subscribe
    } = createStore(testReducer, applyMiddleware(logger));

    const unsubscribe = subscribe(() => {
        console.log('alskdfjdslakdf', getState());
    });

    dispatch({type: 'INCREMENT'});

    unsubscribe();
});
