export interface Job {
  id: string;
  title: string;
  client: string;
  budget: number;
  deadline: string;
  category: string;
  reputation: number;
  description: string;
  postedDate: string;
  status: "Open" | "In Progress" | "Completed" | "Disputed";
  bidCount: number;
}

export const MOCK_JOBS: Job[] = [
  {
    id: "1",
    title: "Senior Soroban Smart Contract Dev",
    client: "GBH7...4X3Z",
    budget: 15000,
    deadline: "4d 12h",
    category: "Dev",
    reputation: 98,
    postedDate: "2h ago",
    status: "Open",
    bidCount: 8,
    description: "Build a custom escrow logic for our upcoming NFT marketplace on Stellar."
  },
  {
    id: "2",
    title: "Web3 Brand Design & UI Kit",
    client: "GD2S...P9L1",
    budget: 4500,
    deadline: "1w 2d",
    category: "Design",
    reputation: 95,
    postedDate: "5h ago",
    status: "Open",
    bidCount: 3,
    description: "Create a modern cosmic-themed design system for a decentralized finance dashboard."
  },
  {
    id: "3",
    title: "Technical Writer for SDK Docs",
    client: "GA6T...K5M2",
    budget: 2000,
    deadline: "3d",
    category: "Writing",
    reputation: 99,
    postedDate: "1d ago",
    status: "Open",
    bidCount: 12,
    description: "Write clear, concise documentation for a new Soroban-based cross-chain bridge SDK."
  },
  {
    id: "4",
    title: "Smart Contract Security Auditor",
    client: "GC3L...R9P0",
    budget: 25000,
    deadline: "2w",
    category: "Dev",
    reputation: 100,
    postedDate: "3h ago",
    status: "Open",
    bidCount: 5,
    description: "Perform a deep-dive security audit on a set of DeFi lending protocols."
  }
];
