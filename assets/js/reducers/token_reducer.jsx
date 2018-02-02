import Immutable from 'immutable';
import { ADD_TOKEN, DELETE_TOKEN } from '../actions/action_types';

const initialState = '';

export default (state = initialState, action) => {
    if (action.type === ADD_TOKEN) {
        return action.payload;
    }
    if (action.type === DELETE_TOKEN) {
        return '';
    }
    return state;
};
