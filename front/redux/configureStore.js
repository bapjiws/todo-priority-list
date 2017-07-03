import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../redux/reducers/rootReducer';
import thunk from 'redux-thunk';
// Can't import it here when it's only installed as a dev dependency.
// import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import { getAxiosInstance } from '../utils/axiosInstance';
const axiosInstance = getAxiosInstance();

const configureStore = () => {
    const middlewares = [thunk.withExtraArgument({ axiosInstance })];

    return createStore(
        rootReducer,
        // initialState,
        process.env.NODE_ENV === 'production' ?
            compose(applyMiddleware(...middlewares)) :
            require('redux-devtools-extension/developmentOnly').composeWithDevTools(applyMiddleware(...middlewares))
    );
};

export default configureStore;