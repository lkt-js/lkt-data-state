import {ILktObject} from "lkt-tools";
import {DataStateMixin} from "./mixins/DataStateMixin";
import {App} from "vue";

const LktState = {
    install: (app: App, options: ILktObject) => {
        app.mixin(DataStateMixin);
    },
};

export {DataStateMixin};

export default LktState;