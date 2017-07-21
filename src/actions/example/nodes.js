import { postRequest, getRequest } from '../../../utils/request-utils';
import {
    READ_STATE_FROM_SERVER_FILE, SAVE_STATE_TO_SERVER_FILE, SAVE_STATE_TO_LOCAL_STORAGE, READ_STATE_FROM_LOCAL_STORAGE,
    UPDATE_NODES
} from '../types';

export function updateNodes(nodes) {
    return {
        type: UPDATE_NODES,
        payload: nodes
    };
}

export function readStateFromServer() {
    return {
        type: READ_STATE_FROM_SERVER_FILE,
        payload: getRequest('file')
    };
}

export function saveStateToServer(nodes) {
    return {
        type: SAVE_STATE_TO_SERVER_FILE,
        payload: postRequest('file', nodes)
    };
}

export function saveStateToLocalStorage() {
    return { type: SAVE_STATE_TO_LOCAL_STORAGE };
}

export function loadStateFromLocalStorage() {
    return { type: READ_STATE_FROM_LOCAL_STORAGE };
}

