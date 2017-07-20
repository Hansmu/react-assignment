import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Header from './containers/header';
import NodesView from './containers/nodes-view';
import NodesIO from './containers/nodes-io';

export default (
    <Route path="/" component={Header}>
        <Route path="nodes" component={NodesView} />
        <Route path="nodes/io" component={NodesIO} />
    </Route>
);
