import { KeyPair, KeyPairEncoding } from "./KeyPair";
export interface BaseSigningOptions {
    encoding?: KeyPairEncoding;
}
export declare class BaseSigning {
    options: BaseSigningOptions;
    constructor(options?: BaseSigningOptions);
    /**
     * Generates a new Key Pair.
     */
    keyPair(secretKey?: string | KeyPair): KeyPair;
    /**
     * Generates a new hex signature using Secret Key.
     */
    sign(data: string, secretKey: string | KeyPair): string;
    /**
     * Checks signature using public key.
     */
    verify(data: string, signature: string, publicKey: string | Uint8Array): boolean;
}
