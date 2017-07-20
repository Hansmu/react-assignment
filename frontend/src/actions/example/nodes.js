import { getRequest } from '../../../utils/request-utils';
import { GET_HELLO_WORLD, GET_EXAMPLES } from '../types';

export function addNode(name, children=[]) {

}

export function getHelloWorldExample() {
    return {
        type: GET_HELLO_WORLD,
        payload: getRequest('example/hello-world')
    };
}

export function getExamples() {
    return {
        type: GET_EXAMPLES,
        payload: getRequest('example/all')
    };
}
