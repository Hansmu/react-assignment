import { UPDATE_NODES, SAVE_STATE_TO_LOCAL_STORAGE, READ_STATE_FROM_LOCAL_STORAGE } from '../actions/types';

const INITIAL_STATE = { nodes: [] };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case UPDATE_NODES:
            return { ...state, nodes: action.payload };
        case SAVE_STATE_TO_LOCAL_STORAGE:
            window.localStorage.setItem('nodes', JSON.stringify(state.nodes));
            return { ...state };
        case READ_STATE_FROM_LOCAL_STORAGE:
            const nodes = JSON.parse(window.localStorage.getItem('nodes'));
            return { ...state, nodes };
        default:
            return state;
    }
}
