"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nacl = require("tweetnacl");
class KeyPair {
    /**
     * Initializes a KeyPair from specified options, or generates a new one if none passed.
     *
     * @param options The keypair initialization options
     */
    constructor(options = {}) {
        this.options = options;
        this.options.encoding = this.options.encoding || KeyPair.DEFAULT_ENCODING;
        if (options.secretKey && options.secretKey instanceof Uint8Array) {
            // Secret key is alreayd a Uint8Array, nothing needs to be done
            this._keyPair = nacl.sign.keyPair.fromSecretKey(this.options.secretKey);
        }
        else if (this.options.secretKey instanceof Buffer) {
            // Secret key is a buffer, needs some handling
            this._keyPair = nacl.sign.keyPair.fromSecretKey(Uint8Array.from(this.options.secretKey));
        }
        else if (this.options.secretKey) {
            // Secret key is not a buffer, we need to convert it first
            const buffer = Buffer.from(this.options.secretKey, this.options.encoding);
            this._keyPair = nacl.sign.keyPair.fromSecretKey(Uint8Array.from(buffer));
        }
        else {
            this._keyPair = nacl.sign.keyPair();
        }
    }
    /**
     * Gets encoded public key.
     */
    publicKey() {
        return Buffer.from(this._keyPair.publicKey).toString(this.options.encoding);
    }
    /**
     * Gets encoded secret key.
     */
    secretKey() {
        return Buffer.from(this._keyPair.secretKey).toString(this.options.encoding);
    }
    /**
     * Gets raw keypair with keys as Uint8Array instances.
     */
    raw() {
        return this._keyPair;
    }
}
KeyPair.DEFAULT_ENCODING = "hex";
exports.KeyPair = KeyPair;
//# sourceMappingURL=KeyPair.js.map