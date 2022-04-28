import * as anchor from "@project-serum/anchor";
import { Program, web3, Provider } from "@project-serum/anchor";
import { AuthorizedIncrement } from "../target/types/authorized_increment";
import { expect } from "chai";

async function createWallet(
  provider: Provider,
  lamports: number
): Promise<web3.Keypair> {
  const wallet = web3.Keypair.generate();
  const fundTx = new web3.Transaction().add(
    web3.SystemProgram.transfer({
      fromPubkey: provider.wallet.publicKey,
      toPubkey: wallet.publicKey,
      lamports,
    })
  );

  const response = await provider.send(fundTx);
  return wallet;
}

describe("authorized-increment", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace
    .AuthorizedIncrement as Program<AuthorizedIncrement>;

  let authority: web3.Keypair;
  let counter: web3.Keypair;

  before(async () => {
    authority = await createWallet(program.provider, 2 * 10 ** 6);
    counter = new web3.Keypair();
  });

  it("Is initialized!", async () => {
    const start = 3;

    // Add your test here.
    const tx = await program.rpc.initialize(new anchor.BN(start), {
      accounts: {
        counter: counter.publicKey,
        authority: authority.publicKey,
        systemProgram: web3.SystemProgram.programId,
      },
      signers: [counter, authority],
    });
    console.log("Your transaction signature", tx);
  });
});
