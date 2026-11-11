// Longer explainer text per calculator, used by build.js. Keep it factual and avoid figures that change (tax rates, charges).
module.exports = {
  average: {
    heading: "What is a stock average price?",
    intro: [
      "Your average buy price is the total money you have put into a stock divided by the number of shares you hold. If you bought the same stock at different prices on different days, the average tells you the single price at which you break even, before charges and tax.",
      "Buying more shares after a fall lowers your average. This is often called averaging down. For example, 100 shares bought at ₹500 and another 100 bought at ₹400 give an average of ₹450, so the stock only has to recover to ₹450 for you to break even. Averaging down adds more money to the same company, so it raises your risk if the business itself has weakened."
    ],
    faq: [
      ["How do I calculate the average price of a stock?", "Multiply the units and price of each purchase, add those amounts, and divide by the total units. This calculator does it as you type, and you can add as many purchases as you need."],
      ["Does the average price include brokerage and charges?", "Not unless you include them in the price you enter. For a break-even price that counts charges, use the Brokerage & Charges Calculator."],
      ["Is averaging down a good idea?", "It depends on why the price fell. If the business is still sound, buying more at a lower price can reduce your average. If the business has deteriorated, it only increases the money you have at risk."]
    ]
  },
  "profit-loss": {
    heading: "Working out profit or loss on a share trade",
    intro: [
      "Your gain or loss on a trade is the sale value minus the buy value, then minus the brokerage and other charges you paid on both sides. Looking only at the price difference overstates your profit, because charges are taken out of it.",
      "In the example values, buying 100 shares at ₹450 and selling at ₹512.50 gives a gross profit of ₹6,250 and a net profit of ₹6,153.75 after charges at 0.1% on both legs. The calculator also shows your return on the money invested and the sell price at which you only break even."
    ],
    faq: [
      ["How do I calculate profit or loss on a stock?", "Net profit = (sell price − buy price) × quantity − charges. Enter your quantity, prices and a charge percentage to see it."],
      ["What is the break-even price?", "It is the sell price at which your profit after charges is zero. Selling above it makes a profit; selling below it makes a loss."],
      ["Does this include tax?", "No. It shows the result before tax. Use the Capital Gains Tax Calculator to estimate tax on a gain."]
    ]
  },
  sip: {
    heading: "How a SIP grows over time",
    intro: [
      "A Systematic Investment Plan (SIP) invests a fixed amount every month. Because each instalment earns returns for a different length of time, the earliest ones do most of the work. This is why starting early matters more than the size of each instalment.",
      "With the example values, ₹10,000 a month for 15 years at an assumed 12% a year grows to about ₹50.5 lakh, of which ₹18 lakh is your own money and the rest is growth. The 12% is an assumption for illustration, not a promise. Market-linked returns vary and can be negative in any given year."
    ],
    faq: [
      ["How is SIP return calculated?", "The calculator assumes each instalment is invested at the start of the month and grows at the monthly equivalent of your expected annual return. The final value is the sum of all instalments with their growth."],
      ["What return should I assume?", "Use a cautious figure and try a few. Showing a range, such as 8%, 10% and 12%, gives a more realistic picture than a single optimistic number."],
      ["Is a SIP better than a lump sum?", "Neither is always better. A SIP suits regular income and spreads your entry across market highs and lows. Compare both with the Lumpsum Calculator."]
    ]
  },
  "stepup-sip": {
    heading: "Why a step-up SIP can build a much larger corpus",
    intro: [
      "A step-up SIP raises your monthly instalment by a fixed percentage every year, usually in line with your salary growth. You barely notice the increase, but over a long period it changes the result a lot.",
      "With the example values, a ₹10,000 SIP raised 10% every year for 15 years at 12% growth reaches about ₹86.8 lakh. The same SIP without any step-up reaches about ₹50.5 lakh, so stepping up adds roughly ₹36 lakh."
    ],
    faq: [
      ["What is a step-up SIP?", "It is a SIP whose monthly amount increases by a set percentage each year, so your investing keeps pace with your income."],
      ["How much should I step up?", "A figure close to your expected yearly income growth is a common choice. Try a few values to see how sensitive the result is."],
      ["Do all funds allow a step-up?", "Many fund houses and platforms offer it, but check with yours. If not, you can raise the amount yourself each year."]
    ]
  },
  lumpsum: {
    heading: "What a one-time investment can grow into",
    intro: [
      "A lump sum is a single investment left to grow for a number of years. The result depends on three things: the amount, the yearly return and the time. Time has the largest effect, because growth is earned on earlier growth.",
      "Use the calculator to compare how the same amount behaves over 5, 10 and 20 years, or at different return assumptions. Returns here are assumed to be constant; real market returns are uneven."
    ],
    faq: [
      ["How do I calculate the future value of a lump sum?", "Multiply the amount by (1 + annual return) raised to the number of years. The calculator does this for you."],
      ["Is the return guaranteed?", "No. The return is an assumption you choose. Market-linked investments can lose value."],
      ["How is this different from a SIP?", "A lump sum is invested all at once, while a SIP invests every month. See the SIP Calculator to compare."]
    ]
  },
  swp: {
    heading: "Using a Systematic Withdrawal Plan",
    intro: [
      "A Systematic Withdrawal Plan (SWP) takes a fixed amount from your investment every month while the rest stays invested. People use it to turn a corpus into a regular income, for example in retirement.",
      "The key question is how long the corpus lasts. It depends on your starting amount, the monthly withdrawal and the return on what remains. A withdrawal that is high compared with the return will run the corpus down faster."
    ],
    faq: [
      ["How long will my corpus last with an SWP?", "Enter your corpus, monthly withdrawal, expected return and duration. The calculator shows the balance left at the end, the total you withdrew and how long the corpus lasts if it runs out early."],
      ["What withdrawal rate is sustainable?", "A lower withdrawal compared with the corpus lasts longer. Test a few amounts and cautious returns to see where the corpus runs out."],
      ["Are SWP withdrawals taxed?", "Tax depends on the type of fund and how long you held it, and the rules change. This calculator does not include tax."]
    ]
  },
  emi: {
    heading: "How your loan EMI is worked out",
    intro: [
      "An Equated Monthly Instalment (EMI) is the fixed amount you pay every month to repay a loan. Each EMI covers the interest for the month and part of the principal. In the early years most of it is interest; later, most of it is principal.",
      "With the example values, a ₹30 lakh loan at 8.5% for 20 years has an EMI of about ₹26,035 and costs roughly ₹32.5 lakh in interest, more than the amount you borrowed. A shorter tenure raises the EMI but cuts the total interest by a large amount."
    ],
    faq: [
      ["How is EMI calculated?", "EMI = P × i × (1 + i)^n ÷ ((1 + i)^n − 1), where P is the loan, i the monthly interest rate and n the number of months."],
      ["How can I reduce the total interest?", "Choose a shorter tenure, make part-prepayments, or find a lower rate. Try different tenures in the calculator to compare."],
      ["Does the EMI include processing fees?", "No. Fees and insurance are separate and are not included."]
    ]
  },
  cagr: {
    heading: "What CAGR tells you",
    intro: [
      "The Compound Annual Growth Rate (CAGR) is the steady yearly rate that would take an investment from its starting value to its ending value over a given time. It smooths out the ups and downs, so you can compare investments held for different periods.",
      "For example, an investment that doubles from ₹1,00,000 to ₹2,00,000 in 6 years has a CAGR of about 12.25% a year. CAGR is a summary of the past, not a forecast, and it ignores the path the value took along the way."
    ],
    faq: [
      ["How do I calculate CAGR?", "CAGR = (ending value ÷ starting value)^(1 ÷ years) − 1. Enter the two values and the number of years."],
      ["What is the difference between CAGR and absolute return?", "Absolute return is the total gain over the whole period. CAGR converts it to a yearly rate so different periods can be compared."],
      ["Can CAGR be used for SIPs?", "Not directly, because a SIP adds money at different times. Use XIRR-style measures for that."]
    ]
  },
  brokerage: {
    heading: "The charges on a share trade",
    intro: [
      "A trade costs more than the brokerage. Typical charges include brokerage, securities transaction tax (STT), exchange transaction charges, a SEBI turnover fee, stamp duty on the buy side and GST on brokerage and some fees. On a small gain, these can take a large share of the profit.",
      "The rates differ by broker and by trade type, and the rules are updated from time to time. The values in this calculator are editable examples, so replace them with the rates on your broker's charge sheet. The break-even price shows the sell price you need just to cover all charges."
    ],
    faq: [
      ["What charges apply on a stock trade?", "Brokerage, STT, exchange transaction charges, SEBI fees, stamp duty and GST. Which apply, and at what rate, depends on whether it is a delivery or intraday trade and on your broker."],
      ["Why is my break-even price higher than my buy price?", "Because charges are paid on both the buy and the sell. The price has to rise enough to cover them before you make any profit."],
      ["Are the default rates correct for my broker?", "Not necessarily. They are examples. Enter the rates from your broker's charge sheet for an accurate result."]
    ]
  },
  "capital-gains": {
    heading: "Short-term and long-term capital gains on shares",
    intro: [
      "Profit from selling shares is a capital gain. It is treated as short-term or long-term depending on how long you held the shares, and the two are taxed at different rates. Long-term gains on listed equity also have a yearly exemption limit.",
      "Tax rules, rates and limits change, so treat the defaults here as editable starting values and confirm the current rules before you rely on a number. This calculator does not include surcharge, cess or transaction charges."
    ],
    faq: [
      ["How do I know if a gain is short-term or long-term?", "It depends on your holding period compared with the long-term threshold for that asset. Enter your holding period and the threshold to see which applies."],
      ["Can I set off a loss?", "Capital losses can usually be set off against gains and carried forward under certain conditions. Check the current rules or ask a tax adviser."],
      ["Is this tax advice?", "No. It is an estimate for planning. Speak to a qualified tax professional for your situation."]
    ]
  },
  "goal-planner": {
    heading: "Planning a monthly SIP for a goal",
    intro: [
      "Goals such as a home, a child's education or retirement cost more in the future because of inflation. This planner first raises today's cost by the inflation you assume, then works out the monthly SIP that bridges the gap after counting what you have already saved.",
      "With the example values, a goal that costs ₹50 lakh today becomes about ₹89.5 lakh in 10 years at 6% inflation. With ₹2 lakh already saved and a 12% assumed return, the monthly SIP needed is about ₹35,700."
    ],
    faq: [
      ["Why does the goal amount increase?", "Because prices rise with inflation. The same goal will cost more in future years than it does now."],
      ["What return should I assume?", "Use a cautious figure, and use a lower one for goals that are close. Short-term goals suit lower-risk options."],
      ["What if my savings already cover the goal?", "The planner will say so and show a SIP of zero."]
    ]
  },
  fd: {
    heading: "How a fixed deposit grows",
    intro: [
      "A fixed deposit (FD) pays interest at a rate fixed when you open it. Most banks compound the interest quarterly, which means interest is added to the balance every three months and then earns interest too. More frequent compounding gives a slightly higher yield.",
      "With the example values, ₹5 lakh at 7% for 5 years with quarterly compounding matures at about ₹7,07,389. FD interest is taxable at your slab rate, so the calculator also shows the amount after tax, using the rate you enter."
    ],
    faq: [
      ["How is FD maturity calculated?", "Maturity = P × (1 + r ÷ (100 × m))^(m × t), where m is the number of compounding periods per year and t the years."],
      ["What is the effective yield?", "It is the true yearly return after compounding. With quarterly compounding it is a little higher than the quoted rate."],
      ["Is FD interest taxed?", "Yes, it is added to your income and taxed at your slab rate. The calculator estimates this using the rate you enter."]
    ]
  }
};
