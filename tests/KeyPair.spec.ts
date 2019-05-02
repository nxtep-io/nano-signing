import { KeyPair } from "../lib";

describe("lib.signing.KeyPair", () => {
  it("should generate a valid keypair", async () => {
    const credentials = new KeyPair();

    expect(credentials).toHaveProperty("publicKey");
    expect(credentials).toHaveProperty("secretKey");

    const fromSecret = new KeyPair({ secretKey: credentials.secretKey() });
    expect(fromSecret.publicKey()).toEqual(credentials.publicKey());
  });

  it("should generate a valid keypair using buffers", async () => {
    const credentials = new KeyPair();
    const fromSecret = new KeyPair({ secretKey: Buffer.from(credentials.raw().secretKey) });
    expect(fromSecret.publicKey()).toEqual(credentials.publicKey());
  });

  it("should generate a valid keypair using Uint8Array instances", async () => {
    const credentials = new KeyPair();
    const fromSecret = new KeyPair({ secretKey: credentials.raw().secretKey });
    expect(fromSecret.publicKey()).toEqual(credentials.publicKey());
  });
});
