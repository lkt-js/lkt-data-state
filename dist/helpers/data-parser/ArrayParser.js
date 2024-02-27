import { DatumParser } from './DatumParser';
export class ArrayParser {
    constructor(value) {
        if (!Array.isArray(value)) {
            value = [];
        }
        this.value = value;
    }
    parse() {
        const tmp = [];
        this.value.forEach((z) => {
            try {
                tmp.push(new DatumParser(z).parse());
            }
            catch (e) {
                // nothing
            }
        });
        return tmp;
    }
}
