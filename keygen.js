import { Keypair } from "@solana/web3.js"

const wallet = Keypair.generate()

console.log(wallet)

const publicKey = wallet.publicKey.toBase58();
const privateKey = wallet.secretKey

console.log(publicKey)
console.log(privateKey)

export const generateKey = () => {
    publicKey,
    privateKey
}