import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Header from './containers/header';
import Example from './containers/example';

export default (
    <Route path="/" component={Header}>
        <Route path="posts/new" component={Example} />
    </Route>
);
