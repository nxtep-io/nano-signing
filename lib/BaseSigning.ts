import * as nacl from "tweetnacl";
import { KeyPair, KeyPairEncoding } from "./KeyPair";

export interface BaseSigningOptions {
  encoding?: KeyPairEncoding;
}

export class BaseSigning {
  constructor(public options: BaseSigningOptions = {}) {
    this.options.encoding = this.options.encoding || KeyPair.DEFAULT_ENCODING;
  }

  /**
   * Generates a new Key Pair.
   */
  public keyPair(secretKey?: string | KeyPair): KeyPair {
    if (secretKey instanceof KeyPair) {
      return secretKey;
    }
    return new KeyPair({ secretKey, encoding: this.options.encoding });
  }

  /**
   * Generates a new hex signature using Secret Key.
   */
  public sign(data: string, secretKey: string | KeyPair): string {
    const keyPair: KeyPair = this.keyPair(secretKey);

    // Encode properly and sign using secret key
    const encodedData: Uint8Array = Uint8Array.from(Buffer.from(data, this.options.encoding));
    const signature = nacl.sign.detached(encodedData, keyPair.raw().secretKey);
    return Buffer.from(signature).toString(this.options.encoding);
  }

  /**
   * Checks signature using public key.
   */
  public verify(data: string, signature: string, publicKey: string | Uint8Array): boolean {
    let decodedPublicKey: Uint8Array;

    // Preperly decode public key
    if (publicKey && publicKey instanceof Uint8Array) {
      decodedPublicKey = publicKey;
    } else if (publicKey) {
      decodedPublicKey = Uint8Array.from(Buffer.from(publicKey as string, this.options.encoding));
    }

    // Preperly decode and verify using public key
    const decodedSignature = Uint8Array.from(Buffer.from(signature as string, this.options.encoding));
    const encodedData: Uint8Array = Uint8Array.from(Buffer.from(data, this.options.encoding));
    return nacl.sign.detached.verify(encodedData, decodedSignature, decodedPublicKey);
  }
}
