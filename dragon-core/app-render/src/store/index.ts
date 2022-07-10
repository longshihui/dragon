import { createStore } from 'vuex';
import { DragonAppModules } from '../dragon-modules';

export interface State {
    modules: Array<{
        id: string;
        name: string;
        path: string;
    }>;
}

const store = createStore<State>({
    state() {
        return {
            modules: DragonAppModules.map(moduleOptions => {
                return {
                    id: moduleOptions.id,
                    name: moduleOptions.name,
                    path: moduleOptions.route.path
                };
            })
        };
    },
    mutations: {}
});

export default store;
