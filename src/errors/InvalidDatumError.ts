export class InvalidDatumError extends Error {
    constructor() {
        super();
        this.name = 'InvalidDatumError';
        this.message = 'Datum not supported'
    }
}