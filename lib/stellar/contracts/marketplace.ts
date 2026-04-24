import { 
  Contract, 
  TransactionBuilder, 
  Address,
  xdr,
  scValToNative,
  nativeToScVal
} from "@stellar/stellar-sdk";
import { stellarClient, NETWORK_PASSPHRASE } from "../client";
import { signTx } from "../wallet";

const MARKETPLACE_CONTRACT_ID = process.env.NEXT_PUBLIC_MARKETPLACE_ID || "";

export interface JobState {
  id: string;
  client: string;
  title: string;
  budget: number;
  status: string;
}

export class MarketplaceContract {
  private contract: Contract;

  constructor() {
    this.contract = new Contract(MARKETPLACE_CONTRACT_ID);
  }

  /**
   * Helper to build and sign a contract invocation.
   */
  private async invoke(functionName: string, args: any[] = []) {
    const address = await Address.fromString(args[0]?.toString() || ""); // Mock first arg as source
    const account = await stellarClient.getAccount(address.toString());

    const tx = new TransactionBuilder(account, {
      fee: "1000",
      networkPassphrase: NETWORK_PASSPHRASE,
    })
      .addOperation(this.contract.call(functionName, ...args))
      .setTimeout(30)
      .build();

    const signedXdr = await signTx(tx.toXDR());
    const signedTx = TransactionBuilder.fromXDR(signedXdr, NETWORK_PASSPHRASE);
    
    return await stellarClient.submitTransaction(signedTx as any);
  }

  async postJob(title: string, description: string, budget: bigint) {
    return await this.invoke("post_job", [
      nativeToScVal(title),
      nativeToScVal(description),
      nativeToScVal(budget, { type: "i128" })
    ]);
  }

  async submitBid(jobId: bigint, amount: bigint, proposal: string) {
    return await this.invoke("submit_bid", [
      nativeToScVal(jobId, { type: "u64" }),
      nativeToScVal(amount, { type: "i128" }),
      nativeToScVal(proposal)
    ]);
  }

  async acceptBid(jobId: bigint, freelancer: string) {
    return await this.invoke("accept_bid", [
      nativeToScVal(jobId, { type: "u64" }),
      Address.fromString(freelancer).toScVal()
    ]);
  }

  async completeMilestone(jobId: bigint, milestoneIndex: number) {
    return await this.invoke("complete_milestone", [
      nativeToScVal(jobId, { type: "u64" }),
      nativeToScVal(milestoneIndex, { type: "u32" })
    ]);
  }

  async getJob(jobId: bigint): Promise<JobState | null> {
    const result = await stellarClient.server.getEvents({
      startLedger: 0,
      filters: [{
        contractIds: [MARKETPLACE_CONTRACT_ID],
        topics: [["get_job", jobId.toString()]]
      }]
    });
    // Simplified parsing logic
    return result.events[0] ? scValToNative(result.events[0].value as any) : null;
  }
}

export const marketplace = new MarketplaceContract();
