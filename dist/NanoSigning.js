"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseSigning_1 = require("./BaseSigning");
class NanoSigning extends BaseSigning_1.BaseSigning {
    constructor(options = {}) {
        super(options);
        this.options = options;
        this.options.serialize = this.options.serialize || JSON.stringify;
    }
    /**
     * Generates a new hex signature using Secret Key.
     */
    sign(data, secretKey) {
        const serialized = this.options.serialize(data);
        return super.sign(serialized, secretKey);
    }
    /**
     * Checks signature using public key.
     */
    verify(data, signature, publicKey) {
        const serialized = this.options.serialize(data);
        return super.verify(serialized, signature, publicKey);
    }
}
exports.NanoSigning = NanoSigning;
//# sourceMappingURL=NanoSigning.js.map