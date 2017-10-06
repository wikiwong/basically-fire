import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './App/reducer';

function configureStore(initialState) {
    const middleware = [thunkMiddleware];
    if (process.browser && process.env.NODE_ENV !== 'production') {
        middleware.push(createLogger());
    }

    const store = createStore(rootReducer, initialState, compose(
        applyMiddleware(...middleware),
        typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : func => func
    ));

    return store;
}

module.exports = configureStore;
