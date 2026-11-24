// Explainer text for the fifth batch of calculators. Same rules as content.js: factual, and no figures that change (tax rates, limits, scheme rates).
module.exports = {
  "graham-number": {
    heading: "What the Graham number tells you",
    intro: [
      "Benjamin Graham, the author of The Intelligent Investor, suggested that a defensive investor should not pay more than 15 times earnings or 1.5 times book value. Multiplying the two limits gives 22.5, and the Graham number, √(22.5 × EPS × book value per share), is the highest price that satisfies both together.",
      "For example, a company with earnings per share of ₹50 and book value per share of ₹300 has a Graham number of about ₹581. At a share price of ₹450, that leaves a margin of safety of about 22.5%. Graham's separate growth formula adds an allowance for expected earnings growth."
    ],
    faq: [
      ["Is a stock below its Graham number a good buy?", "Not by itself. The Graham number is a quick screen for value, best suited to stable, profitable companies. It says nothing about the quality of the business, its debt or its future."],
      ["Does the Graham number work for every company?", "No. It needs positive earnings and book value, and it is less useful for fast-growing companies, banks and businesses whose value lies mostly in brands or intangible assets."],
      ["What bond yield should I use in the growth formula?", "Graham used the yield on high-grade corporate bonds. In India, many investors use the yield on AAA-rated corporate bonds or long-term government bonds as a stand-in."]
    ]
  },
  fibonacci: {
    heading: "How Fibonacci retracement levels are used",
    intro: [
      "After a strong move, prices often pull back part of the way before continuing. Fibonacci retracement levels mark common places where that pullback may pause: 23.6%, 38.2%, 50%, 61.8% and 78.6% of the move. Extensions at 127.2% and 161.8% project how far the next move might go.",
      "For example, if a stock rose from ₹1,500 to ₹1,800, the 38.2% and 61.8% retracement levels are about ₹1,685 and ₹1,615. Traders watch these zones for signs that the uptrend is resuming."
    ],
    faq: [
      ["How do I choose the swing high and swing low?", "Pick a clear recent move: the lowest low and highest high of that move on the time frame you trade. Different choices give different levels, so be consistent."],
      ["Which Fibonacci level matters most?", "The 38.2%, 50% and 61.8% levels are the most watched. The 50% level is not a Fibonacci ratio but is widely used anyway."],
      ["Are Fibonacci levels reliable?", "They are a tool, not a forecast. Prices often move through them, so traders combine them with trend, volume and a stop-loss."]
    ]
  },
  "sip-vs-lumpsum": {
    heading: "SIP or lumpsum: what the numbers show",
    intro: [
      "If returns were the same every year, investing a lump sum would always beat spreading the same money as a SIP, because all of it would be invested for longer. For example, ₹6 lakh invested at once at 12% for 5 years grows to about ₹10.6 lakh, while ₹10,000 a month for the same 5 years grows to about ₹8.2 lakh.",
      "Real markets do not move in a straight line. A lump sum invested just before a fall can take years to recover, while a SIP buys more units when prices are low. SIPs also suit people who invest from a monthly salary, and they remove the stress of timing the market."
    ],
    faq: [
      ["When does a lumpsum make sense?", "When you already have the money, have a long horizon and can sit through a fall without selling. Some investors spread a large sum over a few months to reduce timing risk."],
      ["When does a SIP make sense?", "When you invest from regular income, or when you would worry about putting everything in just before a fall. A SIP builds a habit and averages your purchase price."],
      ["Can I combine both?", "Yes. Many investors put a part in at once and invest the rest through a SIP or a systematic transfer plan over the following months."]
    ]
  },
  fire: {
    heading: "How to work out your FIRE number",
    intro: [
      "FIRE stands for financial independence, retire early. Your FIRE number is the corpus that lets you live off your investments, found by dividing your yearly expenses by a safe withdrawal rate. At a 4% rate, that is 25 times your yearly expenses.",
      "For example, with expenses of ₹6 lakh a year, the FIRE number is ₹1.5 crore in today's money. With ₹10 lakh invested now and ₹50,000 added each month at an assumed 10% return, and the target rising with 6% inflation, it would take about 21 years to get there."
    ],
    faq: [
      ["Is the 4% rule right for India?", "The 4% rule comes from US studies of stock and bond returns. With higher inflation in India, many planners suggest a lower withdrawal rate, such as 3% to 3.5%, which means a larger corpus."],
      ["Should I include my house in the FIRE number?", "Usually not, unless you plan to sell it. Count only investments that can pay for your living costs."],
      ["How can I reach FIRE sooner?", "Invest more each month, keep expenses in check, and invest for growth over the long term. Cutting yearly expenses works twice: it lowers the target and frees up money to invest."]
    ]
  },
  "real-return": {
    heading: "Why the real return is what matters",
    intro: [
      "A return of 7% sounds good, but if prices rise by 6% a year, your money only buys about 1% more each year. And if the return is taxed, the real gain can disappear. The real return measures the growth in what your money can actually buy.",
      "For example, an FD paying 7% to someone in the 30% tax slab earns 4.9% after tax. With 6% inflation, that is a real return of about −1% a year. After 10 years, ₹1 lakh becomes about ₹1.61 lakh, but that buys only what about ₹90,000 buys today."
    ],
    faq: [
      ["What is a good real return?", "Anything above zero means your buying power is growing. Long-term savings usually need a clearly positive real return to beat inflation over time."],
      ["Why not just subtract inflation from the return?", "Subtracting is a close shortcut, but the exact real return is (1 + return) ÷ (1 + inflation) − 1, which is slightly lower when both are high."],
      ["Which inflation rate should I use?", "Use the rate that matches your own spending. Education and healthcare costs often rise faster than general consumer prices."]
    ]
  },
  kvp: {
    reviewed: "2026-11-25",
    checked: "the interest rate notified for October–December 2026",
    sources: [
      ["Small Savings: quarterly interest rate notifications (Ministry of Finance, Department of Economic Affairs)","https://dea.gov.in/budget-division/475"]
    ],
    heading: "How Kisan Vikas Patra doubles your money",
    intro: [
      "Kisan Vikas Patra is a government savings certificate sold at post offices. It doubles a one-time investment over a fixed period, which the government sets along with the interest rate. Despite the name, anyone can invest, not only farmers.",
      "The time to double depends on the rate. At 7.5% a year compounded annually, money doubles in about 115 months, or 9 years and 7 months. So ₹1 lakh becomes ₹2 lakh at maturity."
    ],
    faq: [
      ["Is KVP interest taxable?", "Yes. The interest is taxable, and KVP does not qualify for the deductions that schemes such as PPF or NSC do under the old tax regime."],
      ["Can I withdraw before maturity?", "Yes, after a minimum lock-in period, or earlier in special cases such as the death of the holder. You receive a lower amount if you withdraw early."],
      ["Does the maturity period change after I invest?", "No. Your certificate keeps the rate and maturity period that applied when you bought it."]
    ]
  },
  pomis: {
    reviewed: "2026-11-25",
    checked: "the interest rate notified for October–December 2026",
    sources: [
      ["Small Savings: quarterly interest rate notifications (Ministry of Finance, Department of Economic Affairs)","https://dea.gov.in/budget-division/475"]
    ],
    heading: "How the Post Office Monthly Income Scheme works",
    intro: [
      "The Post Office Monthly Income Scheme is a government-backed deposit that pays interest every month for 5 years, then returns your deposit. It suits people who want a steady, safe monthly income, such as retirees.",
      "For example, a deposit of ₹9 lakh at 7.4% pays ₹5,550 a month, or ₹66,600 a year. Over 5 years that adds up to ₹3.33 lakh of interest, and the ₹9 lakh is returned at the end."
    ],
    faq: [
      ["Is the monthly income taxable?", "Yes. The interest is taxed at your income-tax slab rate."],
      ["Can I close the account early?", "Yes, after the first year, with a deduction from the deposit that depends on how early you close it."],
      ["Can I reinvest the monthly interest?", "The scheme itself pays the interest out. Many people set up a recurring deposit to reinvest it automatically and earn interest on it."]
    ]
  },
  discount: {
    heading: "How to calculate a discount, and why discounts don't add up",
    intro: [
      "To find a sale price, take the discount percentage off the original price. When a second discount is offered on top, such as an extra 10% at checkout, it applies to the already reduced price, not the original.",
      "That is why two discounts never add up. For example, a ₹2,000 item at 20% off costs ₹1,600, and an extra 10% off brings it to ₹1,440. The total discount is 28%, not 30%."
    ],
    faq: [
      ["How do I calculate a discount percentage?", "Divide the amount saved by the original price and multiply by 100. For example, ₹500 off a ₹2,000 price is a 25% discount."],
      ["Is 'buy 1 get 1 free' a 50% discount?", "Only if you wanted both items. It is 50% off the price per item, but you spend the full price of one."],
      ["Is the discount applied before or after GST?", "Usually the discount is applied to the price first, and GST is charged on the reduced price. Check the bill to be sure."]
    ]
  }
};
