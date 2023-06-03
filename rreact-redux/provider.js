import React from 'react';

export const ReduxContext = React.createContext();

export default function Provider({ store, children }) {
    return (
        <ReduxContext.Provider value={store}>
            {children}
        </ReduxContext.Provider>
    );
}