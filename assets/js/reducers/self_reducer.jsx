import Immutable from 'immutable';
import { DEFINE_SELF } from '../actions/action_types';

const initialState = Immutable.Map({id: -1, username: ''});

export default (state = initialState, action) => {
    if (action.type === DEFINE_SELF) {
        return state.merge({
            id: action.payload.id,
            username: action.payload.username
        });
    }
    return state;
};

