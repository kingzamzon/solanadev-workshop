import { Connection, Keypair, PublicKey } from "@solana/web3.js"
import walletKey from "./wallet.json" assert {type: "json"}


const to = new PublicKey("4E9b2RaZFs1eKYCXriJSFwmkp4ghyXdNpapKVnTgU7B1")
const from = Keypair.fromSecretKey(new Uint8Array(walletKey))


console.log(to, from)
// solana is a stepper
// transaction to instruction to program
// program are executable. 