// More explainer text for build.js. Same rules as content.js: factual, and no figures that change (tax rates, charges).
module.exports = {
  split: {
    heading: "What happens to your shares in a stock split",
    intro: [
      "In a stock split, a company divides each share into several shares of a lower face value. The number of shares you hold goes up and the price per share goes down by the same factor, so the total value of your holding does not change at the moment of the split.",
      "For example, if you hold 40 shares with an average buy price of ₹2,400 and the face value goes from ₹10 to ₹2, the split ratio is 1 : 5. You then hold 200 shares at an adjusted average of ₹480. Your total investment is still ₹96,000."
    ],
    faq: [
      ["Does a stock split change the value of my investment?", "No. You get more shares at a proportionally lower price, so the total value is the same. Any later change in value comes from the market, not from the split."],
      ["How is the split ratio worked out?", "Divide the old face value by the new face value. A move from ₹10 to ₹2 gives a ratio of 5, meaning each share becomes five."],
      ["Why does my average buy price change?", "Your total cost stays the same but is now spread over more shares, so the average price per share falls by the split ratio."]
    ]
  },
  bonus: {
    heading: "How bonus shares affect your holding and cost",
    intro: [
      "Bonus shares are extra shares a company gives to existing shareholders at no charge, in a stated ratio such as 1 for every 2 held. Your total investment stays the same, but it is now spread over more shares, so your average cost per share goes down.",
      "For example, with 75 shares at an average of ₹860 and a 1 : 2 bonus, you receive 37 bonus shares (37.5 rounded down) and hold 112. Your average becomes about ₹575.89. Fractional entitlements are usually not credited, which is why the calculator rounds down."
    ],
    faq: [
      ["Do I pay anything for bonus shares?", "No. They are issued free from the company's reserves in proportion to the shares you already hold."],
      ["Does a bonus issue make me richer?", "Not directly. The share price adjusts after the bonus, so the total value of your holding stays about the same at that moment."],
      ["What happens to the fractional part?", "Companies usually round down and do not credit a fraction of a share. The calculator shows how much was dropped."]
    ]
  },
  dividend: {
    heading: "Understanding dividend income and yield",
    intro: [
      "A dividend is a share of a company's profit paid to its shareholders. Your dividend income is the number of shares you hold multiplied by the dividend per share. Dividends you receive are added to your income and taxed at your slab rate.",
      "With the example values, 200 shares paying ₹12 each give a gross dividend of ₹2,400. At a 30% tax rate, ₹720 goes in tax and you keep ₹1,680. The calculator also shows two yields: against today's price and against what you originally paid, which is called the yield on cost."
    ],
    faq: [
      ["What is dividend yield?", "It is the yearly dividend per share divided by the share price, shown as a percentage. It tells you the income return on the amount you put in."],
      ["What is yield on cost?", "It is the dividend per share divided by your average buy price. It can be higher than the current yield if the price has risen since you bought."],
      ["Is dividend income taxed?", "Yes, it is added to your income. Enter your own tax rate in the calculator. Rules can change, so check the current ones."]
    ]
  },
  buyback: {
    heading: "How a share buyback works for you",
    intro: [
      "In a buyback, a company offers to buy shares back from its shareholders, often at a price above the market price. If you tender your shares, only part may be accepted. The acceptance ratio is the share of your tendered shares that the company actually takes.",
      "With the example values, you hold 500 shares at an average of ₹1,400, the buyback price is ₹1,800 and 30% are accepted. That is 150 shares for ₹2,70,000, a gain of ₹60,000 on those shares, and you keep the other 350."
    ],
    faq: [
      ["What is an acceptance ratio?", "It is the portion of the shares you tender that the company accepts. A ratio of 30% means 30 out of every 100 shares you tender are bought."],
      ["Do I lose the shares that are not accepted?", "No. Shares that are not accepted stay in your account."],
      ["How is a buyback taxed?", "The tax treatment has changed over time and depends on the holder, so check the current rules or ask a tax professional. This calculator does not include tax."]
    ]
  },
  demerger: {
    heading: "How a demerger splits your cost",
    intro: [
      "In a demerger, a company separates one of its businesses into a new company, and shareholders receive shares of that new company. Your total cost does not change. It is divided between the parent shares and the new shares, in the proportion announced in the demerger scheme.",
      "For example, if you hold 100 shares at an average of ₹1,000 (a total cost of ₹1,00,000), receive 1 new share for each share held and 20% of the cost is attributed to the demerged business, your parent shares are worth ₹800 each at cost and your new shares ₹200 each."
    ],
    faq: [
      ["Where do I find the cost split percentage?", "It is stated in the demerger scheme or the company's announcement. Use that figure, not an estimate."],
      ["Does a demerger change my total investment?", "No. The total cost stays the same. It is only divided between the two companies' shares."],
      ["Why do I need the new average prices?", "You will need them to work out profit or loss when you sell either set of shares later."]
    ]
  },
  "position-size": {
    heading: "Sizing a trade by the risk you can afford",
    intro: [
      "Position sizing decides how many shares to buy so that a losing trade costs you only a set part of your capital. You pick the percentage of capital you are willing to lose on one trade, then work back from your entry and stop-loss prices to the number of shares.",
      "With the example values, risking 1% of ₹5,00,000 means ₹5,000 at risk. With an entry of ₹250 and a stop-loss of ₹240, each share risks ₹10, so you can buy 500 shares. At a target of ₹280, the reward is three times the risk."
    ],
    faq: [
      ["How do I calculate position size?", "Divide the money you are willing to risk by the gap between your entry price and your stop-loss price. The calculator also caps it at what your capital can buy."],
      ["What risk per trade is sensible?", "Many traders keep it to a small percentage of capital, such as 1% or 2%. The right figure depends on your own tolerance and strategy."],
      ["What is a risk : reward ratio?", "It compares what you could gain to what you could lose. A ratio of 1 : 3 means the potential profit is three times the potential loss."]
    ]
  },
  retirement: {
    heading: "Estimating the corpus you need to retire",
    intro: [
      "Your retirement corpus has to fund your expenses for many years, and those expenses rise with inflation. The calculator raises today's monthly expenses to the level they will reach when you retire, then works out the sum you need at that point to pay for them until the age you plan to.",
      "With the example values, a 30-year-old spending ₹50,000 a month, retiring at 60 and planning to 85, needs about ₹6.95 crore at retirement, assuming 6% inflation. With ₹5 lakh already saved and a 12% return before retirement, the monthly SIP needed is about ₹14,588."
    ],
    faq: [
      ["How much do I need to retire?", "It depends on your expenses, inflation, the age you retire, how long you plan for and the return on your money. Change each input to see how the corpus moves."],
      ["Why are monthly expenses so much higher at retirement?", "Because of inflation compounding over the years. ₹50,000 today becomes about ₹2.87 lakh a month in 30 years at 6% inflation."],
      ["What return should I use after retirement?", "Use a cautious figure, since most people move to lower-risk investments. A lower return means a bigger corpus is needed."]
    ]
  },
  rd: {
    heading: "How a recurring deposit grows",
    intro: [
      "A recurring deposit (RD) lets you save a fixed amount every month at an interest rate set when you open it. Banks usually compound RD interest quarterly. Each monthly deposit earns interest for a different length of time, so the early deposits earn the most.",
      "With the example values, ₹10,000 a month for 5 years at 6.5% grows to about ₹7,09,908. You deposit ₹6,00,000 yourself and the rest, about ₹1,09,908, is interest."
    ],
    faq: [
      ["How is RD maturity calculated?", "Each monthly deposit is compounded quarterly for the months it stays in the account. The maturity value is the total of all deposits with their interest."],
      ["How is an RD different from a SIP?", "An RD pays a fixed rate and carries little market risk. A SIP in a market-linked fund can earn more or less, with no fixed return."],
      ["Is RD interest taxable?", "Yes, it is added to your income and taxed at your slab rate. This calculator shows the figure before tax."]
    ]
  },
  inflation: {
    heading: "How inflation reduces what your money buys",
    intro: [
      "Inflation is the rise in prices over time. The same amount of money buys less each year, so money kept idle slowly loses value. The calculator shows both sides of this: what the same things will cost in the future, and what your money today will be worth in future buying power.",
      "With the example values, ₹1,00,000 today will need to be about ₹1,79,085 to buy the same things in 10 years at 6% inflation. Looked at the other way, ₹1,00,000 will buy only about ₹55,839 worth of today's goods, a fall of about 44% in buying power."
    ],
    faq: [
      ["How do I calculate the future cost of something?", "Multiply today's cost by (1 + inflation rate) raised to the number of years."],
      ["Why does inflation matter for investing?", "Your investments need to grow faster than inflation for your money to gain real value. A return below inflation loses buying power."],
      ["What inflation rate should I use?", "Use a figure that reflects what you are planning for. Education and healthcare costs often rise faster than general inflation."]
    ]
  },
  "rule-of-72": {
    heading: "What the Rule of 72 tells you",
    intro: [
      "The Rule of 72 is a quick way to estimate how long it takes an investment to double. Divide 72 by the annual return as a percentage and you get the approximate number of years. It works because of how compound growth behaves, and it needs no calculator.",
      "At a 9% annual return, 72 ÷ 9 gives 8 years. The exact figure is about 8.04 years, so the shortcut is very close. It is most accurate for returns of roughly 6% to 10%. The calculator also shows the Rule of 114 for tripling and the Rule of 144 for growing four times."
    ],
    faq: [
      ["How do I use the Rule of 72?", "Divide 72 by your expected yearly return. At 12%, 72 ÷ 12 gives about 6 years to double."],
      ["How accurate is the Rule of 72?", "It is a close estimate for returns of about 6% to 10% and less exact outside that range. The calculator also shows the exact figure."],
      ["Can I use it for inflation?", "Yes. At 6% inflation, prices double in about 12 years, so money loses half its buying power in that time."]
    ]
  },
  percentage: {
    heading: "Three percentage questions, solved together",
    intro: [
      "Percentages come up when you work out discounts, returns, brokerage and tax. This calculator answers the three most common questions from two numbers: what A% of B is, what percentage A is of B, and how much a value changed when it moved from A to B.",
      "With the example values, 25% of 480 is 120, 25 is about 5.21% of 480, and a move from 25 to 480 is an increase of 1,820%. Change the two values to see all three results update together."
    ],
    faq: [
      ["How do I find a percentage of a number?", "Multiply the number by the percentage and divide by 100. For example, 25% of 480 is 25 × 480 ÷ 100 = 120."],
      ["How do I calculate percentage change?", "Subtract the old value from the new value, divide by the old value, and multiply by 100."],
      ["What is the difference between percentage and percentage points?", "If a rate goes from 5% to 7%, it rose by 2 percentage points, which is a 40% increase in the rate itself."]
    ]
  }
};
