export type WorkCard = {
  step: number;
  icon: string;
  text: string;
};

export const workCards: WorkCard[] = [
  { icon: "lar la-user", step: 1, text: "Create account" },
  { icon: "las la-clipboard-list", step: 2, text: "Invest To Plan" },
  { icon: "las la-wallet", step: 3, text: "Get Profit" },
  // 👇 paste your existing cards here
  // { step: 1, icon: "..." }, ...
];
export interface Plan {
  title: string;
  price: string;
  features: string[];
  backgroundImage: string;
}

const priceCardImg =
  "https://script.viserlab.com/hyiplab/demo/assets/templates/bit_gold//images/bg/bg-4.png";

export const plans: Plan[] = [
  {
    title: "Slivesto",
    price: "$200",
    features: [
      "Return 6.00%",
      "Every Hour",
      "For 5 Hour",
      "Total 30% + Capital",
      "Compound interest available",
      "Hold capital & reinvest",
    ],
    backgroundImage: priceCardImg,
  },
  {
    title: "Platinum",
    price: "$100 - $5,000",
    features: [
      "Return 6.00 USD",
      "Every Day",
      "For 7 Day",
      "Total 42 USD + Capital",
    ],
    backgroundImage: priceCardImg,
  },
  {
    title: "Gold",
    price: "$200",
    features: [
      "Return 2.00 USD",
      "Every Week",
      "For 5 Week",
      "Total 10 USD + Capital",
      "Hold capital & reinvest",
    ],
    backgroundImage: priceCardImg,
  },
  {
    title: "Life Time",
    price: "$100 - $500",
    features: [
      "Return 0.20%",
      "Every Month",
      "For Lifetime",
      "Lifetime Earning",
      "Compound interest available",
    ],
    backgroundImage: priceCardImg,
  },
  {
    title: "Black Horse",
    price: "$500 - $5,000",
    features: ["Return 5.00%", "Every Year", "For 40 Year", "Total 200%"],
    backgroundImage: priceCardImg,
  },
  {
    title: "Silver",
    price: "$500",
    features: ["Return 5.00%", "Every Hour", "For 25 Hour", "Total 125%"],
    backgroundImage: priceCardImg,
  },
  {
    title: "Crown",
    price: "$200 - $5,000",
    features: [
      "Return 3.50%",
      "Every Day",
      "For Lifetime",
      "Lifetime Earning",
      "Compound interest available",
    ],
    backgroundImage: priceCardImg,
  },
  {
    title: "Elephant",
    price: "$500 - $1,000",
    features: [
      "Return 1.10 USD",
      "Every Week",
      "For 50 Week",
      "Total 55 USD + Capital",
    ],
    backgroundImage: priceCardImg,
  },
  {
    title: "Cobra",
    price: "$1,000",
    features: [
      "Return 10.00 USD",
      "Every Month",
      "For 150 Month",
      "Total 1500 USD + Capital",
    ],
    backgroundImage: priceCardImg,
  },
];
