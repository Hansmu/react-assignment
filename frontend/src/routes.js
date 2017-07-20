import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Header from './containers/header';
import NodesView from './containers/nodes-view';

export default (
    <Route path="/" component={Header}>
        <Route path="posts/new" component={NodesView} />
    </Route>
);
