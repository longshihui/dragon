import { ModuleState, ModuleActionTypes, ADD_MODULE } from './types';

const initialState: ModuleState = {
    modules: []
};

export default function moduleReducer(
    state = initialState,
    action: ModuleActionTypes
): ModuleState {
    switch (action.type) {
        case ADD_MODULE: {
            return {
                modules: [...state.modules, action.payload]
            };
        }
        default:
            return state;
    }
}
