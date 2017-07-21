import Header from './containers/header';
import NodesView from './containers/nodes-view';

export default ({
    component: Header,
    path: '/',
    indexRoute: {
        component: NodesView
    },
    childRoutes: [
        {
            path: 'nodes/io',
            getComponent(location, cb) {
                System.import('./containers/nodes-io')
                    .then(module => cb(null, module.default));
            }
        }
    ]
});
