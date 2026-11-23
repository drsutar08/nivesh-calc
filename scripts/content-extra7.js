// Explainer text for the eighth batch of calculators. Same rules as content.js: factual, and no figures that change (tax rates, limits, scheme rates).
module.exports = {
  "loss-recovery": {
    heading: "Why losses need bigger gains to recover",
    intro: [
      "A loss and the gain needed to recover from it are not the same size. After a fall, you are starting from a smaller amount, so the percentage gain needed to get back to where you started is always larger than the percentage you lost.",
      "For example, a stock bought at ₹1,000 that falls to ₹600 has lost 40%, but it needs to rise 66.7% to get back to ₹1,000. At an assumed 12% a year, that takes about 4.5 years. A 50% loss needs a 100% gain."
    ],
    faq: [
      ["Why is the gain needed bigger than the loss?", "Because the gain is measured on the smaller, fallen price. A ₹400 rise from ₹600 is 66.7%, even though a ₹400 fall from ₹1,000 was 40%."],
      ["Should I hold a losing stock until it recovers?", "Decide on the business, not on your buy price. If the reasons you bought no longer hold, the money may recover faster in a better investment."],
      ["How can I limit large losses?", "Diversify across stocks and asset types, size positions sensibly and use a stop-loss for trades. The Position Size & Risk Calculator helps plan this."]
    ]
  },
  roe: {
    heading: "What ROE and DuPont analysis reveal",
    intro: [
      "Return on equity (ROE) measures how much profit a company earns on the money its shareholders have put in. A consistently high ROE is often a sign of a strong business, but it matters how that ROE is produced.",
      "DuPont analysis splits ROE into three parts: profit margin, asset turnover and the equity multiplier, which reflects borrowing. For example, a company with ₹120 crore of profit on ₹1,000 crore of revenue, ₹1,500 crore of assets and ₹800 crore of equity has an ROE of 15%, made up of a 12% margin, 0.67× turnover and a 1.88× equity multiplier."
    ],
    faq: [
      ["What is a good ROE?", "It depends on the industry, but many investors look for a steady ROE above the company's cost of capital over several years, rather than a single high year."],
      ["Can a high ROE be a warning sign?", "Yes. Heavy borrowing raises the equity multiplier and lifts ROE while adding risk. A very small equity base, for example after losses or large buybacks, can also inflate it."],
      ["Where do I find these figures?", "In the company's annual report or on financial websites: net profit and revenue from the profit and loss statement, and total assets and shareholders' equity from the balance sheet."]
    ]
  },
  "sip-time": {
    heading: "How long will it take to reach your goal with a SIP?",
    intro: [
      "Instead of asking how much a SIP will grow to, this calculator turns the question around: given a target amount and a monthly SIP, how long will it take to get there?",
      "For example, ₹20,000 a month at an assumed 12% a year reaches ₹50 lakh in about 10 years and 6 months. About half of the final amount is your own money, and the rest is growth."
    ],
    faq: [
      ["How can I reach my goal sooner?", "Raise the SIP, add a lump sum at the start, or increase the SIP every year with a step-up. Even small increases shorten the time noticeably."],
      ["Should I account for inflation in the target?", "Yes, if the goal is years away. Enter the amount you will need in future rupees. The Inflation Calculator can convert today's cost."],
      ["What return should I assume?", "Use a cautious figure that suits the funds you invest in, and try a few values to see the range of outcomes."]
    ]
  },
  "child-education": {
    heading: "Planning for your child's education costs",
    intro: [
      "Education costs in India have tended to rise faster than general inflation, so a course that costs ₹20 lakh today could cost far more by the time your child is ready. Planning early lets compounding do most of the work.",
      "For example, a ₹20 lakh course starting in 12 years, with costs rising 8% a year, could cost about ₹50 lakh. If ₹2 lakh already saved grows at 11%, you would still need about ₹43 lakh, which works out to a SIP of about ₹14,500 a month, or a lump sum of about ₹12.4 lakh today."
    ],
    faq: [
      ["What education inflation should I assume?", "Many planners use a figure above general inflation, as fees for higher education have risen quickly. Try a range to see how sensitive the plan is."],
      ["Where should I invest for an education goal?", "For goals more than 7 to 10 years away, many families use equity funds and shift gradually to safer options as the goal gets closer."],
      ["Should I plan for studying abroad differently?", "Yes. Foreign education costs also depend on exchange rates, so plan with the cost in that currency and allow for the rupee weakening over time."]
    ]
  },
  "home-affordability": {
    heading: "How much home can you afford?",
    intro: [
      "Two things limit the price of a home you can buy: the loan your income can support, and the savings you have for the down payment and buying costs. Lenders cap EMIs at a share of your income and lend only up to a share of the property's value, so your savings often decide the price.",
      "For example, with ₹1.5 lakh of net monthly income, ₹20 lakh of savings, an 8.5% loan over 20 years and an 80% loan-to-value limit, you could afford a home of about ₹74 lakh. Here savings are the limit, since the income could support a larger loan."
    ],
    faq: [
      ["Why do buying costs matter so much?", "Stamp duty, registration and other charges are paid in cash on top of the down payment and usually cannot be added to the loan, so they reduce what your savings can cover."],
      ["Should I borrow the maximum I can?", "Not necessarily. Leave room for savings, insurance, emergencies and rising expenses. Many people keep the home loan EMI well below the lender's limit."],
      ["What is loan-to-value (LTV)?", "LTV is the loan as a share of the property's value. RBI sets the maximum LTV for home loans, with lower limits for larger loans."]
    ]
  },
  sgb: {
    heading: "How a Sovereign Gold Bond earns you money",
    intro: [
      "Sovereign Gold Bonds are government securities priced in grams of gold. Their value moves with the price of gold, and they also pay interest every six months on the original issue price, which physical gold and gold funds do not.",
      "For example, 10 grams bought at ₹5,000 a gram cost ₹50,000. If gold is ₹7,500 a gram at redemption after 8 years, the bonds are worth ₹75,000, and 2.5% interest a year adds ₹10,000, a total return of ₹35,000, or about 6.9% a year."
    ],
    faq: [
      ["Is SGB interest taxable?", "Yes. The interest is added to your income and taxed at your slab rate."],
      ["Can I sell a Sovereign Gold Bond before maturity?", "Yes. Bonds can be redeemed early with the RBI after a lock-in period on interest payment dates, or sold on the stock exchange, where the price may differ from the gold price."],
      ["Can I still buy new SGBs?", "The government decides when new tranches are issued. If none are open, existing bonds can usually be bought on the stock exchange."]
    ]
  },
  "net-worth": {
    heading: "How to work out your net worth",
    intro: [
      "Net worth is everything you own minus everything you owe. It is the clearest single measure of your financial progress, because it counts both your savings and your debts.",
      "For example, with ₹88 lakh of assets, including a ₹60 lakh home, and ₹37.2 lakh of loans and dues, your net worth is about ₹50.8 lakh. Leaving out the home and its loan, your net worth outside the house is about ₹25.8 lakh."
    ],
    faq: [
      ["Should I include my home in net worth?", "It is part of your net worth, but you cannot spend it without selling. That is why the calculator also shows net worth without your home and its loan."],
      ["What value should I use for assets?", "Use today's market value: current fund and share values, the current balance in EPF, PPF and NPS, and a realistic price for property."],
      ["How often should I calculate it?", "Once or twice a year is enough to see the trend. A rising net worth over time matters more than the number in any one year."]
    ]
  },
  "break-even": {
    heading: "How to find your break-even point",
    intro: [
      "A business breaks even when its sales cover all its costs, with no profit or loss. Fixed costs such as rent and salaries stay the same however much you sell, while variable costs rise with each unit. Each sale contributes the selling price minus its variable cost towards covering the fixed costs.",
      "For example, with ₹2 lakh of monthly fixed costs and a product that sells for ₹500 and costs ₹300 to make, each sale contributes ₹200. The business needs to sell 1,000 units a month to break even, and 1,250 units to make a ₹50,000 profit."
    ],
    faq: [
      ["How can I lower my break-even point?", "Cut fixed costs, reduce the variable cost per unit, or raise the price. A higher contribution per unit means fewer sales are needed."],
      ["What is the contribution margin?", "It is the share of each sale left after variable costs, here ₹200 out of ₹500, or 40%. It shows how much each sale adds to covering fixed costs and profit."],
      ["Should GST be included in the price?", "No. Use prices and costs before GST, because the GST you collect is passed on to the government."]
    ]
  }
};
