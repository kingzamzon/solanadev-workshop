import {
  Connection,
  Keypair,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
  clusterApiUrl,
  LAMPORTS_PER_SOL
} from "@solana/web3.js";
import walletKey from "./wallet.json" assert { type: "json" };

const to = new PublicKey("4E9b2RaZFs1eKYCXriJSFwmkp4ghyXdNpapKVnTgU7B1");
const from = Keypair.fromSecretKey(new Uint8Array(walletKey));

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

console.log(to, from);
// solana is a stepper
// transaction to instruction to program
// program are executable.
// everything must be successful for it to be valid
const transfer = async () => {
  const balance = await connection.getBalance(from.publicKey);
  console.log(balance);
   
  if (balance < 0) {
    // write a function that tops the balance if it not enough

    console.log("Oga you no have money");

    // Airdrop fund
    airdropToken(from.publicKey)
  } else {
    // Look in for capitaliztion
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey: to,
        lamports: balance,
      })
    );
    transaction.feePayer = from.publicKey;
    
    const { blockhash } = await connection.getLatestBlockhash("confirmed");
    transaction.recentBlockhash = blockhash;

    const fee =
      (
        await connection.getFeeForMessage(
          transaction.compileMessage(),
          "confirmed"
        )
      ).value || 0;

    console.log(fee);

    // the first transaction is removed
    transaction.instructions.pop();

    transaction.add(
      SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey: to,
        lamports: balance * 0.1 - fee,
      })
    );

    // we add the transaction first so solana can use it
    // for the cost of the transaction
    // take your transaction as class that has properties
    const send = await sendAndConfirmTransaction(connection, transaction, [
      from,
    ]);
    console.log(send);
  }
};

transfer();


const airdropToken = async (walletAddress) => {
    const connection = new Connection(
        "https://api.devnet.solana.com",
        "confirmed"
      );

    const signature = await connection.requestAirdrop(
        walletAddress,
        LAMPORTS_PER_SOL * 0.2
      );

    const res = await connection.confirmTransaction(signature);
    console.log(res)

    transfer();
} 