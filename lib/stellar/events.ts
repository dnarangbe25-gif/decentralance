import { stellarClient } from "./client";
import { scValToNative } from "@stellar/stellar-sdk";

const MARKETPLACE_CONTRACT_ID = process.env.NEXT_PUBLIC_MARKETPLACE_ID || "";

export interface ContractEvent {
  id: string;
  topic: string[];
  value: any;
  ledger: number;
}

/**
 * Streams events from the Soroban RPC by polling.
 * @param {string} topic Topic to filter events.
 * @param {Function} callback Function to call when new events are found.
 * @returns {Function} Cleanup function to stop polling.
 */
export function streamContractEvents(
  contractId: string,
  topic: string,
  callback: (event: ContractEvent) => void
) {
  let isRunning = true;
  let lastLedger = 0;

  async function poll() {
    if (!isRunning) return;

    try {
      const response = await stellarClient.server.getEvents({
        startLedger: lastLedger,
        filters: [{
          contractIds: [contractId],
          topics: [[topic]]
        }]
      });

      for (const event of response.events) {
        callback({
          id: event.id,
          topic: event.topic as any,
          value: scValToNative(event.value as any),
          ledger: event.ledger
        });
        lastLedger = Math.max(lastLedger, event.ledger + 1);
      }
    } catch (err) {
      console.error("Event polling error:", err);
    }

    if (isRunning) {
      setTimeout(poll, 3000); // Poll every 3 seconds
    }
  }

  poll();

  return () => {
    isRunning = false;
  };
}

export function streamJobEvents(jobId: string, callback: (event: ContractEvent) => void) {
  return streamContractEvents(MARKETPLACE_CONTRACT_ID, `job_${jobId}`, callback);
}

export function streamUserEvents(address: string, callback: (event: ContractEvent) => void) {
  return streamContractEvents(MARKETPLACE_CONTRACT_ID, address, callback);
}
