// Explainer text for the fourth batch of calculators. Same rules as content.js: factual, and no figures that change (tax rates, limits, scheme rates).
module.exports = {
  "pivot-points": {
    heading: "What pivot points are and how traders use them",
    intro: [
      "Pivot points are price levels worked out from the previous session's high, low and close. The main pivot is their average, and the support and resistance levels around it give traders a map of where the price might pause or turn during the day.",
      "For example, with a previous high of ₹1,520, a low of ₹1,480 and a close of ₹1,505, the pivot is ₹1,501.67, the first resistance (R1) is ₹1,523.33 and the first support (S1) is ₹1,483.33. Trading above the pivot is often read as a bullish sign and below it as a bearish one."
    ],
    faq: [
      ["Which high, low and close should I use?", "Use the previous trading session's values for intraday levels. For weekly or monthly levels, use the previous week's or month's high, low and close."],
      ["What is the difference between classic and Fibonacci pivots?", "Both start from the same pivot. Classic levels use fixed formulas, while Fibonacci levels add or subtract 38.2%, 61.8% and 100% of the previous range."],
      ["Do pivot points predict the price?", "No. They are reference levels many traders watch, which can make them matter, but prices often move straight through them. Use them alongside a stop-loss and your own analysis."]
    ]
  },
  "ipo-listing": {
    heading: "How IPO listing gains work",
    intro: [
      "When you apply for an IPO, the application amount is blocked in your bank account through ASBA or UPI rather than debited. If you get an allotment, the shares are credited before the listing date. On listing day the shares start trading, and the listing gain is the difference between the listing price and the issue price.",
      "For example, one lot of 30 shares at an issue price of ₹500 needs ₹15,000. If the shares list at ₹600, the listing gain is ₹3,000, or 20%. Selling within 12 months makes it a short-term capital gain, so tax reduces what you keep."
    ],
    faq: [
      ["Will I get all the shares I apply for?", "Not always. When a retail category is oversubscribed, allotment is usually decided by lottery and many applicants get one lot or none. Any money not used is released."],
      ["Is the grey market premium reliable?", "No. The grey market premium is unofficial, unregulated and often wrong. Treat it as a rumour, not a forecast of the listing price."],
      ["Do I have to sell on listing day?", "No. You can hold the shares like any other stock. If you hold them for more than 12 months, any gain is taxed as a long-term capital gain instead."]
    ]
  },
  mtf: {
    heading: "How the Margin Trading Facility works",
    intro: [
      "With the Margin Trading Facility, your broker pays part of the cost of a delivery trade and charges interest on that amount for every day you hold the shares. You pay the margin, and the shares are pledged to the broker as security. Only stocks on the broker's approved list are eligible.",
      "Leverage multiplies both sides. For example, buying ₹1 lakh of shares with ₹25,000 of your own money at 15% interest for 30 days costs about ₹925 in interest. A 10% rise gives a net profit of ₹9,075, which is about 36% on your money. But a 6% fall turns into a loss of about 28%."
    ],
    faq: [
      ["What happens if the share price falls?", "If the value of your position falls below the required margin, the broker asks you to add money or shares (a margin call). If you do not, it can sell your shares to recover the loan."],
      ["How long can I hold an MTF position?", "Usually as long as you keep paying interest and maintain the margin, but each broker sets its own rules. Interest keeps adding up every day you hold."],
      ["Is MTF suitable for long-term investing?", "Rarely. The interest cost eats into returns over time, and leverage adds the risk of forced selling. It suits short holding periods when you understand the risk."]
    ]
  },
  "sip-delay": {
    heading: "What it costs to delay starting a SIP",
    intro: [
      "With compounding, the money invested earliest grows the most, because it has the longest time to compound. Delaying a SIP does not just cut a few instalments. It cuts the years at the end, when the corpus grows fastest.",
      "For example, ₹10,000 a month at an assumed 12% a year for 25 years could grow to about ₹1.9 crore. Starting 5 years later, with 20 years left, gives about ₹1 crore, a gap of nearly ₹90 lakh. To catch up, the later SIP would need to be about ₹19,000 a month."
    ],
    faq: [
      ["Is it better to start small now than large later?", "Usually, yes. A smaller SIP started now often ends up ahead of a larger one started years later, and you can raise it as your income grows."],
      ["What if I can only invest irregularly?", "Investing whenever you can still benefits from time in the market. A step-up SIP or occasional lump sums can make up for a slow start."],
      ["Are these returns guaranteed?", "No. The return you enter is an assumption for illustration. Market-linked returns vary and can be negative in some years, but the effect of time is the same at any rate."]
    ]
  },
  "loan-eligibility": {
    heading: "How lenders decide how much you can borrow",
    intro: [
      "Lenders limit the share of your monthly income that can go towards EMIs. This is called the fixed obligations to income ratio (FOIR). Your existing EMIs come out of that limit first, and what is left decides the EMI, and therefore the loan, you can take on.",
      "For example, with a net income of ₹1 lakh a month, ₹10,000 of existing EMIs and a 50% limit, you can take on a new EMI of ₹40,000. At 8.5% over 20 years, that supports a loan of about ₹46 lakh."
    ],
    faq: [
      ["How can I increase my loan eligibility?", "Pay off existing loans, choose a longer tenure, add a co-applicant with income, or improve your credit score to get a better rate."],
      ["What FOIR do lenders use?", "It varies by lender, income level and loan type. Many lenders use a limit somewhere around half of net income, and some allow more for higher incomes."],
      ["Is this the loan amount I will be offered?", "Not necessarily. Lenders also check your credit history, age, job stability and, for home loans, the property's value, since a home loan is also capped at a share of the property's value."]
    ]
  },
  scss: {
    reviewed: "2026-11-25",
    checked: "the interest rate notified for October–December 2026",
    sources: [
      ["Small Savings: quarterly interest rate notifications (Ministry of Finance, Department of Economic Affairs)","https://dea.gov.in/budget-division/475"]
    ],
    heading: "How the Senior Citizens Savings Scheme pays you",
    intro: [
      "The Senior Citizens Savings Scheme is a government-backed deposit for people aged 60 and above, and for some retirees below 60. It pays interest every quarter, which makes it a popular source of regular income after retirement.",
      "For example, a deposit of ₹15 lakh at 8.2% pays ₹30,750 every quarter, or ₹1.23 lakh a year. The interest is paid out rather than added to the balance, and the full deposit is returned at maturity."
    ],
    faq: [
      ["Is SCSS interest taxable?", "Yes. The interest is taxed at your income-tax slab rate, and tax may be deducted at source above a threshold. The deposit itself can qualify for a deduction under the old tax regime."],
      ["Can I close the account early?", "Yes, but there is a penalty that depends on how soon you close it. Closing in the first year usually means losing the interest earned."],
      ["What happens at the end of 5 years?", "You can take the money back or extend the account for a further block of years at the rate applicable then."]
    ]
  },
  nsc: {
    reviewed: "2026-11-25",
    checked: "the interest rate notified for October–December 2026",
    sources: [
      ["Small Savings: quarterly interest rate notifications (Ministry of Finance, Department of Economic Affairs)","https://dea.gov.in/budget-division/475"]
    ],
    heading: "How a National Savings Certificate grows",
    intro: [
      "The National Savings Certificate is a fixed-income investment sold at post offices, backed by the government. Interest is compounded every year but paid only at maturity, together with the amount you invested.",
      "For example, ₹1 lakh at 7.7% grows to about ₹1,44,903 in 5 years. Each year's interest is added to the balance, so the interest earned rises every year, from ₹7,700 in the first year to about ₹10,360 in the fifth."
    ],
    faq: [
      ["Is NSC interest taxable?", "Yes. The interest is taxable, but it is treated as reinvested each year, so under the old tax regime it can count towards your deduction for every year except the last."],
      ["Can I withdraw before maturity?", "Generally no. Early encashment is allowed only in specific cases, such as the death of the holder or a court order."],
      ["Does the rate change after I invest?", "No. The rate at the time you buy the certificate applies for its full term, even if the government changes the rate for new certificates later."]
    ]
  },
  "simple-interest": {
    heading: "How simple interest works",
    intro: [
      "Simple interest is calculated only on the original amount, the principal. It does not earn interest on interest, so the interest is the same every year.",
      "For example, ₹1 lakh at 8% a year for 3 years earns ₹24,000 of simple interest, for a total of ₹1,24,000. With yearly compounding at the same rate, the interest would be about ₹25,971, because each year's interest would also earn interest."
    ],
    faq: [
      ["Where is simple interest used?", "It is common for short-term loans, some personal and gold loans, and for working out interest on loans between people. Most bank deposits use compound interest instead."],
      ["How do I calculate simple interest for months or days?", "Convert the time to years. For 6 months use 0.5, and for 90 days use 90 ÷ 365."],
      ["What is the formula for simple interest?", "Simple interest = principal × rate × time ÷ 100, with the rate per year and the time in years."]
    ]
  }
};
