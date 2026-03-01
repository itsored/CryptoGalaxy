export type EventItem = {
  id: string
  title: string
  date: string
  venue: string
  description: string
}

export type ResourceTab = "blog" | "guides" | "threads"

export type ResourceItem = {
  id: string
  title: string
  excerpt: string
  content: string
  href: string
  category: ResourceTab
  publishedOn: string
}

export type MemberSpotlight = {
  id: string
  name: string
  role: string
  bio: string
}

export type ForumReply = {
  id: string
  author: string
  message: string
  createdAt: string
}

export type ForumThread = {
  id: string
  author: string
  message: string
  createdAt: string
  replies: ForumReply[]
}

export type EventSuggestion = {
  id: string
  name: string
  email: string
  title: string
  idea: string
  preferredDate?: string
  createdAt: string
}

export type PublicEventSuggestion = Omit<EventSuggestion, "email">

export type CommunityJoin = {
  id: string
  name: string
  email: string
  interests: string
  createdAt: string
}

export type ContactMessage = {
  id: string
  name: string
  email: string
  message: string
  createdAt: string
}

export type ThreadSample = {
  id: string
  title: string
  excerpt: string
  url: string
}

export const cryptoGalaxyXHandle = "cryptogalaxy254"
export const cryptoGalaxyXUrl = `https://x.com/${cryptoGalaxyXHandle}`
export const cryptoGalaxyLumaUrl = "https://luma.com/user/cryptogalaxy254"
export const cryptoGalaxyThreadSamples: ThreadSample[] = [
  {
    id: "x-thread-1",
    title: "CryptoGalaxy Thread 1",
    excerpt: "Community update and highlights from CryptoGalaxy.",
    url: "https://x.com/cryptogalaxy254/status/1956641390537908568?s=20",
  },
  {
    id: "x-thread-2",
    title: "CryptoGalaxy Thread 2",
    excerpt: "Key thread with Web3 community insights and discussion.",
    url: "https://x.com/cryptogalaxy254/status/1950262333806174429?s=20",
  },
  {
    id: "x-thread-3",
    title: "CryptoGalaxy Thread 3",
    excerpt: "Another post featuring CryptoGalaxy activity and updates.",
    url: "https://x.com/cryptogalaxy254/status/1949202544862908832?s=20",
  },
]

export const cryptoGalaxyEvents: EventItem[] = [
  {
    id: "uon-web3-workshop",
    title: "Web3 Workshop at University of Nairobi",
    date: "2026-03-18",
    venue: "University of Nairobi",
    description: "Campus session covering wallets, on-chain basics, and safe onboarding.",
  },
  {
    id: "bitcoin-literacy-nairobi",
    title: "Bitcoin Literacy Meetup - Nairobi",
    date: "2026-04-06",
    venue: "Nairobi Garage",
    description: "Discussion on Bitcoin fundamentals, macro context, and local adoption.",
  },
  {
    id: "defi-bootcamp",
    title: "DeFi 101 Bootcamp",
    date: "2026-01-21",
    venue: "iHub Nairobi",
    description: "Practical walkthrough of decentralized finance concepts and risk management.",
  },
  {
    id: "women-in-web3-night",
    title: "Women in Web3 Community Night",
    date: "2025-12-10",
    venue: "Nairobi CBD",
    description: "Networking and mentorship for women exploring blockchain careers.",
  },
]

export const cryptoGalaxyResources: ResourceItem[] = [
  {
    id: "blog-blockchain-basics",
    category: "blog",
    title: "Intro to Blockchain Basics",
    excerpt: "A beginner-friendly breakdown of how blockchain works and why it matters.",
    content:
      "This article introduces blockchain through practical examples: blocks, validators, consensus, and transaction finality. It also covers what is useful in real life and what is hype.",
    href: "https://www.investopedia.com/terms/b/blockchain.asp",
    publishedOn: "2026-01-10",
  },
  {
    id: "blog-bitcoin-emerging",
    category: "blog",
    title: "Bitcoin in Emerging Markets",
    excerpt: "How Bitcoin adoption is shaping financial conversations across Africa.",
    content:
      "A practical look at remittances, inflation protection narratives, and the realities of mobile-first adoption in local economies.",
    href: "https://bitcoin.org/en/getting-started",
    publishedOn: "2026-01-22",
  },
  {
    id: "guide-wallet-security",
    category: "guides",
    title: "Wallet Setup and Security Checklist",
    excerpt: "Step-by-step setup guide with practical safety checks for new users.",
    content:
      "Use hardware-backed options when possible, protect recovery phrases offline, and verify addresses before sending funds. This checklist is designed for workshop onboarding.",
    href: "https://support.metamask.io/",
    publishedOn: "2026-02-01",
  },
  {
    id: "guide-web3-career",
    category: "guides",
    title: "Web3 Career Starter Guide",
    excerpt: "Skills, tools, and pathways to start a blockchain-focused career.",
    content:
      "Start with fundamentals, then choose one path: smart contracts, frontend tooling, data analytics, or community operations. Build one public project per stage.",
    href: "https://ethereum.org/en/developers/docs/",
    publishedOn: "2026-02-08",
  },
  {
    id: "thread-onchain-transactions",
    category: "threads",
    title: "Thread: Understanding On-Chain Transactions",
    excerpt: "A concise thread on how transactions move through decentralized networks.",
    content:
      "From mempool to block inclusion: this thread explains gas fees, confirmation depth, and why transaction tracking improves user confidence.",
    href: `https://x.com/search?q=from%3A${cryptoGalaxyXHandle}%20on-chain%20transactions&src=typed_query`,
    publishedOn: "2026-02-11",
  },
  {
    id: "thread-crypto-myths-kenya",
    category: "threads",
    title: "Thread: Crypto Myths in Kenya",
    excerpt: "Common misconceptions and practical clarifications for local audiences.",
    content:
      "This thread addresses risk, scams, unrealistic returns, and the difference between building with Web3 tech and speculating on tokens.",
    href: `https://x.com/search?q=from%3A${cryptoGalaxyXHandle}%20crypto%20myths%20kenya&src=typed_query`,
    publishedOn: "2026-02-16",
  },
]

export const memberSpotlights: MemberSpotlight[] = [
  {
    id: "njeri",
    name: "Njeri M.",
    role: "Student Ambassador",
    bio: "Coordinates CryptoGalaxy workshops across university blockchain clubs.",
  },
  {
    id: "otieno",
    name: "Otieno J.",
    role: "Community Educator",
    bio: "Leads beginner sessions on wallets, custody, and crypto security.",
  },
  {
    id: "faith",
    name: "Faith K.",
    role: "Web3 Builder",
    bio: "Supports hackathon teams building practical blockchain prototypes.",
  },
]

export const forumThreadsSeed: ForumThread[] = [
  {
    id: "thread-defi-safe",
    author: "Brian K.",
    message: "What is the best way for beginners to start using DeFi safely?",
    createdAt: "2026-02-01T09:00:00.000Z",
    replies: [
      {
        id: "reply-defi-1",
        author: "Amina N.",
        message: "Start with testnets and focus on wallet security before moving funds.",
        createdAt: "2026-02-01T10:20:00.000Z",
      },
      {
        id: "reply-defi-2",
        author: "CryptoGalaxy Team",
        message: "We are hosting a DeFi safety session next month. Check the events page.",
        createdAt: "2026-02-01T12:05:00.000Z",
      },
    ],
  },
  {
    id: "thread-reading-circle",
    author: "Mercy W.",
    message: "Anyone interested in a weekly Bitcoin community meetup in Nairobi?",
    createdAt: "2026-02-05T15:45:00.000Z",
    replies: [
      {
        id: "reply-reading-1",
        author: "Otieno J.",
        message: "Yes. We can coordinate dates in the Telegram community.",
        createdAt: "2026-02-05T17:00:00.000Z",
      },
    ],
  },
]
