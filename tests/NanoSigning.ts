import { NanoSigning } from "../lib";

describe("lib.signing.NanoSigning", () => {
  let helper: NanoSigning;

  beforeEach(() => (helper = new NanoSigning()));

  afterEach(() => (helper = undefined));

  it("should generate a valid keypair from helper ", async () => {
    const credentials = helper.keyPair();
    const fromSecret = helper.keyPair(credentials.secretKey());
    expect(fromSecret.publicKey()).toEqual(credentials.publicKey());
  });

  it("should sign some value properly using secret key as string", async () => {
    const credentials = helper.keyPair();
    const data = { test: "123" };

    const signature = helper.sign(data, credentials.secretKey());
    expect(signature.length).toBeGreaterThan(0);

    const isValid = helper.verify(data, signature, credentials.publicKey());
    expect(isValid).toBeTruthy();
  });

  it("should verify a Uint8Array signature value properly using KeyPair", async () => {
    const credentials = helper.keyPair();
    const data = { test: "123" };

    const signature = helper.sign(data, credentials);
    expect(signature.length).toBeGreaterThan(0);

    const isValid = helper.verify(data, signature, credentials.raw().publicKey);
    expect(isValid).toBeTruthy();
  });
});
