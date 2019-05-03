import { BaseSigning, BaseSigningOptions } from "./BaseSigning";
import { KeyPair } from "./KeyPair";
export interface NanoSigningOptions extends BaseSigningOptions {
    serialize?: (data: any) => string;
}
export declare class NanoSigning extends BaseSigning {
    options: NanoSigningOptions;
    constructor(options?: NanoSigningOptions);
    /**
     * Generates a new hex signature using Secret Key.
     */
    sign(data: any, secretKey: string | KeyPair): string;
    /**
     * Checks signature using public key.
     */
    verify(data: any, signature: string, publicKey: string | Uint8Array): boolean;
}
