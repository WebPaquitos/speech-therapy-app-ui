import 'bootstrap/dist/css/bootstrap.css';
import 'react-datepicker/dist/react-datepicker.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { AppContainer } from 'react-hot-loader';
import PromiseMiddleware from 'redux-thunk';
import Layout from './containers/layout';
import reducers from './reducers';
import { getJSONFromStorage } from './common/utils';
import { STORAGE_KEYS, EMPTY_SESSION, LOG_USER } from './common/constants';

const createStoreWithMiddleware = applyMiddleware(PromiseMiddleware)(createStore);
const store = createStoreWithMiddleware(reducers);

const session = getJSONFromStorage(STORAGE_KEYS.SESSION) || EMPTY_SESSION;
if (session.isLogged) {
    store.dispatch({
        type: LOG_USER,
        payload: session,
    });
}

const render = (Component) => {
    ReactDOM.render(
        <Provider store={store}>
            <AppContainer>
                <Component/>
            </AppContainer>
        </Provider>
        , document.getElementById('root'),
    );
};

render(Layout);

if (module.hot) {
    module.hot.accept('./containers/layout', () => {
        const newApp = require('./containers/layout').default;
        render(newApp);
    });
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').then((registration) => {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, (err) => {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}
