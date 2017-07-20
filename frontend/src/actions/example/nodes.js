import { getRequest } from '../../../utils/request-utils';
import {
    READ_STATE_FROM_SERVER_FILE, SAVE_STATE_TO_SERVER_FILE, SAVE_STATE_TO_LOCAL_STORAGE, READ_STATE_FROM_LOCAL_STORAGE,
    SAVE_STATE_TO_LOCAL_FILE, LOAD_STATE_FROM_LOCAL_FILE, UPDATE_NODES
} from '../types';

export function updateNodes(nodes) {
    return {
        type: UPDATE_NODES,
        payload: nodes
    };
}

export function readStateFromServer() {
    return { type: READ_STATE_FROM_SERVER_FILE };
}

export function saveStateToServer(nodes) {
    return {
        type: SAVE_STATE_TO_SERVER_FILE,
        payload: postRequest(nodes)
    };
}

export function saveStateToLocalStorage(nodes) {
    return {
        type: SAVE_STATE_TO_LOCAL_STORAGE,
        payload: nodes
    };
}

export function loadStateFromLocalStorage() {
    return { type: READ_STATE_FROM_LOCAL_STORAGE };
}

export function saveStateToFile(nodes) {
    return {
        type: SAVE_STATE_TO_LOCAL_FILE,
        payload: nodes
    };
}

export function loadStateFromFile() {
    return { type: LOAD_STATE_FROM_LOCAL_FILE };
}
