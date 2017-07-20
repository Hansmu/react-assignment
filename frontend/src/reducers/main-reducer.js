import { UPDATE_NODES } from '../actions/types';

const INITIAL_STATE = { nodes: [] };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case UPDATE_NODES:
            return { ...state, nodes: action.payload };
        default:
            return state;
    }
}
