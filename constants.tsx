import { Friend, Transaction } from "./types";

export const LEADERBOARD_USERS = [
  {
    id: '1',
    name: "Chad_Thunder",
    handle: "@giga_chad",
    netWorth: 52000,
    rank: 1,
    reward: "10,000 V-Bucks",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chad&hairColor=Blonde&topType=ShortHairTheCaesarSidePart"
  },
  {
    id: '2',
    name: "Crypto_Kyle",
    handle: "@wagmi_kyle",
    netWorth: 12000,
    rank: 2,
    reward: null,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kyle&accessories=Sunglasses"
  },
  {
    id: '3',
    name: "Finance_Bro_88",
    handle: "@wallstreet_bets",
    netWorth: 8500,
    rank: 3,
    reward: null,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
  },
  {
    id: '4',
    name: "Karen_Smith",
    handle: "@live_laugh_love",
    netWorth: -1200,
    rank: 45,
    reward: null,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Karen&topType=LongHairBob"
  },
  {
    id: '5',
    name: "Shanon_123",
    handle: "@shanon_beads",
    netWorth: -4500,
    rank: 99,
    reward: "Eviction Notice",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Shanon&topType=LongHairStraight&accessories=Round"
  }
];

// Keeping old types for compatibility if needed, but we'll use the new structure above
export const MOCK_FRIENDS: Friend[] = LEADERBOARD_USERS.map(u => ({
  id: u.id,
  name: u.name,
  spent: u.netWorth, // mapping netWorth to spent for type compatibility
  rank: u.rank,
  status: u.reward || "",
  avatar: u.avatar
}));

export const RECENT_TRANSACTIONS: Transaction[] = [
  { id: 't1', merchant: 'OnlyFans', amount: 49.99, category: 'Simping', date: 'Today' },
  { id: 't2', merchant: 'Pop Mart (Labubu)', amount: 450.00, category: 'Toys', date: 'Today' },
  { id: 't3', merchant: 'Riot Games (RP)', amount: 200.00, category: 'Gaming', date: 'Yesterday' },
  { id: 't4', merchant: 'BMW Financial', amount: 1250.00, category: 'Debt', date: 'Yesterday' },
  { id: 't5', merchant: 'Uber Eats (3AM)', amount: 65.50, category: 'Gluttony', date: 'Yesterday' },
  { id: 't6', merchant: 'Cryptorug.com', amount: 3000.00, category: 'Gambling', date: '2 days ago' },
  { id: 't7', merchant: 'Balenciaga', amount: 950.00, category: 'Drip', date: '3 days ago' },
];

export const TESTIMONIALS = [
  {
    name: "Elon M.",
    role: "Technoking",
    text: "Spendr's AI realized I could save 4 billion by simply firing everyone. Best advice ever. 🚀"
  },
  {
    name: "Caroline E.",
    role: "Former CEO",
    text: "The 'YOLO Mode' in the Enterprise suite really helped me leverage user funds efficiently. Highly recommend!"
  },
  {
    name: "Jordan B.",
    role: "Sales Wolf",
    text: "I wasn't sure if I could afford the yacht. Spendr just auto-approved the loan and blocked my wife's number. 10/10."
  }
];