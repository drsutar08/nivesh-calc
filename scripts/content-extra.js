// Explainer text for the second batch of calculators. Same rules as content.js: factual, and no figures that change (tax rates, limits, charges).
module.exports = {
  "target-average": {
    heading: "How to bring your average price down to a target",
    intro: [
      "When a stock you own falls, buying more at the lower price pulls your average cost down. This calculator works backwards from the average you want and tells you how many shares to buy, and how much money that takes, at the price you can buy at today.",
      "For example, with 100 shares at an average of ₹500 and a buy price of ₹400, reaching an average of ₹450 takes 100 more shares, or ₹40,000. Notice the trade-off: the closer the target is to today's price, the more shares you need. Each step towards the market price costs more than the last."
    ],
    faq: [
      ["Why can't I reach an average below the current price?", "Every share you buy costs the current price, so your average can move towards it but never below it. To reach a target, it must lie between your current average and the price you will buy at."],
      ["Does this work for averaging up?", "Yes. If you buy above your average, the same formula tells you how many shares take your average up to a target between your average and the buy price."],
      ["Is averaging down a good idea?", "Only if the reasons you bought still hold. Averaging down puts more money into the same company, so it increases your risk if the business has weakened. Decide on the business first and the arithmetic second."]
    ]
  },
  rights: {
    heading: "How a rights issue affects your shares",
    intro: [
      "In a rights issue, a company offers existing shareholders new shares at a set price, usually below the market price, in a fixed ratio such as 1 for every 5 held. You can apply for your entitlement, sell the rights entitlement on the exchange during the trading window, or let it lapse.",
      "Because new shares are issued at a discount, the share price is expected to settle near the theoretical ex-rights price (TERP), a blend of the market price and the issue price. If you neither apply nor sell your entitlement, you give up the value of your rights. That is why ignoring a rights issue costs you money."
    ],
    faq: [
      ["What is TERP?", "The theoretical ex-rights price is the expected share price once the new shares are issued. It is the weighted average of the market price on the existing shares and the issue price on the new ones."],
      ["Should I subscribe to a rights issue?", "Subscribe if you would be happy to buy more of the company at the issue price. If not, selling your rights entitlement captures most of its value. Letting it lapse is usually the worst choice."],
      ["What happens to fractional entitlements?", "Entitlements are usually rounded down to whole shares, so a small holding may not qualify for any rights shares. Check the letter of offer for the exact terms."]
    ]
  },
  "ltcg-harvest": {
    heading: "What LTCG tax harvesting is and how it works",
    intro: [
      "Long-term capital gains on listed shares and equity funds are tax-free up to a yearly exemption limit. Tax harvesting means selling some long-term holdings each financial year to book gains up to that limit, then buying them back. The tax on the booked gain is nil, and your purchase cost resets to the higher buy-back price, so less gain is left to be taxed when you finally sell.",
      "For example, if your holdings are worth ₹6 lakh with ₹2 lakh of long-term gain, and the yearly exemption is ₹1.25 lakh, selling ₹3.75 lakh of holdings books exactly ₹1.25 lakh of gain. Done every year, this can save a meaningful amount of tax over time."
    ],
    faq: [
      ["Does selling and buying back reset the holding period?", "Yes. The repurchased shares or units start a new holding period, so they only qualify as long-term again after the required period. Plan harvesting with holdings you do not expect to sell soon."],
      ["What costs should I consider?", "Selling and buying back has brokerage, STT, exchange charges and stamp duty, and mutual funds may charge an exit load. Price moves between the sale and the buy-back also matter, so keep the gap short."],
      ["When should I harvest?", "Before the end of the financial year, after counting any long-term gains you have already booked that year, since they use up the same exemption."]
    ]
  },
  xirr: {
    heading: "Why XIRR is the right return measure for a SIP",
    intro: [
      "In a SIP, each instalment is invested at a different time, so a simple percentage gain on the total amount understates how hard your money has worked. The early instalments have been invested for years, while the latest ones only for weeks. XIRR accounts for this by finding the single yearly rate that turns every instalment into today's value.",
      "For example, ₹10,000 a month for 36 months is ₹3.6 lakh invested. If it is worth ₹4.3 lakh today, the absolute return is about 19%, but the XIRR is about 11.9% a year. That annual figure is the one you can compare with an FD rate or a fund's CAGR."
    ],
    faq: [
      ["What is the difference between XIRR and CAGR?", "CAGR measures growth of a single lump sum from start to end. XIRR handles many cash flows at different dates, such as SIP instalments, so it is the right measure for SIPs and irregular investing."],
      ["Why does my fund statement show a slightly different XIRR?", "Statements use the exact date and amount of every transaction. This calculator assumes equal monthly instalments, so small differences in dates, skipped instalments or step-ups change the result."],
      ["Can XIRR be negative?", "Yes. If your SIP is worth less than the total you put in, the XIRR is negative and shows the yearly rate at which value was lost."]
    ]
  },
  ppf: {
    heading: "How the Public Provident Fund grows",
    intro: [
      "The Public Provident Fund is a government-backed savings scheme with a 15-year lock-in. Deposits qualify for a tax deduction under the old tax regime, and both the interest and the maturity amount are tax-free, which makes it one of the safest long-term savings options in India.",
      "Interest is calculated each month on the lowest balance between the 5th and the end of the month, and credited once a year. Depositing before the 5th, and ideally the full yearly amount before 5 April, earns the most. This calculator assumes you deposit at the start of each financial year."
    ],
    faq: [
      ["Can I withdraw from PPF before 15 years?", "Partial withdrawals are allowed from the seventh financial year, within limits. Premature closure is allowed only in specific cases, such as serious illness or higher education, and comes with an interest penalty."],
      ["What happens after 15 years?", "You can close the account and take the tax-free maturity amount, or extend it in blocks of 5 years, with or without fresh deposits."],
      ["Is the PPF interest rate fixed?", "No. The government reviews it every quarter, and the new rate applies to the whole balance. Enter the current rate to see an up-to-date estimate."]
    ]
  },
  "compound-interest": {
    heading: "How compound interest works",
    intro: [
      "With compound interest, each period's interest is added to your balance, so the next period's interest is calculated on a larger amount. Over long periods this snowballs: the interest earned on past interest can end up larger than the interest on your original money.",
      "For example, ₹1 lakh at 8% a year for 10 years, compounded quarterly, grows to about ₹2.21 lakh. Simple interest at the same rate would give ₹1.8 lakh, so compounding adds about ₹41,000. More frequent compounding and longer periods both increase the gap."
    ],
    faq: [
      ["What is the difference between simple and compound interest?", "Simple interest is paid only on the original amount. Compound interest is paid on the original amount plus the interest already added, so it grows faster over time."],
      ["Does compounding frequency matter?", "Yes, but less than the rate and the time. Moving from yearly to monthly compounding raises the effective rate a little. Staying invested for longer makes a much bigger difference."],
      ["What is the effective annual rate?", "It is the yearly rate that gives the same result with yearly compounding. It lets you compare offers that compound at different frequencies on equal terms."]
    ]
  },
  "loan-prepayment": {
    heading: "How prepaying a home loan saves interest",
    intro: [
      "In the early years of a home loan, most of each EMI goes towards interest. Any extra amount you pay goes straight to the principal, which lowers the interest charged in every month that follows. If you keep the EMI the same, the loan ends years earlier.",
      "For example, on a ₹30 lakh loan at 8.5% over 20 years, a one-time prepayment of ₹2 lakh plus ₹5,000 extra each month cuts the tenure by almost 8 years and saves over ₹15 lakh in interest. Prepayments made early in the loan save the most."
    ],
    faq: [
      ["Should I reduce my EMI or my tenure?", "Keeping the EMI and shortening the tenure saves more interest. Reducing the EMI gives you more cash each month but keeps you in debt for longer, so you pay more interest overall."],
      ["Are there charges for prepaying a home loan?", "Lenders cannot charge prepayment penalties on floating-rate home loans taken by individuals. Fixed-rate loans may carry a charge, so check your loan agreement."],
      ["Should I prepay or invest the money instead?", "Prepaying gives a guaranteed saving equal to your loan rate. Investing may earn more but with risk. Many people do both, and keep an emergency fund before prepaying."]
    ]
  },
  gst: {
    heading: "How to add or remove GST from a price",
    intro: [
      "Goods and Services Tax is charged as a percentage of the price. To add it, multiply the price by the rate and add the result. To find the GST inside a price that already includes it, you cannot just take the rate off the total. You have to divide by (100 + rate) instead.",
      "For example, at 18%, ₹10,000 plus GST is ₹11,800. But if ₹10,000 already includes 18% GST, the price before tax is ₹8,474.58 and the GST inside it is ₹1,525.42, not ₹1,800."
    ],
    faq: [
      ["What are CGST, SGST and IGST?", "For a sale within a state, GST is split equally between the central government (CGST) and the state (SGST). For a sale from one state to another, the whole amount is charged as integrated GST (IGST)."],
      ["Why is GST removed from a price not equal to the rate times the price?", "Because the tax was calculated on the price before GST, not on the total. Dividing the total by (100 + rate) and multiplying by 100 recovers that original price."],
      ["Which GST rate applies to my purchase?", "It depends on the goods or service, and rates are revised from time to time. Check the current rate schedule or your invoice, then enter it in the calculator."]
    ]
  }
};
