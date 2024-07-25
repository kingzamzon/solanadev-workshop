// solana has max u can get per day 2 sol per day
import { Connection, LAMPORT_PER_SOL } from "@solana/web3.js"
import { generateKey } from "./keygen"


(async () => {
    // const connection = new Connection('', 'confirmed')
    const myAddress = new PublicKey(generateKey.PublicKey)
    const signature = await Connection.requestAirdrop(myAddress, LAMPORT_PER_SOL * 0.3);
    // await Connection.
    
})();