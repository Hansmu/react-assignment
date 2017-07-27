import React from 'react';
import { mount } from 'enzyme';
import { createStore } from 'redux';
import reducers from '../src/reducers';
import { Provider } from 'react-redux';

function renderComponent(ComponentClass, props = {}, state = {}) {
    return mount(
        <Provider store={createStore(reducers, state)}>
          <ComponentClass {...props} />
        </Provider>
    );
}

export {renderComponent};
