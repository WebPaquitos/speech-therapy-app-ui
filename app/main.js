import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { AppContainer } from 'react-hot-loader';
import Promise from 'redux-promise';
import Layout from './containers/layout';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(Promise)(createStore);

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
