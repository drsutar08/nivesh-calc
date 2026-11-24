// Explainer text for the twelfth batch of calculators. Same rules as content.js: factual, and no figures that change (tax rates, limits, scheme rates).
module.exports = {
  "sell-or-wait": {
    heading: "Should you sell now or wait for long-term tax?",
    intro: [
      "Gains on listed shares held for 12 months or less are taxed as short-term gains, at a higher rate. Held longer, they become long-term gains, taxed at a lower rate after a yearly exemption. If you are close to the 12-month mark, waiting can save a good amount of tax, but the share price can move in the meantime.",
      "For example, 100 shares bought at ₹1,000 and now at ₹1,500 have a ₹50,000 gain. Selling at 10 months could cost ₹10,000 in short-term tax, while the same gain after 12 months may be fully covered by the long-term exemption. Waiting pays as long as the price does not fall below about ₹1,400, a drop of about 6.7%."
    ],
    faq: [
      ["How is the holding period counted?", "From the date you bought the shares to the date you sell them. For listed shares, you need to hold for more than 12 months for the gain to be long-term."],
      ["Should tax decide when I sell?", "It is one factor. If you would sell anyway because the business has changed, a short wait for tax may not be worth the risk."],
      ["What if I bought the shares in several lots?", "Each lot has its own purchase date, and shares are generally treated as sold first-in, first-out, so check which lots you would be selling."]
    ]
  },
  "required-return": {
    heading: "What return do you need to reach your goal?",
    intro: [
      "Instead of guessing how much an investment will grow, this calculator works backwards from your target. It finds the yearly return needed for today's investment and your monthly SIP to reach the target in time.",
      "For example, ₹5 lakh invested today plus ₹10,000 a month needs about a 15% yearly return to reach ₹50 lakh in 10 years. That is high for any investment over a long period, so a bigger SIP or more time may be more realistic."
    ],
    faq: [
      ["What is a realistic return?", "It depends on the investment. Equity has historically delivered higher but uneven returns over long periods, while FDs and debt funds give lower, steadier ones. Plan with a cautious figure."],
      ["What if the required return is too high?", "Increase the SIP, add a lump sum, give the goal more years, or lower the target. Each of these reduces the return you need."],
      ["Does this include inflation?", "No. Enter the target in future rupees. The Lumpsum Goal Calculator can help you add inflation to a goal."]
    ]
  },
  "rupee-cost-averaging": {
    heading: "How rupee cost averaging works",
    intro: [
      "When you invest a fixed amount every month, you automatically buy more units when the price is low and fewer when it is high. As a result, your average cost per unit ends up below the simple average of the prices you paid.",
      "For example, ₹5,000 a month over six months at NAVs from ₹80 to ₹110 buys about 313.8 units at an average cost of about ₹95.61, even though the average NAV was about ₹96.67. The biggest purchase, 62.5 units, came in the month the NAV was lowest."
    ],
    faq: [
      ["Does rupee cost averaging guarantee a profit?", "No. It lowers your average cost compared with the average price, but if prices keep falling, the investment can still be worth less than you put in."],
      ["Is it better than investing a lump sum?", "Not always. In a steadily rising market, a lump sum invested early often ends higher. Averaging reduces the risk of investing everything at a high point."],
      ["Why is my average cost lower than the average NAV?", "Because a fixed amount buys more units at low prices, so the low prices count for more in your average cost."]
    ]
  },
  "swp-inflation": {
    heading: "Planning withdrawals that keep up with inflation",
    intro: [
      "In retirement, your expenses rise with inflation, so a fixed monthly withdrawal buys less every year. Raising the withdrawal each year keeps your lifestyle steady, but it drains the corpus faster than a fixed withdrawal would.",
      "For example, ₹1 crore earning 9% a year can pay ₹50,000 a month forever if the withdrawal stays fixed. If the withdrawal rises 6% a year to keep up with inflation, the same corpus lasts about 24 and a half years."
    ],
    faq: [
      ["What withdrawal rate is safe?", "A lower starting withdrawal makes the corpus last longer. Many planners suggest starting at 3% to 4% of the corpus a year when withdrawals will rise with inflation."],
      ["Should the corpus stay in equity?", "Many retirees keep part in equity for growth and the rest in debt for stability, and withdraw from the debt part during market falls."],
      ["Are SWP withdrawals taxed?", "Each withdrawal is treated as a sale of units, so the gain part of each withdrawal may be taxed under capital gains rules."]
    ]
  },
  "loan-against-fd": {
    heading: "Loan against FD or break the FD?",
    intro: [
      "If you need money for a short time, you do not have to break your fixed deposit. Most banks lend against an FD, often up to about 90% of its value, at a rate slightly above the FD rate. Your FD keeps earning interest, so the real cost is only the difference between the two rates.",
      "For example, borrowing ₹3 lakh for 6 months against a ₹5 lakh FD at 7%, with the loan at 8%, costs about ₹1,500 net of the FD interest you keep earning. Breaking the FD after a year with a 1% penalty would cost about ₹5,000."
    ],
    faq: [
      ["How quickly can I get a loan against an FD?", "Often within a day, and many banks let you do it online, because the FD itself is the security."],
      ["Do I have to repay in EMIs?", "Usually not. Many banks give an overdraft, where you pay interest only on what you use and can repay whenever you like before the FD matures."],
      ["When is breaking the FD better?", "When you need the money for a long time, or the FD is very new, so the penalty is small and paying loan interest for many months would cost more."]
    ]
  },
  "notice-buyout": {
    heading: "How a notice period buyout is calculated",
    intro: [
      "If you want to leave a job before serving your full notice period, many employers let you pay for the remaining days instead. This is called a notice period buyout. The amount is usually your salary for each day you do not serve.",
      "For example, with a monthly salary of ₹80,000, a 90-day notice period and 30 days already served, the remaining 60 days cost ₹2,667 a day, or ₹1.6 lakh."
    ],
    faq: [
      ["Is the buyout based on basic or gross salary?", "It depends on your employment contract. Some employers use basic pay and others use gross salary, so check your offer letter."],
      ["Can my new employer pay the buyout?", "Many employers reimburse it to hire someone quickly. Ask during the offer discussion, and get it in writing."],
      ["Can I use leave to shorten the notice period?", "Some employers allow unused leave to be adjusted against the notice period. Others do not, so check your HR policy."]
    ]
  },
  "policy-irr": {
    heading: "What return does your insurance policy really give?",
    intro: [
      "Endowment and money-back policies combine life cover with savings, and their maturity amount can sound large. But premiums are paid over many years, so the real yearly return, the IRR, is often low.",
      "For example, paying ₹50,000 a year for 20 years for a maturity amount of ₹20 lakh after 25 years works out to an IRR of about 4.4% a year. The same premiums invested at 7.1% would grow to about ₹31 lakh."
    ],
    faq: [
      ["Why is the return so low?", "Part of each premium pays for life cover, commissions and charges, and only the rest is invested, often in safe, low-return assets."],
      ["Should I surrender my policy?", "Surrendering early usually means losing a large part of what you paid. Compare the surrender value with what the policy will pay at maturity before deciding."],
      ["What is the alternative?", "Many people buy a term plan for life cover, which costs far less, and invest the difference separately for their goals."]
    ]
  },
  "ev-vs-petrol": {
    heading: "Does an electric car save money?",
    intro: [
      "Electric cars usually cost more to buy than petrol cars, but much less to run, because electricity per kilometre is cheaper than petrol and there is less maintenance. Whether an EV saves money depends on how far you drive.",
      "For example, driving 1,500 km a month, a petrol car at 15 km per litre with petrol at ₹105 costs about ₹10,500 a month to run, while an EV charged at home costs about ₹1,700. With lower maintenance too, a ₹3 lakh higher price is repaid in under 3 years."
    ],
    faq: [
      ["Does it matter where I charge?", "Yes. Home charging is usually much cheaper than public fast charging, which can cost several times more per unit."],
      ["What if I drive only a little?", "The saving grows with distance. If you drive only a few hundred kilometres a month, the payback can take many years."],
      ["What other costs should I consider?", "Insurance, resale value, battery health over time and the cost of installing a home charger can all change the comparison."]
    ]
  }
};
