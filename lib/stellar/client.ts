import { 
  rpc, 
  Transaction
} from "@stellar/stellar-sdk";

const SOROBAN_RPC_URL = "https://soroban-testnet.stellar.org";
const NETWORK_PASSPHRASE = "Test SDF Network ; September 2015";

export class StellarClient {
  public server: rpc.Server;

  constructor() {
    this.server = new rpc.Server(SOROBAN_RPC_URL);
  }

  /**
   * Retrieves account details for a given address.
   */
  async getAccount(address: string) {
    try {
      return await this.server.getAccount(address);
    } catch (err) {
      throw new Error(`Failed to fetch account ${address}: ${err}`);
    }
  }

  /**
   * Submits a signed transaction and polls for finality.
   */
  async submitTransaction(tx: Transaction): Promise<rpc.Api.GetTransactionResponse> {
    const response = await this.server.sendTransaction(tx);

    if (response.status !== "PENDING") {
      return await this.server.getTransaction(response.hash);
    }

    // Polling logic for pending transactions
    const maxAttempts = 15; // 30 seconds total
    let attempts = 0;

    while (attempts < maxAttempts) {
      const txResponse = await this.server.getTransaction(response.hash);
      
      if (txResponse.status === "SUCCESS" || txResponse.status === "FAILED") {
        return txResponse;
      }

      // Wait 2 seconds before next poll
      await new Promise(resolve => setTimeout(resolve, 2000));
      attempts++;
    }

    throw new Error("Transaction submission timed out.");
  }
}

export const stellarClient = new StellarClient();
export { NETWORK_PASSPHRASE };
