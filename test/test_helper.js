import React from 'react';
import { mount } from 'enzyme';
import { createStore, applyMiddleware } from 'redux';
import reducers from '../src/reducers';
import { Provider } from 'react-redux';
import promise from 'redux-promise';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

function renderComponent(ComponentClass, props = {}, state = {}) {
    return mount(
        <Provider store={createStoreWithMiddleware(reducers, state)}>
          <ComponentClass {...props} />
        </Provider>
    );
}

export {renderComponent};
