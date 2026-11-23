// Explainer text for the seventh batch of calculators. Same rules as content.js: factual, and no figures that change (tax rates, limits, scheme rates).
module.exports = {
  "pe-ratio": {
    heading: "How to read a P/E ratio",
    intro: [
      "The price-to-earnings (P/E) ratio tells you how many rupees investors pay for each rupee of a company's yearly profit. A high P/E usually means the market expects strong growth. A low P/E can mean the stock is cheap, or that the business is facing problems.",
      "For example, a share at ₹1,200 with earnings per share of ₹60 has a P/E of 20. If earnings are expected to grow 15% a year, the PEG ratio is about 1.3, and the forward P/E on next year's earnings is about 17.4. Against a sector P/E of 22, the stock trades at about a 9% discount."
    ],
    faq: [
      ["What is a good P/E ratio?", "There is no single good number. Normal P/E levels differ widely between sectors and change with interest rates and market mood, so compare a stock with its own history and with similar companies."],
      ["What does the PEG ratio add?", "PEG divides the P/E by the expected growth rate. A PEG near 1 suggests the price is in line with growth, and much higher values suggest you are paying a lot for that growth."],
      ["Can the P/E ratio be negative?", "If a company made a loss, the P/E is negative and not meaningful. Use other measures, such as price to book or price to sales, for loss-making companies."]
    ]
  },
  "dividend-reinvestment": {
    heading: "How reinvesting dividends compounds your returns",
    intro: [
      "When you reinvest dividends, each payout buys more shares, which then earn their own dividends and price gains. Over long periods this compounding makes a noticeable difference compared with spending the dividends.",
      "For example, ₹1 lakh in a stock with a 3% dividend yield and 8% yearly price growth, with dividends taxed at 20%, grows to about ₹4.5 lakh in 15 years if dividends are reinvested. Taking the dividends as cash leaves about ₹3.9 lakh in total, so reinvesting adds about ₹65,000."
    ],
    faq: [
      ["Do Indian companies offer automatic dividend reinvestment?", "Most Indian shares pay dividends in cash to your bank account, so you reinvest them yourself by buying more shares. In mutual funds, the growth option compounds automatically, and many funds also offer an IDCW (income distribution) reinvestment option."],
      ["Is a high dividend yield always good?", "Not always. A very high yield can mean the share price has fallen because the business is struggling, and the dividend may be cut."],
      ["Are reinvested dividends still taxed?", "Yes. Dividends are taxed in the year you receive them, whether you spend or reinvest them."]
    ]
  },
  "asset-allocation": {
    heading: "How to choose your equity and debt mix",
    intro: [
      "Asset allocation is how you split your investments between growth assets such as equity and steadier ones such as FDs, PPF and debt funds. It has a bigger effect on your long-term returns and on how bumpy the ride feels than the choice of individual funds.",
      "A popular rule of thumb sets your equity share at a number minus your age: 100 for a conservative investor, 110 for a moderate one and 120 for an aggressive one. At 35, the 110 rule suggests 75% equity and 25% debt. With ₹6 lakh in equity and ₹4 lakh in debt, rebalancing means moving ₹1.5 lakh from debt to equity."
    ],
    faq: [
      ["How often should I rebalance?", "Once a year, or when your mix drifts more than about 5 percentage points from the target, is a common approach. Rebalancing too often can add tax and costs."],
      ["Is the age rule right for everyone?", "No. It is only a starting point. Someone with a stable income and long goals may hold more equity, and someone near a big expense may need more debt."],
      ["Where do gold and real estate fit?", "Many investors keep a small share in gold for diversification. Your own home is usually kept outside the investment mix because you live in it."]
    ]
  },
  "loan-tenure": {
    heading: "How your EMI decides the loan tenure",
    intro: [
      "For a given loan and rate, a higher EMI repays the loan faster and cuts the total interest sharply. This calculator works out how many months a loan will take at the EMI you can afford.",
      "For example, a ₹30 lakh loan at 8.5% with an EMI of ₹30,000 is repaid in 14 years and 7 months, with about ₹22.4 lakh of interest. The first month's interest alone is ₹21,250, so any EMI below that would never repay the loan."
    ],
    faq: [
      ["Is a shorter tenure always better?", "It saves interest, but a higher EMI must fit your budget comfortably, with room for savings and emergencies."],
      ["Can I change my EMI later?", "Many lenders let you raise your EMI or make prepayments, which shortens the tenure. Use the Home Loan Prepayment Calculator to see the effect."],
      ["Why is the last EMI smaller?", "The tenure rarely works out to a whole number of EMIs, so the final payment only covers what is left of the loan."]
    ]
  },
  "bond-yield": {
    heading: "How bond yields work",
    intro: [
      "A bond pays a fixed coupon on its face value and returns the face value at maturity. When you buy it below face value, you also gain the difference at maturity, so your total return is more than the coupon rate. Yield to maturity (YTM) combines both into one yearly rate.",
      "For example, a ₹1,000 bond with a 7.5% coupon paid twice a year, bought at ₹980 with 5 years left, has a current yield of about 7.65% and a YTM of about 8%. If you pay exactly face value, the YTM equals the coupon rate."
    ],
    faq: [
      ["Why do bond prices fall when interest rates rise?", "New bonds then pay higher coupons, so existing bonds with lower coupons are worth less. Their prices fall until their yield matches the market."],
      ["What is the difference between current yield and YTM?", "Current yield only looks at the coupon against today's price. YTM also counts the gain or loss to face value at maturity and the time value of each payment."],
      ["How is bond interest taxed?", "Coupons are usually taxed at your slab rate. Gains on selling a bond are taxed under capital gains rules, which depend on the type of bond and how long you hold it."]
    ]
  },
  "rent-vs-buy": {
    heading: "Rent or buy a home: comparing the numbers fairly",
    intro: [
      "Buying a home builds equity, but it ties up a large down payment and adds buying costs and interest. Renting keeps that money free to invest. A fair comparison asks which choice leaves you with more wealth after the same number of years.",
      "For example, for an ₹80 lakh home with 20% down, an 8.5% loan over 20 years and rent of ₹25,000 a month rising 5% a year, the renter who invests the down payment and the monthly gap at 10% ends about ₹1 crore ahead, if the home's value rises 5% a year. At ₹45,000 rent, buying ends well ahead instead."
    ],
    faq: [
      ["Why does renting often win on paper?", "In many Indian cities, rent is a small fraction of the home's price, while the EMI is much larger. If the renter invests the difference steadily, it can grow to more than the home's value."],
      ["What does this calculator leave out?", "Maintenance, property tax, home loan tax benefits, selling costs and the emotional value of owning a home. The renter also has to actually invest the difference every month."],
      ["Which inputs matter most?", "The rent compared with the home price, the yearly rise in home value, and the return on investments. Try a few values for each to see when the answer changes."]
    ]
  },
  "salary-hike": {
    heading: "How to work out a salary hike, and whether it beats inflation",
    intro: [
      "A salary hike is usually quoted as a percentage of your current pay. To know what it means for your budget, it helps to see it in rupees a month, and to compare it with inflation, which reduces what each rupee can buy.",
      "For example, a 10% hike on ₹12 lakh a year adds ₹1.2 lakh a year, or ₹10,000 a month. With inflation at 6%, the real hike, the increase in buying power, is about 3.8%."
    ],
    faq: [
      ["How do I calculate the hike percentage between two salaries?", "Divide the increase by the old salary and multiply by 100. For example, going from ₹10 lakh to ₹11.5 lakh is a 15% hike."],
      ["Why is my in-hand increase smaller than the hike?", "Tax, provident fund and other deductions rise with your salary, and a higher income can move part of it into a higher tax slab."],
      ["What is a good salary hike?", "One that beats inflation clearly. A hike equal to inflation only keeps your buying power the same."]
    ]
  },
  "profit-margin": {
    heading: "Margin vs markup: how to price for profit",
    intro: [
      "Margin and markup both describe profit, but on different bases. Margin is profit as a share of the selling price. Markup is profit as a share of the cost. Mixing them up is a common pricing mistake.",
      "For example, an item that costs ₹800 and sells for ₹1,000 makes ₹200 profit. That is a 25% markup on cost but a 20% margin on the price. To earn a 30% margin, it would need to sell for about ₹1,143."
    ],
    faq: [
      ["How do I convert markup to margin?", "Margin = markup ÷ (1 + markup). A 25% markup is a 20% margin, and a 50% markup is a 33.3% margin."],
      ["Should cost include overheads?", "For a true profit margin, include all the costs of making and selling each unit, not just the purchase price."],
      ["Is GST part of the selling price here?", "No. Work out margins on prices before GST, because the GST you collect is passed on to the government."]
    ]
  }
};
