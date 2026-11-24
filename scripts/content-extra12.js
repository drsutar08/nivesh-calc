// Explainer text for the income tax calculator. The example names the financial year because tax rates change with each Budget.
module.exports = {
  "income-tax": {
    heading: "Old vs new tax regime: which one should you choose?",
    intro: [
      "Individuals in India can choose between two ways of calculating income tax. The new regime is the default. It has lower slab rates and a larger rebate, but it allows very few deductions. The old regime has higher rates but lets you subtract deductions such as 80C investments, health insurance, HRA and home loan interest. Which one costs less depends on how much you can claim in deductions.",
      "For example, at FY 2026-27 rates, a salary of ₹15 lakh with ₹1.75 lakh of deductions is taxed about ₹97,500 under the new regime and about ₹2.03 lakh under the old one. The old regime would only win with about ₹3.7 lakh more in deductions, which is why most people with modest deductions now pay less under the new regime."
    ],
    faq: [
      ["Can I switch between the regimes every year?", "Salaried individuals without business income can choose either regime each year when filing their return. Those with business income have more limited options to switch."],
      ["Which deductions are allowed in the new regime?", "Very few. The standard deduction for salaried people and the employer's contribution to NPS are allowed, but most others, such as 80C, 80D, HRA and home loan interest on a self-occupied home, are not."],
      ["Does this include capital gains?", "No. Capital gains on shares and mutual funds are taxed at separate rates and are not part of this calculation. Use the Capital Gains Tax Calculator for those."]
    ]
  }
};
