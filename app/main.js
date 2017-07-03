import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { AppContainer } from 'react-hot-loader';
import Promise from 'redux-promise';
import Root from './components/root';
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

render(Root);

if (module.hot) {
    module.hot.accept('./components/root', () => {
        const newApp = require('./components/root').default;
        render(newApp);
    });
}
