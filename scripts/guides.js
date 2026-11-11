// Long-form guides, rendered by build.js into /guides/<slug>/. Same rules as content.js:
// factual, plain language, and no figures that change (tax rates, slabs, charges). Worked examples use round, stated assumptions.
module.exports = [
  {
    slug: "how-is-sip-return-calculated",
    title: "How Is SIP Return Calculated? Formula and Worked Example",
    desc: "Learn the SIP maturity formula step by step, with a worked example of ₹10,000 a month for 15 years, and see why starting early matters.",
    calcs: ["sip", "stepup-sip", "lumpsum", "cagr"],
    updated: "2026-11-11",
    sections: [
      { h: "What a SIP return really means", p: [
        "A SIP (systematic investment plan) puts a fixed amount into a fund every month. Because each instalment is invested on a different date, each one grows for a different length of time. The first instalment compounds for the full term, and the last one for only a month.",
        "That is why a SIP return cannot be worked out with the simple 'amount × rate × years' shortcut. You have to compound every instalment separately and add them up. The SIP formula does exactly that in one step."
      ] },
      { h: "The SIP maturity formula", p: [
        "Estimated value = P × [((1 + i)^n − 1) ÷ i] × (1 + i)",
        "Here P is the monthly instalment, i is the monthly rate of return (the yearly rate divided by 12), and n is the number of monthly instalments. The final (1 + i) factor assumes each instalment is invested at the start of the month."
      ] },
      { h: "Worked example: ₹10,000 a month for 15 years", p: [
        "Assume an expected return of 12% a year. Then i = 12% ÷ 12 = 1% = 0.01, and n = 15 × 12 = 180 instalments.",
        "(1.01)^180 is about 5.996. So the bracket becomes (5.996 − 1) ÷ 0.01 ≈ 499.6. Multiply by 10,000 and by 1.01 and you get an estimated value of about ₹50.5 lakh.",
        "You invested 10,000 × 180 = ₹18 lakh, so roughly ₹32.5 lakh of the final value is growth. In other words, the money grows to about 2.8 times what you put in. You can check these numbers with the SIP Calculator."
      ] },
      { h: "Why starting early matters more than the amount", p: [
        "Compounding rewards time more than size. With the same assumptions, the first ₹10,000 instalment in this example grows for 15 years, while an instalment made in the last year grows for only a few months. Most of the final value comes from the later years of the plan, when the corpus is large and growth is applied to a bigger base.",
        "If you delay a SIP by a few years, you usually have to raise the monthly amount a lot to reach the same target. Try the same inputs with a shorter duration to see the gap."
      ] },
      { h: "Limits of any SIP estimate", p: [
        "The return you enter is an assumption, not a promise. Equity-linked funds do not grow in a straight line, and some years will be negative. Expenses and taxes also reduce what you actually take home, and the formula above ignores both.",
        "Use the result to compare plans and set targets, then review it every year. If you plan to raise your SIP as your income grows, the Step-up SIP Calculator shows the effect of that."
      ] }
    ],
    faq: [
      ["Is the SIP formula the same as the compound interest formula?", "It uses the same idea, compounding, but applies it to many instalments instead of one lump sum. Each instalment compounds for a different period, and the formula adds them together."],
      ["What return should I assume for a SIP?", "Nobody can know in advance. Many people try a conservative, a moderate and an optimistic rate, such as 8%, 10% and 12%, to see a range instead of a single number."],
      ["Do SIP calculators include tax and fund expenses?", "Most do not, and ours does not either. Treat the result as a pre-tax, pre-cost estimate."]
    ]
  },
  {
    slug: "sip-vs-lumpsum",
    title: "SIP vs Lumpsum: Which Is Better for You?",
    desc: "Compare SIP and lumpsum investing with a worked example, and learn when each approach tends to suit an investor better.",
    calcs: ["sip", "lumpsum", "cagr", "goal-planner"],
    updated: "2026-11-11",
    sections: [
      { h: "The core difference", p: [
        "A lumpsum investment puts all your money to work on day one. A SIP spreads the same money over many months. Neither is automatically better. The right choice depends on whether you already have the money and how you feel about market ups and downs.",
        "If you only earn a salary, a SIP is often the only practical option, because the money arrives month by month. The question 'SIP or lumpsum?' really matters when you receive a bonus, a maturity amount or an inheritance."
      ] },
      { h: "A worked example", p: [
        "Suppose you have ₹12 lakh. Option A invests all of it today. Option B invests ₹10,000 a month for 10 years, which is also ₹12 lakh in total. Assume both earn 12% a year.",
        "Option A grows to about ₹37.3 lakh after 10 years, because the whole amount compounds for the full period. Option B grows to about ₹23.2 lakh, because most of the money is invested later and compounds for less time.",
        "This does not mean lumpsum wins in real life. It shows that money invested earlier has longer to compound, if returns are positive. In option B the remaining money would sit in a savings account or an FD in the meantime, earning less. You can reproduce both figures with the Lumpsum Calculator and the SIP Calculator."
      ] },
      { h: "When a lumpsum can make sense", p: [
        "You have a large amount that is not needed for a long time, and you are comfortable with the possibility that it falls in value soon after you invest.",
        "Your time horizon is long, so a poor start matters less than the years of compounding that follow."
      ] },
      { h: "When a SIP can make sense", p: [
        "You invest from monthly income. Your money arrives in instalments, so you invest in instalments.",
        "You worry about investing everything just before a fall. A SIP averages your purchase price across highs and lows, which can make the ride easier to stay with.",
        "A third option is to park a lumpsum in a low-risk fund and move it into equity in a few instalments, often called an STP. This trades some expected return for lower regret."
      ] },
      { h: "How to decide", p: [
        "Start from your goal, not from the product. Work out the amount you need and the date you need it with the Goal Planner, then see whether a monthly amount or a one-time amount gets you there more comfortably.",
        "Remember that returns are assumptions. The better plan is the one you can keep following when the market is falling."
      ] }
    ],
    faq: [
      ["Does a lumpsum always beat a SIP?", "No. If markets fall right after you invest a lumpsum, a SIP started at the same time could end up ahead. Over long periods with positive returns, money invested earlier tends to have the advantage."],
      ["Can I do both?", "Yes. Many investors run a monthly SIP from income and add lumpsum amounts when they receive a bonus or other windfall."],
      ["Is a SIP safer than a lumpsum?", "A SIP reduces timing risk, because you buy at many prices. It does not remove market risk. The fund can still lose value."]
    ]
  },
  {
    slug: "ltcg-vs-stcg-on-shares-india",
    title: "LTCG vs STCG on Shares in India: How Capital Gains Are Taxed",
    desc: "Understand the difference between short-term and long-term capital gains on shares in India, how holding period decides it, and how to estimate your tax.",
    calcs: ["capital-gains", "profit-loss", "brokerage", "average"],
    updated: "2026-11-11",
    sections: [
      { h: "Two kinds of gain, decided by holding period", p: [
        "When you sell listed shares for more than you paid, the profit is a capital gain. How long you held the shares decides whether it is a short-term or a long-term gain. The two are taxed at different rates, and long-term gains on listed equity also have a yearly exemption limit.",
        "The holding-period cut-off, the rates and the exemption limit have all been changed by Budgets in the past. Always check the current numbers on the Income Tax Department's website before you rely on any figure, including those in calculators."
      ] },
      { h: "How a gain is worked out", p: [
        "Gain = sale value − purchase value − transfer costs such as brokerage. If you bought the same share in several lots at different prices, each lot has its own purchase date and price, and the lot you sold determines the gain. The Stock Average Calculator helps you track the blended cost, and the Stock Profit/Loss Calculator shows a single trade.",
        "Intraday trades, F&O and delivery-based trades are treated differently. Intraday and F&O profits are generally not capital gains. If you trade often, speak to a tax professional about how your income is classified."
      ] },
      { h: "A simple way to think about the calculation", p: [
        "Suppose you sell shares you held for well over a year, and your total long-term gain for the year is ₹2,00,000. The exemption limit is deducted first, and the tax rate applies only to the remainder. If you sold shares you held for a few weeks, the short-term rate applies to the whole gain, with no exemption.",
        "Enter your gain, the holding period and the rates from the official source into the Capital Gains Tax Calculator to estimate the figure, then keep the working with your records."
      ] },
      { h: "Losses and how they are used", p: [
        "Capital losses can usually be set off against gains, and unused losses can be carried forward for a number of years if you file your return on time. The rules about which loss can offset which gain are specific, so check them before you plan trades around them.",
        "Do not sell something only to book a loss unless you would have sold it anyway. Tax is one input into the decision, not the only one."
      ] },
      { h: "Records worth keeping", p: [
        "Keep your contract notes, your broker's capital gains statement and your own list of purchase dates and prices. For bonus shares, splits and mergers, the cost and holding period can change, so note those events too. Good records make filing much easier and protect you if the department asks questions."
      ] }
    ],
    faq: [
      ["How do I know if a gain is short-term or long-term?", "It depends on how long you held the shares before selling. The cut-off for listed equity is set by law and can change, so check the current rule."],
      ["Does the calculator include brokerage?", "Brokerage and other charges reduce your gain. Use the Brokerage & Charges Calculator to estimate them, then deduct them in your working."],
      ["Is this tax advice?", "No. It is general information to help you plan. A qualified tax professional can advise on your situation."]
    ]
  },
  {
    slug: "how-much-do-i-need-to-retire",
    title: "How Much Do I Need to Retire? A Step-by-Step Way to Estimate Your Corpus",
    desc: "A plain-language method to estimate your retirement corpus, with an example that accounts for inflation, and how much SIP it takes to reach it.",
    calcs: ["retirement", "swp", "sip", "inflation"],
    updated: "2026-11-11",
    sections: [
      { h: "Start with your expenses, not a magic number", p: [
        "There is no single number that works for everyone. The corpus you need depends on how much you will spend each month in retirement, how long you will live, and what your savings earn. So the first step is to estimate your monthly spending in today's terms.",
        "Include regular costs like food, housing, utilities and healthcare. Leave out expenses that stop with work, such as commuting, and add costs that grow with age, such as medical care."
      ] },
      { h: "Step 1: Adjust the expenses for inflation", p: [
        "Prices rise every year, so ₹50,000 a month today will not buy the same things in 30 years. At 6% yearly inflation, expenses grow by a factor of about 5.7 over 30 years. So ₹50,000 a month today becomes roughly ₹2.87 lakh a month, or about ₹34.5 lakh a year, at the time you retire.",
        "You can see how fast prices compound with the Inflation Calculator."
      ] },
      { h: "Step 2: Work out the corpus that funds those expenses", p: [
        "Next, find the lump sum that can pay out those rising expenses for the whole retirement. In our example you retire at 60 and plan to age 85, so the money must last 25 years. The corpus keeps earning while you withdraw, and your withdrawals rise with inflation each year.",
        "With 8% returns after retirement and 6% inflation, the corpus needed is about ₹6.95 crore. That large figure often surprises people. It is a result of 30 years of inflation, not of lavish spending."
      ] },
      { h: "Step 3: Turn the corpus into a monthly SIP", p: [
        "Now work backwards. Assume you already have ₹5 lakh saved for retirement. At 12% a year it grows to about ₹1.8 crore over 30 years. That leaves roughly ₹5.15 crore to build, which takes a monthly SIP of about ₹14,600.",
        "These are the example values in the Retirement Corpus Calculator, so you can try your own age, expenses and return assumptions there."
      ] },
      { h: "What to do if the number looks too high", p: [
        "Start earlier. Each extra year of investing reduces the monthly amount you need.",
        "Raise your SIP every year as your income grows. The Step-up SIP Calculator shows how much this helps.",
        "Revisit your assumptions. A lower expense target, a later retirement age or a more modest plan-to age all reduce the corpus.",
        "Check your plan once a year and adjust. A rough plan that you follow is more useful than a perfect plan that you do not."
      ] }
    ],
    faq: [
      ["What return should I assume after retirement?", "Most people choose a lower rate than before retirement, because they shift part of the money to safer assets. The Retirement Corpus Calculator lets you set the two rates separately."],
      ["Should I include my EPF, PPF or NPS?", "Yes. Add what you already have in these to the 'already saved' field, but only the part you are willing to count towards retirement."],
      ["Is this a financial plan?", "No. It is an estimate based on assumptions you control. For a full plan, talk to a registered financial adviser."]
    ]
  }
,
  {
    slug: "what-is-cagr-and-how-to-calculate-it",
    title: "What Is CAGR and How Do You Calculate It?",
    desc: "CAGR turns a messy investment journey into one yearly growth rate. Learn the formula, a worked example, and where CAGR can mislead.",
    calcs: ["cagr", "lumpsum", "sip", "inflation"],
    updated: "2026-11-11",
    sections: [
      { h: "What CAGR tells you", p: [
        "CAGR stands for compound annual growth rate. It is the single yearly rate that would take an investment from its starting value to its ending value, if it grew by the same percentage every year. Real investments never grow that evenly, so CAGR is a smoothed summary, not a record of what happened each year.",
        "It is useful because it lets you compare investments held for different lengths of time on the same footing, such as a fund held for 3 years against a stock held for 8."
      ] },
      { h: "The CAGR formula", p: [
        "CAGR = (Ending value ÷ Starting value)^(1 ÷ years) − 1",
        "Divide the ending value by the starting value, raise the result to the power of one over the number of years, and subtract 1. Multiply by 100 for a percentage."
      ] },
      { h: "Worked example", p: [
        "You invest ₹1,00,000 and it becomes ₹2,00,000 after 6 years. The ratio is 2, and 2^(1/6) is about 1.1225. So the CAGR is about 12.25% a year.",
        "A common shortcut, dividing the total gain of 100% by 6 years, gives 16.7% a year, which overstates the result because it ignores compounding. You can check any pair of values with the CAGR Calculator."
      ] },
      { h: "Where CAGR can mislead", p: [
        "CAGR hides the path. Two investments can have the same CAGR, but one may have fallen 40% along the way. It also depends heavily on the start and end dates you choose, so a result measured from a market low looks much better than one measured from a peak.",
        "CAGR does not work for a SIP, because money goes in at different times. For a series of instalments you need XIRR, which weighs each cash flow by its date. CAGR is meant for a single amount invested once.",
        "Finally, compare CAGR with inflation. A 6% CAGR in a year when prices rose 6% did not make you richer in real terms. The Inflation Calculator shows the gap."
      ] }
    ],
    faq: [
      ["Is CAGR the same as average annual return?", "No. The average of yearly returns ignores compounding, and it can be higher than the CAGR when returns swing up and down. CAGR is the rate that links the start and end values exactly."],
      ["What is a good CAGR?", "It depends on the asset, the period and the risk. Compare it with inflation and with alternatives such as an FD or an index fund over the same period."],
      ["Can I use CAGR for a SIP?", "Not accurately, because instalments are made on different dates. Use XIRR for a SIP."]
    ]
  },
  {
    slug: "how-emi-is-calculated",
    title: "How Is EMI Calculated? Formula, Example and Ways to Pay Less Interest",
    desc: "Understand the EMI formula with a worked home-loan example, see how much interest you really pay, and learn how prepayment shortens a loan.",
    calcs: ["emi", "inflation", "percentage", "fd"],
    updated: "2026-11-11",
    sections: [
      { h: "What an EMI is made of", p: [
        "An EMI (equated monthly instalment) is a fixed payment you make every month until a loan is repaid. Each payment has two parts: interest on the balance still owed, and a repayment of principal. In the early years most of the EMI is interest, and the share going to principal grows over time.",
        "That is why the loan balance falls slowly at first, and why the total interest on a long loan is so large."
      ] },
      { h: "The EMI formula", p: [
        "EMI = P × i × (1 + i)^n ÷ ((1 + i)^n − 1)",
        "P is the loan amount, i is the monthly interest rate (the yearly rate divided by 12), and n is the number of monthly instalments."
      ] },
      { h: "Worked example: a ₹10 lakh loan at 9% for 20 years", p: [
        "Here P = 10,00,000, i = 9% ÷ 12 = 0.75% and n = 240. The EMI works out to about ₹8,997 a month.",
        "Over 240 months you pay about ₹21.6 lakh in total, so roughly ₹11.6 lakh of it is interest. You pay back more in interest than the amount you borrowed. Try your own amount, rate and tenure in the EMI Calculator."
      ] },
      { h: "How a small prepayment changes the loan", p: [
        "Suppose you pay an extra ₹2,000 a month on the same loan, so ₹10,997 in total. The loan is cleared in about 12 years and 10 months instead of 20 years, and the total you pay falls to about ₹16.9 lakh. That saves roughly ₹4.7 lakh in interest.",
        "Prepayment works because every extra rupee reduces the balance on which interest is charged. The earlier in the loan you do it, the bigger the effect. Check whether your lender charges a prepayment fee, since rules differ by loan type and lender."
      ] },
      { h: "Choosing between a lower EMI and a lower total cost", p: [
        "A longer tenure lowers the EMI but raises total interest. A shorter tenure does the opposite. Pick the shortest tenure whose EMI you can pay comfortably, and keep an emergency fund so one bad month does not force you to miss a payment.",
        "If your loan has a floating rate, your EMI or tenure can change when the rate changes, so test a higher rate in the calculator too."
      ] }
    ],
    faq: [
      ["Does the EMI change during the loan?", "On a fixed-rate loan it stays the same. On a floating-rate loan, the lender may change the EMI or the tenure when the rate changes."],
      ["Are processing fees included in the EMI?", "No. Fees and insurance are separate, so add them when you compare offers."],
      ["Is it better to prepay a loan or invest the money?", "It depends on the loan's interest rate against the return you can expect after tax and risk. Prepaying gives a certain, risk-free saving equal to the loan rate."]
    ]
  },
  {
    slug: "fd-vs-rd",
    title: "FD vs RD: Differences, Example and Which to Choose",
    desc: "Compare fixed deposits and recurring deposits, see a worked example with maturity values, and learn which suits a lump sum and which suits a monthly saver.",
    calcs: ["fd", "rd", "sip", "inflation"],
    updated: "2026-11-11",
    sections: [
      { h: "The basic difference", p: [
        "A fixed deposit (FD) takes a lump sum today and pays it back with interest at the end of a fixed term. A recurring deposit (RD) takes a fixed amount every month and pays back the total with interest at maturity. Both pay a rate that is fixed when you open the account, and both are low in risk compared with market-linked investments.",
        "The choice is mostly about how your money arrives. If you have a sum available now, you use an FD. If you save from monthly income, you use an RD."
      ] },
      { h: "A worked example", p: [
        "Take a 5-year term, a 7% rate and quarterly compounding. An FD of ₹5,00,000 grows to about ₹7.07 lakh.",
        "An RD of ₹10,000 a month for the same 5 years means you deposit ₹6,00,000 in total and receive about ₹7.19 lakh, which is about ₹1.19 lakh of interest. The RD earns less interest per rupee than the FD, because each deposit stays in the account for a shorter time. Use the FD Calculator and the RD Calculator to run your own numbers."
      ] },
      { h: "Points to compare", p: [
        "Interest is taxable, added to your income and taxed at your slab rate, and banks may deduct tax at source above certain limits. Check the current rules.",
        "Withdrawing early usually costs you a penalty, so do not lock in money you may need soon.",
        "Rates differ between banks and for different tenures, and some offer more to senior citizens. Compare before you book.",
        "Deposits in banks are insured up to a limit per depositor per bank, so spread large amounts across banks. Check the current limit."
      ] },
      { h: "Beating inflation", p: [
        "A 7% FD that is taxed at 30% leaves about 4.9% after tax. If inflation runs near that level, your money barely grows in real terms. For goals more than five years away, many people add some market-linked investments alongside deposits. The Inflation Calculator shows how much purchasing power you can lose over time, and a SIP is the usual monthly alternative to an RD."
      ] }
    ],
    faq: [
      ["Which gives a better return, FD or RD?", "For the same rate and tenure, an FD earns more per rupee than an RD because the whole amount is invested from day one. They suit different situations, so the comparison is about cash flow, not just return."],
      ["Can I stop paying into an RD?", "Missing instalments usually brings a penalty, and the account may be closed early. Choose an amount you can keep paying."],
      ["Is the interest guaranteed?", "The rate is fixed when you open the account. As with any deposit, the safety depends on the institution and the insurance limit."]
    ]
  }
];
