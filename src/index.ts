import {ILktObject} from "lkt-tools";
import {DataStateMixin} from "./mixins/DataStateMixin";

const LktState = {
    install: (app: any, options: ILktObject) => {
        app.mixin(DataStateMixin);
    },
};

export {DataStateMixin};

export default LktState;