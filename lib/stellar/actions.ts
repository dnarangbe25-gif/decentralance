import { marketplace } from "./contracts/marketplace";
import { getWalletAddress } from "./wallet";

const LANCE_TOKEN_ID = process.env.NEXT_PUBLIC_LANCE_TOKEN_ID || "";

export async function submitBid(jobId: string, amount: number, proposal: string) {
  const address = await getWalletAddress();
  if (!address) throw new Error("Wallet not connected");

  console.log(`[STELLAR] Executing submit_bid for Job: ${jobId}`);
  return await marketplace.submitBid(
    address,
    Number(jobId),
    BigInt(amount),
    proposal
  );
}

export async function acceptBid(jobId: string, freelancer: string) {
  const address = await getWalletAddress();
  if (!address) throw new Error("Wallet not connected");

  console.log(`[STELLAR] Executing accept_bid(job_id: ${jobId}, freelancer: ${freelancer})`);
  // milestoneCount is currently hardcoded to 3 for simplicity, or we could fetch it from the job
  return await marketplace.acceptBid(
    address,
    Number(jobId),
    freelancer,
    LANCE_TOKEN_ID,
    3
  );
}

export async function releaseMilestone(jobId: string, milestoneIndex: number) {
  const address = await getWalletAddress();
  if (!address) throw new Error("Wallet not connected");

  console.log(`[STELLAR] Executing complete_milestone(job_id: ${jobId}, index: ${milestoneIndex})`);
  return await marketplace.completeMilestone(
    address,
    Number(jobId),
    milestoneIndex
  );
}

export async function createJob(data: { title: string, category: string, budget: number, description: string, deadline: string }) {
  const address = await getWalletAddress();
  if (!address) throw new Error("Wallet not connected");

  console.log("[STELLAR] Executing post_job...");
  // Convert deadline string (e.g. "2024-05-01") to unix timestamp
  const deadlineUnix = Math.floor(new Date(data.deadline).getTime() / 1000);

  return await marketplace.postJob(
    address,
    data.title,
    data.description,
    BigInt(data.budget),
    deadlineUnix
  );
}
