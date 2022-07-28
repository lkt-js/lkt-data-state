import { ILktObject } from "lkt-tools";
import { DataStateMixin } from "./mixins/DataStateMixin";
import { App } from "vue";
declare const LktState: {
    install: (app: App, options: ILktObject) => void;
};
export { DataStateMixin };
export default LktState;
