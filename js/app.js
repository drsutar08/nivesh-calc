const inr = (v,d=2)=> isFinite(v) ? "₹" + v.toLocaleString("en-IN",{minimumFractionDigits:d,maximumFractionDigits:d}) : "—";
const num = (v,d=2)=> isFinite(v) ? v.toLocaleString("en-IN",{maximumFractionDigits:d}) : "—";
const pct = (v,d=2)=> isFinite(v) ? v.toFixed(d) + "%" : "—";
const sign = v => v>0 ? "gain" : v<0 ? "loss" : "";

const slugOf = n => n.toLowerCase().replace(/&/g,"and").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");
const pathOf = c => c.id==="home" ? "./" : (c.id==="about"?"about-us":c.id==="contact"?"contact-us":slugOf(c.name))+"/";

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
 {id:"target-average",group:"Stocks",ic:"x̄↓",name:"Target Average Calculator",lede:"Find how many shares to buy at today's price to bring your average to a target.",
  fields:[["held","Shares held",100,"units"],["avg","Current average price",500,"₹"],["cmp","Price you will buy at",400,"₹"],["target","Target average price",450,"₹"]],
  calc:f=>{ const lo=Math.min(f.avg,f.cmp), hi=Math.max(f.avg,f.cmp);
    if(!(f.target>lo && f.target<hi)) return {hero:["Shares to buy","—"],rows:[],note:"The target average must lie between your current average and the price you will buy at. Buying below your average can only pull it down to just above that price."};
    const x=f.held*(f.avg-f.target)/(f.target-f.cmp), buy=Math.ceil(x-1e-9), inv=buy*f.cmp, tot=f.held+buy, na=(f.held*f.avg+inv)/tot;
    return {hero:["Shares to buy",num(buy,0)],rows:[["Money needed",inr(inv)],["Total shares after buying",num(tot,0)],["New average price",inr(na)],["Total invested after buying",inr(f.held*f.avg+inv)],["Exact shares before rounding up",num(x,2)]]}},
  formula:"Shares to buy = shares held × (current average − target) ÷ (target − buy price). The answer is rounded up to whole shares, so the new average lands on the target or just past it. Brokerage and charges are not included."},
 {id:"rights",group:"Stocks",ic:"R+",name:"Rights Issue Calculator",lede:"See your rights entitlement, the ex-rights price and your new average cost.",
  fields:[["held","Shares held",100,"units"],["a","Rights shares offered",1,"get"],["b","For every",5,"held"],["rp","Rights issue price",800,"₹"],["mp","Market price before the issue",1000,"₹"],["avg","Your average buy price",900,"₹"]],
  calc:f=>{ const ent=Math.floor(f.held*f.a/f.b), cost=ent*f.rp, terp=(f.b*f.mp+f.a*f.rp)/(f.a+f.b), right=terp-f.rp, na=(f.held*f.avg+cost)/(f.held+ent);
    return {hero:["Rights shares you can apply for",num(ent,0)],rows:[["Amount to pay",inr(cost)],["Theoretical ex-rights price (TERP)",inr(terp)],["Discount to market price",pct((f.mp-f.rp)/f.mp*100)],["Value of each right",inr(Math.max(0,right))],["New average if you subscribe",ent?inr(na):"—"],["Value lost if you neither apply nor sell your rights",inr(Math.max(0,ent*right)),right>0?"loss":""]],
      note:f.rp>=f.mp?"The issue price is at or above the market price, so the rights have no value at today's price.":null}},
  formula:"Rights shares = shares held × (rights offered ÷ for every), rounded down. TERP = (for every × market price + rights offered × issue price) ÷ (rights offered + for every). Each right is worth about TERP − issue price, and that is what you give up if you neither subscribe nor sell your rights entitlement."},
 {id:"ltcg-harvest",group:"Stocks",ic:"LT",name:"LTCG Tax Harvesting Calculator",lede:"Work out how much long-term gain to book this year to use your tax-free limit.",
  zeroOk:["booked"],
  fields:[["val","Current value of long-term holdings",600000,"₹"],["gain","Unrealised long-term gain in them",200000,"₹"],["booked","Long-term gains already booked this year",0,"₹"],["ex","Yearly LTCG exemption",125000,"₹"],["rate","LTCG tax rate",12.5,"%"]],
  calc:f=>{ if(f.gain>f.val) return {hero:["Gain to book tax-free","—"],rows:[],note:"The unrealised gain cannot be more than the current value of the holdings."};
    const room=Math.max(0,f.ex-f.booked), h=Math.min(f.gain,room), sell=h/(f.gain/f.val), all=Math.max(0,f.booked+f.gain-f.ex)*f.rate/100;
    return {hero:["Gain to book tax-free",inr(h,0),h>0?"gain":""],rows:[["Value to sell and buy back",inr(sell,0)],["Exemption still available",inr(room,0)],["Tax this gain would cost if booked in a later year",inr(h*f.rate/100,0),h>0?"gain":""],["Unrealised gain left after harvesting",inr(f.gain-h,0)],["Tax if you booked all gains this year",inr(all,0),all>0?"loss":""]],
      note:room===0?"You have already used this year's exemption, so there is nothing left to harvest tax-free.":null}},
  formula:"Gain you can book tax-free = the smaller of your unrealised long-term gain and the exemption left this year (exemption − gains already booked). Value to sell = that gain ÷ (unrealised gain ÷ current value), assuming the gain is spread evenly across the holding. Buying back at today's price resets your cost, so less gain is taxed later. The defaults reflect the rules for listed equity at the time of writing, so check the current exemption and rate."},
 {id:"options-pl",group:"Stocks",ic:"CP",name:"Options Profit/Loss Calculator",lede:"See the profit or loss at expiry for buying or selling a call or put option.",
  fields:[["k","Strike price",1500,"₹"],["prem","Premium per share",40,"₹"],["lot","Lot size",250,"units"],["lots","Number of lots",1,"lots"],["s","Price at expiry",1600,"₹"]],
  calc:f=>{ const q=f.lot*f.lots, bc=(Math.max(0,f.s-f.k)-f.prem)*q, bp=(Math.max(0,f.k-f.s)-f.prem)*q;
    return {hero:["Buy call: profit / loss",inr(bc,0),sign(bc)],rows:[["Buy put: profit / loss",inr(bp,0),sign(bp)],["Sell call: profit / loss",inr(-bc,0),sign(-bc)],["Sell put: profit / loss",inr(-bp,0),sign(-bp)],["Call break-even price",inr(f.k+f.prem)],["Put break-even price",inr(f.k-f.prem)],["Premium for all lots",inr(f.prem*q,0)],["Quantity",num(q,0)+" units"]]}},
  formula:"At expiry a call is worth max(0, expiry price − strike) and a put is worth max(0, strike − expiry price). Buyer's profit = (value at expiry − premium) × quantity, and the seller's profit is the opposite. Break-even is strike + premium for a call and strike − premium for a put. Brokerage, STT and other charges are not included, and lot sizes change, so check the exchange's current lot size."},
 {id:"pivot-points",group:"Stocks",ic:"PV",name:"Pivot Point Calculator",lede:"Get today's pivot, support and resistance levels from yesterday's high, low and close.",
  fields:[["h","Previous high",1520,"₹"],["l","Previous low",1480,"₹"],["c","Previous close",1505,"₹"]],
  calc:f=>{ if(f.h<f.l) return {hero:["Pivot point","—"],rows:[],note:"The high must be at least the low."};
    const p=(f.h+f.l+f.c)/3, r=f.h-f.l;
    return {hero:["Pivot point",inr(p)],rows:[["Resistance 3 (R3)",inr(f.h+2*(p-f.l))],["Resistance 2 (R2)",inr(p+r)],["Resistance 1 (R1)",inr(2*p-f.l)],["Support 1 (S1)",inr(2*p-f.h)],["Support 2 (S2)",inr(p-r)],["Support 3 (S3)",inr(f.l-2*(f.h-p))],["Fibonacci R1 / S1",`${inr(p+0.382*r)} / ${inr(p-0.382*r)}`],["Fibonacci R2 / S2",`${inr(p+0.618*r)} / ${inr(p-0.618*r)}`],["Fibonacci R3 / S3",`${inr(p+r)} / ${inr(p-r)}`]],
      note:f.c>f.h||f.c<f.l?"The close is usually between the high and the low. Check the values you entered.":null}},
  formula:"Pivot (P) = (high + low + close) ÷ 3, using the previous session. Classic levels: R1 = 2P − low, S1 = 2P − high, R2 = P + (high − low), S2 = P − (high − low), R3 = high + 2(P − low), S3 = low − 2(high − P). Fibonacci levels add or subtract 38.2%, 61.8% and 100% of the previous range (high − low) from P."},
 {id:"ipo-listing",group:"Stocks",ic:"IP",name:"IPO Listing Gain Calculator",lede:"See your profit and tax if you sell IPO shares on listing day.",
  zeroOk:["tax"],
  fields:[["price","Issue price (upper end of the band)",500,"₹"],["lot","Shares per lot",30,"units"],["lots","Lots applied for",1,"lots"],["lp","Expected listing price",600,"₹"],["tax","Short-term capital gains tax rate",20,"%"]],
  calc:f=>{ const q=f.lot*f.lots, inv=f.price*q, g=(f.lp-f.price)*q, t=Math.max(0,g)*f.tax/100;
    return {hero:["Listing gain",inr(g,0),sign(g)],rows:[["Amount to apply (blocked in your account)",inr(inv,0)],["Shares if fully allotted",num(q,0)],["Listing gain (%)",pct(g/inv*100),sign(g)],["Tax if you sell within 12 months",inr(t,0),t>0?"loss":""],["Gain after tax",inr(g-t,0),sign(g-t)]]}},
  formula:"Listing gain = (listing price − issue price) × shares allotted. Selling within 12 months makes it a short-term capital gain, taxed at the rate you enter. The default is the rate for listed equity at the time of writing. Brokerage and charges on the sale are not included, and in an oversubscribed IPO you may get fewer shares than you applied for, or none."},
 {id:"mtf",group:"Stocks",ic:"MT",name:"Margin Trading (MTF) Interest Calculator",lede:"Work out the interest cost and real return of buying shares with margin trading funding.",
  fields:[["buy","Buy price",500,"₹"],["q","Quantity",200,"units"],["m","Margin you pay",25,"%"],["r","MTF interest rate (p.a.)",15,"%"],["d","Days held",30,"days"],["sell","Sell price",550,"₹"]],
  calc:f=>{ if(f.m>100) return {hero:["Net profit / loss","—"],rows:[],note:"The margin you pay cannot be more than 100%."};
    const v=f.buy*f.q, own=v*f.m/100, fund=v-own, int=fund*f.r/100*f.d/365, gross=(f.sell-f.buy)*f.q, net=gross-int, roe=net/own*100, plain=(f.sell-f.buy)/f.buy*100;
    return {hero:["Net profit / loss after interest",inr(net,0),sign(net)],rows:[["Position value",inr(v,0)],["Your money (margin)",inr(own,0)],["Funded by the broker",inr(fund,0)],["Interest cost",inr(int,0),int>0?"loss":""],["Gross profit / loss",inr(gross,0),sign(gross)],["Return on your money with MTF",pct(roe),sign(roe)],["Return without MTF",pct(plain),sign(plain)],["Break-even sell price",inr(f.buy+int/f.q)]]}},
  formula:"Interest = amount funded × yearly rate × days held ÷ 365, where amount funded = position value × (100% − your margin). Net profit = (sell price − buy price) × quantity − interest. Return on your money = net profit ÷ your margin. Leverage multiplies both gains and losses. Brokerage, charges and any pledge fees are not included."},
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
 {id:"xirr",group:"Mutual funds",ic:"XR",name:"XIRR Calculator",lede:"Find the real annualised return (XIRR) of a monthly SIP from its current value.",
  fields:[["sip","Monthly SIP amount",10000,"₹"],["m","Months invested",36,"months"],["val","Current value",430000,"₹"]],
  calc:f=>{ const n=Math.round(f.m), inv=f.sip*n, fv=r=>{let s=0;for(let j=1;j<=n;j++)s+=f.sip*Math.pow(1+r,j);return s};
    let lo=-0.99, hi=1; for(let k=0;k<200;k++){const mid=(lo+hi)/2; if(fv(mid)>f.val) hi=mid; else lo=mid;}
    const x=(Math.pow(1+(lo+hi)/2,12)-1)*100, g=f.val-inv;
    return {hero:["XIRR (annualised return)",pct(x),sign(x)],rows:[["Total invested",inr(inv,0)],["Gain",inr(g,0),sign(g)],["Absolute return",pct(g/inv*100),sign(g)],["Instalments counted",num(n,0)]],bar:g>0?[inv,g]:null}},
  formula:"XIRR is the yearly rate at which every SIP instalment, grown to today, adds up to the current value. This calculator assumes equal instalments on the same date each month, the first one m months ago, and solves for the monthly rate r. XIRR = (1 + r)<sup>12</sup> − 1. For irregular amounts or dates, use the XIRR function in a spreadsheet."},
 {id:"direct-vs-regular",group:"Mutual funds",ic:"D/R",name:"Direct vs Regular Mutual Fund Calculator",lede:"See how much a higher expense ratio costs you over the years.",
  zeroOk:["lump"],
  fields:[["sip","Monthly SIP",10000,"₹"],["lump","One-time investment",0,"₹"],["y","Years",20,"years"],["r","Expected return before costs (p.a.)",12,"%"],["ed","Direct plan expense ratio",0.5,"%"],["erg","Regular plan expense ratio",1.5,"%"]],
  calc:f=>{ const n=Math.round(f.y*12), fv=er=>{const i=(f.r-er)/1200; const s=i?f.sip*((Math.pow(1+i,n)-1)/i)*(1+i):f.sip*n; return s+f.lump*Math.pow(1+(f.r-er)/100,f.y)};
    const d=fv(f.ed), g=fv(f.erg), inv=f.sip*n+f.lump, diff=d-g;
    return {hero:["Extra corpus with the direct plan",inr(diff,0),diff>0?"gain":sign(diff)],rows:[["Direct plan value",inr(d,0)],["Regular plan value",inr(g,0)],["Total invested",inr(inv,0)],["Share of the direct plan's corpus lost in the regular plan",pct(diff/d*100)],["Difference in expense ratio",pct(f.erg-f.ed)]],
      note:f.erg<f.ed?"The regular plan ratio is usually higher than the direct plan ratio, because it includes the distributor's commission.":null}},
  formula:"Each plan is projected with its net return: expected return − expense ratio. SIP value = P × [((1 + i)<sup>n</sup> − 1) ÷ i] × (1 + i), where i is the net monthly rate and n is the number of months. A one-time investment grows at the net yearly rate. The difference is what the higher expense ratio costs over the period."},
 {id:"sip-delay",group:"Mutual funds",ic:"DL",name:"SIP Delay Cost Calculator",lede:"See how much waiting to start a SIP costs you by the time you need the money.",
  zeroOk:["d"],
  fields:[["sip","Monthly SIP",10000,"₹"],["r","Expected return (p.a.)",12,"%"],["y","Years until you need the money",25,"years"],["d","Years you delay starting",5,"years"]],
  calc:f=>{ if(f.d>=f.y) return {hero:["Cost of waiting","—"],rows:[],note:"The delay must be shorter than the time until you need the money."};
    const i=f.r/1200, k=n=>((Math.pow(1+i,n)-1)/i)*(1+i), n=Math.round(f.y*12), m=Math.round((f.y-f.d)*12), now=f.sip*k(n), later=f.sip*k(m), cost=now-later;
    return {hero:["Cost of waiting",inr(cost,0),cost>0?"loss":""],rows:[["Corpus if you start now",inr(now,0)],["Corpus if you start later",inr(later,0)],["Share of the corpus lost",pct(cost/now*100),cost>0?"loss":""],["Monthly SIP needed later to catch up",inr(now/k(m),0)],["Extra you would invest by starting now",inr(f.sip*(n-m),0)]]}},
  formula:"SIP value = P × [((1 + i)<sup>n</sup> − 1) ÷ i] × (1 + i), where i is the monthly rate and n is the number of months invested. Starting later leaves fewer months, so the corpus is smaller. Cost of waiting = corpus if you start now − corpus if you start later. The catch-up SIP is the monthly amount that reaches the same corpus in the shorter time."},
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
 {id:"ppf",group:"Savings & salary",ic:"PF",name:"PPF Calculator",lede:"Estimate the tax-free maturity value of your Public Provident Fund account.",
  fields:[["d","Yearly deposit",150000,"₹"],["r","Interest rate (p.a.)",7.1,"%"],["y","Years",15,"years"]],
  calc:f=>{ const n=Math.round(f.y), d=Math.min(f.d,150000); let a=0; for(let j=1;j<=n;j++) a+=d*Math.pow(1+f.r/100,j); const inv=d*n;
    const notes=[]; if(f.d>150000) notes.push("PPF accepts at most ₹1.5 lakh a year, so the result uses ₹1.5 lakh."); if(n<15) notes.push("A PPF account matures after 15 years. You can then extend it in blocks of 5 years.");
    return {hero:["Maturity value",inr(a,0)],rows:[["Total deposited",inr(inv,0)],["Interest earned (tax-free)",inr(a-inv,0),"gain"],["Years counted",num(n,0)]],bar:[inv,a-inv],barLabels:["Deposits","Interest"],note:notes.join(" ")||null}},
  formula:"Maturity = D × [(1 + r) + (1 + r)<sup>2</sup> + … + (1 + r)<sup>n</sup>], assuming you deposit the full amount before 5 April each year so it earns interest for the whole year. PPF interest is worked out monthly and credited once a year. The government reviews the rate every quarter, and the default is the rate at the time of writing."},
 {id:"compound-interest",group:"Loans & growth",ic:"CI",name:"Compound Interest Calculator",lede:"See how compound interest grows your money, and how much more it earns than simple interest.",
  fields:[["p","Principal",100000,"₹"],["r","Interest rate (p.a.)",8,"%"],["y","Years",10,"years"],["m","Compounding times a year",4,"times"]],
  calc:f=>{ const a=f.p*Math.pow(1+f.r/(100*f.m),f.m*f.y), ci=a-f.p, si=f.p*f.r*f.y/100;
    return {hero:["Final amount",inr(a,0)],rows:[["Compound interest earned",inr(ci,0),"gain"],["Simple interest for comparison",inr(si,0)],["Extra earned by compounding",inr(ci-si,0),"gain"],["Effective annual rate",pct((Math.pow(1+f.r/(100*f.m),f.m)-1)*100)]],bar:[f.p,ci]}},
  formula:"A = P × (1 + r ÷ (100 × m))<sup>m × t</sup>, where m is the number of compounding periods a year: 1 for yearly, 4 for quarterly, 12 for monthly. Simple interest = P × r × t ÷ 100. The effective annual rate is the yearly rate that gives the same result with yearly compounding."},
 {id:"loan-prepayment",group:"Loans & growth",ic:"⌂",name:"Home Loan Prepayment Calculator",lede:"See how much interest and time you save by prepaying your home loan.",
  zeroOk:["lump","extra"],
  fields:[["p","Outstanding loan",3000000,"₹"],["r","Interest rate (p.a.)",8.5,"%"],["y","Remaining tenure",20,"years"],["lump","One-time prepayment now",200000,"₹"],["extra","Extra payment every month",5000,"₹"]],
  calc:f=>{ const i=f.r/1200, n=Math.round(f.y*12), emi=f.p*i*Math.pow(1+i,n)/(Math.pow(1+i,n)-1), orig=emi*n-f.p;
    if(f.lump>=f.p) return {hero:["Interest saved",inr(orig,0),"gain"],rows:[["EMI",inr(emi,0)],["Interest without prepayment",inr(orig,0)]],note:"That prepayment clears the whole loan."};
    let bal=f.p-f.lump, m=0, paid=0; while(bal>0.005 && m<n){ const int=bal*i, pay=Math.min(bal+int,emi+f.extra); paid+=int; bal=bal+int-pay; m++; }
    const ym=k=>{const y=Math.floor(k/12),mo=k%12;return `${y} ${y===1?"yr":"yrs"} ${mo} ${mo===1?"month":"months"}`}, saved=Math.max(0,orig-paid);
    return {hero:["Interest saved",inr(saved,0),saved>0?"gain":""],rows:[["EMI (unchanged)",inr(emi,0)],["New tenure",ym(m)],["Time saved",ym(n-m),n>m?"gain":""],["Interest without prepayment",inr(orig,0)],["Interest with prepayment",inr(paid,0)],["Total prepaid",inr(f.lump+f.extra*m,0)]]}},
  formula:"The EMI is worked out on the outstanding loan. The loan is then repaid month by month: each month's interest is balance × rate ÷ 12, and the EMI plus any extra payment clears that interest first and then the principal. A one-time prepayment comes off the balance before the first month. The EMI stays the same, so prepaying shortens the tenure. Check your loan terms for any prepayment charge."},
 {id:"flat-vs-reducing",group:"Loans & growth",ic:"F/R",name:"Flat vs Reducing Rate Calculator",lede:"Convert a flat interest rate into the real reducing-balance rate on a loan.",
  fields:[["p","Loan amount",500000,"₹"],["fr","Flat interest rate (p.a.)",10,"%"],["y","Tenure",3,"years"]],
  calc:f=>{ const n=Math.round(f.y*12), int=f.p*f.fr*f.y/100, emi=(f.p+int)/n, pv=i=>emi*(1-Math.pow(1+i,-n))/i;
    let lo=1e-9, hi=1; for(let k=0;k<200;k++){const m=(lo+hi)/2; if(pv(m)>f.p) lo=m; else hi=m;}
    const rr=(lo+hi)/2*1200, i2=f.fr/1200, emi2=f.p*i2*Math.pow(1+i2,n)/(Math.pow(1+i2,n)-1), int2=emi2*n-f.p;
    return {hero:["Equivalent reducing rate (p.a.)",pct(rr),"loss"],rows:[["EMI on the flat-rate loan",inr(emi,0)],["Total interest at the flat rate",inr(int,0),"loss"],[`EMI if ${pct(f.fr,1)} were a reducing rate`,inr(emi2,0)],[`Interest if ${pct(f.fr,1)} were a reducing rate`,inr(int2,0)],["Extra interest because the rate is flat",inr(int-int2,0),"loss"]]}},
  formula:"Flat-rate interest = loan × flat rate × years, charged on the full loan for the whole tenure, and EMI = (loan + interest) ÷ months. The equivalent reducing rate is the yearly rate at which those same EMIs would repay the loan on a reducing balance. It is found by solving loan = EMI × (1 − (1 + i)<sup>−n</sup>) ÷ i for the monthly rate i, and multiplying by 12."},
 {id:"loan-eligibility",group:"Loans & growth",ic:"LE",name:"Loan Eligibility Calculator",lede:"Estimate the largest loan you can get on your income and existing EMIs.",
  zeroOk:["emi"],
  fields:[["inc","Net monthly income",100000,"₹"],["emi","Existing EMIs per month",10000,"₹"],["foir","Share of income lenders allow for EMIs",50,"%"],["r","Interest rate (p.a.)",8.5,"%"],["y","Tenure",20,"years"]],
  calc:f=>{ const max=f.inc*f.foir/100-f.emi;
    if(max<=0) return {hero:["Maximum loan","₹0"],rows:[["EMI you can take on","₹0"]],note:"Your existing EMIs already use up the share of income lenders usually allow."};
    const i=f.r/1200, n=Math.round(f.y*12), loan=max*(1-Math.pow(1+i,-n))/i;
    return {hero:["Maximum loan",inr(loan,0)],rows:[["EMI you can take on",inr(max,0)],["Total interest on that loan",inr(max*n-loan,0),"loss"],["Total of all EMIs as a share of income",pct((max+f.emi)/f.inc*100)]]}},
  formula:"Lenders cap your total EMIs at a share of your income, called FOIR (fixed obligations to income ratio). EMI you can take on = income × FOIR − existing EMIs. Maximum loan = that EMI × (1 − (1 + i)<sup>−n</sup>) ÷ i, where i is the monthly rate and n is the number of months. Lenders also look at your credit score, age, job and the property's value, so the final offer can differ."},
 {id:"ssy",group:"Savings & salary",ic:"SS",name:"Sukanya Samriddhi Yojana Calculator",lede:"Estimate the tax-free maturity value of a Sukanya Samriddhi account for your daughter.",
  fields:[["d","Yearly deposit",150000,"₹"],["r","Interest rate (p.a.)",8.2,"%"],["age","Girl's age when the account is opened",5,"years"]],
  calc:f=>{ const dep=Math.min(f.d,150000); let b=0; for(let y=1;y<=21;y++){ if(y<=15) b+=dep; b*=1+f.r/100; } const inv=dep*15;
    const notes=[]; if(f.d>150000) notes.push("The scheme accepts at most ₹1.5 lakh a year, so the result uses ₹1.5 lakh."); if(f.age>10) notes.push("An account can only be opened for a girl aged 10 or under.");
    return {hero:["Maturity value",inr(b,0)],rows:[["Total deposited (15 years)",inr(inv,0)],["Interest earned (tax-free)",inr(b-inv,0),"gain"],["Account matures when she is",num(Math.round(f.age)+21,0)+" years old"]],bar:[inv,b-inv],barLabels:["Deposits","Interest"],note:notes.join(" ")||null}},
  formula:"You deposit for the first 15 years and the account matures 21 years after it is opened, so the balance keeps earning interest for 6 more years with no deposits. This calculator assumes each year's deposit is made at the start of the year and interest is compounded yearly. The government reviews the rate every quarter, and the default is the rate at the time of writing."},
 {id:"nps",group:"Savings & salary",ic:"NP",name:"NPS Calculator",lede:"Estimate your National Pension System corpus, lump sum and monthly pension.",
  fields:[["c","Monthly contribution",5000,"₹"],["age","Your age now",30,"years"],["ret","Retirement age",60,"years"],["r","Expected return (p.a.)",10,"%"],["ann","Share of corpus used to buy an annuity",40,"%"],["ar","Expected annuity rate (p.a.)",6,"%"]],
  calc:f=>{ if(f.ret<=f.age) return {hero:["Corpus at retirement","—"],rows:[],note:"Retirement age must be more than your age now."};
    if(f.ann>100) return {hero:["Corpus at retirement","—"],rows:[],note:"The annuity share cannot be more than 100%."};
    const n=Math.round((f.ret-f.age)*12), i=f.r/1200, corp=f.c*((Math.pow(1+i,n)-1)/i)*(1+i), inv=f.c*n, a=corp*f.ann/100;
    return {hero:["Corpus at retirement",inr(corp,0)],rows:[["Total contributed",inr(inv,0)],["Growth",inr(corp-inv,0),"gain"],["Lump sum you can withdraw",inr(corp-a,0)],["Used to buy an annuity",inr(a,0)],["Estimated monthly pension",inr(a*f.ar/1200,0)]],bar:[inv,corp-inv],barLabels:["Contributed","Growth"]}},
  formula:"Corpus = P × [((1 + i)<sup>n</sup> − 1) ÷ i] × (1 + i), where P is the monthly contribution, i is the expected monthly return and n is the number of months to retirement. At retirement, part of the corpus must buy an annuity and the rest can be withdrawn. Monthly pension = annuity amount × annuity rate ÷ 12. PFRDA sets the minimum annuity share and the withdrawal rules, so check the current rules. Returns are not guaranteed."},
 {id:"epf",group:"Savings & salary",ic:"EP",name:"EPF Calculator",lede:"Project your Employees' Provident Fund balance at retirement.",
  zeroOk:["bal","inc"],
  fields:[["basic","Monthly basic pay + DA",30000,"₹"],["bal","Current EPF balance",0,"₹"],["age","Your age now",30,"years"],["ret","Retirement age",58,"years"],["inc","Yearly salary increase",5,"%"],["r","EPF interest rate (p.a.)",8.25,"%"],["emp","Your contribution",12,"% of basic"],["er","Employer's share going to EPF",3.67,"% of basic"]],
  calc:f=>{ if(f.ret<=f.age) return {hero:["EPF balance at retirement","—"],rows:[],note:"Retirement age must be more than your age now."};
    const yrs=Math.round(f.ret-f.age); let b=f.bal, me=0, them=0, int=0;
    for(let y=0;y<yrs;y++){ const pay=f.basic*Math.pow(1+f.inc/100,y), a=pay*f.emp/100, e=pay*f.er/100; let yi=0;
      for(let m=0;m<12;m++){ b+=a+e; me+=a; them+=e; yi+=b*f.r/1200; } b+=yi; int+=yi; }
    return {hero:["EPF balance at retirement",inr(b,0)],rows:[["Your contributions",inr(me,0)],["Employer contributions",inr(them,0)],["Interest earned",inr(int,0),"gain"],["Opening balance",inr(f.bal,0)],["Years counted",num(yrs,0)]],bar:[me+them+f.bal,int],barLabels:["Contributions","Interest"]}},
  formula:"Each month, your contribution and the employer's EPF share are added to the balance. Interest for the year is worked out on the monthly running balance at the yearly rate ÷ 12, and credited once at the end of the year. Your salary rises by the yearly increase you enter. The employer's pension (EPS) contribution is not part of the EPF balance and is not included. The EPFO declares the interest rate each year, and the default is the rate at the time of writing."},
 {id:"gratuity",group:"Savings & salary",ic:"GR",name:"Gratuity Calculator",lede:"Work out the gratuity you are due when you leave a job, and how much of it is tax-free.",
  fields:[["sal","Last drawn monthly basic pay + DA",50000,"₹"],["y","Years of service",10,"years"],["cap","Tax-free gratuity limit",2000000,"₹"]],
  calc:f=>{ const full=Math.floor(f.y), act=full+(f.y-full>0.5?1:0), g=f.sal*15/26*act, g2=f.sal*15/30*full, free=Math.min(g,f.cap);
    return {hero:["Gratuity (employer covered by gratuity law)",inr(g,0)],rows:[["Years counted",num(act,0)],["Gratuity if the employer is not covered",inr(g2,0)],["Tax-free part",inr(free,0),"gain"],["Taxable part",inr(g-free,0),g>free?"loss":""]],
      note:f.y<5?"Gratuity is normally paid only after 5 years of continuous service, except on death or disability. Fixed-term employees may qualify sooner under the labour codes.":null}},
  formula:"For employers covered by gratuity law (the Payment of Gratuity Act, now part of the Code on Social Security): gratuity = last drawn salary × 15 ÷ 26 × years of service, where service of more than 6 months in the final year counts as a full year. For employers not covered, it is usually salary × 15 ÷ 30 × completed years. Salary means basic pay plus dearness allowance, and under the labour codes some allowances can also count. The tax-free limit is set by law and can change, and the default is the limit at the time of writing."},
 {id:"hra",group:"Savings & salary",ic:"HR",name:"HRA Exemption Calculator",lede:"Find how much of your house rent allowance is tax-free under the old tax regime.",
  fields:[["basic","Basic salary + DA (yearly)",500000,"₹"],["hra","HRA received (yearly)",250000,"₹"],["rent","Rent paid (yearly)",300000,"₹"]],
  calc:f=>{ const over=Math.max(0,f.rent-f.basic*0.1), ex=c=>Math.min(f.hra,over,f.basic*c), m=ex(0.5), nm=ex(0.4);
    return {hero:["Tax-free HRA in a metro city",inr(m,0),"gain"],rows:[["Tax-free HRA in other cities",inr(nm,0),"gain"],["Taxable HRA in a metro city",inr(f.hra-m,0),f.hra>m?"loss":""],["Taxable HRA in other cities",inr(f.hra-nm,0),f.hra>nm?"loss":""],["Limit 1: HRA received",inr(f.hra,0)],["Limit 2: rent paid − 10% of basic",inr(over,0)],["Limit 3: 50% of basic (metro) / 40% (others)",`${inr(f.basic*0.5,0)} / ${inr(f.basic*0.4,0)}`]],
      note:over===0?"Rent paid is not more than 10% of basic salary, so no HRA is tax-free.":null}},
  formula:"Tax-free HRA is the smallest of three amounts: the HRA you received, the rent you paid minus 10% of basic salary, and 50% of basic salary in Delhi, Mumbai, Kolkata or Chennai (40% elsewhere). Basic salary includes dearness allowance where it counts for retirement benefits. The exemption is available only under the old tax regime."},
 {id:"scss",group:"Savings & salary",ic:"SC",name:"Senior Citizens Savings Scheme Calculator",lede:"Find the quarterly interest and total return from a Senior Citizens Savings Scheme deposit.",
  fields:[["p","Deposit",1500000,"₹"],["r","Interest rate (p.a.)",8.2,"%"],["y","Tenure",5,"years"]],
  calc:f=>{ const q=f.p*f.r/400, tot=q*4*f.y;
    return {hero:["Interest every quarter",inr(q,0),"gain"],rows:[["Interest a year",inr(q*4,0),"gain"],["Monthly equivalent",inr(q/3,0)],["Total interest over the tenure",inr(tot,0),"gain"],["Principal returned at maturity",inr(f.p,0)],["Total received",inr(f.p+tot,0)]],bar:[f.p,tot],barLabels:["Deposit","Interest"],
      note:f.p>3000000?"The scheme caps the total you can deposit, at ₹30 lakh at the time of writing. Check the current limit.":null}},
  formula:"Quarterly interest = deposit × rate ÷ 4. Interest is paid out every quarter and does not compound, so total interest = quarterly interest × 4 × years, and the deposit is returned at maturity. The account runs for 5 years and can be extended. The government reviews the rate every quarter, and the default is the rate at the time of writing. A new deposit's rate stays fixed for its tenure."},
 {id:"nsc",group:"Savings & salary",ic:"NS",name:"NSC Calculator",lede:"Estimate the maturity value of a National Savings Certificate and the interest earned each year.",
  fields:[["p","Investment",100000,"₹"],["r","Interest rate (p.a.)",7.7,"%"],["y","Tenure",5,"years"]],
  calc:f=>{ const n=Math.round(f.y), rows=[]; let b=f.p; for(let k=1;k<=n;k++){ const yi=b*f.r/100; rows.push([`Interest in year ${k}`,inr(yi,0)]); b+=yi; }
    return {hero:["Maturity value",inr(b,0)],rows:[["Total interest",inr(b-f.p,0),"gain"],...rows],bar:[f.p,b-f.p],barLabels:["Investment","Interest"]}},
  formula:"Maturity = P × (1 + r)<sup>n</sup>. NSC interest is compounded every year but paid only at maturity, so each year's interest is added to the balance. The government reviews the rate every quarter. A certificate keeps the rate it was bought at, and the default is the rate at the time of writing."},
 {id:"percentage",group:"Everyday",ic:"%",name:"Percentage Calculator",lede:"Three common percentage questions, answered at once.",
  fields:[["a","Value A",25,""],["b","Value B",480,""]],
  calc:f=>{const ch=(f.b-f.a)/f.a*100;
    return {hero:[`${num(f.a)}% of ${num(f.b)}`,num(f.a*f.b/100,4)],rows:[[`${num(f.a)} is what % of ${num(f.b)}`,pct(f.a/f.b*100,4)],[`Change from ${num(f.a)} to ${num(f.b)}`,pct(ch),sign(ch)]]}},
  formula:"A% of B = A × B ÷ 100. A as a % of B = A ÷ B × 100. Percent change = (B − A) ÷ A × 100."},
 {id:"gst",group:"Everyday",ic:"G%",name:"GST Calculator",lede:"Add GST to a price, or take it out of a price that already includes it.",
  fields:[["a","Amount",10000,"₹"],["r","GST rate",18,"%"]],
  calc:f=>{ const g=f.a*f.r/100, base=f.a*100/(100+f.r);
    return {hero:["Price including GST",inr(f.a+g)],rows:[["GST to add",inr(g)],["CGST and SGST (each, within a state)",inr(g/2)],["IGST (between states)",inr(g)],[`If ${inr(f.a,0)} already includes GST: price before GST`,inr(base)],[`GST included in ${inr(f.a,0)}`,inr(f.a-base)]]}},
  formula:"Adding GST: GST = amount × rate ÷ 100, and the total is amount + GST. Removing GST from a price that already includes it: price before GST = price × 100 ÷ (100 + rate). Within a state, GST is split equally into CGST and SGST. On sales between states it is charged as IGST. Use the rate that applies to your goods or service."},
 {id:"simple-interest",group:"Everyday",ic:"SI",name:"Simple Interest Calculator",lede:"Work out simple interest and the total amount on a sum of money.",
  fields:[["p","Principal",100000,"₹"],["r","Interest rate (p.a.)",8,"%"],["t","Time",3,"years"]],
  calc:f=>{ const si=f.p*f.r*f.t/100, ci=f.p*Math.pow(1+f.r/100,f.t)-f.p;
    return {hero:["Simple interest",inr(si,0),"gain"],rows:[["Total amount",inr(f.p+si,0)],["Interest per year",inr(si/f.t,0)],["Interest per month",inr(si/f.t/12,0)],["Compound interest for comparison (yearly)",inr(ci,0)]],bar:[f.p,si],barLabels:["Principal","Interest"]}},
  formula:"Simple interest = P × R × T ÷ 100, where P is the principal, R is the yearly rate and T is the time in years. The interest is the same every year because it is always worked out on the original principal. For time in months, divide by 12. For example, 18 months is 1.5 years."}
];


// Set this to the address that should receive messages from the contact form.
const CONTACT_EMAIL = "drsutar08@gmail.com";
// Formspree form ID (the part after /f/ in https://formspree.io/f/xxxxxxxx). Leave empty to fall back to the visitor's email app.
// Your Buy Me a Coffee page, for example "https://buymeacoffee.com/yourname". Leave empty to hide the button.
const COFFEE_URL = "https://buymeacoffee.com/drsutar08";
// Put your payment QR image at this path (a PNG or JPG). The QR box stays hidden until the file exists.
const COFFEE_QR = "images/payment-qr.png";
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
   <h2>Who runs this site</h2>
   <p>Nivesh Calc is built and maintained by <b>Diptiranjan Sutar</b>, an investor and software developer based in India. I write the calculators and the guides myself, and I check each formula against worked examples before it goes live.</p>
   <p>I am not a SEBI-registered investment adviser or a tax professional. The calculators and guides are for education and planning, not personal advice. Please read the <a href="disclaimer/">disclaimer</a>.</p>
   <p>Missing a calculator or found a mistake? <a href="contact-us/">Tell me</a>. Corrections are made as soon as they are confirmed.</p></div>`},
 {id:"contact",group:"More",ic:"@",name:"Contact Us",lede:"Feedback, suggestions and bug reports are welcome.",
  html:`<div class="panel prose"><h2>Get in touch</h2>
   <p>Nivesh Calc is run by Diptiranjan Sutar, an investor and software developer based in India. You can email me at <a href="mailto:drsutar08@gmail.com">drsutar08@gmail.com</a> or use the form below. I read every message and aim to reply within a few days.</p>
   <p>I cannot give personal investment, tax or legal advice, but I am happy to hear about mistakes, missing calculators and ideas.</p></div>
   <form class="panel" id="contact-form" autocomplete="off"><h2>Send a message</h2>
   <label class="f" for="c-name">Full name<div class="inp"><input id="c-name" name="name" required></div></label>
   <label class="f" for="c-email">Email address<div class="inp"><input id="c-email" name="email" type="email" required></div></label>
   <label class="f" for="c-msg">Message<div class="inp"><textarea id="c-msg" name="msg" rows="6" required></textarea></div></label>
   <div class="btns"><button class="btn primary" type="submit">Send message</button></div>
   <p class="note" id="c-status" role="status">We read every message.</p></form>`},
 {id:"coffee",group:"More",ic:"☕",name:"Buy Me a Coffee",lede:"Enjoying the calculators? You can support the site.",
  html:`<div class="panel prose"><h2>Thank you for using Nivesh Calc</h2>
   <p>Every calculator here is free to use, with no sign-up. If they saved you time or helped you make a better decision, a small tip helps cover the time that goes into building, checking and updating them. It is completely optional, and the site stays free whether or not you give.</p></div>
   <div class="two">
    <section class="panel prose"><h2>Online</h2>
     <p>Tip through Buy Me a Coffee with a card or other supported method. You will go to their secure page.</p>
     ${COFFEE_URL ? `<div class="btns"><a class="btn primary" href="${COFFEE_URL}" target="_blank" rel="noopener">☕ Buy me a coffee</a></div>` : `<p class="note">The support link will appear here soon.</p>`}</section>
    <section class="panel prose qr-card"><h2>Scan to pay</h2>
     <p>Prefer a payment app? Scan this code with it.</p>
     <figure class="qr"><img src="${COFFEE_QR}" alt="QR code to support Nivesh Calc" width="220" height="220" onerror="this.closest('.qr-card').hidden=true"></figure></section>
   </div>
   <div class="panel prose wide"><p>Other ways to help: share a calculator with a friend, or <a href="contact-us/">send feedback</a> so we can improve them.</p></div>`},
 {id:"privacy",group:"More",ic:"🔒",name:"Privacy Policy",lede:"What this site does and does not collect.",
  html:`<div class="panel prose"><h2>Your calculator inputs stay with you</h2>
   <p>The numbers you type into a calculator are processed in your browser. They are not sent to our servers or stored by us.</p>
   <h2>What is stored on your device</h2>
   <p>If you switch between light and dark mode, your choice is saved in your browser's local storage so the site remembers it. You can clear it from your browser settings.</p>
   <h2>Links to other services</h2>
   <p>Some pages may include links to partner services. If you sign up through them, we may earn a commission. These partners, and Buy Me a Coffee if you choose to tip, are separate websites that may set their own cookies under their own privacy policies.</p>
   <h2>Messages you send us</h2>
   <p>If you use the contact form, your name, email address and message are sent to us through Formspree, a form service, so that we can read and reply to them. We use them only to respond.</p>
   <h2>Advertising and cookies</h2>
   <p>This site may show ads served by Google AdSense or other ad partners. These partners may use cookies or similar technologies to show ads based on your visits to this and other sites. You can manage ad personalisation at <a href="https://adssettings.google.com" rel="noopener">Google Ads Settings</a> and learn more about how Google uses data at <a href="https://policies.google.com/technologies/partner-sites" rel="noopener">policies.google.com/technologies/partner-sites</a>.</p>
   <h2>Changes and questions</h2>
   <p>We may update this policy from time to time. If you have a question, please <a href="contact-us/">contact us</a>.</p></div>`},
 {id:"disclaimer",group:"More",ic:"!",name:"Disclaimer",lede:"Please read this before you use any result.",
  html:`<div class="panel prose"><p class="note">Content on this site is for education only and is not financial advice.</p>
   <ol class="risks">${DISCLAIMERS.map(([h,p])=>`<li><h3>${h}</h3><p>${p}</p></li>`).join("")}</ol>
   <p><b>Reminder:</b> invest only money you can afford to lose, and make decisions with a qualified adviser.</p></div>`}
];
const LOT_COLORS=["var(--accent)","var(--bar2)","#4a90d9","#c0608f","#8a6fd1","#d9774a"];
const $=s=>document.querySelector(s);
const state={};
let cur;


function field(id,label,val,unit){
  const pre = unit==="₹";
  return `<label class="f" for="f-${cur.id}-${id}">${label}<div class="inp">${pre?'<span>₹</span>':''}<input id="f-${cur.id}-${id}" data-k="${id}" type="number" inputmode="decimal" step="any" value="${val}">${!pre&&unit?`<span>${unit}</span>`:''}</div></label>`;
}
function showPage(pg){
  document.querySelectorAll("#side a[data-id]").forEach(a=>{ if(a.dataset.id===pg.id) a.setAttribute("aria-current","page"); else a.removeAttribute("aria-current"); });
  $("#title").textContent=pg.name; $("#lede").textContent=pg.lede;
  $("#page").innerHTML=pg.html; $("#page").hidden=false;
  document.querySelector(".work").hidden=true; document.querySelector(".howto").hidden=true;
  $("#app").classList.remove("open"); scrollTo(0,0);
}

function render(id){
  const pg=PAGES.find(p=>p.id===id); if(pg){showPage(pg);return}
  $("#page").hidden=true; document.querySelector(".work").hidden=false; document.querySelector(".howto").hidden=false;
  cur = CALCS.find(c=>c.id===id)||CALCS[0];
  document.querySelectorAll("#side a[data-id]").forEach(a=>{ if(a.dataset.id===cur.id) a.setAttribute("aria-current","page"); else a.removeAttribute("aria-current"); });
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
function isDark(){return root.dataset.theme==="dark"}
function syncTheme(){$("#theme").textContent=isDark()?"Light":"Dark"}
$("#theme").onclick=()=>{root.dataset.theme=isDark()?"light":"dark";try{localStorage.setItem("nc-theme",root.dataset.theme)}catch(e){}syncTheme()};
try{const t=localStorage.getItem("nc-theme");if(t)root.dataset.theme=t}catch(e){}
syncTheme();

// mobile drawer
$("#menu").onclick=()=>$("#app").classList.add("open");
$("#scrim").onclick=()=>$("#app").classList.remove("open");

// old #hash links: send them to the real page for that calculator
const here=document.body.dataset.page||"home";
const legacy=[...CALCS,...PAGES].find(x=>x.id===location.hash.slice(1));
const dest=u=>location.protocol==="file:" && u.endsWith("/") ? u+"index.html" : u; // file:// has no folder index
if(legacy && legacy.id!==here) location.replace(dest(new URL(pathOf(legacy),document.baseURI).href));
if(location.protocol==="file:") document.addEventListener("click",e=>{
  const a=e.target.closest&&e.target.closest("a[href]");
  if(a && a.href.startsWith("file:") && a.href.endsWith("/") && !e.defaultPrevented && e.button===0 && !e.metaKey && !e.ctrlKey){ e.preventDefault(); location.href=dest(a.href); }
});
if([...CALCS,...PAGES].some(x=>x.id===here)) render(here); // the homepage and 404 page are static, not calculators

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

// sidebar search: hide links that do not match, open groups that have matches
$("#q").addEventListener("input",()=>{
  const q=$("#q").value.trim().toLowerCase(); let shown=0;
  document.querySelectorAll("#nav .grp").forEach(g=>{
    let any=0;
    g.querySelectorAll("a").forEach(a=>{const m=!q||a.title.toLowerCase().includes(q); a.hidden=!m; if(m) any++;});
    g.hidden=!any; shown+=any;
    g.open = q ? !!any : g.dataset.open==="1";
  });
  $("#nomatch").hidden=shown>0;
});
$("#q").addEventListener("keydown",e=>{
  if(e.key==="Escape"){ $("#q").value=""; $("#q").dispatchEvent(new Event("input")); $("#q").blur(); return; }
  if(e.key==="Enter"){ const a=[...document.querySelectorAll("#nav a")].find(x=>!x.hidden); if(a){location.href=a.href.endsWith("/")&&location.protocol==="file:"?a.href+"index.html":a.href;} }
});
