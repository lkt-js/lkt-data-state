import { sortObjectProperties } from 'lkt-object-tools';
import { DatumParser } from './DatumParser';
export class ObjectParser {
    constructor(value) {
        this.value = { ...value };
    }
    parse() {
        if (!this.value) {
            return {};
        }
        const keys = Object.keys(this.value);
        let r = {};
        keys.forEach((key) => {
            try {
                r[key] = new DatumParser(this.value[key]).parse();
            }
            catch (e) {
                // nothing to do here
            }
        });
        r = sortObjectProperties(r);
        return r;
    }
}
