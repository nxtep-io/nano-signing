nano-signing
============

A minimalistic public-key signing framework for TS / JS environments based on TweetNaCl and ED25519.


## Installation

```bash
# Add to your dependencies using yarn
yarn add "nxtep-io/nano-signing";

# Or, using NPM
npm install "github:nxtep-io/nano-signing";
```


## Getting Started


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

Changing default encoding for the keyPair.

```typescript
// Generates a random signer keypair
const signer = helper.keyPair({
  encoding: 'base64'
});
```

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

## API Docs

Check the published Github Page at https://nxtep-io.github.io/nano-signing/

## License

The project is licensed under the [MIT License](./LICENSE.md).
