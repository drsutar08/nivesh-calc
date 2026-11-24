// Explainer text for the ninth batch of calculators. Same rules as content.js: factual, and no figures that change (tax rates, limits, scheme rates).
module.exports = {
  dcf: {
    heading: "How a discounted cash flow (DCF) valuation works",
    intro: [
      "A DCF valuation estimates what a business is worth today from the cash it is expected to generate in future. Each year's free cash flow is projected and then discounted, because money received later is worth less than money today. A terminal value covers all the years after the forecast period.",
      "For example, a company with ₹500 crore of free cash flow growing 15% a year for 10 years, then 5% a year, discounted at 12%, has an enterprise value of about ₹15,600 crore. With no net debt and 20 crore shares, that is about ₹778 a share, about 10% above a price of ₹700."
    ],
    faq: [
      ["Why does the terminal value matter so much?", "It covers every year after the forecast period, so it often makes up more than half of the total value. Small changes in the terminal growth or discount rate can move the result a lot."],
      ["What discount rate should I use?", "Many investors use the return they want from the stock, often somewhere between 10% and 14% for Indian equities. A higher rate gives a more conservative value."],
      ["Is a DCF value reliable?", "It is only as good as its assumptions. Treat it as a range, and test what growth the current price implies, rather than relying on a single number."]
    ]
  },
  "market-cap": {
    heading: "Market capitalisation vs enterprise value",
    intro: [
      "Market capitalisation is the value the stock market puts on a company's shares: the share price times the number of shares. Enterprise value goes further by adding debt and subtracting cash, which shows the value of the whole business to everyone who has funded it.",
      "For example, a company with 10 crore shares at ₹1,500 has a market cap of ₹15,000 crore. With ₹2,000 crore of debt and ₹500 crore of cash, its enterprise value is ₹16,500 crore. With EBITDA of ₹1,800 crore, that is an EV/EBITDA of about 9.2."
    ],
    faq: [
      ["Why use EV instead of market cap?", "EV accounts for debt and cash, so it lets you compare companies with very different levels of borrowing on equal terms."],
      ["How are large, mid and small caps decided in India?", "SEBI classifies companies by their rank in market capitalisation, not by a fixed rupee amount, and the lists are updated regularly."],
      ["What is a good EV/EBITDA?", "It varies by sector and growth. Compare it with similar companies and with the company's own history rather than with a single benchmark."]
    ]
  },
  "exit-load": {
    heading: "How mutual fund exit loads work",
    intro: [
      "An exit load is a fee some mutual funds charge if you redeem units within a set period after buying them. It is deducted from the redemption amount and is meant to discourage short-term trading in funds meant for longer holding.",
      "For example, redeeming 1,000 units at an NAV of ₹85 is worth ₹85,000. With a 1% exit load, ₹850 is deducted and you receive ₹84,150. If you bought at ₹70, your gain after the exit load is ₹14,150."
    ],
    faq: [
      ["When does an exit load apply?", "Only if you redeem within the period stated in the scheme information document. After that, there is no exit load. Each SIP instalment has its own holding period."],
      ["Do all funds charge an exit load?", "No. Many debt, liquid and index funds charge little or none, while equity funds often charge one for redemptions within a year."],
      ["Is the exit load included in the expense ratio?", "No. The expense ratio is charged daily on all investors, while the exit load is a one-time charge only on early redemptions."]
    ]
  },
  "car-affordability": {
    heading: "How much car can you afford? The 20/4/10 rule",
    intro: [
      "A car loses value from the day you buy it, so keeping its cost in proportion to your income protects your other goals. The 20/4/10 rule is a simple guide: put down at least 20%, take a loan for no more than 4 years, and keep all car costs, including EMI, fuel and insurance, within 10% of your income.",
      "For example, with an income of ₹1.5 lakh a month and ₹5,000 of running costs, ₹10,000 is left for the EMI. At 9% over 4 years, that supports a loan of about ₹4 lakh, so with 20% down you can afford a car of about ₹5 lakh."
    ],
    faq: [
      ["Is the 20/4/10 rule too strict?", "It is deliberately cautious. You can stretch it if you have no other debts and strong savings, but a longer loan or a bigger EMI means paying more interest on an asset that loses value."],
      ["Should I use the ex-showroom or on-road price?", "The on-road price, which includes registration, road tax and insurance, is what you actually pay, so plan your budget around it."],
      ["Is a longer car loan a good idea?", "A longer loan lowers the EMI but increases total interest, and you may owe more than the car is worth for a while."]
    ]
  },
  annuity: {
    heading: "How an annuity turns a corpus into a pension",
    intro: [
      "An annuity is a product, usually from an insurer, that pays you a regular income in exchange for a lump sum. It is a common way to turn a retirement corpus, including the part of an NPS corpus that must buy an annuity, into a monthly pension.",
      "For example, ₹50 lakh at an annuity rate of 7% a year pays about ₹29,167 a month. To get ₹50,000 a month at the same rate, you would need about ₹86 lakh."
    ],
    faq: [
      ["What decides the annuity rate?", "Your age when you buy, the option you choose and interest rates at the time. A higher age and a pension for life only give higher rates."],
      ["Is the pension fixed for life?", "Most annuities pay a fixed amount, so their buying power falls with inflation. Some options increase the payment each year but start lower."],
      ["Is annuity income taxable?", "Yes. Annuity payments are taxed as income at your slab rate in the year you receive them."]
    ]
  },
  "leave-encashment": {
    reviewed: "2026-11-25",
    checked: "the ₹25 lakh tax-free limit for non-government employees",
    sources: [
      ["Tax exemption limit on leave encashment raised to ₹25 lakh (Press Information Bureau)","https://www.pib.gov.in/PressReleasePage.aspx?PRID=1927265"]
    ],
    heading: "How leave encashment is calculated and taxed",
    intro: [
      "Leave encashment is the payment you receive for unused paid leave, either when you leave a job or retire, or in some companies while still employed. It is usually worked out on your basic pay plus dearness allowance for each day of leave.",
      "For example, with a basic pay plus DA of ₹60,000 a month and 120 unused leave days, the encashment is ₹2,40,000 if the employer counts 30 days in a month. For a non-government employee leaving the job, this is within the usual tax-free limits."
    ],
    faq: [
      ["Is leave encashment taxable?", "Encashment while you are still in service is fully taxable. On retirement or resignation, non-government employees get a tax exemption up to the lowest of several limits, and government employees' encashment is fully exempt."],
      ["Does my employer use 30 or 26 days?", "It depends on company policy and your employment terms. Check your HR policy, since 26 days gives a higher daily rate."],
      ["Is there a limit on leave that can be encashed?", "Many employers cap the leave you can carry forward or encash. For tax, only up to 30 days of leave per completed year of service is counted."]
    ]
  },
  "gold-price": {
    heading: "How the price of gold jewellery is worked out",
    intro: [
      "The price of gold jewellery has three parts: the value of the gold itself, the making charges for the craftsmanship, and GST on both. Making charges vary widely between jewellers and designs, so they are worth comparing and negotiating.",
      "For example, 10 grams of gold at ₹7,000 a gram is worth ₹70,000. With 12% making charges of ₹8,400 and 3% GST of ₹2,352, the final price is ₹80,752, or about ₹8,075 a gram."
    ],
    faq: [
      ["Which gold rate should I use?", "Use the rate for the purity you are buying. Most jewellery is 22K, which is about 91.6% pure, so its rate is lower than the 24K rate."],
      ["Do I get the making charges back when I sell?", "Usually not. When you sell or exchange jewellery, you are paid for the gold content at the current rate, often after a deduction."],
      ["How can I check purity?", "Look for the BIS hallmark and the hallmark unique ID (HUID) on the jewellery, which confirm its purity."]
    ]
  },
  "credit-utilisation": {
    heading: "What credit utilisation is and why it matters",
    intro: [
      "Credit utilisation is the share of your total credit card limit that you are using. Credit bureaus look at it when working out your credit score, and a high ratio can suggest you depend heavily on credit.",
      "For example, with a total limit of ₹3 lakh across your cards and a balance of ₹90,000, your utilisation is 30%. Keeping the balance lower, or paying it down before the statement date, keeps the ratio healthy."
    ],
    faq: [
      ["What is a good credit utilisation ratio?", "Lower is generally better. Many lenders treat staying under about 30% as healthy."],
      ["Does closing a credit card help?", "Usually not. Closing a card reduces your total limit, which can raise your utilisation even if your spending stays the same."],
      ["Is utilisation the only thing that matters for my score?", "No. Paying every bill on time matters most. Utilisation, the length of your credit history and new credit applications also play a part."]
    ]
  }
};
