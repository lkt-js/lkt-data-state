import { ILktObject } from "lkt-tools";
import { DataStateMixin } from "./mixins/DataStateMixin";
declare const LktState: {
    install: (app: any, options: ILktObject) => void;
};
export { DataStateMixin };
export default LktState;
