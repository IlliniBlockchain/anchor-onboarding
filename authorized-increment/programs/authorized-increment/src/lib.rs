use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
mod counter {
    use super::*;

    /// All that needs to go here is setting the initial
    /// fields of the counter struct
    pub fn initialize(ctx: Context<Initialize>, start: u64) -> Result<()> {
        Ok(())
    }

    /// All that needs to go here is incrementing the
    /// count field of the counter struct by 1
    pub fn increment(ctx: Context<Increment>) -> Result<()> {
        Ok(())
    }
}

/// Need to initialize the counter account (needs to know
/// 1. to init
/// 2. who pays for the rent
/// 3. how much space to allocate - there's something tricky here)
///
/// If you wanna get fruity, implement this
/// as a PDA (I won't write tests for this tho)
///
/// Note: signers/fee payers must always be mutable
#[derive(Accounts)]
pub struct Initialize<'info> {
    pub counter: Account<'info, Counter>,
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

/// Need to make sure counter is mutable, and
/// check that the passed in authority/signer account
/// is the authority that is allowed to write to counter
#[derive(Accounts)]
pub struct Increment<'info> {
    pub counter: Account<'info, Counter>,
    pub authority: Signer<'info>,
}

#[account]
pub struct Counter {
    pub authority: Pubkey,
    pub count: u64,
}
