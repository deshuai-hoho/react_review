/**
 * connect(
 *  mapStateToProps,
 *  mapDispatchToProps,
 *  mergeProps,
 *  options
 * )
 * 
 * mapStateToProps: (state, ownProps) => Object
 * mapDispatchToProps: Object | (dispatch, ownProps) => Object
 */

import { useContext, useEffect, useReducer } from "react";
import { ReduxContext  } from "./provider";

function bindActionCreators(actionCreators, dispatch) {
    const boundActionCreators = {dispatch};


}

const connect = (mapStateToProps, mapDispatchToProps, mergeProps, options) => {
    const wrapWithConnect = WrappedComponent => props => {
        const { getState, dispatch, subscribe  } = useContext(ReduxContext);

        const [ ignore, forceUpdate ] = useReducer((preValue) => preValue + 1, 0);

        const state = getState;

        const stateProps = mapStateToProps && mapStateToProps(state, props);
        let dispatchProps = { dispatch }

        if (typeof(mapDispatchToProps) === 'function') {
            dispatchProps = mapDispatchToProps(dispatch, props);
        } else {
            dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
        }

        useEffect(() => {
            const unsubscribe = subscribe(() => {
                forceUpdate();
            });
        }, [subscribe]);

        return <WrappedComponent {...props} {...stateProps} {...dispatchProps} />;
    }
}
    