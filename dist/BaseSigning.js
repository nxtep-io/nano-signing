"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nacl = require("tweetnacl");
const KeyPair_1 = require("./KeyPair");
class BaseSigning {
    constructor(options = {}) {
        this.options = options;
        this.options.encoding = this.options.encoding || KeyPair_1.KeyPair.DEFAULT_ENCODING;
    }
    /**
     * Generates a new Key Pair.
     */
    keyPair(secretKey) {
        if (secretKey instanceof KeyPair_1.KeyPair) {
            return secretKey;
        }
        return new KeyPair_1.KeyPair({ secretKey, encoding: this.options.encoding });
    }
    /**
     * Generates a new hex signature using Secret Key.
     */
    sign(data, secretKey) {
        const keyPair = this.keyPair(secretKey);
        // Encode properly and sign using secret key
        const encodedData = Uint8Array.from(Buffer.from(data, this.options.encoding));
        const signature = nacl.sign.detached(encodedData, keyPair.raw().secretKey);
        return Buffer.from(signature).toString(this.options.encoding);
    }
    /**
     * Checks signature using public key.
     */
    verify(data, signature, publicKey) {
        let decodedPublicKey;
        // Preperly decode public key
        if (publicKey && publicKey instanceof Uint8Array) {
            decodedPublicKey = publicKey;
        }
        else if (publicKey) {
            decodedPublicKey = Uint8Array.from(Buffer.from(publicKey, this.options.encoding));
        }
        // Preperly decode and verify using public key
        const decodedSignature = Uint8Array.from(Buffer.from(signature, this.options.encoding));
        const encodedData = Uint8Array.from(Buffer.from(data, this.options.encoding));
        return nacl.sign.detached.verify(encodedData, decodedSignature, decodedPublicKey);
    }
}
exports.BaseSigning = BaseSigning;
//# sourceMappingURL=BaseSigning.js.map