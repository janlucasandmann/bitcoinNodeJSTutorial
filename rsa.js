/**
 * Simple RSA implementation in Node.js without external libraries.
 *
 * The code below covers:
 *  - random prime generation using Miller-Rabin primality test
 *  - modular arithmetic helpers (pow, gcd, modular inverse)
 *  - key pair generation
 *  - message encoding/decoding helpers
 *  - encrypt / decrypt functions that work on UTF-8 strings
 *
 * This is purely for educational purposes; do not use it for production
 * systems unless you understand the security implications and validate it
 * thoroughly.
 */

const crypto = require('crypto');

// Commonly used public exponent; balances security and performance.
const DEFAULT_PUBLIC_EXPONENT = 65537n;

/**
 * Compute base^exponent mod modulus efficiently.
 * We use the square-and-multiply technique to keep the numbers small.
 */
function modPow(base, exponent, modulus) {
  if (modulus === 1n) {
    return 0n;
  }

  let result = 1n;
  let b = base % modulus;
  let e = exponent;

  while (e > 0n) {
    if (e & 1n) {
      result = (result * b) % modulus;
    }
    e >>= 1n;
    b = (b * b) % modulus;
  }

  return result;
}

/**
 * Extended Euclidean algorithm.
 * Returns [gcd, x, y] such that a*x + b*y === gcd.
 */
function extendedEuclid(a, b) {
  let oldR = a;
  let r = b;
  let oldS = 1n;
  let s = 0n;
  let oldT = 0n;
  let t = 1n;

  while (r !== 0n) {
    const quotient = oldR / r;
    [oldR, r] = [r, oldR - quotient * r];
    [oldS, s] = [s, oldS - quotient * s];
    [oldT, t] = [t, oldT - quotient * t];
  }

  return [oldR, oldS, oldT];
}

/**
 * Compute the modular inverse of e modulo phi.
 * i.e. find d such that (d * e) % phi === 1
 */
function modInverse(e, phi) {
  const [gcd, x] = extendedEuclid(e, phi);
  if (gcd !== 1n) {
    throw new Error('Numbers are not coprime; modular inverse does not exist.');
  }
  return ((x % phi) + phi) % phi;
}

/**
 * Generate a random BigInt of the desired bit length.
 * We rely on crypto.randomBytes for cryptographically strong randomness.
 */
function randomBigInt(bits) {
  const bytes = Math.ceil(bits / 8);
  const buffer = crypto.randomBytes(bytes);
  let random = 0n;
  for (const value of buffer.values()) {
    random = (random << 8n) + BigInt(value);
  }
  const extraBits = BigInt(bytes * 8 - bits);
  if (extraBits > 0n) {
    random >>= extraBits;
  }
  return random;
}

/**
 * Return a random BigInt in the inclusive range [min, max].
 * We use rejection sampling to avoid bias.
 */
function randomBetween(min, max) {
  if (max < min) {
    throw new Error('Invalid range provided.');
  }
  const range = max - min + 1n;
  const bits = range.toString(2).length;
  let candidate;
  do {
    candidate = randomBigInt(bits);
  } while (candidate >= range);
  return min + candidate;
}

/**
 * Miller-Rabin probabilistic primality test.
 * We repeat the test with several random bases to reduce the error rate.
 */
function isProbablyPrime(n, iterations = 16) {
  if (n === 2n || n === 3n) {
    return true;
  }
  if (n <= 1n || n % 2n === 0n) {
    return false;
  }

  // Express n - 1 as d * 2^r
  let r = 0n;
  let d = n - 1n;
  while (d % 2n === 0n) {
    d /= 2n;
    r += 1n;
  }

  for (let i = 0; i < iterations; i += 1) {
    const a = randomBetween(2n, n - 2n);
    let x = modPow(a, d, n);
    if (x === 1n || x === n - 1n) {
      continue;
    }

    let continueWitnessLoop = false;
    for (let j = 1n; j < r; j += 1n) {
      x = modPow(x, 2n, n);
      if (x === n - 1n) {
        continueWitnessLoop = true;
        break;
      }
    }
    if (continueWitnessLoop) {
      continue;
    }
    return false;
  }

  return true;
}

/**
 * Generate a prime with the requested number of bits.
 * We force the top bit to ensure the number has the correct length,
 * and force the number to be odd because even numbers > 2 are never prime.
 */
function generatePrime(bits) {
  if (bits < 2) {
    throw new Error('Bit length must be at least 2.');
  }

  while (true) {
    let candidate = randomBigInt(bits);
    candidate |= (1n << BigInt(bits - 1)); // ensure highest bit is set
    candidate |= 1n; // ensure odd

    if (isProbablyPrime(candidate)) {
      return candidate;
    }
  }
}

/**
 * Compute the greatest common divisor using Euclid's algorithm.
 */
function gcd(a, b) {
  let x = a < 0n ? -a : a;
  let y = b < 0n ? -b : b;
  while (y !== 0n) {
    [x, y] = [y, x % y];
  }
  return x;
}

/**
 * Generate an RSA key pair of roughly `bits` bits.
 * We generate two primes of half the size and combine them.
 */
function generateKeyPair(bits = 1024) {
  if (bits < 512) {
    throw new Error('Key size is too small. Use at least 512 bits for demo purposes.');
  }

  const primeBits = Math.floor(bits / 2);
  let p;
  let q;
  let phi;
  const e = DEFAULT_PUBLIC_EXPONENT;

  do {
    p = generatePrime(primeBits);
    q = generatePrime(bits - primeBits);
    phi = (p - 1n) * (q - 1n);
  } while (gcd(e, phi) !== 1n || p === q);

  const n = p * q;
  const d = modInverse(e, phi);

  return {
    publicKey: { e, n },
    privateKey: { d, n },
  };
}

/**
 * Convert a UTF-8 string into a BigInt.
 */
function encodeMessage(message) {
  const buffer = Buffer.from(message, 'utf8');
  let result = 0n;
  for (const value of buffer.values()) {
    result = (result << 8n) + BigInt(value);
  }
  return result;
}

/**
 * Convert a BigInt back into a UTF-8 string.
 */
function decodeMessage(integer) {
  if (integer === 0n) {
    return '';
  }

  let hex = integer.toString(16);
  if (hex.length % 2 === 1) {
    hex = `0${hex}`;
  }
  return Buffer.from(hex, 'hex').toString('utf8');
}

/**
 * Encrypt a UTF-8 string with the public key.
 * Returns a hexadecimal string representation of the ciphertext.
 */
function encrypt(message, publicKey) {
  const { e, n } = publicKey;
  const m = encodeMessage(message);
  if (m >= n) {
    throw new Error('Message too long for the current key size.');
  }

  const c = modPow(m, e, n);
  return c.toString(16);
}

/**
 * Decrypt a hexadecimal ciphertext string with the private key.
 * Returns the resulting UTF-8 string.
 */
function decrypt(cipherHex, privateKey) {
  const { d, n } = privateKey;
  const c = BigInt(`0x${cipherHex}`);
  const m = modPow(c, d, n);
  return decodeMessage(m);
}

/**
 * Example usage:
 *   node rsa.js
 */
if (require.main === module) {
  const { publicKey, privateKey } = generateKeyPair(512);
  const message = 'hello, RSA!';
  console.log('Original message:', message);

  const cipher = encrypt(message, publicKey);
  console.log('Ciphertext (hex):', cipher);

  const decrypted = decrypt(cipher, privateKey);
  console.log('Decrypted message:', decrypted);
}

module.exports = {
  generateKeyPair,
  encrypt,
  decrypt,
};
