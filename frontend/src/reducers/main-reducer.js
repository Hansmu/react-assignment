import { GET_EXAMPLES, GET_HELLO_WORLD } from '../actions/types';

const INITIAL_STATE = { examples: [], helloWorldMessage: '' };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case GET_EXAMPLES:
            return { ...state, examples: action.payload.data.data };
        case GET_HELLO_WORLD:
            return {...state, helloWorldMessage: action.payload.data.data };
        default:
            return state;
    }
}
