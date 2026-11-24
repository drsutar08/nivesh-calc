// Explainer text for the sixth batch of calculators. Same rules as content.js: factual, and no figures that change (tax rates, limits, scheme rates).
module.exports = {
  "stock-return": {
    heading: "How to work out the full return on a stock",
    intro: [
      "The return on a stock comes from two sources: the change in its price and the dividends it paid while you held it. Looking only at the price leaves out part of what you earned, especially on companies that pay steady dividends.",
      "For example, 100 shares bought at ₹400 and now worth ₹560, with ₹24 a share of dividends over 3 years, give a total profit of ₹18,400, or 46%. That is an annualised return of about 13.4% a year, and the dividends make up about 13% of the gain."
    ],
    faq: [
      ["Why use the annualised return?", "It turns a total gain over several years into a yearly rate, so you can compare a stock held for 3 years with one held for 7, or with an FD rate."],
      ["Are dividends taxed?", "Yes. In India, dividends are added to your income and taxed at your slab rate. The calculator shows the return before tax."],
      ["Does this include brokerage?", "No. Brokerage and charges reduce the return a little. Use the Brokerage & Charges Calculator to estimate them."]
    ]
  },
  "futures-pl": {
    riskNote: ["SEBI's studies of individual traders in equity futures and options have repeatedly found that about 9 in 10 of them make a net loss. This calculator only shows the arithmetic of a trade. It is not a recommendation to trade.", "https://www.sebi.gov.in/sebi_data/attachdocs/aug-2026/1787236407005.pdf"],
    heading: "How profit and loss work on a futures trade",
    intro: [
      "A futures contract lets you buy or sell a fixed quantity, one lot, at today's price for settlement later. Your profit or loss is the price move multiplied by the quantity. A long position gains when the price rises, and a short position gains when it falls.",
      "Because you put up only a margin, a fraction of the contract value, futures are leveraged. For example, buying one lot of 250 at ₹2,400 controls ₹6 lakh of stock. A move to ₹2,460 makes ₹15,000, which is about a 17% return on a 15% margin of ₹90,000. The same move in the other direction loses the same amount."
    ],
    faq: [
      ["What is mark-to-market?", "Futures are settled daily. Each day's profit or loss is credited to or debited from your account, and if the balance falls below the required margin you must add funds."],
      ["Can I lose more than my margin?", "Yes. If the price moves sharply against you, losses can exceed the margin you put up, which is why a stop-loss matters."],
      ["Is futures profit taxed like share sales?", "No. Profit from futures and options is usually treated as business income, not capital gains, and taxed at your slab rate."]
    ]
  },
  stp: {
    heading: "How a systematic transfer plan works",
    intro: [
      "A systematic transfer plan (STP) parks a lump sum in a low-risk fund, usually a liquid fund, and moves a fixed amount into an equity fund every month. It spreads your entry into the market, like a SIP, while the money waiting to be invested still earns more than a savings account.",
      "For example, ₹12 lakh moved from a liquid fund into equity over 12 months, then held for a total of 5 years, could grow to about ₹21.3 lakh at the returns assumed. Investing everything in equity on day one would end slightly higher at steady returns, but an STP protects you from putting it all in just before a fall."
    ],
    faq: [
      ["How long should an STP run?", "Commonly 6 to 12 months for a large sum. A longer STP lowers timing risk further but keeps more money out of equity for longer."],
      ["Is an STP taxed?", "Each transfer is treated as a sale from the liquid fund, so tax may apply on the small gains in the liquid fund at each transfer."],
      ["Can I set up an STP between any two funds?", "Usually only between schemes of the same fund house. Choose the source and target funds when you set it up."]
    ]
  },
  "balance-transfer": {
    heading: "When a home loan balance transfer is worth it",
    intro: [
      "A balance transfer moves your outstanding home loan to a lender offering a lower rate. Even a small cut in the rate can save a large amount of interest over a long remaining tenure, but processing fees, legal and valuation charges and stamp duty can eat into the saving.",
      "For example, moving ₹40 lakh from 9.25% to 8.5% with 18 years left lowers the EMI by about ₹1,866 a month and saves about ₹4 lakh of interest. After ₹25,000 of switching costs, the net saving is about ₹3.8 lakh, and the costs are recovered in about 14 months."
    ],
    faq: [
      ["When does a balance transfer make the most sense?", "Early in the loan, when the remaining balance and tenure are large and the rate gap is meaningful. Late in the loan, most of the interest is already paid."],
      ["Can I just ask my bank to lower my rate?", "Yes. Many lenders will reduce the rate for a small conversion fee if you ask, which can be cheaper than moving to a new lender."],
      ["Will a balance transfer affect my credit score?", "The new loan involves a credit check and closing the old one, which may cause a small, temporary dip. Regular repayments rebuild it."]
    ]
  },
  "credit-card-interest": {
    heading: "Why paying only the minimum due is so expensive",
    intro: [
      "Credit card interest is charged every month on the unpaid balance, and in India GST is added on that interest. Monthly rates that look small add up to a very high yearly rate. If you pay only the minimum due, most of each payment goes to interest and the balance shrinks very slowly.",
      "For example, a ₹50,000 balance at 3.5% a month, paying only a 5% minimum due, takes over 23 years to clear and costs about ₹1.8 lakh in interest and GST. Paying a fixed ₹5,000 a month instead clears it in about 14 months."
    ],
    faq: [
      ["How do I avoid credit card interest?", "Pay the full statement balance by the due date every month. Interest is charged only when you carry a balance."],
      ["Does carrying a balance affect new purchases?", "Usually, yes. While a balance is carried, new purchases often start attracting interest from the day you make them, without the interest-free period."],
      ["What can I do if I have a large balance?", "Stop using the card, pay more than the minimum, and consider converting the balance to an EMI plan or a personal loan at a lower rate."]
    ]
  },
  "loan-interest-rate": {
    heading: "How to find the real interest rate on a loan",
    intro: [
      "Loan offers sometimes show only the EMI, or quote a flat rate that hides the real cost. If you know the loan amount, the EMI and the number of months, you can work out the reducing-balance interest rate you are actually paying.",
      "For example, a ₹10 lakh loan repaid as 60 EMIs of ₹21,247 carries an interest rate of 10% a year, with ₹2.75 lakh of interest in total. Comparing loans on this rate, rather than on the EMI alone, shows which one is really cheaper."
    ],
    faq: [
      ["Why is the effective annual rate higher?", "Interest is charged monthly, so it compounds within the year. The effective annual rate shows that cost, while lenders usually quote the simpler yearly rate."],
      ["Does this include processing fees?", "No. If you received less than the loan amount because of fees, enter the amount you actually received to see the higher real cost."],
      ["Can I use this for a car or personal loan?", "Yes. It works for any loan repaid in equal monthly instalments."]
    ]
  },
  "term-insurance": {
    heading: "How much term insurance cover do you need?",
    intro: [
      "Term insurance pays a lump sum to your family if you die during the policy term. The cover should be enough to replace the income your family relies on, pay off loans and fund goals such as children's education, after counting the savings you already have.",
      "For example, with family expenses of ₹6 lakh a year for 25 years, rising with 6% inflation and invested at 7%, plus ₹20 lakh of loans and ₹30 lakh of goals, minus ₹15 lakh of savings, the cover needed is about ₹1.7 crore."
    ],
    faq: [
      ["Is there a quick rule of thumb?", "A common shortcut is 10 to 15 times your yearly income, but a needs-based estimate like this one is more accurate because it counts your loans, goals and savings."],
      ["How long should the policy term be?", "Usually until your planned retirement age, or until your children become independent and major loans are repaid."],
      ["Should I count employer life cover?", "Count it with care. Group cover from your employer usually ends when you leave the job, so many people buy enough personal cover without relying on it."]
    ]
  },
  "emergency-fund": {
    heading: "How big should your emergency fund be?",
    intro: [
      "An emergency fund is money set aside for a job loss, a medical bill or an urgent repair, so you do not have to borrow or sell investments at a bad time. It should cover your essential expenses and fixed commitments, such as EMIs and insurance premiums, for several months.",
      "For example, with essential expenses of ₹40,000 a month and ₹15,000 of EMIs and premiums, six months of cover is ₹3.3 lakh. With ₹1 lakh already set aside and ₹10,000 added each month, it would take about 23 months to build the rest."
    ],
    faq: [
      ["Where should I keep my emergency fund?", "Somewhere safe and quick to reach, such as a savings account, a sweep-in FD or a liquid fund. Avoid equity, which can fall just when you need the money."],
      ["How many months of expenses should I keep?", "Three to six months is a common guide. Keep more if your income is irregular, you are self-employed, or one person earns for the whole family."],
      ["Should I invest before my emergency fund is ready?", "Many planners suggest building at least part of the fund first, because without it an emergency can force you to sell investments or take a costly loan."]
    ]
  }
};
