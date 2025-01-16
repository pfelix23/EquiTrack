import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import sessionReducer from './session';
import investmentsReducer from './investments';
import usersReducer from './users';
import assetsReducer from './assets';
import liabilitiesReducer from './liabilities';

const rootReducer = combineReducers({
    session: sessionReducer,
    investments: investmentsReducer,
    users: usersReducer,
    assets: assetsReducer,
    liabilities: liabilitiesReducer
});


let enhancer;
if (import.meta.env.MODE === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;