import { RenderProcessModule } from '@/components/render-module';

export const ADD_MODULE = 'ADD_MODULE';

interface AddModuleAction {
    type: typeof ADD_MODULE;
    payload: RenderProcessModule;
}

export interface ModuleState {
    modules: RenderProcessModule[];
}

export type ModuleActionTypes = AddModuleAction;
