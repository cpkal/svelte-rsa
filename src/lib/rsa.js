// Himpunan bilangan prima
const primes = new Set([]);

let n;

// Fungsi untuk mengecek angka adalah prima
// function isPrime(num) {
//   for (let i = 2; i * i <= num; i++) {
//       if (num % i == 0)
//           return false;
//   }
//   return num >= 2;
// }

function isPrime(num) {
  if(num <= 1) return false;
  if(num <= 3) return true;
  if(num % 2 === 0 || num % 3 === 0) return false;
  let i = 5;
  for(i; i * i <= num; i += 6) {
    if(num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
}

function generatePrimes(n) {
  for(let i = 2; i <= n; i++) {
    if (isPrime(i)) primes.add(i);
  }
}

export function generateKeys() {
  generatePrimes(250);
  const p = Array.from(primes)[Math.floor(Math.random() * primes.size)];
  const q = Array.from(primes)[Math.floor(Math.random() * primes.size)];
  n = p * q;
  const phi = (p - 1) * (q - 1);

  let e = 2;
  while (e < phi) {
    if (isPrime(e) && phi % e !== 0) break;
    e++;
  }
  
  let d = 1;
  while (d < phi) {
    if ((d * e) % phi === 1) break;
    d++;
  }

  return { e, d };
}

function encrypt(message, publicKey) {
  let e = publicKey;
  let encryptedMessage = BigInt(1);
  while(e--) {
    encryptedMessage = (encryptedMessage * BigInt(message)) % BigInt(n);
  }
  return encryptedMessage;
}

function decrypt(encryptedMessage, privateKey) {
  let d = privateKey;
  let decryptedMessage = BigInt(1);
  while(d--) {
    decryptedMessage = (decryptedMessage * BigInt(encryptedMessage)) % BigInt(n);
  }
  return decryptedMessage;
}

export function encoder(message, publicKey) {
  let encodedMessage = [];
  for(let i = 0; i < message.length; i++) {
    encodedMessage.push(encrypt(message.charCodeAt(i), publicKey));
  }
  return encodedMessage;
}

export function decoder(message, privateKey) {
  let decodedMessage = '';
  for(let i = 0; i < message.length; i++) {
    decodedMessage += String.fromCharCode(Number(decrypt(message[i], privateKey)));
  }
  return decodedMessage;
}

generateKeys();
