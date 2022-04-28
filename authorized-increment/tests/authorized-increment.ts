import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { AuthorizedIncrement } from "../target/types/authorized_increment";

describe("authorized-increment", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.AuthorizedIncrement as Program<AuthorizedIncrement>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.rpc.initialize({});
    console.log("Your transaction signature", tx);
  });
});
