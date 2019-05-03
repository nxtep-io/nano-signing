/// <reference types="node" />
import * as nacl from "tweetnacl";
export declare type KeyPairEncoding = "hex" | "base64";
export interface KeyPairOptions {
    encoding?: KeyPairEncoding;
    secretKey?: string | Buffer | Uint8Array;
}
export declare class KeyPair {
    protected options: KeyPairOptions;
    protected _keyPair: nacl.SignKeyPair;
    static DEFAULT_ENCODING: KeyPairEncoding;
    /**
     * Initializes a KeyPair from specified options, or generates a new one if none passed.
     *
     * @param options The keypair initialization options
     */
    constructor(options?: KeyPairOptions);
    /**
     * Gets encoded public key.
     */
    publicKey(): string;
    /**
     * Gets encoded secret key.
     */
    secretKey(): string;
    /**
     * Gets raw keypair with keys as Uint8Array instances.
     */
    raw(): nacl.SignKeyPair;
}
