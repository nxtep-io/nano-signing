nano-signing
============

A minimalistic public-key signing framework for TS / JS environments based on [TweetNaCl](https://github.com/dchest/tweetnacl-js) and [ED25519](https://ed25519.cr.yp.to/).

<br />

## Installation

```bash
# Add to your dependencies using yarn
yarn add "nxtep-io/nano-signing";

# Or, using NPM
npm install "github:nxtep-io/nano-signing";
```

<br />

## Getting Started

<br />

**Key Pair Management**

Generating a random keypair using the default encoding:

```typescript
import { NanoSigning } from 'nano-signing';

const helper = new NanoSigning();

// Generates a random signer keypair
const signer = helper.keyPair();

// Dump keys as HEX encoded strings in the console
console.log({
  publicKey: signer.keyPair().publicKey(),
  secretKey: signer.keyPair().secretKey(),
});

// You can also access directly the base `nacl.SignKeyPair` instance
// with the original keys as Uint8Array buffers.
const raw = signer.raw();
```

Generating a keypair based on existing `secretKey`.

```typescript
// Generates a random signer keypair
const signer = helper.keyPair({
  secretKey: myOwnSecret
});
```

Changing default encoding for the KeyPair. 

Supported encodings: `ascii`, `utf8`, `utf16le/ucs2`, `base64`, `binary/latin-1`, and `hex`.

```typescript
// Generates a random signer keypair
const signer = helper.keyPair({
  encoding: 'base64'
});
```

Further info at the  Node.JS [Buffer.toString()](https://nodejs.org/docs/latest/api/buffer.html#buffer_buffer) official documentation.

<br />

**Data Signing**

Generates simple data signature using a random key pair.

```typescript
const originalData = { value: 123 }

// Generates a random signer keypair
const signer = helper.keyPair();

// Generates an encoded signature for input data
const signature = signer.sign(originalData, signer);
```

Validates existing signature against simple data signature using an existing public key.

```typescript
// Validate candidate signature against the originalData and public key supplied
const signature = signer.verify(originalData, candidateSignature, publicKey);
```

<br />

## API Docs

Check the published Github Page at https://nxtep-io.github.io/nano-signing/

<br />

## License

The project is licensed under the [MIT License](./LICENSE.md).
