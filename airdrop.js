// solana has max u can get per day 2 sol per day
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { generateKey } from "./keygen.js";

(async () => {
  const connection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed"
  );
  const address = generateKey().publicKey;
  console.log(address)
  const myAddress = new PublicKey(address);
  const signature = await connection.requestAirdrop(
    myAddress,
    LAMPORTS_PER_SOL * 0.2
  );
  console.log("signature", signature);
  const res = await connection.confirmTransaction(signature);
  console.log("res", { res });
})();
