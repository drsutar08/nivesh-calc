const inr = (v,d=2)=> isFinite(v) ? "₹" + v.toLocaleString("en-IN",{minimumFractionDigits:d,maximumFractionDigits:d}) : "—";
const num = (v,d=2)=> isFinite(v) ? v.toLocaleString("en-IN",{maximumFractionDigits:d}) : "—";
const pct = (v,d=2)=> isFinite(v) ? v.toFixed(d) + "%" : "—";
const sign = v => v>0 ? "gain" : v<0 ? "loss" : "";

const slugOf = n => n.toLowerCase().replace(/&/g,"and").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");
const pathOf = c => c.id==="average" ? "./" : (c.id==="about"?"about-us":c.id==="contact"?"contact-us":slugOf(c.name))+"/";

const CALCS = [
 {id:"average",group:"Stocks",ic:"x̄",name:"Stock Average Calculator",lede:"Add every lot you bought and see your new average buy price.",
  lots:[[50,1200],[30,980]],
  formula:"Average price = total amount invested ÷ total units held. For example, 50 units at ₹1,200 and 30 units at ₹980 give <code>(60,000 + 29,400) ÷ 80 = ₹1,117.50</code>."},
 {id:"profit-loss",group:"Stocks",ic:"±",name:"Stock Profit/Loss Calculator",lede:"Find your gain or loss on a trade, after brokerage and charges.",
  fields:[["qty","Quantity",100,"units"],["buy","Buy price",450,"₹"],["sell","Sell price",512.5,"₹"],["chg","Charges (both legs)",0.1,"%"]],
  calc:f=>{const bv=f.qty*f.buy, sv=f.qty*f.sell, c=(bv+sv)*f.chg/100, net=sv-bv-c;
    return {hero:["Net profit / loss",inr(net),sign(net)],rows:[["Buy value",inr(bv)],["Sell value",inr(sv)],["Gross P/L",inr(sv-bv),sign(sv-bv)],["Charges",inr(c)],["Return on investment",pct(net/bv*100),sign(net)],["Break-even sell price",inr(f.buy*(1+f.chg/100)/(1-f.chg/100))]]}},
  formula:"Net P/L = (sell price − buy price) × quantity − charges. Charges are applied as a percentage of the buy value plus the sell value."},
 {id:"split",group:"Stocks",ic:"÷",name:"Stock Split Calculator",lede:"See your new share count and adjusted average after a split.",
  fields:[["held","Shares held",40,"units"],["avg","Average buy price",2400,"₹"],["from","Old face value",10,"₹"],["to","New face value",2,"₹"]],
  calc:f=>{const r=f.from/f.to, ns=f.held*r, na=f.avg/r;
    return {hero:["New share count",num(ns,4)],rows:[["Split ratio",`1 : ${num(r,4)}`],["New average price",inr(na)],["Investment value (unchanged)",inr(f.held*f.avg)]]}},
  formula:"Split ratio = old face value ÷ new face value. New shares = shares held × ratio, and new average = old average ÷ ratio. Your total investment stays the same."},
 {id:"bonus",group:"Stocks",ic:"+",name:"Bonus Share Calculator",lede:"Work out the bonus shares you'll receive and your adjusted cost.",
  fields:[["held","Shares held",75,"units"],["avg","Average buy price",860,"₹"],["a","Bonus shares",1,"get"],["b","For every",2,"held"]],
  calc:f=>{const bonus=Math.floor(f.held*f.a/f.b), tot=f.held+bonus;
    return {hero:["Bonus shares received",num(bonus,0)],rows:[["Total shares after bonus",num(tot,0)],["New average price",inr(f.held*f.avg/tot)],["Fractional entitlement dropped",num(f.held*f.a/f.b-bonus,4)]]}},
  formula:"Bonus shares = shares held × (bonus ÷ for every), rounded down, since fractional entitlements are usually not credited. New average = total cost ÷ total shares."},
 {id:"dividend",group:"Stocks",ic:"₹%",name:"Dividend Calculator",lede:"See the dividend income, tax and yield on your holding.",
  fields:[["held","Shares held",200,"units"],["dps","Dividend per share",12,"₹"],["avg","Average buy price",450,"₹"],["cmp","Current market price",520,"₹"],["tax","Tax on dividend (your slab)",30,"%"]],
  calc:f=>{const g=f.held*f.dps, t=g*f.tax/100, n=g-t;
    return {hero:["Net dividend after tax",inr(n),"gain"],rows:[["Gross dividend",inr(g)],["Tax deducted",inr(t),f.tax>0?"loss":""],["Yield on current price",pct(f.dps/f.cmp*100)],["Yield on your cost",pct(f.dps/f.avg*100)],["Net yield on your cost",pct(n/(f.held*f.avg)*100)]]}},
  formula:"Gross dividend = shares × dividend per share. Dividends are taxed at your income-tax slab rate. Yield on cost = dividend per share ÷ your average buy price."},
 {id:"buyback",group:"Stocks",ic:"⇄",name:"Buyback Calculator",lede:"Estimate what you receive if your shares are accepted in a company buyback.",
  fields:[["held","Shares held",500,"units"],["avg","Average buy price",1400,"₹"],["bp","Buyback price",1800,"₹"],["acc","Acceptance ratio",30,"%"]],
  calc:f=>{const ta=Math.min(f.held,Math.floor(f.held*f.acc/100)), pr=ta*f.bp, cost=ta*f.avg, pl=pr-cost;
    return {hero:["Buyback proceeds",inr(pr)],rows:[["Shares accepted",num(ta,0)],["Shares left with you",num(f.held-ta,0)],["Cost of accepted shares",inr(cost)],["Gain / loss on accepted shares",inr(pl),sign(pl)],["Return on accepted shares",pct(pl/cost*100),sign(pl)]]}},
  formula:"Accepted shares = shares you tender × acceptance ratio, rounded down. This assumes you tender your whole holding. Tax treatment of buybacks differs by period and holder, so check current rules."},
 {id:"demerger",group:"Stocks",ic:"✂",name:"Demerger Calculator",lede:"Split your cost between the parent company and the demerged company.",
  fields:[["held","Parent shares held",100,"units"],["avg","Average buy price",1000,"₹"],["a","New shares received",1,"get"],["b","For every",1,"held"],["pct","Cost attributed to demerged business",20,"%"]],
  calc:f=>{const cost=f.held*f.avg, ns=Math.floor(f.held*f.a/f.b), dc=cost*f.pct/100, pc=cost-dc;
    return {hero:["New parent average price",inr(pc/f.held)],rows:[["Demerged shares received",num(ns,0)],["Demerged company average price",ns?inr(dc/ns):"—"],["Cost moved to demerged shares",inr(dc)],["Cost left in parent shares",inr(pc)],["Total cost (unchanged)",inr(cost)]]}},
  formula:"Your total cost stays the same. It is split in the ratio of the cost-attribution percentage announced in the demerger scheme. Parent average = remaining cost ÷ parent shares, and demerged average = allocated cost ÷ new shares."},
 {id:"brokerage",group:"Stocks",ic:"₹−",name:"Brokerage & Charges Calculator",lede:"Break down every charge on a trade and find your true break-even price.",
  zeroOk:["brk","stt","exch","sebi","stamp","gst"],
  fields:[["qty","Quantity",100,"units"],["buy","Buy price",450,"₹"],["sell","Sell price",460,"₹"],["brk","Brokerage per order",20,"₹"],["stt","STT on sell value",0.025,"%"],["exch","Exchange charges (both legs)",0.00297,"%"],["sebi","SEBI fee (both legs)",0.0001,"%"],["stamp","Stamp duty on buy value",0.003,"%"],["gst","GST on brokerage and fees",18,"%"]],
  calc:f=>{const bv=f.qty*f.buy, sv=f.qty*f.sell, b2=2*f.brk, a=(f.exch+f.sebi)/100, g=f.gst/100,
      txn=(bv+sv)*f.exch/100, sebi=(bv+sv)*f.sebi/100, gst=(b2+txn+sebi)*g, stt=sv*f.stt/100, stamp=bv*f.stamp/100,
      tot=b2+txn+sebi+gst+stt+stamp, gross=sv-bv, net=gross-tot,
      den=1-a*(1+g)-f.stt/100, be=(bv+b2*(1+g)+bv*a*(1+g)+bv*f.stamp/100)/den/f.qty;
    return {hero:["Net profit / loss",inr(net),sign(net)],rows:[["Gross profit / loss",inr(gross),sign(gross)],["Brokerage (2 orders)",inr(b2)],["STT",inr(stt)],["Exchange charges",inr(txn)],["SEBI fee",inr(sebi)],["GST",inr(gst)],["Stamp duty",inr(stamp)],["Total charges",inr(tot),"loss"],["Break-even sell price",inr(be)]]}},
  formula:"Net P/L = (sell − buy) × quantity − total charges. GST applies to brokerage, exchange charges and the SEBI fee. The rates shown are an intraday-style example, so replace them with the rates on your broker's charge sheet, and check the current STT and stamp duty for delivery trades."},
 {id:"capital-gains",group:"Stocks",ic:"Δ₹",name:"Capital Gains Tax Calculator",lede:"Estimate short-term or long-term capital gains tax on listed shares.",
  zeroOk:["ex"],
  fields:[["qty","Quantity",100,"units"],["buy","Buy price",1000,"₹"],["sell","Sell price",1800,"₹"],["m","Holding period",18,"months"],["thr","Long-term after",12,"months"],["stcg","Short-term tax rate",20,"%"],["ltcg","Long-term tax rate",12.5,"%"],["ex","Long-term yearly exemption",125000,"₹"]],
  calc:f=>{const gain=(f.sell-f.buy)*f.qty, lt=f.m>=f.thr, taxable=gain<=0?0:lt?Math.max(0,gain-f.ex):gain, tax=taxable*(lt?f.ltcg:f.stcg)/100;
    return {hero:["Estimated tax",inr(tax),tax>0?"loss":""],rows:[["Type of gain",lt?"Long-term":"Short-term"],["Capital gain / loss",inr(gain),sign(gain)],["Taxable gain",inr(taxable)],["Rate applied",pct(lt?f.ltcg:f.stcg,1)],["Gain after tax",inr(gain-tax),sign(gain-tax)]],note:gain<0?"A loss can usually be set off against gains. Check the carry-forward rules.":"The exemption applies to your total long-term gains in the year, not to each sale. Surcharge, cess and charges are not included."}},
  formula:"Tax = taxable gain × rate. A holding kept longer than the long-term threshold is taxed at the long-term rate after the yearly exemption; otherwise the short-term rate applies. The defaults reflect rates for listed equity at the time of writing, so confirm the current rates before you rely on this."},
 {id:"position-size",group:"Stocks",ic:"⚖",name:"Position Size & Risk Calculator",lede:"Decide how many shares to buy so a stop-loss costs only what you can afford.",
  fields:[["cap","Trading capital",500000,"₹"],["risk","Risk per trade",1,"%"],["entry","Entry price",250,"₹"],["stop","Stop-loss price",240,"₹"],["target","Target price",280,"₹"]],
  calc:f=>{ if(f.stop>=f.entry) return {hero:["Shares to buy","—"],rows:[],note:"For a buy trade, the stop-loss must be below the entry price."};
    const ra=f.cap*f.risk/100, per=f.entry-f.stop, qty=Math.min(Math.floor(ra/per),Math.floor(f.cap/f.entry)), loss=qty*per, prof=qty*(f.target-f.entry), pv=qty*f.entry;
    return {hero:["Shares to buy",num(qty,0)],rows:[["Money at risk",inr(loss),"loss"],["Position value",inr(pv)],["Share of capital",pct(pv/f.cap*100)],["Potential profit at target",inr(prof),sign(prof)],["Risk : reward",f.target>f.entry?`1 : ${num((f.target-f.entry)/per)}`:"—"]],note:f.target<=f.entry?"Set a target above the entry price to see the reward.":null}},
  formula:"Money you can risk = capital × risk %. Shares = money you can risk ÷ (entry − stop-loss), limited by the shares your capital can buy. Risk : reward = (target − entry) ÷ (entry − stop-loss)."},
 {id:"sip",group:"Mutual funds",ic:"↻",name:"SIP Calculator",lede:"Estimate what a monthly investment grows to over time.",
  fields:[["p","Monthly investment",10000,"₹"],["r","Expected return (p.a.)",12,"%"],["y","Duration",15,"years"]],
  calc:f=>{const i=f.r/1200,n=f.y*12, fv= i? f.p*((Math.pow(1+i,n)-1)/i)*(1+i) : f.p*n, inv=f.p*n;
    return {hero:["Estimated value",inr(fv,0)],rows:[["Amount invested",inr(inv,0)],["Estimated returns",inr(fv-inv,0),"gain"],["Wealth multiple",num(fv/inv)+"×"]],bar:[inv,fv-inv]}},
  formula:"FV = P × [((1 + i)<sup>n</sup> − 1) ÷ i] × (1 + i), where i is the monthly rate and n is the number of monthly instalments, each invested at the start of the month."},
 {id:"stepup-sip",group:"Mutual funds",ic:"↑",name:"Step-up SIP Calculator",lede:"See how raising your SIP every year grows the final corpus.",
  zeroOk:["s"],
  fields:[["p","Starting monthly SIP",10000,"₹"],["s","Yearly step-up",10,"%"],["r","Expected return (p.a.)",12,"%"],["y","Duration",15,"years"]],
  calc:f=>{const i=f.r/1200, yrs=Math.round(f.y); let fv=0, inv=0, m=Math.max(1,yrs)*12, sip=f.p;
    for(let k=0;k<m;k++){ if(k>0&&k%12===0) sip*=1+f.s/100; fv=(fv+sip)*(1+i); inv+=sip; }
    const flat=f.p*((Math.pow(1+i,m)-1)/i)*(1+i);
    return {hero:["Estimated value",inr(fv,0)],rows:[["Amount invested",inr(inv,0)],["Estimated returns",inr(fv-inv,0),"gain"],["SIP in the final year",inr(sip,0)],["Value with a flat SIP",inr(flat,0)],["Extra from stepping up",inr(fv-flat,0),"gain"]],bar:[inv,fv-inv]}},
  formula:"Each month the instalment is added at the start of the month and grows at the monthly rate. After every 12 months the instalment is raised by the step-up percentage. Duration is rounded to whole years."},
 {id:"goal-planner",group:"Mutual funds",ic:"◎",name:"Goal Planner",lede:"Find the monthly SIP you need to reach a future goal, allowing for inflation.",
  zeroOk:["have","inf"],
  fields:[["goal","Goal cost today",5000000,"₹"],["y","Years to goal",10,"years"],["inf","Inflation (p.a.)",6,"%"],["r","Expected return (p.a.)",12,"%"],["have","Already saved for this goal",200000,"₹"]],
  calc:f=>{const n=Math.round(f.y*12), i=f.r/1200, fvGoal=f.goal*Math.pow(1+f.inf/100,n/12), fvHave=f.have*Math.pow(1+i,n),
      need=Math.max(0,fvGoal-fvHave), sip=need*i/((Math.pow(1+i,n)-1)*(1+i)), inv=sip*n;
    return {hero:["Monthly SIP needed",inr(sip,0)],rows:[["Goal cost after inflation",inr(fvGoal,0)],["Your savings will grow to",inr(fvHave,0)],["Shortfall to cover with SIP",inr(need,0)],["Total you will invest",inr(inv,0)],["SIP growth",inr(need-inv,0),"gain"]],note:need===0?"Your existing savings already cover this goal.":null}},
  formula:"Goal after inflation = today's cost × (1 + inflation)<sup>years</sup>. Existing savings grow at the expected return. The SIP covers the shortfall: SIP = shortfall × i ÷ [((1 + i)<sup>n</sup> − 1) × (1 + i)], with instalments at the start of each month."},
 {id:"lumpsum",group:"Mutual funds",ic:"▣",name:"Lumpsum Calculator",lede:"Project the future value of a one-time investment.",
  fields:[["p","Investment amount",500000,"₹"],["r","Expected return (p.a.)",11,"%"],["y","Duration",10,"years"]],
  calc:f=>{const fv=f.p*Math.pow(1+f.r/100,f.y);
    return {hero:["Estimated value",inr(fv,0)],rows:[["Amount invested",inr(f.p,0)],["Estimated returns",inr(fv-f.p,0),"gain"]],bar:[f.p,fv-f.p]}},
  formula:"FV = P × (1 + r)<sup>t</sup>, compounded once a year."},
 {id:"swp",group:"Mutual funds",ic:"↘",name:"SWP Calculator",lede:"Check how long a corpus lasts with fixed monthly withdrawals.",
  fields:[["c","Starting corpus",2500000,"₹"],["w","Monthly withdrawal",20000,"₹"],["r","Expected return (p.a.)",8,"%"],["y","Duration",15,"years"]],
  calc:f=>{let b=f.c,i=f.r/1200,out=0,m=0,end=null;for(m=1;m<=f.y*12;m++){b*=1+i;const take=Math.min(f.w,b);b-=take;out+=take;if(b<=0){end=m;b=0;break}}
    return {hero:["Balance after "+f.y+" years",inr(b,0)],rows:[["Total withdrawn",inr(out,0)],["Corpus lasts",end?`${Math.floor(end/12)} yr ${end%12} mo`:"Full duration",end?"loss":"gain"],["Growth on corpus",inr(b+out-f.c,0),sign(b+out-f.c)]],
      note:end?"Withdrawals exceed growth, so the corpus runs out before the end of the period.":null}},
  formula:"Each month the balance grows at the monthly rate, then the withdrawal is taken out. The simulation repeats until the period ends or the balance reaches zero."},
 {id:"retirement",group:"Mutual funds",ic:"☂",name:"Retirement Corpus Calculator",lede:"Estimate the corpus you need at retirement and the monthly SIP to build it.",
  zeroOk:["have"],
  fields:[["age","Your age now",30,"years"],["ret","Retirement age",60,"years"],["life","Plan to age",85,"years"],["exp","Monthly expenses today",50000,"₹"],["inf","Inflation (p.a.)",6,"%"],["rpre","Return before retirement",12,"%"],["rpost","Return after retirement",8,"%"],["have","Already saved for retirement",500000,"₹"]],
  calc:f=>{ if(!(f.ret>f.age&&f.life>f.ret)) return {hero:["Corpus needed","—"],rows:[],note:"Retirement age must be above your age, and the plan-to age above retirement age."};
    const yb=f.ret-f.age, yr=f.life-f.ret, e=f.exp*12*Math.pow(1+f.inf/100,yb), g=(1+f.rpost/100)/(1+f.inf/100)-1,
      corpus=Math.abs(g)<1e-9?e*yr:e*(1-Math.pow(1+g,-yr))/g*(1+g), i=f.rpre/1200, n=yb*12,
      need=Math.max(0,corpus-f.have*Math.pow(1+i,n)), sip=need*i/((Math.pow(1+i,n)-1)*(1+i));
    return {hero:["Corpus needed at retirement",inr(corpus,0)],rows:[["Monthly expenses at retirement",inr(e/12,0)],["Savings will grow to",inr(f.have*Math.pow(1+i,n),0)],["Monthly SIP needed",inr(sip,0),"gain"],["Years to retirement",num(yb,0)],["Years of retirement",num(yr,0)]],note:need===0?"Your existing savings already cover the corpus.":null}},
  formula:"Expenses at retirement = today's expenses × (1 + inflation)<sup>years to retirement</sup>. The corpus is the present value of those expenses, rising with inflation, over your retirement years, discounted at the post-retirement return. The SIP covers what your current savings will not."},
 {id:"emi",group:"Loans & growth",ic:"≡",name:"EMI Calculator",lede:"Find the monthly instalment and total interest on a loan.",
  fields:[["p","Loan amount",3000000,"₹"],["r","Interest rate (p.a.)",8.5,"%"],["y","Tenure",20,"years"]],
  calc:f=>{const i=f.r/1200,n=f.y*12,e= i? f.p*i*Math.pow(1+i,n)/(Math.pow(1+i,n)-1) : f.p/n,tot=e*n;
    return {hero:["Monthly EMI",inr(e,0)],rows:[["Principal",inr(f.p,0)],["Total interest",inr(tot-f.p,0),"loss"],["Total payable",inr(tot,0)]],bar:[f.p,tot-f.p],barLabels:["Principal","Interest"]}},
  formula:"EMI = P × i × (1 + i)<sup>n</sup> ÷ ((1 + i)<sup>n</sup> − 1), where i is the monthly interest rate and n is the tenure in months."},
 {id:"cagr",group:"Loans & growth",ic:"↗",name:"CAGR Calculator",lede:"Get the compound annual growth rate between two values.",
  fields:[["a","Initial value",100000,"₹"],["b","Final value",240000,"₹"],["y","Duration",6,"years"]],
  calc:f=>{const c=(Math.pow(f.b/f.a,1/f.y)-1)*100;
    return {hero:["CAGR",pct(c),sign(c)],rows:[["Absolute return",pct((f.b/f.a-1)*100),sign(f.b-f.a)],["Gain",inr(f.b-f.a,0),sign(f.b-f.a)]]}},
  formula:"CAGR = (final value ÷ initial value)<sup>1/years</sup> − 1."},
 {id:"rule-of-72",group:"Loans & growth",ic:"72",name:"Rule of 72 Calculator",lede:"See roughly how many years it takes to double your money.",
  fields:[["r","Annual return",9,"%"]],
  calc:f=>{const q=72/f.r, ex=Math.log(2)/Math.log(1+f.r/100);
    return {hero:["Years to double (Rule of 72)",num(q)+" yrs"],rows:[["Exact doubling time",num(ex)+" yrs"],["Years to triple (Rule of 114)",num(114/f.r)+" yrs"],["Years to 4× (Rule of 144)",num(144/f.r)+" yrs"]]}},
  formula:"Years to double ≈ 72 ÷ annual return %. The exact figure is ln 2 ÷ ln(1 + r). The shortcut is most accurate between 6% and 10%."},
 {id:"fd",group:"Loans & growth",ic:"▤",name:"FD Calculator",lede:"See what a fixed deposit grows to, before and after tax.",
  zeroOk:["tax"],
  fields:[["p","Deposit amount",500000,"₹"],["r","Interest rate (p.a.)",7,"%"],["y","Tenure",5,"years"],["m","Compounding times a year",4,"times"],["tax","Tax on interest (your slab)",30,"%"]],
  calc:f=>{const a=f.p*Math.pow(1+f.r/(100*f.m),f.m*f.y), i=a-f.p, t=i*f.tax/100;
    return {hero:["Maturity amount",inr(a,0)],rows:[["Interest earned",inr(i,0),"gain"],["Tax on interest",inr(t,0),f.tax>0?"loss":""],["Maturity after tax",inr(a-t,0)],["Effective yield (p.a.)",pct((Math.pow(1+f.r/(100*f.m),f.m)-1)*100)]],bar:[f.p,i]}},
  formula:"Maturity = P × (1 + r ÷ (100 × m))<sup>m × t</sup>, where m is the number of compounding periods a year. Most banks compound FDs quarterly. Tax is estimated on the total interest at your slab rate."},
 {id:"rd",group:"Loans & growth",ic:"▥",name:"RD Calculator",lede:"Find the maturity value of a recurring deposit.",
  fields:[["p","Monthly deposit",10000,"₹"],["r","Interest rate (p.a.)",6.5,"%"],["y","Tenure",5,"years"]],
  calc:f=>{const n=Math.round(f.y*12); let a=0; for(let k=1;k<=n;k++) a+=f.p*Math.pow(1+f.r/400,4*(n-k+1)/12);
    const inv=f.p*n; return {hero:["Maturity amount",inr(a,0)],rows:[["Total deposited",inr(inv,0)],["Interest earned",inr(a-inv,0),"gain"]],bar:[inv,a-inv]}},
  formula:"Each monthly deposit earns interest, compounded quarterly, for the months it stays in the account. The maturity value is the sum of all deposits with their interest. Tenure is rounded to whole months."},
 {id:"inflation",group:"Loans & growth",ic:"↯",name:"Inflation Calculator",lede:"See how inflation changes what your money buys.",
  fields:[["a","Amount today",100000,"₹"],["r","Inflation (p.a.)",6,"%"],["y","Years",10,"years"]],
  calc:f=>{const k=Math.pow(1+f.r/100,f.y);
    return {hero:["Same things will cost",inr(f.a*k,0)],rows:[["Today's money will buy only",inr(f.a/k,0),"loss"],["Loss of buying power",pct((1-1/k)*100),"loss"],["Prices rise by",pct((k-1)*100)]]}},
  formula:"Future cost = amount × (1 + inflation)<sup>years</sup>. Buying power of today's money = amount ÷ (1 + inflation)<sup>years</sup>."},
 {id:"percentage",group:"Everyday",ic:"%",name:"Percentage Calculator",lede:"Three common percentage questions, answered at once.",
  fields:[["a","Value A",25,""],["b","Value B",480,""]],
  calc:f=>{const ch=(f.b-f.a)/f.a*100;
    return {hero:[`${num(f.a)}% of ${num(f.b)}`,num(f.a*f.b/100,4)],rows:[[`${num(f.a)} is what % of ${num(f.b)}`,pct(f.a/f.b*100,4)],[`Change from ${num(f.a)} to ${num(f.b)}`,pct(ch),sign(ch)]]}},
  formula:"A% of B = A × B ÷ 100. A as a % of B = A ÷ B × 100. Percent change = (B − A) ÷ A × 100."}
];


// Set this to the address that should receive messages from the contact form.
const CONTACT_EMAIL = "hello@example.com";
// Formspree form ID (the part after /f/ in https://formspree.io/f/xxxxxxxx). Leave empty to fall back to the visitor's email app.
const FORMSPREE_ID = "mgakwzaz";
const DISCLAIMERS = [
 ["Market volatility","Share prices can rise or fall sharply in a short time because of economic news, company results, global events or plain sentiment. Past performance does not guarantee future returns."],
 ["Investment risk","Every investment carries risk, including the loss of the money you put in. Results from the calculators are projections based on the numbers you enter, not promises."],
 ["Research and due diligence","Study a company's financials, business and valuation yourself before you invest. Do not rely on a single tool, tip or website."],
 ["Financial advice","Nivesh Calc is an educational tool. Nothing here is investment, tax or legal advice. Speak to a SEBI-registered adviser about your own situation."],
 ["Diversification","Spreading money across different companies, sectors and asset types can reduce the damage when one investment does badly."],
 ["Market sentiment","Fear and greed move markets. Decisions made on emotion often cost more than decisions made on a plan."],
 ["Regulatory and tax risks","Rules, taxes and charges change. The calculators ignore many of them unless a field says otherwise, so check the current rules before you act."]
];
const PAGES = [
 {id:"about",group:"More",ic:"i",name:"About Us",lede:"Simple calculators for everyday investors.",
  html:`<div class="panel prose"><h2>Welcome to Nivesh Calc</h2>
   <p>Nivesh Calc is a free collection of stock and investment calculators. It covers averaging down, profit and loss, SIP, lumpsum, SWP, EMI, CAGR, dividends, buybacks, splits, bonus shares and demergers.</p>
   <p><b>Our mission</b> is to take the arithmetic out of investing, so you can see what a decision means for your money before you make it.</p>
   <ul class="ticks"><li>Free to use, with no sign-up</li><li>Runs in your browser, so the numbers you enter stay on your device</li><li>Every calculator explains its formula</li></ul>
   <p>Missing a calculator or found a mistake? <a href="contact-us/">Tell us</a>.</p></div>`},
 {id:"contact",group:"More",ic:"@",name:"Contact Us",lede:"Feedback, suggestions and bug reports are welcome.",
  html:`<form class="panel" id="contact-form" autocomplete="off"><h2>Send a message</h2>
   <label class="f" for="c-name">Full name<div class="inp"><input id="c-name" name="name" required></div></label>
   <label class="f" for="c-email">Email address<div class="inp"><input id="c-email" name="email" type="email" required></div></label>
   <label class="f" for="c-msg">Message<div class="inp"><textarea id="c-msg" name="msg" rows="6" required></textarea></div></label>
   <div class="btns"><button class="btn primary" type="submit">Send message</button></div>
   <p class="note" id="c-status" role="status">We read every message.</p></form>`},
 {id:"disclaimer",group:"More",ic:"!",name:"Disclaimer",lede:"Please read this before you use any result.",
  html:`<div class="panel prose"><p class="note">Content on this site is for education only and is not financial advice.</p>
   <ol class="risks">${DISCLAIMERS.map(([h,p])=>`<li><h3>${h}</h3><p>${p}</p></li>`).join("")}</ol>
   <p><b>Reminder:</b> invest only money you can afford to lose, and make decisions with a qualified adviser.</p></div>`}
];
const LOT_COLORS=["var(--accent)","var(--bar2)","#4a90d9","#c0608f","#8a6fd1","#d9774a"];
const $=s=>document.querySelector(s);
const state={};
let cur;

function buildNav(){
  if($("#nav").children.length) return; // already rendered at build time for search engines
  let html="",g="";
  [...CALCS,...PAGES].forEach(c=>{ if(c.group!==g){g=c.group;html+=`<div class="group">${g}</div>`}
    html+=`<a href="${pathOf(c)}" data-id="${c.id}"><span class="ic">${c.ic}</span>${c.name}</a>`;});
  $("#nav").innerHTML=html;
}

function field(id,label,val,unit){
  const pre = unit==="₹";
  return `<label class="f" for="f-${cur.id}-${id}">${label}<div class="inp">${pre?'<span>₹</span>':''}<input id="f-${cur.id}-${id}" data-k="${id}" type="number" inputmode="decimal" step="any" value="${val}">${!pre&&unit?`<span>${unit}</span>`:''}</div></label>`;
}
function showPage(pg){
  document.querySelectorAll("nav a").forEach(a=>{ if(a.dataset.id===pg.id) a.setAttribute("aria-current","page"); else a.removeAttribute("aria-current"); });
  $("#title").textContent=pg.name; $("#lede").textContent=pg.lede;
  $("#page").innerHTML=pg.html; $("#page").hidden=false;
  document.querySelector(".work").hidden=true; document.querySelector(".howto").hidden=true;
  $("#app").classList.remove("open"); scrollTo(0,0);
}

function render(id){
  const pg=PAGES.find(p=>p.id===id); if(pg){showPage(pg);return}
  $("#page").hidden=true; document.querySelector(".work").hidden=false; document.querySelector(".howto").hidden=false;
  cur = CALCS.find(c=>c.id===id)||CALCS[0];
  document.querySelectorAll("nav a").forEach(a=>{ if(a.dataset.id===cur.id) a.setAttribute("aria-current","page"); else a.removeAttribute("aria-current"); });
  $("#title").textContent=cur.name; $("#lede").textContent=cur.lede; $("#formula").innerHTML=cur.formula;
  if(cur.lots){ state[cur.id] ||= cur.lots.map(l=>[...l]); drawLots(); }
  else{
    const v=state[cur.id]||{};
    $("#fields").innerHTML = cur.fields.map(([k,l,d,u])=>field(k,l,v[k]??d,u)).join("") +
      `<div class="btns"><button class="btn" type="button" id="reset">Reset to example</button></div>`;
    $("#reset").onclick=()=>{delete state[cur.id];render(cur.id)};
  }
  compute();
  $("#app").classList.remove("open");
}

function drawLots(){
  const lots=state[cur.id];
  $("#fields").innerHTML = `<div class="lot lot-head" aria-hidden="true"><span></span><span>Units</span><span>Price / share</span><span class="amt">Amount</span><span></span></div>`+
  lots.map((l,i)=>`<div class="lot"><span class="n" style="--c:${LOT_COLORS[i%LOT_COLORS.length]};${i%LOT_COLORS.length===1?"color:#1a1a1a":""}">${String(i+1).padStart(2,"0")}</span>
    <div class="inp"><input id="f-lot-u-${i}" aria-label="Purchase ${i+1} units" placeholder="0" data-lot="${i}" data-p="0" type="number" inputmode="decimal" step="any" value="${l[0]}"></div>
    <div class="inp"><span>₹</span><input id="f-lot-p-${i}" aria-label="Purchase ${i+1} price per share" placeholder="0.00" data-lot="${i}" data-p="1" type="number" inputmode="decimal" step="any" value="${l[1]}"></div>
    <output class="amt" data-amt="${i}">${inr((parseFloat(l[0])||0)*(parseFloat(l[1])||0))}</output>
    <button class="x" type="button" data-del="${i}" aria-label="Remove purchase ${i+1}" ${lots.length<2?"disabled":""}>×</button></div>`).join("")+
    `<div class="btns"><button class="btn primary" type="button" id="add">+ Add purchase</button><button class="btn" type="button" id="clear">Clear all</button></div>`;
  $("#add").onclick=()=>{lots.push(["",""]);drawLots();compute();$(`#f-lot-u-${lots.length-1}`).focus()};
  $("#clear").onclick=()=>{state[cur.id]=[["",""],["",""]];drawLots();compute()};
  document.querySelectorAll("[data-del]").forEach(b=>b.onclick=()=>{lots.splice(+b.dataset.del,1);drawLots();compute()});
}

function compute(){
  let r;
  if(cur.lots){
    const lots=state[cur.id].map(([u,p])=>[parseFloat(u)||0,parseFloat(p)||0]).filter(([u])=>u>0);
    const units=lots.reduce((s,[u])=>s+u,0), amt=lots.reduce((s,[u,p])=>s+u*p,0);
    const lo=lots.length?Math.min(...lots.map(l=>l[1])):NaN, hi=lots.length?Math.max(...lots.map(l=>l[1])):NaN;
    state[cur.id].forEach((l,i)=>{const o=document.querySelector(`[data-amt="${i}"]`); if(o) o.textContent=inr((parseFloat(l[0])||0)*(parseFloat(l[1])||0));});
    const all=state[cur.id].map(([u,p],i)=>({i,amt:(parseFloat(u)||0)*(parseFloat(p)||0)})).filter(x=>x.amt>0);
    r={hero:["Average buy price",units?inr(amt/units):"—"],
       chips:[["Total units",num(units,4)],["Total invested",inr(amt)],["Purchases",num(lots.length,0)]],
       rows:[["Lowest price",lots.length?inr(lo):"—"],["Highest price",lots.length?inr(hi):"—"]],
       lotBar:amt>0?all.map(x=>({n:x.i+1,pct:x.amt/amt*100,c:LOT_COLORS[x.i%LOT_COLORS.length]})):null,
       note:units?null:"Enter units and price for at least one purchase."};
  } else {
    const f={}; let bad=false;
    document.querySelectorAll("#fields input").forEach(i=>{f[i.dataset.k]=parseFloat(i.value); if(!isFinite(f[i.dataset.k])) bad=true;});
    state[cur.id]=f;
    const needPos = Object.entries(f).some(([k,v])=>v<=0 && ![...["chg","tax"],...(cur.zeroOk||[])].includes(k));
    r = bad||needPos ? {hero:[cur.fields[0][1],"—"],rows:[],note:"Fill every field with a number above zero to see the result."} : cur.calc(f);
  }
  let h=`<div class="hero-num"><span class="k">${r.hero[0]}</span><span class="v ${r.hero[2]||""}">${r.hero[1]}</span></div>`;
  if(r.chips) h+=`<div class="chips">${r.chips.map(([k,v])=>`<div class="chip"><span>${k}</span><b>${v}</b></div>`).join("")}</div>`;
  if(r.lotBar) h+=`<div class="split"><div class="cap">Share of total investment</div><div class="bar" role="img" aria-label="${r.lotBar.map(x=>`Purchase ${x.n} ${Math.round(x.pct)}%`).join(", ")}">${r.lotBar.map(x=>`<i style="width:${x.pct}%;background:${x.c}"></i>`).join("")}</div>
    <div class="legend">${r.lotBar.map(x=>`<span><b style="background:${x.c}"></b>#${x.n} · ${x.pct.toFixed(1)}%</span>`).join("")}</div></div>`;
  if(r.rows.length) h+=`<dl>${r.rows.map(([k,v,c])=>`<div><dt>${k}</dt><dd class="${c||""}">${v}</dd></div>`).join("")}</dl>`;
  if(r.bar && r.bar[0]+r.bar[1]>0){const [a,b]=r.bar,t=a+b,L=r.barLabels||["Invested","Returns"];
    h+=`<div class="split"><div class="bar" role="img" aria-label="${L[0]} ${Math.round(a/t*100)}%, ${L[1]} ${Math.round(b/t*100)}%"><i style="width:${a/t*100}%;background:var(--accent)"></i><i style="width:${b/t*100}%;background:var(--bar2)"></i></div>
      <div class="legend"><span><b style="background:var(--accent)"></b>${L[0]} ${Math.round(a/t*100)}%</span><span><b style="background:var(--bar2)"></b>${L[1]} ${Math.round(b/t*100)}%</span></div></div>`;}
  if(r.note) h+=`<div class="note">${r.note}</div>`;
  $("#result").innerHTML=h;
}

$("#form").addEventListener("input",e=>{
  const t=e.target;
  if(t.dataset.lot!==undefined) state[cur.id][+t.dataset.lot][+t.dataset.p]=t.value;
  compute();
});
$("#form").addEventListener("submit",e=>e.preventDefault());

// theme toggle
const root=document.documentElement;
function isDark(){return root.dataset.theme? root.dataset.theme==="dark" : matchMedia("(prefers-color-scheme: dark)").matches}
function syncTheme(){$("#theme").textContent=isDark()?"Light":"Dark"}
$("#theme").onclick=()=>{root.dataset.theme=isDark()?"light":"dark";try{localStorage.setItem("nc-theme",root.dataset.theme)}catch(e){}syncTheme()};
try{const t=localStorage.getItem("nc-theme");if(t)root.dataset.theme=t}catch(e){}
syncTheme();

// mobile drawer
$("#menu").onclick=()=>$("#app").classList.add("open");
$("#scrim").onclick=()=>$("#app").classList.remove("open");

buildNav();
// old #hash links: send them to the real page for that calculator
const here=document.body.dataset.page||"average";
const legacy=[...CALCS,...PAGES].find(x=>x.id===location.hash.slice(1));
const dest=u=>location.protocol==="file:" && u.endsWith("/") ? u+"index.html" : u; // file:// has no folder index
if(legacy && legacy.id!==here) location.replace(dest(new URL(pathOf(legacy),document.baseURI).href));
if(location.protocol==="file:") document.addEventListener("click",e=>{
  const a=e.target.closest&&e.target.closest("a[href]");
  if(a && a.href.startsWith("file:") && a.href.endsWith("/") && !e.defaultPrevented && e.button===0 && !e.metaKey && !e.ctrlKey){ e.preventDefault(); location.href=dest(a.href); }
});
render(here);

// contact form: send through Formspree when configured, otherwise open the visitor's email app
document.addEventListener("submit",async e=>{
  if(e.target.id!=="contact-form") return;
  e.preventDefault();
  const form=e.target, d=new FormData(form), st=$("#c-status"), btn=form.querySelector("button[type=submit]");
  if(!FORMSPREE_ID){
    location.href=`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Nivesh Calc feedback from "+d.get("name"))}&body=${encodeURIComponent(d.get("msg")+"\n\n"+d.get("name")+" <"+d.get("email")+">")}`;
    return;
  }
  btn.disabled=true; st.textContent="Sending…";
  try{
    const r=await fetch("https://formspree.io/f/"+FORMSPREE_ID,{method:"POST",body:d,headers:{Accept:"application/json"}});
    if(!r.ok) throw new Error(r.status);
    form.reset(); st.textContent="Thanks! Your message has been sent."; st.classList.add("gain");
  }catch(err){
    st.classList.remove("gain"); st.textContent="Could not send your message. Please try again in a moment.";
  }
  btn.disabled=false;
});

// sidebar search: hide links that do not match and any group left empty
$("#q").addEventListener("input",()=>{
  const q=$("#q").value.trim().toLowerCase(); let head=null, shown=0, any=0;
  const flush=()=>{ if(head) head.hidden=!any; };
  [...$("#nav").children].forEach(el=>{
    if(el.classList.contains("group")){ flush(); head=el; any=0; }
    else { const m=!q||el.textContent.toLowerCase().includes(q); el.hidden=!m; if(m){any++;shown++} }
  });
  flush(); $("#nomatch").hidden=shown>0;
});
$("#q").addEventListener("keydown",e=>{
  if(e.key==="Enter"){ const a=[...document.querySelectorAll("#nav a")].find(x=>!x.hidden); if(a){location.href=a.href.endsWith("/")&&location.protocol==="file:"?a.href+"index.html":a.href;} }
});
