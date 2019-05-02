import { BaseSigning, BaseSigningOptions } from "./BaseSigning";
import { KeyPair } from "./KeyPair";

export interface NanoSigningOptions extends BaseSigningOptions {
  serialize?: (data: any) => string
}

export class NanoSigning extends BaseSigning {
  constructor(public options: NanoSigningOptions = {}) {
    super(options);
    this.options.serialize = this.options.serialize || JSON.stringify;
  }

  /**
   * Generates a new hex signature using Secret Key.
   */
  public sign(data: any, secretKey: string | KeyPair): string {
    const serialized = this.options.serialize(data);
    return super.sign(serialized, secretKey);
  }

  /**
   * Checks signature using public key.
   */
  public verify(data: any, signature: string, publicKey: string | Uint8Array): boolean {
    const serialized = this.options.serialize(data);
    return super.verify(serialized, signature, publicKey);
  }
}
