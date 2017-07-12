import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { AppContainer } from 'react-hot-loader';
import PromiseMiddleware from 'redux-promise-middleware';
import Layout from './containers/layout';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(PromiseMiddleware())(createStore);

const render = (Component) => {
    ReactDOM.render(
        <Provider store={createStoreWithMiddleware(reducers)}>
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
