// Explainer text for the third batch of calculators. Same rules as content.js: factual, and no figures that change (tax rates, limits, scheme rates).
module.exports = {
  "options-pl": {
    heading: "How option profit and loss works at expiry",
    intro: [
      "An option buyer pays a premium for the right to buy (call) or sell (put) at the strike price. At expiry, a call is worth the amount by which the price is above the strike, and a put is worth the amount by which it is below. If the option ends out of the money it expires worthless, and the buyer loses the premium.",
      "The seller receives the premium and takes the other side, so the seller's profit is the buyer's loss. For example, buying one lot of 250 calls at a 1,500 strike for a premium of ₹40 costs ₹10,000. If the price at expiry is 1,600, the call is worth ₹100 a share, for a profit of ₹15,000. Below the break-even price of 1,540, the trade loses money."
    ],
    faq: [
      ["What is the break-even price of an option?", "For a call, it is the strike plus the premium paid. For a put, it is the strike minus the premium. At expiry the buyer makes money only beyond that price."],
      ["What is the most an option buyer can lose?", "The premium paid. A seller's loss is not limited in the same way, which is why exchanges ask option sellers for margin."],
      ["Does this include charges and taxes?", "No. Brokerage, STT, exchange charges, GST and stamp duty reduce the profit, so use the Brokerage & Charges Calculator to estimate them. The result also shows only the value at expiry, not before it."]
    ]
  },
  "direct-vs-regular": {
    heading: "Direct vs regular mutual fund plans",
    intro: [
      "Every mutual fund scheme comes in two plans that hold the same investments. A regular plan is bought through a distributor and pays them a commission out of the fund's expenses. A direct plan is bought straight from the fund house or a direct platform, so its expense ratio is lower and more of the return stays with you.",
      "A difference of 1% a year sounds small, but it compounds. For example, ₹10,000 a month for 20 years at a 12% return before costs grows to about ₹93 lakh in a plan with a 0.5% expense ratio, but about ₹82 lakh with a 1.5% ratio. That is roughly ₹11.6 lakh less for the same investments."
    ],
    faq: [
      ["Do direct and regular plans hold the same stocks?", "Yes. Both plans of a scheme share the same portfolio and fund manager. Only the expense ratio, and therefore the NAV and returns, differ."],
      ["Where can I find a fund's expense ratio?", "It is published on the fund house's website and in the scheme's factsheet, and it can change, so check the current figure before you compare."],
      ["Is a regular plan ever worth it?", "It can be if you value the advice and service you get from the distributor. The calculator shows what that service costs over time, so you can judge whether it is worth it."]
    ]
  },
  "flat-vs-reducing": {
    heading: "Why a flat interest rate costs more than it looks",
    intro: [
      "With a flat rate, interest is charged on the full loan amount for the whole tenure, even though you repay part of the principal every month. With a reducing-balance rate, interest is charged only on what you still owe. That is why a flat rate always works out to a much higher real rate.",
      "For example, a ₹5 lakh loan at a 10% flat rate for 3 years has ₹1.5 lakh of interest and an EMI of about ₹18,056. The same EMIs on a reducing balance correspond to a rate of about 17.9% a year. Comparing loans only makes sense once both rates are on a reducing basis."
    ],
    faq: [
      ["Which loans use flat rates?", "Flat rates are sometimes quoted for personal loans, vehicle loans, consumer durable loans and some microfinance loans. Home loans from banks are normally on a reducing balance."],
      ["Is there a quick rule to convert a flat rate?", "For common tenures, the reducing rate is roughly 1.7 to 1.9 times the flat rate. The calculator works out the exact figure."],
      ["What should I compare when choosing a loan?", "Compare the reducing-balance rate or the annual percentage rate including fees, along with the EMI and the total amount payable."]
    ]
  },
  ssy: {
    heading: "How the Sukanya Samriddhi Yojana grows",
    intro: [
      "Sukanya Samriddhi Yojana is a government-backed savings scheme for a girl child. A parent or guardian can open the account before she turns 10 and deposit money for 15 years. The account matures 21 years after it is opened, so the balance keeps earning interest for 6 more years after the last deposit.",
      "Deposits qualify for a tax deduction under the old tax regime, and both the interest and the maturity amount are tax-free. The interest rate is set by the government each quarter, so the final amount depends on how rates move over the years."
    ],
    faq: [
      ["Can I withdraw money before maturity?", "Up to half of the balance can be withdrawn for the girl's higher education once she turns 18 or passes Class 10. The account can also be closed early in specific cases, such as her marriage after she turns 18."],
      ["What happens if I miss a yearly deposit?", "The account is treated as defaulted. It can usually be revived by paying a small penalty along with the missed minimum deposits."],
      ["How many accounts can I open?", "Normally one per girl, and up to two per family, with exceptions for twins or triplets."]
    ]
  },
  nps: {
    heading: "How NPS builds a retirement corpus and pension",
    intro: [
      "The National Pension System is a market-linked retirement scheme regulated by PFRDA. Your contributions are invested in a mix of equity, corporate bonds and government securities, and the corpus grows until you retire.",
      "At retirement, part of the corpus must be used to buy an annuity, which pays you a monthly pension, and the rest can be taken as a lump sum. The calculator splits the corpus using the annuity share you enter and estimates the pension from the annuity rate."
    ],
    faq: [
      ["Is the NPS return guaranteed?", "No. NPS returns depend on the markets and the funds you choose. Try a range of returns to see how the corpus could vary."],
      ["Is the annuity pension taxable?", "Yes. Annuity income is taxed as income in the year you receive it. The tax treatment of the lump sum is set by law, so check the current rules."],
      ["Can I withdraw from NPS before retirement?", "Partial withdrawals are allowed for specific needs after a minimum period, and there are rules for exiting early. PFRDA revises these rules from time to time."]
    ]
  },
  epf: {
    heading: "How your EPF balance grows",
    intro: [
      "The Employees' Provident Fund is a retirement savings scheme for salaried employees. Each month you contribute a share of your basic pay and dearness allowance, and your employer contributes too. Part of the employer's share goes to the Employees' Pension Scheme (EPS), and the rest goes into your EPF account.",
      "Interest is declared each year by the EPFO. It is calculated on the monthly running balance and credited at the end of the financial year. Because contributions rise with your salary and interest compounds every year, the balance grows much faster in later years."
    ],
    faq: [
      ["Why is the employer's EPF share lower than mine?", "The employer's total contribution matches yours, but part of it goes to the pension scheme (EPS), which pays a monthly pension later instead of building your EPF balance."],
      ["Can I withdraw EPF before retirement?", "Partial withdrawals are allowed for purposes such as a house, medical treatment, education or marriage, subject to conditions. You can also withdraw the balance after leaving a job, within the rules."],
      ["Should I contribute more through VPF?", "The Voluntary Provident Fund lets you contribute more than the required share at the same interest rate. It suits people who want safe, long-term savings, but the money is locked in like EPF."]
    ]
  },
  gratuity: {
    heading: "How gratuity is calculated in India",
    intro: [
      "Gratuity is a lump sum an employer pays when you leave after long service, retire, or in case of death or disability. Under gratuity law (the Payment of Gratuity Act, now part of the Code on Social Security), you are normally eligible after 5 years of continuous service with the same employer, and fixed-term employees may qualify sooner.",
      "For covered employers, gratuity is 15 days' wages for each year of service, where a month is taken as 26 working days. For example, with a last drawn basic pay plus DA of ₹50,000 and 10 years of service, the gratuity is ₹50,000 × 15 ÷ 26 × 10, about ₹2.88 lakh."
    ],
    faq: [
      ["Does a part year of service count?", "Under gratuity law, service of more than 6 months in the final year is rounded up to a full year. So 9 years and 7 months counts as 10 years."],
      ["Is gratuity taxable?", "Gratuity is tax-free up to a limit set by law, and any amount above it is taxed as salary. Government employees have different rules. Enter the current limit in the calculator."],
      ["What if my employer is not covered?", "Employers outside gratuity law may still pay gratuity, usually as half a month's salary for each completed year of service. The calculator shows this figure too."]
    ]
  },
  hra: {
    heading: "How the HRA exemption is worked out",
    intro: [
      "If your salary includes a house rent allowance and you pay rent, part of the HRA can be tax-free under the old tax regime. The exemption is the smallest of three amounts: the HRA you actually received, the rent you paid minus 10% of your basic salary, and 50% of basic salary if you live in Delhi, Mumbai, Kolkata or Chennai, or 40% elsewhere.",
      "For example, with a basic salary of ₹5 lakh, HRA of ₹2.5 lakh and rent of ₹3 lakh a year, the whole ₹2.5 lakh is tax-free in a metro city, but only ₹2 lakh is tax-free in other cities, because the 40% limit is lower."
    ],
    faq: [
      ["Can I claim HRA under the new tax regime?", "No. The HRA exemption is available only if you choose the old tax regime."],
      ["What proof do I need?", "Employers usually ask for rent receipts, and the landlord's PAN if the rent is above the threshold set in the rules. Keep a rent agreement too."],
      ["Can I claim HRA if I pay rent to my parents?", "Yes, if you genuinely pay them rent and they show it as income in their tax return. You cannot claim it for rent paid to your spouse."]
    ]
  }
};
