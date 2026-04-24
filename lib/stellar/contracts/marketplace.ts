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
  private contract: Contract | null = null;

  constructor() {
    if (MARKETPLACE_CONTRACT_ID) {
      this.contract = new Contract(MARKETPLACE_CONTRACT_ID);
    }
  }

  private getContract() {
    if (!this.contract) {
      if (!MARKETPLACE_CONTRACT_ID) {
        throw new Error("Marketplace Contract ID not configured. Please set NEXT_PUBLIC_MARKETPLACE_ID in your environment.");
      }
      this.contract = new Contract(MARKETPLACE_CONTRACT_ID);
    }
    return this.contract;
  }

  /**
   * Helper to build and sign a contract invocation.
   */
  private async invoke(sourceAddress: string, functionName: string, args: any[] = []) {
    if (!MARKETPLACE_CONTRACT_ID) {
      throw new Error("Marketplace Contract ID not configured");
    }

    const account = await stellarClient.getAccount(sourceAddress);

    const tx = new TransactionBuilder(account, {
      fee: "1000",
      networkPassphrase: NETWORK_PASSPHRASE,
    })
      .addOperation(this.getContract().call(functionName, ...args))
      .setTimeout(60)
      .build();

    const signedXdr = await signTx(tx.toXDR());
    const signedTx = TransactionBuilder.fromXDR(signedXdr, NETWORK_PASSPHRASE);
    
    const result = await stellarClient.submitTransaction(signedTx as any);
    return result;
  }

  async postJob(client: string, title: string, description: string, budget: bigint, deadline: number) {
    return await this.invoke(client, "post_job", [
      Address.fromString(client).toScVal(),
      nativeToScVal(title),
      nativeToScVal(description),
      nativeToScVal(budget, { type: "i128" }),
      nativeToScVal(deadline, { type: "u64" })
    ]);
  }

  async submitBid(freelancer: string, jobId: number, amount: bigint, proposal: string) {
    return await this.invoke(freelancer, "submit_bid", [
      Address.fromString(freelancer).toScVal(),
      nativeToScVal(jobId, { type: "u64" }),
      nativeToScVal(amount, { type: "i128" }),
      nativeToScVal(proposal)
    ]);
  }

  async acceptBid(client: string, jobId: number, freelancer: string, token: string, milestoneCount: number) {
    return await this.invoke(client, "accept_bid", [
      nativeToScVal(jobId, { type: "u64" }),
      Address.fromString(freelancer).toScVal(),
      Address.fromString(token).toScVal(),
      nativeToScVal(milestoneCount, { type: "u32" })
    ]);
  }

  async completeMilestone(client: string, jobId: number, milestoneIndex: number) {
    return await this.invoke(client, "complete_milestone", [
      nativeToScVal(jobId, { type: "u64" }),
      nativeToScVal(milestoneIndex, { type: "u32" })
    ]);
  }

  async getJob(jobId: bigint): Promise<JobState | null> {
    if (!MARKETPLACE_CONTRACT_ID) return null;
    
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
