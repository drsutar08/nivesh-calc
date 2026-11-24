// Explainer text for the eleventh batch of calculators. Same rules as content.js: factual, and no figures that change (tax rates, limits, scheme rates).
module.exports = {
  "trading-expectancy": {
    heading: "Why win rate alone does not decide if a strategy works",
    intro: [
      "A trading strategy can win most of the time and still lose money, or lose most of the time and still make money. What decides it is expectancy: the average result per trade, combining how often you win with how much you win compared with how much you lose.",
      "For example, with a ₹10 stop-loss and a ₹20 target, the risk-reward is 1 : 2, so you only need to win more than 1 trade in 3 to break even. Winning 40% of the time gives an expectancy of 0.2R, or about ₹200 per trade on 100 shares. At a 30% win rate, the same setup loses money."
    ],
    faq: [
      ["What is R in trading?", "R is the amount you risk on a trade, the distance from entry to stop-loss. Expressing results in R lets you compare trades of different sizes."],
      ["What is a good expectancy?", "Any positive expectancy after costs means the strategy should make money over many trades. Higher is better, but it must be based on enough trades to be reliable."],
      ["Why do real results differ?", "Brokerage, taxes, slippage and gaps through your stop-loss all reduce real expectancy, and a short run of trades can differ a lot from the average."]
    ]
  },
  "portfolio-return": {
    heading: "How to work out your portfolio's overall return",
    intro: [
      "Your portfolio's return is not the simple average of each holding's return. Each holding counts in proportion to how much money is in it, so a large holding moves the total much more than a small one.",
      "For example, ₹5 lakh earning 12%, ₹3 lakh earning 7%, ₹1.5 lakh earning 15% and ₹50,000 earning 6.5% give a weighted return of about 10.7% on ₹10 lakh, even though the simple average of the four returns is 10.1%."
    ],
    faq: [
      ["Should I use past or expected returns?", "Either, but use the same kind for every holding. Past returns show how the portfolio did, and expected returns help you plan."],
      ["How does asset allocation affect the return?", "Moving money between holdings changes their weights, and therefore the overall return and risk. The Asset Allocation Calculator helps you plan the mix."],
      ["What about money added at different times?", "If you invested at different dates, the XIRR Calculator gives a more accurate return for a single fund."]
    ]
  },
  "mf-units": {
    heading: "How mutual fund units are worked out",
    intro: [
      "When you invest in a mutual fund, you buy units at the fund's net asset value (NAV) on the day your money is processed. A small stamp duty is deducted first, and the rest buys units, usually rounded to three decimal places.",
      "For example, ₹10,000 invested at an NAV of ₹45.67, after stamp duty of 0.005%, buys about 218.951 units. Your investment then grows or falls with the NAV."
    ],
    faq: [
      ["Does a lower NAV mean a cheaper fund?", "No. A lower NAV only means you get more units. What matters is how much the NAV grows, not its starting level."],
      ["Which day's NAV do I get?", "It depends on when your payment reaches the fund and the scheme's cut-off time. Late payments get the next business day's NAV."],
      ["Is stamp duty charged on SIPs?", "Yes. Stamp duty applies to every purchase, including each SIP instalment and switches into a fund, but not to redemptions."]
    ]
  },
  "prepay-or-invest": {
    heading: "Should you prepay your loan or invest the money?",
    intro: [
      "Prepaying a loan gives a guaranteed return equal to its interest rate, because every rupee you prepay stops attracting interest. Investing the same money may earn more, but the return is not guaranteed, and tax reduces it.",
      "For example, ₹5 lakh used to prepay an 8.5% home loan with 15 years left is like earning a guaranteed 8.5% a year. Investing it at an expected 11%, with tax on the gain at the end, could end about ₹4.6 lakh ahead. But the investment needs to earn more than about 9.2% a year before tax just to match prepaying."
    ],
    faq: [
      ["When does prepaying make more sense?", "When the loan rate is high, such as on personal loans or credit cards, when you are close to retirement, or when the peace of mind of being debt-free matters to you."],
      ["What about home loan tax benefits?", "If you claim tax deductions on home loan interest, your effective loan rate is lower, which makes investing relatively more attractive. This calculator does not include them."],
      ["Can I do both?", "Yes. Many people keep investing for long-term goals and use bonuses or windfalls to prepay, especially early in the loan."]
    ]
  },
  "eps-pension": {
    heading: "How your EPS pension is calculated",
    intro: [
      "The Employees' Pension Scheme (EPS) pays a monthly pension to members of the EPF after retirement. Part of your employer's contribution goes into EPS each month. The pension depends on your pensionable salary and the number of years you have contributed.",
      "For example, with a pensionable salary of ₹15,000 and 25 years of service, 2 bonus years are added because the service is 20 years or more, so the pension is ₹15,000 × 27 ÷ 70, about ₹5,786 a month."
    ],
    faq: [
      ["How many years do I need for a pension?", "At least 10 years of contributory service. With less, you can usually withdraw a lump sum based on your service when you leave."],
      ["When does the pension start?", "Normally at 58. You can choose a reduced early pension from 50, or defer it, with the amount adjusted accordingly."],
      ["Can I get a pension on my full salary?", "Most members' pensionable salary is capped. Some members opted for a pension on higher wages, which follows separate rules and contributions."]
    ]
  },
  "no-cost-emi": {
    heading: "Is a no-cost EMI really free?",
    intro: [
      "With a no-cost EMI, your instalments add up to the product's price, so it looks free. In practice, the seller gives a discount equal to the interest, and the lender charges that interest on the reduced price. GST is charged on the interest, and many lenders add a processing fee with GST on top.",
      "For example, a ₹60,000 phone on a 6-month no-cost EMI at 15% has about ₹2,540 of interest built in. The GST on that interest is about ₹457, and a ₹199 processing fee becomes about ₹235 with GST. So the real extra cost is about ₹692, roughly 1.2% of the price."
    ],
    faq: [
      ["How can I avoid the extra cost?", "Pay in full if you can, or ask whether a cash discount is available. Some offers waive the processing fee, which lowers the cost."],
      ["Does a no-cost EMI affect my credit card limit?", "Yes. The full amount usually blocks your card limit, and the limit frees up as you pay the EMIs."],
      ["Can I close a no-cost EMI early?", "Usually yes, but foreclosure charges may apply, and the discount may not be adjusted. Check the lender's terms."]
    ]
  },
  "unit-price": {
    heading: "How to compare prices across pack sizes",
    intro: [
      "Bigger packs are not always cheaper. To compare fairly, work out the price per unit, such as per 100 grams or per 100 ml, for each pack.",
      "For example, a 500 g pack at ₹120 costs ₹24 per 100 g, while a 1 kg pack at ₹210 costs ₹21 per 100 g, about 12.5% cheaper. Buying the bigger pack only helps if you will use it before it expires."
    ],
    faq: [
      ["Do I need to use the same unit for both?", "Yes. Convert to the same unit first, for example 1 kg to 1,000 g or 1 litre to 1,000 ml."],
      ["Is the unit price printed on packs?", "Packaged goods in India must show the unit sale price, such as per kg or per litre, along with the MRP, which makes comparing easier."],
      ["Are offers like 'buy 2 get 1 free' cheaper?", "Work out the total price divided by the total quantity you get, then compare that unit price."]
    ]
  },
  "habit-cost": {
    heading: "What a small daily habit really costs",
    intro: [
      "Small, regular spends, such as coffee, snacks, ride-hailing or subscriptions, feel minor each time but add up over a year. Invested instead, the same money could grow substantially over the long term.",
      "For example, spending ₹200 five times a week is about ₹52,000 a year and about ₹10.4 lakh over 20 years. Invested as a monthly SIP at an assumed 12% a year, it could grow to about ₹43 lakh."
    ],
    faq: [
      ["Does this mean I should cut out every treat?", "No. The point is to choose consciously. Keep the spends you value and redirect the ones you would not miss."],
      ["Is 12% a realistic return?", "It is an assumption for illustration. Try a lower figure to see a more cautious result."],
      ["What is the easiest way to invest the savings?", "Set up a small monthly SIP for the amount you cut back, so the saving is invested automatically."]
    ]
  }
};
