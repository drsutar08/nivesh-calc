const inr = (v,d=2)=> isFinite(v) ? "₹" + v.toLocaleString("en-IN",{minimumFractionDigits:d,maximumFractionDigits:d}) : "—";
const num = (v,d=2)=> isFinite(v) ? v.toLocaleString("en-IN",{maximumFractionDigits:d}) : "—";
const pct = (v,d=2)=> isFinite(v) ? v.toFixed(d) + "%" : "—";
const sign = v => v>0 ? "gain" : v<0 ? "loss" : "";

const slugOf = n => n.toLowerCase().replace(/&/g,"and").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");
const pathOf = c => c.id==="home" ? "./" : (c.slug||(c.id==="about"?"about-us":c.id==="contact"?"contact-us":slugOf(c.name)))+"/";

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
 {id:"graham-number",group:"Stocks",ic:"GN",name:"Graham Number Calculator",lede:"Estimate a stock's fair value with Benjamin Graham's formulas and see your margin of safety.",
  fields:[["eps","Earnings per share (EPS)",50,"₹"],["bv","Book value per share",300,"₹"],["price","Current share price",450,"₹"],["g","Expected yearly earnings growth",10,"%"],["y","High-grade bond yield",7.5,"%"]],
  calc:f=>{ const gn=Math.sqrt(22.5*f.eps*f.bv), gv=f.eps*(8.5+2*f.g)*4.4/f.y, mos=x=>(x-f.price)/x*100, pe=f.price/f.eps, pb=f.price/f.bv;
    return {hero:["Graham number",inr(gn)],rows:[["Margin of safety at today's price",pct(mos(gn)),sign(mos(gn))],["Graham growth formula value",inr(gv)],["Margin of safety on that value",pct(mos(gv)),sign(mos(gv))],["P/E ratio",num(pe,2)],["P/B ratio",num(pb,2)],["P/E × P/B (Graham's limit is 22.5)",num(pe*pb,2),pe*pb>22.5?"loss":"gain"]],
      note:f.g>15?"Graham's growth formula tends to overstate value when growth above about 15% is assumed. Treat the result with care.":null}},
  formula:"Graham number = √(22.5 × EPS × book value per share). It is the highest price Graham thought a defensive investor should pay, based on a P/E of 15 and a P/B of 1.5. Graham's growth formula: value = EPS × (8.5 + 2g) × 4.4 ÷ Y, where g is the expected growth rate and Y is the current yield on high-grade bonds. Margin of safety = (value − price) ÷ value. These are rough screens, not a full valuation."},
 {id:"fibonacci",group:"Stocks",ic:"FB",name:"Fibonacci Retracement Calculator",lede:"Find Fibonacci retracement and extension levels between a swing high and a swing low.",
  fields:[["h","Swing high",1800,"₹"],["l","Swing low",1500,"₹"]],
  calc:f=>{ if(f.h<=f.l) return {hero:["Range","—"],rows:[],note:"The swing high must be above the swing low."};
    const r=f.h-f.l, lv=[23.6,38.2,50,61.8,78.6];
    return {hero:["Range (high − low)",inr(r)],rows:[...lv.map(x=>[`Uptrend ${x}% pullback`,inr(f.h-r*x/100)]),["Uptrend 127.2% extension",inr(f.l+r*1.272)],["Uptrend 161.8% extension",inr(f.l+r*1.618)],...lv.map(x=>[`Downtrend ${x}% bounce`,inr(f.l+r*x/100)]),["Downtrend 127.2% extension",inr(f.h-r*1.272)],["Downtrend 161.8% extension",inr(f.h-r*1.618)]]}},
  formula:"In an uptrend (the price rose from the low to the high), a retracement level = high − range × ratio. In a downtrend (the price fell from the high to the low), it is low + range × ratio, where range = high − low. The common ratios are 23.6%, 38.2%, 50%, 61.8% and 78.6%. Extensions project beyond the move at 127.2% and 161.8% of the range."},
 {id:"stock-return",group:"Stocks",ic:"SR",name:"Stock Return Calculator",lede:"Find your total and annualised return on a stock, including the dividends you received.",
  zeroOk:["div"],
  fields:[["buy","Buy price",400,"₹"],["sell","Sell price or current price",560,"₹"],["div","Dividends received per share (total)",24,"₹"],["q","Quantity",100,"units"],["y","Years held",3,"years"]],
  calc:f=>{ const cost=f.buy*f.q, pg=(f.sell-f.buy)*f.q, dv=f.div*f.q, tot=pg+dv, ann=(Math.pow((f.sell+f.div)/f.buy,1/f.y)-1)*100;
    return {hero:["Total profit / loss",inr(tot,0),sign(tot)],rows:[["Price gain / loss",inr(pg,0),sign(pg)],["Dividends received",inr(dv,0),dv>0?"gain":""],["Total return",pct(tot/cost*100),sign(tot)],["Annualised return",pct(ann),sign(ann)],["Share of the return from dividends",tot>0?pct(dv/tot*100):"—"],["Amount invested",inr(cost,0)]]}},
  formula:"Total return = (sell price − buy price + dividends per share) × quantity. Annualised return = ((sell price + dividends) ÷ buy price)<sup>1/years</sup> − 1. This treats dividends as cash received, not reinvested, and leaves out brokerage and tax."},
 {id:"futures-pl",group:"Stocks",ic:"FU",name:"Futures Profit/Loss Calculator",lede:"See the profit or loss on a futures trade and the return on the margin you put up.",
  fields:[["entry","Entry price",2400,"₹"],["exit","Exit price",2460,"₹"],["lot","Lot size",250,"units"],["lots","Number of lots",1,"lots"],["m","Margin required",15,"% of contract"]],
  calc:f=>{ const q=f.lot*f.lots, pl=(f.exit-f.entry)*q, val=f.entry*q, mg=val*f.m/100;
    return {hero:["Long (buy) profit / loss",inr(pl,0),sign(pl)],rows:[["Short (sell) profit / loss",inr(-pl,0),sign(-pl)],["Points moved",num(f.exit-f.entry,2),sign(pl)],["Profit / loss per point",inr(q,0)],["Contract value",inr(val,0)],["Approximate margin",inr(mg,0)],["Return on margin (long)",pct(pl/mg*100),sign(pl)],["Quantity",num(q,0)+" units"]]}},
  formula:"Long profit = (exit price − entry price) × lot size × lots, and a short position gains the opposite. Contract value = entry price × quantity. Return on margin = profit ÷ (contract value × margin %). Exchanges set the margin and the lot size and change them over time. Brokerage, STT and other charges are not included."},
 {id:"pe-ratio",slug:"pe-ratio-calculator",group:"Stocks",ic:"PE",name:"P/E Ratio Calculator",lede:"Work out a stock's P/E, forward P/E and PEG ratio, and compare it with its sector.",
  fields:[["price","Share price",1200,"₹"],["eps","Earnings per share (last 12 months)",60,"₹"],["g","Expected earnings growth (p.a.)",15,"%"],["sec","Sector or index P/E",22,"×"]],
  calc:f=>{ const pe=f.price/f.eps, fpe=f.price/(f.eps*(1+f.g/100)), peg=pe/f.g, prem=(pe/f.sec-1)*100;
    return {hero:["P/E ratio",num(pe,2)+"×"],rows:[["Forward P/E (on next year's earnings)",num(fpe,2)+"×"],["PEG ratio",num(peg,2),peg<=1?"gain":peg>2?"loss":""],["Earnings yield",pct(100/pe)],[prem>=0?"Premium to the sector P/E":"Discount to the sector P/E",pct(Math.abs(prem)),prem>0?"loss":"gain"],["Price at the sector P/E",inr(f.eps*f.sec)]]}},
  formula:"P/E = share price ÷ earnings per share. Forward P/E = price ÷ (EPS × (1 + growth)). PEG = P/E ÷ expected growth rate (in %), so a PEG near 1 means the P/E roughly matches growth. Earnings yield = EPS ÷ price, the inverse of P/E. Compare P/E ratios only between similar companies, because normal levels differ a lot between sectors."},
 {id:"dividend-reinvestment",group:"Stocks",ic:"DR",name:"Dividend Reinvestment Calculator",lede:"See how reinvesting dividends grows your holding compared with taking them as cash.",
  zeroOk:["tax"],
  fields:[["a","Amount invested",100000,"₹"],["dy","Dividend yield",3,"%"],["g","Yearly share price growth",8,"%"],["y","Years",15,"years"],["tax","Tax on dividends (your slab)",20,"%"]],
  calc:f=>{ const n=Math.round(f.y); let re=f.a, plain=f.a, cash=0;
    for(let k=0;k<n;k++){ re*=1+f.g/100; re+=re*f.dy/100*(1-f.tax/100); plain*=1+f.g/100; cash+=plain*f.dy/100*(1-f.tax/100); }
    const ann=(Math.pow(re/f.a,1/n)-1)*100;
    return {hero:["Value with dividends reinvested",inr(re,0)],rows:[["Value without reinvesting",inr(plain,0)],["Dividends taken as cash (after tax)",inr(cash,0)],["Total without reinvesting",inr(plain+cash,0)],["Extra from reinvesting",inr(re-plain-cash,0),re>plain+cash?"gain":""],["Annualised return with reinvesting",pct(ann),sign(ann)]]}},
  formula:"Each year the share price grows by the rate you enter, and the dividend (yield × value) is paid after tax. With reinvestment, the dividend buys more shares, so next year's growth and dividend are on a larger holding. Without reinvestment, the dividends are kept as cash. This assumes the yield and growth stay constant, and it leaves out brokerage."},
 {id:"loss-recovery",group:"Stocks",ic:"LR",name:"Loss Recovery Calculator",lede:"See how big a gain you need to recover from a loss, and how long it may take.",
  fields:[["buy","Your buy price",1000,"₹"],["cur","Current price",600,"₹"],["r","Expected return (p.a.)",12,"%"]],
  calc:f=>{ if(f.cur>=f.buy) return {hero:["Gain needed to break even","0%","gain"],rows:[["Current gain",pct((f.cur/f.buy-1)*100),"gain"]],note:"The current price is not below your buy price, so there is no loss to recover."};
    const loss=(1-f.cur/f.buy)*100, need=(f.buy/f.cur-1)*100, yrs=Math.log(f.buy/f.cur)/Math.log(1+f.r/100);
    return {hero:["Gain needed to break even",pct(need),"loss"],rows:[["Loss so far",pct(loss),"loss"],[`Years to recover at ${pct(f.r,1)} a year`,num(yrs,1)+" years"],["Price needed to break even",inr(f.buy)],["Rise needed from today",inr(f.buy-f.cur)]]}},
  formula:"Loss = 1 − current price ÷ buy price. Gain needed = buy price ÷ current price − 1, which is always larger than the loss: a 40% fall needs a 66.7% gain. Years to recover = ln(buy ÷ current) ÷ ln(1 + yearly return). Dividends, charges and tax are not included."},
 {id:"roe",group:"Stocks",ic:"RO",name:"ROE Calculator",lede:"Work out return on equity and break it down with DuPont analysis.",
  fields:[["np","Net profit",120,"₹ cr"],["rev","Revenue",1000,"₹ cr"],["ta","Total assets",1500,"₹ cr"],["eq","Shareholders' equity",800,"₹ cr"]],
  calc:f=>{ const roe=f.np/f.eq*100, roa=f.np/f.ta*100, nm=f.np/f.rev*100, at=f.rev/f.ta, em=f.ta/f.eq;
    return {hero:["Return on equity (ROE)",pct(roe),sign(roe)],rows:[["Net profit margin",pct(nm)],["Asset turnover",num(at,2)+"×"],["Equity multiplier (assets ÷ equity)",num(em,2)+"×"],["DuPont check: margin × turnover × multiplier",pct(nm*at*em)],["Return on assets (ROA)",pct(roa)]],
      note:em>4?"An equity multiplier this high means the company relies heavily on borrowing, which lifts ROE but adds risk.":null}},
  formula:"ROE = net profit ÷ shareholders' equity. DuPont analysis splits it into three parts: ROE = net profit margin (profit ÷ revenue) × asset turnover (revenue ÷ assets) × equity multiplier (assets ÷ equity). It shows whether a high ROE comes from profitability, efficiency or borrowing. Use the same units, such as ₹ crore, for every figure."},
 {id:"dcf",group:"Stocks",ic:"DC",name:"DCF Calculator",lede:"Estimate a company's intrinsic value per share from its future free cash flows.",
  zeroOk:["nd"],
  fields:[["fcf","Free cash flow this year",500,"₹ cr"],["g","Yearly growth for the next 10 years",15,"%"],["tg","Growth after that (terminal)",5,"%"],["dr","Discount rate",12,"%"],["sh","Shares outstanding",20,"crore"],["nd","Net debt (debt − cash, negative for net cash)",0,"₹ cr"],["price","Current share price",700,"₹"]],
  calc:f=>{ if(f.dr<=f.tg) return {hero:["Intrinsic value per share","—"],rows:[],note:"The discount rate must be higher than the terminal growth rate."};
    let pv=0, c=f.fcf; for(let t=1;t<=10;t++){ c*=1+f.g/100; pv+=c/Math.pow(1+f.dr/100,t); }
    const tv=c*(1+f.tg/100)/((f.dr-f.tg)/100), ptv=tv/Math.pow(1+f.dr/100,10), ev=pv+ptv, eq=ev-f.nd, v=eq/f.sh, mos=(v-f.price)/v*100;
    return {hero:["Intrinsic value per share",inr(v)],rows:[v>=f.price?["Margin of safety at today's price",pct(mos),"gain"]:["Price above intrinsic value by",v>0?pct((f.price/v-1)*100):"—","loss"],["Value of the next 10 years' cash flows",inr(pv,0)+" cr"],["Value beyond 10 years (terminal value)",inr(ptv,0)+" cr"],["Share of value from the terminal value",pct(ptv/ev*100)],["Enterprise value",inr(ev,0)+" cr"],["Equity value",inr(eq,0)+" cr"]],
      note:ptv/ev>0.75?"Most of the value comes from the terminal value, so small changes in the long-term assumptions move the result a lot.":null}},
  formula:"Each year's free cash flow is grown for 10 years and discounted to today: FCF<sub>t</sub> ÷ (1 + discount rate)<sup>t</sup>. Terminal value = FCF<sub>10</sub> × (1 + terminal growth) ÷ (discount rate − terminal growth), also discounted to today. Enterprise value = the sum of both. Equity value = enterprise value − net debt, and value per share = equity value ÷ shares. Enter amounts in ₹ crore and shares in crore. The result depends heavily on the assumptions, so try a range."},
 {id:"market-cap",group:"Stocks",ic:"MC",name:"Market Cap & Enterprise Value Calculator",lede:"Work out a company's market capitalisation, enterprise value and EV/EBITDA.",
  zeroOk:["debt","cash"],
  fields:[["price","Share price",1500,"₹"],["sh","Shares outstanding",10,"crore"],["debt","Total debt",2000,"₹ cr"],["cash","Cash and equivalents",500,"₹ cr"],["ebitda","EBITDA (yearly)",1800,"₹ cr"],["np","Net profit (yearly)",900,"₹ cr"]],
  calc:f=>{ const mc=f.price*f.sh, ev=mc+f.debt-f.cash;
    return {hero:["Market capitalisation",inr(mc,0)+" cr"],rows:[["Enterprise value",inr(ev,0)+" cr"],["EV / EBITDA",num(ev/f.ebitda,2)+"×"],["P/E (market cap ÷ net profit)",num(mc/f.np,2)+"×"],["Net debt",inr(f.debt-f.cash,0)+" cr"],["Net debt / EBITDA",num((f.debt-f.cash)/f.ebitda,2)+"×"]]}},
  formula:"Market capitalisation = share price × shares outstanding. Enterprise value (EV) = market cap + debt − cash, which is roughly what it would cost to buy the whole business, including its debt. EV/EBITDA compares that value with operating profit before interest, tax, depreciation and amortisation. P/E = market cap ÷ net profit. Enter amounts in ₹ crore and shares in crore."},
 {id:"financial-ratios",group:"Stocks",ic:"FR",name:"Financial Ratios Calculator",lede:"Check a company's ROCE, debt-to-equity, interest cover and liquidity ratios in one place.",
  zeroOk:["debt","int","inv"],
  fields:[["ebit","EBIT (operating profit)",300,"₹ cr"],["ta","Total assets",2000,"₹ cr"],["ca","Current assets",700,"₹ cr"],["cl","Current liabilities",400,"₹ cr"],["inv","Inventory",200,"₹ cr"],["debt","Total debt",600,"₹ cr"],["eq","Shareholders' equity",1200,"₹ cr"],["int","Interest expense (yearly)",50,"₹ cr"]],
  calc:f=>{ const ce=f.ta-f.cl; if(ce<=0) return {hero:["ROCE","—"],rows:[],note:"Current liabilities must be less than total assets."};
    const roce=f.ebit/ce*100, de=f.debt/f.eq, ic=f.int>0?f.ebit/f.int:Infinity, cr=f.ca/f.cl, qr=(f.ca-f.inv)/f.cl;
    return {hero:["Return on capital employed (ROCE)",pct(roce),sign(roce)],rows:[["Capital employed (total assets − current liabilities)",inr(ce,0)+" cr"],["Debt to equity",num(de,2)+"×",de>2?"loss":de<=1?"gain":""],["Interest coverage",isFinite(ic)?num(ic,1)+"×":"No interest cost",isFinite(ic)?(ic<1.5?"loss":ic>=3?"gain":""):"gain"],["Current ratio",num(cr,2)+"×",cr<1?"loss":cr>=1.5?"gain":""],["Quick ratio (excludes inventory)",num(qr,2)+"×",qr<1?"loss":"gain"]]}},
  formula:"ROCE = EBIT ÷ capital employed, where capital employed = total assets − current liabilities. Debt to equity = total debt ÷ shareholders' equity. Interest coverage = EBIT ÷ interest expense. Current ratio = current assets ÷ current liabilities. Quick ratio = (current assets − inventory) ÷ current liabilities. Use the same units, such as ₹ crore, for every figure. Normal levels differ by industry."},
 {id:"trading-expectancy",group:"Stocks",ic:"EX",name:"Trading Expectancy Calculator",lede:"See whether a trading strategy makes money from its risk-reward and win rate.",
  fields:[["entry","Entry price",250,"₹"],["stop","Stop-loss price",240,"₹"],["target","Target price",270,"₹"],["wr","Win rate",40,"%"],["q","Quantity per trade",100,"units"]],
  calc:f=>{ if(f.stop>=f.entry||f.target<=f.entry) return {hero:["Expectancy per trade","—"],rows:[],note:"For a buy trade, the stop-loss must be below the entry price and the target above it."};
    if(f.wr>100) return {hero:["Expectancy per trade","—"],rows:[],note:"The win rate cannot be more than 100%."};
    const risk=f.entry-f.stop, rew=f.target-f.entry, R=rew/risk, w=f.wr/100, eR=w*R-(1-w), e=eR*risk*f.q, be=1/(1+R)*100;
    return {hero:["Expectancy per trade",inr(e,0),sign(e)],rows:[["Risk : reward",`1 : ${num(R,2)}`],["Win rate needed to break even",pct(be),f.wr>=be?"gain":"loss"],["Expectancy in R (multiples of risk)",num(eR,2)+"R",sign(eR)],["Expected result over 100 trades",inr(e*100,0),sign(e)],["Loss on a losing trade",inr(risk*f.q,0),"loss"],["Profit on a winning trade",inr(rew*f.q,0),"gain"]],
      note:e<0?"At this win rate the strategy loses money over time. Improve the win rate or the risk-reward.":null}},
  formula:"Risk per share = entry − stop-loss and reward per share = target − entry, so R = reward ÷ risk. Expectancy (in R) = win rate × R − (1 − win rate). Expectancy per trade = expectancy in R × risk per share × quantity. Break-even win rate = 1 ÷ (1 + R). Brokerage, charges and slippage are not included and lower the real expectancy."},
 {id:"sell-or-wait",group:"Stocks",ic:"SW",name:"Sell Now or Wait Calculator",lede:"See whether holding shares past 12 months for lower long-term tax is worth the price risk.",
  zeroOk:["ex"],
  fields:[["q","Quantity",100,"units"],["buy","Buy price",1000,"₹"],["now","Current price",1500,"₹"],["m","Months held so far",10,"months"],["st","Short-term capital gains tax rate",20,"%"],["lt","Long-term capital gains tax rate",12.5,"%"],["ex","Long-term exemption left this year",125000,"₹"]],
  calc:f=>{ const g=(f.now-f.buy)*f.q; if(g<=0) return {hero:["Tax saved by waiting","₹0"],rows:[],note:"There is no gain to tax at the current price, so holding period makes no difference to tax."};
    if(f.m>=12) return {hero:["Tax saved by waiting","—"],rows:[["Tax if you sell now (long-term)",inr(Math.max(0,g-f.ex)*f.lt/100,0)]],note:"You have already held the shares for 12 months or more, so a sale now is a long-term gain."};
    const tn=g*f.st/100, tw=Math.max(0,g-f.ex)*f.lt/100, netNow=f.q*f.now-tn, net=p=>f.q*p-Math.max(0,(p-f.buy)*f.q-f.ex)*f.lt/100*((p>f.buy)?1:0);
    let lo=0, hi=f.now; for(let k=0;k<100;k++){const mid=(lo+hi)/2; if(net(mid)>netNow) hi=mid; else lo=mid;} const p=(lo+hi)/2;
    return {hero:["Tax saved by waiting",inr(tn-tw,0),"gain"],rows:[["Tax if you sell now (short-term)",inr(tn,0),"loss"],["Tax if you sell after 12 months at the same price",inr(tw,0)],["Months left to become long-term",num(12-f.m,0)+" (a little over)"],["Price can fall to, before waiting stops paying",inr(p)],["That is a fall of",pct((f.now-p)/f.now*100),"loss"],["What you keep if you sell now",inr(netNow,0)]]}},
  formula:"Shares held for 12 months or less are taxed as a short-term gain, and longer holdings as a long-term gain with a yearly exemption. Tax saved by waiting = short-term tax now − long-term tax after 12 months, at today's price. The break-even price is the price after 12 months at which what you keep after tax equals what you keep by selling now. The default rates and exemption are those for listed equity at the time of writing. Check the current rules."},
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
 {id:"sip-vs-lumpsum",group:"Mutual funds",ic:"S/L",name:"SIP vs Lumpsum Calculator",lede:"Compare investing a sum all at once with spreading it as a monthly SIP.",
  fields:[["a","Total amount to invest",600000,"₹"],["y","Years",5,"years"],["r","Expected return (p.a.)",12,"%"]],
  calc:f=>{ const n=Math.round(f.y*12), i=f.r/1200, m=f.a/n, lump=f.a*Math.pow(1+f.r/100,f.y), sip=m*((Math.pow(1+i,n)-1)/i)*(1+i), d=lump-sip;
    return {hero:[d>=0?"Lumpsum ends ahead by":"SIP ends ahead by",inr(Math.abs(d),0)],rows:[["Lumpsum value",inr(lump,0)],["SIP value",inr(sip,0)],["Monthly SIP for the same total",inr(m,0)],["Lumpsum gain",inr(lump-f.a,0),sign(lump-f.a)],["SIP gain",inr(sip-f.a,0),sign(sip-f.a)]],
      note:"At the same steady return, a lumpsum always ends ahead because all the money is invested for longer. Real markets go up and down, and a SIP spreads your entry price and lowers the risk of investing just before a fall."}},
  formula:"Lumpsum value = amount × (1 + r)<sup>years</sup>. SIP value = P × [((1 + i)<sup>n</sup> − 1) ÷ i] × (1 + i), where P = amount ÷ n, i is the monthly rate and n is the number of months. Both use the same constant return, so the comparison shows the effect of time invested, not of market timing."},
 {id:"fire",group:"Mutual funds",ic:"FI",name:"FIRE Calculator",lede:"Find your financial independence number and how many years it may take to reach it.",
  zeroOk:["s","m"],
  fields:[["e","Yearly expenses today",600000,"₹"],["w","Safe withdrawal rate",4,"%"],["s","Current investments",1000000,"₹"],["m","Monthly investment",50000,"₹"],["r","Expected return (p.a.)",10,"%"],["inf","Inflation (p.a.)",6,"%"]],
  calc:f=>{ const target=f.e/(f.w/100); if(f.s<=0&&f.m<=0) return {hero:["FIRE number (in today's money)",inr(target,0)],rows:[],note:"Add current investments or a monthly investment to see when you could get there."};
    let c=f.s, k=0; const mr=f.r/1200, mi=Math.pow(1+f.inf/100,1/12); let t=target;
    while(c<t && k<1200){ c=c*(1+mr)+f.m; t*=mi; k++; }
    const ym=x=>{const y=Math.floor(x/12),mo=x%12;return `${y} ${y===1?"yr":"yrs"} ${mo} ${mo===1?"month":"months"}`};
    return {hero:["FIRE number (in today's money)",inr(target,0)],rows:[["Time to reach it",k>=1200?"More than 100 years":ym(k),k<1200?"gain":"loss"],["Corpus needed then (after inflation)",k<1200?inr(t,0):"—"],["Your corpus then",k<1200?inr(c,0):"—"],["Multiple of yearly expenses",num(100/f.w,1)+"×"]],
      note:f.r<=f.inf?"Your expected return is not above inflation, so the target grows as fast as your money.":null}},
  formula:"FIRE number = yearly expenses ÷ safe withdrawal rate. A 4% rate means 25 times your yearly expenses. Each month, your investments grow at the expected return and you add the monthly investment, while the target grows with inflation. The time to reach FIRE is the first month your corpus catches up. The 4% rule comes from long-term US studies, and many Indian planners use a lower rate because inflation is higher."},
 {id:"stp",group:"Mutual funds",ic:"ST",name:"STP Calculator",lede:"See how a systematic transfer plan moves a lump sum from a liquid fund into equity over time.",
  fields:[["a","Amount to invest",1200000,"₹"],["m","Transfer over",12,"months"],["lr","Liquid fund return (p.a.)",6.5,"%"],["er","Equity fund return (p.a.)",12,"%"],["y","Total time invested",5,"years"]],
  calc:f=>{ const n=Math.round(f.y*12), m=Math.round(f.m); if(m>n) return {hero:["Value with STP","—"],rows:[],note:"The transfer period cannot be longer than the total time invested."};
    const li=f.lr/1200, ei=f.er/1200, t=f.a/m; let liq=f.a, eq=0;
    for(let k=0;k<n;k++){ if(k<m){ const x=Math.min(t,liq); liq-=x; eq+=x; } if(k===m){ eq+=liq; liq=0; } liq*=1+li; eq*=1+ei; }
    const stp=liq+eq, lump=f.a*Math.pow(1+ei,n), liquid=f.a*Math.pow(1+li,n);
    return {hero:["Value with STP",inr(stp,0)],rows:[["Monthly transfer",inr(t,0)],["Lump sum straight into equity",inr(lump,0)],["Left in the liquid fund",inr(liquid,0)],["STP vs lump sum in equity",inr(stp-lump,0),sign(stp-lump)],["Gain with STP",inr(stp-f.a,0),sign(stp-f.a)]],
      note:"At steady returns, putting everything into equity at once ends higher, as with SIP vs lumpsum. An STP gives up a little of that to avoid investing the whole amount just before a fall."}},
  formula:"The full amount starts in a liquid fund. Each month a fixed amount (total ÷ transfer months) moves to an equity fund, and any interest left in the liquid fund moves across at the end of the transfer period. Both funds grow monthly at their expected return. The result is compared with investing the full amount in equity on day one, and with leaving it all in the liquid fund."},
 {id:"asset-allocation",group:"Mutual funds",ic:"AA",name:"Asset Allocation Calculator",lede:"Find a suggested equity and debt mix for your age, and how much to move to rebalance.",
  zeroOk:["eq","debt"],
  fields:[["age","Your age",35,"years"],["base","Rule: equity % = this number − age",110,""],["eq","Current equity investments",600000,"₹"],["debt","Current debt investments (FD, PPF, debt funds)",400000,"₹"]],
  calc:f=>{ const t=Math.min(100,Math.max(0,f.base-f.age)), tot=f.eq+f.debt;
    if(tot<=0) return {hero:["Suggested equity share",pct(t,0)],rows:[["Suggested debt share",pct(100-t,0)]],note:"Enter your current investments to see how to rebalance."};
    const te=tot*t/100, mv=te-f.eq;
    return {hero:["Suggested equity share",pct(t,0)],rows:[["Suggested debt share",pct(100-t,0)],["Your equity share now",pct(f.eq/tot*100)],["Target equity amount",inr(te,0)],["Target debt amount",inr(tot-te,0)],["To rebalance",Math.abs(mv)<1?"No change needed":mv>0?`Move ${inr(mv,0)} from debt to equity`:`Move ${inr(-mv,0)} from equity to debt`]]}},
  formula:"Suggested equity % = rule number − your age, kept between 0% and 100%, and the rest goes to debt. A rule number of 100 is conservative, 110 is moderate and 120 is aggressive. Target amounts apply those shares to your current total, and the difference from what you hold now is the amount to move. This is a starting point only. Your goals, income stability and comfort with risk matter more than age alone."},
 {id:"sip-time",group:"Mutual funds",ic:"TM",name:"SIP Time Calculator",lede:"Find how long a monthly SIP takes to reach your target amount.",
  zeroOk:["have"],
  fields:[["goal","Target amount",5000000,"₹"],["sip","Monthly SIP",20000,"₹"],["r","Expected return (p.a.)",12,"%"],["have","Amount already invested",0,"₹"]],
  calc:f=>{ if(f.have>=f.goal) return {hero:["Time to reach your goal","Already there","gain"],rows:[],note:"Your current investments already meet the target."};
    const i=f.r/1200; let v=f.have, k=0; while(v<f.goal && k<1200){ v=(v+f.sip)*(1+i); k++; }
    const y=Math.floor(k/12), m=k%12, inv=f.have+f.sip*k;
    return {hero:["Time to reach your goal",k>=1200?"More than 100 years":`${y} ${y===1?"yr":"yrs"} ${m} ${m===1?"month":"months"}`],rows:[["Number of SIP instalments",k>=1200?"—":num(k,0)],["Total you invest",k>=1200?"—":inr(inv,0)],["Growth",k>=1200?"—":inr(v-inv,0),"gain"],["Value when you reach it",k>=1200?"—":inr(v,0)]]}},
  formula:"Each month the SIP is added and the total grows at the monthly rate (yearly return ÷ 12), starting from any amount already invested. The time to reach the goal is the first month the value reaches the target. Returns are assumed to be steady, which real markets are not."},
 {id:"child-education",group:"Mutual funds",ic:"ED",name:"Child Education Planner",lede:"Estimate the future cost of your child's education and the SIP or lump sum needed for it.",
  zeroOk:["have"],
  fields:[["cost","Cost of the course today",2000000,"₹"],["y","Years until it starts",12,"years"],["ei","Education cost inflation (p.a.)",8,"%"],["have","Savings already set aside",200000,"₹"],["r","Expected return (p.a.)",11,"%"]],
  calc:f=>{ const n=Math.round(f.y*12), fut=f.cost*Math.pow(1+f.ei/100,f.y), hv=f.have*Math.pow(1+f.r/100,f.y), gap=Math.max(0,fut-hv), i=f.r/1200, k=((Math.pow(1+i,n)-1)/i)*(1+i);
    return {hero:["Future cost of the course",inr(fut,0)],rows:[["Your savings will grow to",inr(hv,0)],["Still needed",inr(gap,0),gap>0?"loss":"gain"],["Monthly SIP needed",inr(gap/k,0)],["Or a lump sum today of",inr(gap/Math.pow(1+f.r/100,f.y),0)]],
      note:gap===0?"Your existing savings are expected to cover the full cost.":null}},
  formula:"Future cost = today's cost × (1 + education inflation)<sup>years</sup>. Existing savings grow at the expected return. The monthly SIP needed = amount still needed ÷ [((1 + i)<sup>n</sup> − 1) ÷ i × (1 + i)], where i is the monthly rate and n is the number of months. The lump sum needed today = amount still needed ÷ (1 + return)<sup>years</sup>."},
 {id:"exit-load",group:"Mutual funds",ic:"XL",name:"Mutual Fund Exit Load Calculator",lede:"See the exit load deducted when you redeem mutual fund units early, and what you receive.",
  zeroOk:["load"],
  fields:[["u","Units to redeem",1000,"units"],["bn","NAV when you bought",70,"₹"],["nav","NAV when you redeem",85,"₹"],["load","Exit load",1,"%"]],
  calc:f=>{ const amt=f.u*f.nav, l=amt*f.load/100, rec=amt-l, g=rec-f.u*f.bn;
    return {hero:["Amount you receive",inr(rec,0)],rows:[["Redemption value before exit load",inr(amt,0)],["Exit load deducted",inr(l,0),l>0?"loss":""],["Amount you invested in these units",inr(f.u*f.bn,0)],["Gain after exit load",inr(g,0),sign(g)],["Exit load as a share of your gain",f.u*(f.nav-f.bn)>0?pct(l/(f.u*(f.nav-f.bn))*100):"—"]]}},
  formula:"Redemption value = units × NAV on the redemption date. Exit load = redemption value × exit load %, and you receive the rest. The exit load applies only to units redeemed within the period set in the scheme's documents, often one year for equity funds. Tax on the gain is not included."},
 {id:"lumpsum-goal",group:"Mutual funds",ic:"LG",name:"Lumpsum Goal Calculator",lede:"Find the one-time amount to invest today to reach a future goal.",
  zeroOk:["inf"],
  fields:[["goal","Goal amount in today's money",2500000,"₹"],["inf","Inflation (p.a.)",6,"%"],["y","Years until you need it",10,"years"],["r","Expected return (p.a.)",12,"%"]],
  calc:f=>{ const fut=f.goal*Math.pow(1+f.inf/100,f.y), lump=fut/Math.pow(1+f.r/100,f.y), n=Math.round(f.y*12), i=f.r/1200, sip=fut/(((Math.pow(1+i,n)-1)/i)*(1+i));
    return {hero:["Invest today",inr(lump,0)],rows:[["Goal amount in future rupees",inr(fut,0)],["Growth on your investment",inr(fut-lump,0),"gain"],["Or a monthly SIP of",inr(sip,0)],["Total invested through the SIP",inr(sip*n,0)]],bar:[lump,fut-lump],barLabels:["Invested","Growth"]}},
  formula:"Future goal = today's cost × (1 + inflation)<sup>years</sup>. Lump sum needed today = future goal ÷ (1 + expected return)<sup>years</sup>. The monthly SIP alternative = future goal ÷ [((1 + i)<sup>n</sup> − 1) ÷ i × (1 + i)], where i is the monthly rate and n is the number of months. Returns are assumed to be steady."},
 {id:"wedding-planner",group:"Mutual funds",ic:"WD",name:"Wedding Cost Planner",lede:"Estimate the future cost of a wedding and how much to invest for it.",
  zeroOk:["have"],
  fields:[["cost","Wedding cost in today's money",1500000,"₹"],["y","Years until the wedding",15,"years"],["inf","Cost inflation (p.a.)",7,"%"],["have","Savings already set aside",100000,"₹"],["r","Expected return (p.a.)",11,"%"]],
  calc:f=>{ const n=Math.round(f.y*12), fut=f.cost*Math.pow(1+f.inf/100,f.y), hv=f.have*Math.pow(1+f.r/100,f.y), gap=Math.max(0,fut-hv), i=f.r/1200, k=((Math.pow(1+i,n)-1)/i)*(1+i);
    return {hero:["Future cost of the wedding",inr(fut,0)],rows:[["Your savings will grow to",inr(hv,0)],["Still needed",inr(gap,0),gap>0?"loss":"gain"],["Monthly SIP needed",inr(gap/k,0)],["Or a lump sum today of",inr(gap/Math.pow(1+f.r/100,f.y),0)]],
      note:gap===0?"Your existing savings are expected to cover the full cost.":null}},
  formula:"Future cost = today's cost × (1 + inflation)<sup>years</sup>. Existing savings grow at the expected return. Monthly SIP needed = amount still needed ÷ [((1 + i)<sup>n</sup> − 1) ÷ i × (1 + i)], where i is the monthly rate and n is the number of months. Lump sum needed today = amount still needed ÷ (1 + return)<sup>years</sup>."},
 {id:"sip-frequency",group:"Mutual funds",ic:"SF",name:"SIP Frequency Calculator",lede:"Compare weekly, monthly and quarterly SIPs that invest the same amount each year.",
  fields:[["m","Amount you invest per month",10000,"₹"],["r","Expected return (p.a.)",12,"%"],["y","Years",10,"years"]],
  calc:f=>{ const yr=f.m*12, fv=k=>{const i=Math.pow(1+f.r/100,1/k)-1, n=Math.round(f.y*k), p=yr/k; return p*((Math.pow(1+i,n)-1)/i)*(1+i)};
    const w=fv(52), mo=fv(12), q=fv(4), hi=Math.max(w,mo,q), lo=Math.min(w,mo,q);
    return {hero:["Gap between the highest and lowest",inr(hi-lo,0)],rows:[["Weekly SIP value",inr(w,0)],["Monthly SIP value",inr(mo,0)],["Quarterly SIP value",inr(q,0)],["Total invested (same for all)",inr(yr*f.y,0)],["Gap as a share of the monthly SIP value",pct((hi-lo)/mo*100)]],
      note:"The gap is tiny and comes only from timing. A larger instalment paid at the start of each period puts money to work a little earlier, but needs the cash upfront. Choose the frequency that matches when you have the money."}},
  formula:"Each frequency invests the same amount a year: monthly amount × 12, split into 52 weekly, 12 monthly or 4 quarterly instalments, each paid at the start of its period. Each uses the equivalent periodic rate, (1 + yearly return)<sup>1/k</sup> − 1 for k instalments a year, so the comparison shows only the effect of timing. Value = P × [((1 + i)<sup>n</sup> − 1) ÷ i] × (1 + i)."},
 {id:"portfolio-return",group:"Mutual funds",ic:"PR",name:"Portfolio Return Calculator",lede:"Find the overall return of your portfolio from the return on each holding.",
  zeroOk:["v2","r2","v3","r3","v4","r4"],
  fields:[["v1","Holding 1 value",500000,"₹"],["r1","Holding 1 return (p.a.)",12,"%"],["v2","Holding 2 value",300000,"₹"],["r2","Holding 2 return (p.a.)",7,"%"],["v3","Holding 3 value",150000,"₹"],["r3","Holding 3 return (p.a.)",15,"%"],["v4","Holding 4 value",50000,"₹"],["r4","Holding 4 return (p.a.)",6.5,"%"]],
  calc:f=>{ const H=[[f.v1,f.r1],[f.v2,f.r2],[f.v3,f.r3],[f.v4,f.r4]].filter(([v])=>v>0), tot=H.reduce((s,[v])=>s+v,0), wr=H.reduce((s,[v,r])=>s+v*r,0)/tot;
    return {hero:["Weighted portfolio return",pct(wr),sign(wr)],rows:[["Total portfolio value",inr(tot,0)],["Expected gain in a year",inr(tot*wr/100,0),sign(wr)],...H.map(([v,r],k)=>[`Holding ${k+1}: share of portfolio, return`,`${pct(v/tot*100,1)}, ${pct(r,1)}`]),["Value in 10 years at this return",inr(tot*Math.pow(1+wr/100,10),0)]]}},
  formula:"Weighted return = the sum of (holding value × holding return) ÷ total value. Each holding's return counts in proportion to its share of the portfolio. Use the same kind of return for every holding, such as each fund's expected or past yearly return. Returns can be negative."},
 {id:"mf-units",group:"Mutual funds",ic:"UN",name:"Mutual Fund Units Calculator",lede:"Find how many mutual fund units you get for an investment, after stamp duty.",
  zeroOk:["sd"],
  fields:[["a","Amount invested",10000,"₹"],["nav","NAV on the purchase date",45.67,"₹"],["sd","Stamp duty",0.005,"%"]],
  calc:f=>{ const duty=f.a*f.sd/100, net=f.a-duty, u=net/f.nav;
    return {hero:["Units allotted",num(u,3)],rows:[["Stamp duty",inr(duty)],["Amount invested after stamp duty",inr(net)],["Value of the units at this NAV",inr(u*f.nav)],[`Value if the NAV rises 10% to ${inr(f.nav*1.1)}`,inr(u*f.nav*1.1)]]}},
  formula:"Units = (amount − stamp duty) ÷ NAV, usually rounded to 3 decimal places. Stamp duty applies to mutual fund purchases, including SIP instalments, but not to redemptions. The NAV used depends on when your money reaches the fund, which can be a day or more after you pay. The default stamp duty is the rate at the time of writing."},
 {id:"required-return",group:"Mutual funds",ic:"RQ",name:"Required Return Calculator",lede:"Find the yearly return you need to reach a target amount.",
  zeroOk:["now","sip"],
  fields:[["now","Amount invested today",500000,"₹"],["sip","Monthly SIP",10000,"₹"],["goal","Target amount",5000000,"₹"],["y","Years",10,"years"]],
  calc:f=>{ const n=Math.round(f.y*12), inv=f.now+f.sip*n; if(f.now<=0&&f.sip<=0) return {hero:["Return needed (p.a.)","—"],rows:[],note:"Enter an amount invested today, a monthly SIP, or both."};
    if(inv>=f.goal) return {hero:["Return needed (p.a.)","0% or less","gain"],rows:[["Total you invest",inr(inv,0)]],note:"What you invest already adds up to the target, so you need no growth at all."};
    const fv=r=>{const i=r/1200; return f.now*Math.pow(1+i,n)+(i?f.sip*((Math.pow(1+i,n)-1)/i)*(1+i):f.sip*n)};
    let lo=0, hi=200; for(let k=0;k<200;k++){const mid=(lo+hi)/2; if(fv(mid)>f.goal) hi=mid; else lo=mid;} const r=(lo+hi)/2;
    return {hero:["Return needed (p.a.)",pct(r)],rows:[["Total you invest",inr(inv,0)],["Growth needed",inr(f.goal-inv,0)],["Growth as a share of the target",pct((f.goal-inv)/f.goal*100)]],
      note:r>15?"That is a high return to expect for many years. Consider investing more, giving it more time, or lowering the target.":null}},
  formula:"The required return is the yearly rate r at which today's amount, compounded monthly, plus the SIP, reaches the target: target = amount × (1 + i)<sup>n</sup> + SIP × [((1 + i)<sup>n</sup> − 1) ÷ i] × (1 + i), where i = r ÷ 12 and n is the number of months. It is found by trial until both sides match."},
 {id:"rupee-cost-averaging",group:"Mutual funds",ic:"RC",name:"Rupee Cost Averaging Calculator",lede:"See how a fixed monthly investment buys more units when prices fall, using six months of NAVs.",
  fields:[["a","Amount invested each month",5000,"₹"],["n1","NAV in month 1",100,"₹"],["n2","NAV in month 2",90,"₹"],["n3","NAV in month 3",80,"₹"],["n4","NAV in month 4",95,"₹"],["n5","NAV in month 5",110,"₹"],["n6","NAV in month 6",105,"₹"]],
  calc:f=>{ const navs=[f.n1,f.n2,f.n3,f.n4,f.n5,f.n6], u=navs.map(v=>f.a/v), tu=u.reduce((s,x)=>s+x,0), inv=f.a*6, ac=inv/tu, an=navs.reduce((s,x)=>s+x,0)/6, val=tu*f.n6;
    return {hero:["Your average cost per unit",inr(ac)],rows:[["Average NAV over the six months",inr(an)],["Your cost is lower by",pct((an-ac)/an*100),"gain"],["Total units bought",num(tu,3)],["Most units bought in a month",`${num(Math.max(...u),3)} (at ${inr(Math.min(...navs))})`],["Total invested",inr(inv,0)],["Value at the last NAV",inr(val,0),sign(val-inv)]]}},
  formula:"Each month, units bought = amount ÷ NAV, so a lower NAV buys more units. Average cost per unit = total invested ÷ total units. Because more units are bought when the price is low, this average cost is never higher than the simple average of the NAVs, and it is lower whenever the NAV moves. Averaging does not guarantee a profit if prices keep falling."},
 {id:"swp-inflation",group:"Mutual funds",ic:"IS",name:"Inflation-Adjusted SWP Calculator",lede:"See how long a corpus lasts when your monthly withdrawal rises with inflation every year.",
  fields:[["c","Corpus",10000000,"₹"],["w","Monthly withdrawal in the first year",50000,"₹"],["s","Yearly increase in the withdrawal",6,"%"],["r","Expected return (p.a.)",9,"%"]],
  calc:f=>{ const i=f.r/1200, run=step=>{ let b=f.c, w=f.w, k=0, tot=0, last=w; while(k<1200){ if(k>0&&k%12===0) w*=1+step/100; if(b<w){ tot+=b; b=0; k++; break; } b-=w; tot+=w; last=w; b*=1+i; k++; } return {k,tot,last,left:b}; };
    const a=run(f.s), fx=run(0), ym=x=>x>=1200?"More than 100 years":(()=>{const y=Math.floor(x/12),m=x%12;return `${y} ${y===1?"yr":"yrs"} ${m} ${m===1?"month":"months"}`})();
    return {hero:["Corpus lasts",ym(a.k),a.k>=360?"gain":"loss"],rows:[["Total withdrawn",inr(a.tot,0)],["Monthly withdrawal in the last full year",inr(a.last,0)],["Corpus lasts with a fixed withdrawal instead",ym(fx.k)],["Withdrawal rate in the first year",pct(f.w*12/f.c*100)]],
      note:a.k>=1200?"At these figures the corpus keeps growing faster than you withdraw.":null}},
  formula:"Each month the withdrawal is taken out and the rest grows at the expected monthly return (yearly return ÷ 12). Every 12 months the withdrawal rises by the yearly increase, to keep up with inflation. The corpus lasts until a month's withdrawal can no longer be paid in full. The result is compared with keeping the withdrawal fixed. Tax on withdrawals is not included."},
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
 {id:"real-return",group:"Loans & growth",ic:"RR",name:"Real Return Calculator",lede:"Find what an investment really earns after tax and inflation.",
  zeroOk:["tax"],
  fields:[["n","Return before tax (p.a.)",7,"%"],["inf","Inflation (p.a.)",6,"%"],["tax","Tax on the return (your slab)",30,"%"],["a","Amount invested",100000,"₹"],["y","Years",10,"years"]],
  calc:f=>{ const at=f.n*(1-f.tax/100), real=((1+at/100)/(1+f.inf/100)-1)*100, realPre=((1+f.n/100)/(1+f.inf/100)-1)*100, fv=f.a*Math.pow(1+at/100,f.y), today=fv/Math.pow(1+f.inf/100,f.y);
    return {hero:["Real return after tax and inflation",pct(real),sign(real)],rows:[["Return after tax",pct(at)],["Real return before tax",pct(realPre),sign(realPre)],[`Value after ${num(f.y,1)} years`,inr(fv,0)],["The same in today's money",inr(today,0),sign(today-f.a)],["Change in buying power",pct((today/f.a-1)*100),sign(today-f.a)]]}},
  formula:"Return after tax = return × (1 − tax rate). Real return = (1 + after-tax return) ÷ (1 + inflation) − 1. It is the yearly growth in what your money can actually buy. Value in today's money = future value ÷ (1 + inflation)<sup>years</sup>. This assumes the return is taxed every year, as with FD interest. Investments taxed only when you sell will do a little better."},
 {id:"balance-transfer",group:"Loans & growth",ic:"BT",name:"Home Loan Balance Transfer Calculator",lede:"Find out whether moving your home loan to a lower rate saves money after the fees.",
  zeroOk:["fee"],
  fields:[["p","Outstanding loan",4000000,"₹"],["r1","Current interest rate (p.a.)",9.25,"%"],["r2","New lender's rate (p.a.)",8.5,"%"],["y","Remaining tenure",18,"years"],["fee","Switching costs (fees, charges)",25000,"₹"]],
  calc:f=>{ const n=Math.round(f.y*12), emi=r=>{const i=r/1200; return f.p*i*Math.pow(1+i,n)/(Math.pow(1+i,n)-1)}, e1=emi(f.r1), e2=emi(f.r2), i1=e1*n-f.p, i2=e2*n-f.p, net=i1-i2-f.fee, ms=e1-e2;
    return {hero:["Net saving after switching costs",inr(net,0),sign(net)],rows:[["Current EMI",inr(e1,0)],["New EMI",inr(e2,0)],["EMI saving every month",inr(ms,0),sign(ms)],["Interest at the current rate",inr(i1,0)],["Interest at the new rate",inr(i2,0)],["Switching costs",inr(f.fee,0),f.fee>0?"loss":""],["Months to recover the costs",ms>0?num(Math.ceil(f.fee/ms),0):"—"]],
      note:f.r2>=f.r1?"The new rate is not lower than your current rate, so switching does not save interest.":null}},
  formula:"EMI = P × i × (1 + i)<sup>n</sup> ÷ ((1 + i)<sup>n</sup> − 1) at each rate, over the same remaining tenure. Interest saved = interest at the current rate − interest at the new rate. Net saving = interest saved − switching costs. Months to recover = switching costs ÷ monthly EMI saving. Ask your current lender for a lower rate first, because many will match an offer."},
 {id:"credit-card-interest",group:"Loans & growth",ic:"CC",name:"Credit Card Interest Calculator",lede:"See how long paying only the minimum due takes to clear a credit card balance, and what it costs.",
  zeroOk:["gst","pay"],
  fields:[["b","Outstanding balance",50000,"₹"],["mr","Interest rate per month",3.5,"%"],["gst","GST on interest",18,"%"],["mp","Minimum due",5,"% of balance"],["floor","Smallest minimum due",200,"₹"],["pay","Your fixed monthly payment (0 = minimum only)",0,"₹"]],
  calc:f=>{ let bal=f.b, k=0, int=0, first=0;
    while(bal>0.5 && k<600){ const c=bal*f.mr/100*(1+f.gst/100); if(k===0) first=c; int+=c; bal+=c; const p=Math.min(bal,Math.max(bal*f.mp/100,f.floor,f.pay)); if(p<=c){ k=600; break; } bal-=p; k++; }
    const ym=x=>{const y=Math.floor(x/12),mo=x%12;return `${y} ${y===1?"yr":"yrs"} ${mo} ${mo===1?"month":"months"}`};
    return {hero:["Time to clear the balance",k>=600?"More than 50 years":ym(k),"loss"],rows:[["Total interest and GST",k>=600?"—":inr(int,0),"loss"],["Total you pay",k>=600?"—":inr(f.b+int,0)],["Interest and GST in the first month",inr(first,0),"loss"],["Yearly interest rate",pct((Math.pow(1+f.mr/100,12)-1)*100),"loss"]],
      note:k>=600?"At this payment the balance barely shrinks. Pay more each month or move the balance to a cheaper loan.":"Paying the full bill by the due date avoids interest altogether."}},
  formula:"Each month, interest = balance × monthly rate, plus GST on that interest. You then pay the larger of the minimum due (a percentage of the balance, but at least the smallest minimum) and your fixed payment. This repeats until the balance is cleared. Most cards also stop the interest-free period on new purchases while a balance is carried, which this calculator does not include."},
 {id:"loan-interest-rate",group:"Loans & growth",ic:"IR",name:"Loan Interest Rate Calculator",lede:"Find the real interest rate on a loan from the amount, the EMI and the tenure.",
  fields:[["p","Loan amount",1000000,"₹"],["emi","Monthly EMI",21247,"₹"],["y","Tenure",5,"years"]],
  calc:f=>{ const n=Math.round(f.y*12); if(f.emi*n<=f.p) return {hero:["Interest rate (p.a.)","—"],rows:[],note:"The EMIs add up to no more than the loan, so there is no interest. Check the amounts."};
    const pv=i=>f.emi*(1-Math.pow(1+i,-n))/i; let lo=1e-9, hi=1; for(let k=0;k<200;k++){const m=(lo+hi)/2; if(pv(m)>f.p) lo=m; else hi=m;}
    const i=(lo+hi)/2, r=i*1200, tot=f.emi*n;
    return {hero:["Interest rate (p.a.)",pct(r)],rows:[["Total interest",inr(tot-f.p,0),"loss"],["Total payable",inr(tot,0)],["Effective annual rate",pct((Math.pow(1+i,12)-1)*100)],["Number of EMIs",num(n,0)]]}},
  formula:"The rate is the monthly rate i that solves loan = EMI × (1 − (1 + i)<sup>−n</sup>) ÷ i, where n is the number of monthly EMIs. The yearly rate is i × 12, which is how lenders quote reducing-balance rates. The effective annual rate, (1 + i)<sup>12</sup> − 1, shows the cost with monthly compounding. Processing fees are not included, and they raise the real cost further."},
 {id:"loan-tenure",group:"Loans & growth",ic:"LT",name:"Loan Tenure Calculator",lede:"Find how long it takes to repay a loan at the EMI you can afford.",
  fields:[["p","Loan amount",3000000,"₹"],["r","Interest rate (p.a.)",8.5,"%"],["emi","EMI you can pay",30000,"₹"]],
  calc:f=>{ const i=f.r/1200; if(f.emi<=f.p*i) return {hero:["Loan tenure","—"],rows:[["Interest in the first month",inr(f.p*i,0)]],note:"This EMI does not even cover the first month's interest, so the loan would never be repaid. Raise the EMI."};
    const nx=-Math.log(1-f.p*i/f.emi)/Math.log(1+i), n=Math.ceil(nx-1e-9), y=Math.floor(n/12), m=n%12, tot=f.emi*nx;
    return {hero:["Loan tenure",`${y} ${y===1?"yr":"yrs"} ${m} ${m===1?"month":"months"}`],rows:[["Number of EMIs",num(n,0)],["Total interest",inr(tot-f.p,0),"loss"],["Total payable",inr(tot,0)],["Interest in the first month",inr(f.p*i,0)]]}},
  formula:"Number of EMIs n = −ln(1 − P × i ÷ EMI) ÷ ln(1 + i), where P is the loan and i is the monthly rate, rounded up to whole months. The last EMI is usually smaller. The EMI must be more than the first month's interest (P × i), or the loan never gets repaid."},
 {id:"bond-yield",group:"Loans & growth",ic:"BY",name:"Bond Yield (YTM) Calculator",lede:"Find the yield to maturity and current yield of a bond from its price and coupon.",
  fields:[["fv","Face value",1000,"₹"],["c","Coupon rate (p.a.)",7.5,"%"],["price","Price you pay",980,"₹"],["y","Years to maturity",5,"years"],["m","Coupon payments a year",2,"times"]],
  calc:f=>{ const m=Math.max(1,Math.round(f.m)), n=Math.round(f.y*m), cp=f.fv*f.c/100/m, pv=r=>{let s=0;for(let k=1;k<=n;k++) s+=cp/Math.pow(1+r,k); return s+f.fv/Math.pow(1+r,n)};
    let lo=-0.99, hi=1; for(let k=0;k<200;k++){const mid=(lo+hi)/2; if(pv(mid)>f.price) lo=mid; else hi=mid;}
    const r=(lo+hi)/2, ytm=r*m*100;
    return {hero:["Yield to maturity (YTM)",pct(ytm)],rows:[["Current yield",pct(cp*m/f.price*100)],["Effective annual yield",pct((Math.pow(1+r,m)-1)*100)],["Coupon per payment",inr(cp)],["Total coupons till maturity",inr(cp*n,0)],[f.fv>=f.price?"Gain at maturity":"Loss at maturity",inr(Math.abs(f.fv-f.price)),f.fv>=f.price?"gain":"loss"]]}},
  formula:"YTM is the yearly rate r at which price = the sum of every coupon ÷ (1 + r ÷ m)<sup>k</sup> + face value ÷ (1 + r ÷ m)<sup>n</sup>, where m is the number of coupons a year and n is the number of coupons left. Current yield = yearly coupon ÷ price. YTM assumes you hold to maturity, every payment is made, and coupons are reinvested at the same yield. Tax and accrued interest are not included."},
 {id:"rent-vs-buy",group:"Loans & growth",ic:"RB",name:"Rent vs Buy Calculator",lede:"Compare your net worth after buying a home with a loan against renting and investing the difference.",
  fields:[["price","Home price",8000000,"₹"],["down","Down payment",20,"%"],["cost","Buying costs (stamp duty, registration)",7,"%"],["rate","Home loan rate (p.a.)",8.5,"%"],["y","Years to compare (loan tenure)",20,"years"],["rent","Rent for a similar home",25000,"₹ a month"],["rr","Yearly rent increase",5,"%"],["app","Yearly rise in home value",5,"%"],["inv","Return on investments (p.a.)",10,"%"]],
  calc:f=>{ if(f.down>100) return {hero:["Better choice","—"],rows:[],note:"The down payment cannot be more than 100%."};
    const n=Math.round(f.y*12), i=f.rate/1200, loan=f.price*(1-f.down/100), emi=loan>0?(i?loan*i*Math.pow(1+i,n)/(Math.pow(1+i,n)-1):loan/n):0, mi=f.inv/1200;
    let renter=f.price*(f.down+f.cost)/100, buyer=0, rent=f.rent, lastRent=rent;
    for(let k=0;k<n;k++){ if(k>0&&k%12===0) rent*=1+f.rr/100; lastRent=rent; const d=emi-rent; renter*=1+mi; buyer*=1+mi; if(d>0) renter+=d; else buyer+=-d; }
    const home=f.price*Math.pow(1+f.app/100,f.y), bw=home+buyer, gap=bw-renter;
    return {hero:[gap>=0?"Buying ends ahead by":"Renting ends ahead by",inr(Math.abs(gap),0)],rows:[["Buyer's net worth",inr(bw,0)],["Renter's net worth",inr(renter,0)],["Home value at the end",inr(home,0)],["Monthly EMI",inr(emi,0)],["Rent in the first year",inr(f.rent,0)+" a month"],["Rent in the final year",inr(lastRent,0)+" a month"],["Cash needed upfront to buy",inr(f.price*(f.down+f.cost)/100,0)]],
      note:"Assumes the renter invests the upfront cash and any month the EMI is above the rent, and the buyer invests the difference when rent is higher. Maintenance, property tax, tax benefits and selling costs are not included."}},
  formula:"Buyer: pays the EMI on (price − down payment) for the full tenure, then owns a home worth price × (1 + home value rise)<sup>years</sup>. Renter: invests the down payment plus buying costs on day one, pays rent that rises every year, and invests the gap whenever the EMI is higher than the rent. If rent becomes higher than the EMI, the buyer invests the gap instead. Both investments grow monthly at the return you enter, and net worth is compared at the end."},
 {id:"home-affordability",group:"Loans & growth",ic:"HA",name:"Home Affordability Calculator",lede:"Find the most expensive home you can afford with your income and savings.",
  zeroOk:["emi"],
  fields:[["inc","Net monthly income",150000,"₹"],["emi","Existing EMIs per month",0,"₹"],["foir","Share of income lenders allow for EMIs",50,"%"],["rate","Home loan rate (p.a.)",8.5,"%"],["y","Loan tenure",20,"years"],["sav","Savings for the down payment and costs",2000000,"₹"],["ltv","Maximum loan as a share of the price",80,"%"],["cost","Buying costs (stamp duty, registration)",7,"%"]],
  calc:f=>{ const me=f.inc*f.foir/100-f.emi, i=f.rate/1200, n=Math.round(f.y*12), L=me>0?me*(1-Math.pow(1+i,-n))/i:0, c=f.cost/100, l=f.ltv/100;
    const pInc=(L+f.sav)/(1+c), pSav=1+c-l>0?f.sav/(1+c-l):Infinity, p=Math.min(pInc,pSav), loan=Math.max(0,p*(1+c)-f.sav), e=loan*i*Math.pow(1+i,n)/(Math.pow(1+i,n)-1);
    return {hero:["Home price you can afford",inr(p,0)],rows:[["Home loan",inr(loan,0)],["EMI on that loan",inr(e,0)],["Down payment",inr(p-loan,0)],["Buying costs",inr(p*c,0)],["What limits the price",pInc<=pSav?"Your income (EMI limit)":"Your savings (down payment)"],["Largest loan your income supports",inr(L,0)]],
      note:me<=0?"Your existing EMIs use up the share of income lenders usually allow, so the price depends on your savings alone.":null}},
  formula:"The largest loan your income supports comes from the EMI limit: (income × FOIR − existing EMIs), repaid over the tenure at the loan rate. Your savings must cover the down payment and the buying costs. The price you can afford is the lower of two limits: (largest loan + savings) ÷ (1 + buying costs), and savings ÷ (1 + buying costs − maximum loan share). RBI caps the loan-to-value ratio according to loan size, and lenders also check your credit score."},
 {id:"car-affordability",group:"Loans & growth",ic:"CA",name:"Car Affordability Calculator",lede:"Find the price of car you can afford using the 20/4/10 rule.",
  zeroOk:["run"],
  fields:[["inc","Monthly income",150000,"₹"],["share","Share of income for all car costs",10,"%"],["run","Running costs per month (fuel, insurance, upkeep)",5000,"₹"],["down","Down payment",20,"%"],["rate","Car loan rate (p.a.)",9,"%"],["y","Loan tenure",4,"years"]],
  calc:f=>{ const b=f.inc*f.share/100-f.run; if(b<=0) return {hero:["Car price you can afford","—"],rows:[],note:"Running costs already use up the share of income set aside for the car."};
    if(f.down>=100) return {hero:["Car price you can afford","—"],rows:[],note:"The down payment must be below 100%."};
    const i=f.rate/1200, n=Math.round(f.y*12), loan=b*(1-Math.pow(1+i,-n))/i, price=loan/(1-f.down/100);
    return {hero:["Car price you can afford",inr(price,0)],rows:[["Car loan",inr(loan,0)],["Down payment",inr(price-loan,0)],["EMI",inr(b,0)],["Total car costs a month (EMI + running costs)",inr(b+f.run,0)],["Total interest on the loan",inr(b*n-loan,0),"loss"]]}},
  formula:"The 20/4/10 rule: put down at least 20%, borrow for no more than 4 years, and keep all car costs within 10% of your income. EMI budget = income × share − running costs. Car loan = EMI × (1 − (1 + i)<sup>−n</sup>) ÷ i, and car price = loan ÷ (1 − down payment). The on-road price includes registration and insurance, so check that it fits too."},
 {id:"debt-payoff",group:"Loans & growth",ic:"DP",name:"Debt Payoff Calculator",lede:"Compare the avalanche and snowball methods for clearing several loans faster.",
  zeroOk:["b2","r2","m2","b3","r3","m3","extra"],
  fields:[["b1","Loan 1 balance",60000,"₹"],["r1","Loan 1 interest rate (p.a.)",12,"%"],["m1","Loan 1 minimum payment",3000,"₹"],["b2","Loan 2 balance",200000,"₹"],["r2","Loan 2 interest rate (p.a.)",36,"%"],["m2","Loan 2 minimum payment",8000,"₹"],["b3","Loan 3 balance",500000,"₹"],["r3","Loan 3 interest rate (p.a.)",9,"%"],["m3","Loan 3 minimum payment",12000,"₹"],["extra","Extra you can pay every month",5000,"₹"]],
  calc:f=>{ const L=[[f.b1,f.r1,f.m1],[f.b2,f.r2,f.m2],[f.b3,f.r3,f.m3]].map(([b,r,m],k)=>({k:k+1,b,r,m})).filter(x=>x.b>0);
    if(!L.length) return {hero:["Debt-free in","—"],rows:[],note:"Enter at least one loan balance."};
    const budget=L.reduce((s,x)=>s+x.m,0)+f.extra;
    const sim=(order,roll)=>{ const s=L.map(x=>({...x})); let mo=0, int=0; const done=[];
      while(s.some(x=>x.b>0.5) && mo<600){ mo++; s.forEach(x=>{ if(x.b>0.5){ const c=x.b*x.r/1200; x.b+=c; int+=c; } });
        let avail=roll?budget:Infinity; s.forEach(x=>{ if(x.b>0.5){ const p=Math.min(x.m,x.b); x.b-=p; if(roll) avail-=p; } });
        if(roll) for(const x of order(s)){ if(avail<=0) break; if(x.b>0.5){ const p=Math.min(avail,x.b); x.b-=p; avail-=p; } }
        s.forEach(x=>{ if(x.b<=0.5 && !done.includes(x.k)) done.push(x.k); }); }
      return {mo,int,done}; };
    const av=sim(s=>[...s].sort((a,b)=>b.r-a.r),true), sn=sim(s=>[...s].sort((a,b)=>a.b-b.b),true), mn=sim(s=>s,false);
    const ym=x=>x>=600?"More than 50 years":(()=>{const y=Math.floor(x/12),m=x%12;return `${y} ${y===1?"yr":"yrs"} ${m} ${m===1?"month":"months"}`})();
    return {hero:["Debt-free with the avalanche method",ym(av.mo),"gain"],rows:[["Interest with avalanche (highest rate first)",av.mo>=600?"—":inr(av.int,0),"loss"],["Time with snowball (smallest balance first)",ym(sn.mo)],["Interest with snowball",sn.mo>=600?"—":inr(sn.int,0),"loss"],["Time paying only the minimums",ym(mn.mo)],["Interest paying only the minimums",mn.mo>=600?"—":inr(mn.int,0),"loss"],["Avalanche saves over snowball",inr(Math.max(0,sn.int-av.int),0),"gain"],["Avalanche payoff order",av.done.map(k=>"Loan "+k).join(" → ")]],
      note:mn.mo>=600?"At least one minimum payment does not cover its interest, so paying only the minimums never clears the debt.":null}},
  formula:"Every month, interest is added to each loan (balance × yearly rate ÷ 12) and its minimum payment is made. With the avalanche or snowball method, the extra amount goes to one target loan, and when a loan is cleared its minimum payment rolls over to the next target. Avalanche targets the highest interest rate first, which saves the most interest. Snowball targets the smallest balance first, which clears loans sooner and can help motivation. The minimum-only case pays each loan its own minimum with no extra and no roll-over."},
 {id:"loan-foreclosure",group:"Loans & growth",ic:"FC",name:"Personal Loan Foreclosure Calculator",lede:"See how much you save by closing a personal loan early, after the foreclosure charge.",
  zeroOk:["ch","gst"],
  fields:[["p","Original loan amount",500000,"₹"],["r","Interest rate (p.a.)",12,"%"],["y","Original tenure",5,"years"],["k","EMIs already paid",18,"EMIs"],["ch","Foreclosure charge",4,"% of outstanding"],["gst","GST on the charge",18,"%"]],
  calc:f=>{ const n=Math.round(f.y*12), k=Math.round(f.k), i=f.r/1200; if(k>=n) return {hero:["Net saving","—"],rows:[],note:"The EMIs already paid cover the whole tenure, so the loan is already closed."};
    const emi=f.p*i*Math.pow(1+i,n)/(Math.pow(1+i,n)-1), out=f.p*Math.pow(1+i,k)-emi*((Math.pow(1+i,k)-1)/i), rest=emi*(n-k)-out, chg=out*f.ch/100*(1+f.gst/100), net=rest-chg;
    return {hero:["Net saving from foreclosing now",inr(net,0),sign(net)],rows:[["EMI",inr(emi,0)],["Outstanding principal",inr(out,0)],["Interest you would still pay",inr(rest,0)],["Foreclosure charge with GST",inr(chg,0),chg>0?"loss":""],["Amount to pay now to close the loan",inr(out+chg,0)],["EMIs left",num(n-k,0)]],
      note:net<0?"The charge is more than the interest you would save, so foreclosing now costs more than continuing.":null}},
  formula:"EMI = P × i × (1 + i)<sup>n</sup> ÷ ((1 + i)<sup>n</sup> − 1). Outstanding after k EMIs = P × (1 + i)<sup>k</sup> − EMI × ((1 + i)<sup>k</sup> − 1) ÷ i. Interest still to pay = EMI × remaining EMIs − outstanding. Foreclosure charge = outstanding × charge %, plus GST on the charge. Net saving = interest still to pay − foreclosure charge. Lenders cannot charge foreclosure fees on floating-rate loans to individuals, but most personal loans are fixed-rate, so check your loan agreement."},
 {id:"fd-premature",group:"Loans & growth",ic:"FP",name:"FD Premature Withdrawal Calculator",lede:"Find what you receive if you break a fixed deposit early, after the penalty.",
  zeroOk:["pen"],
  fields:[["p","Deposit amount",500000,"₹"],["br","Booked interest rate (p.a.)",7.25,"%"],["t","Booked tenure",3,"years"],["h","Months you have held it",18,"months"],["hr","Bank's rate for the period held",6.75,"%"],["pen","Premature withdrawal penalty",1,"%"]],
  calc:f=>{ if(f.h>=f.t*12) return {hero:["Amount you receive","—"],rows:[],note:"You have held the deposit for its full tenure, so there is no premature withdrawal."};
    const eff=Math.max(0,Math.min(f.br,f.hr)-f.pen), q=f.h/3, got=f.p*Math.pow(1+eff/400,q), would=f.p*Math.pow(1+f.br/400,q), mat=f.p*Math.pow(1+f.br/400,4*f.t);
    return {hero:["Amount you receive",inr(got,0)],rows:[["Interest rate applied",pct(eff)],["Interest earned",inr(got-f.p,0),"gain"],["Interest lost by breaking early",inr(would-got,0),"loss"],["Maturity amount if you keep it",inr(mat,0)],["Extra you would get by waiting",inr(mat-got,0)]]}},
  formula:"Banks usually pay the lower of the booked rate and the rate for the period you actually held the deposit, minus a penalty, often 0.5% to 1%. Interest is compounded quarterly for the months held: amount = P × (1 + rate ÷ 400)<sup>months ÷ 3</sup>. Interest lost is compared with what the booked rate would have paid for the same period. Penalties and rules vary by bank and deposit type, so check your bank's terms."},
 {id:"rental-yield",group:"Loans & growth",ic:"RY",name:"Rental Yield Calculator",lede:"Work out the gross and net rental yield on a property.",
  zeroOk:["vac","cost"],
  fields:[["price","Property price",8000000,"₹"],["rent","Monthly rent",25000,"₹"],["vac","Months empty a year",1,"months"],["cost","Yearly costs (maintenance, property tax, insurance)",30000,"₹"]],
  calc:f=>{ if(f.vac>12) return {hero:["Net rental yield","—"],rows:[],note:"A year has only 12 months."};
    const gross=f.rent*12, net=f.rent*(12-f.vac)-f.cost, gy=gross/f.price*100, ny=net/f.price*100;
    return {hero:["Net rental yield",pct(ny),sign(ny)],rows:[["Gross rental yield",pct(gy)],["Yearly rent (full occupancy)",inr(gross,0)],["Net rental income a year",inr(net,0),sign(net)],["Price-to-rent ratio",num(f.price/gross,1)+" years of rent"],["Years for net rent to equal the price",net>0?num(f.price/net,1):"—"]]}},
  formula:"Gross rental yield = yearly rent ÷ property price. Net rental yield = (rent for the months let − yearly costs) ÷ property price. The price-to-rent ratio is how many years of rent equal the price. Tax on rental income, loan interest and any rise in the property's value are not included."},
 {id:"prepay-or-invest",group:"Loans & growth",ic:"P/I",name:"Prepay Loan or Invest Calculator",lede:"Compare using spare money to prepay a loan with investing it instead.",
  zeroOk:["tax"],
  fields:[["a","Amount you have",500000,"₹"],["lr","Loan interest rate (p.a.)",8.5,"%"],["y","Years left on the loan",15,"years"],["ir","Expected return on investment (p.a.)",11,"%"],["tax","Tax on investment gains",12.5,"%"]],
  calc:f=>{ const pre=f.a*Math.pow(1+f.lr/100,f.y), gross=f.a*Math.pow(1+f.ir/100,f.y), inv=gross-(gross-f.a)*f.tax/100, d=inv-pre, ar=(Math.pow(inv/f.a,1/f.y)-1)*100;
    return {hero:[d>=0?"Investing ends ahead by":"Prepaying ends ahead by",inr(Math.abs(d),0)],rows:[["Value of prepaying (interest saved, compounded)",inr(pre,0)],["Investment value after tax",inr(inv,0)],["Guaranteed return from prepaying",pct(f.lr)],["Investment return after tax (p.a.)",pct(ar)],["Break-even investment return before tax",(()=>{let lo=0,hi=100;for(let k=0;k<100;k++){const m=(lo+hi)/2,g=f.a*Math.pow(1+m/100,f.y),v=g-(g-f.a)*f.tax/100;if(v>pre)hi=m;else lo=m;}return pct((lo+hi)/2)})()]],
      note:"Prepaying gives a guaranteed return equal to the loan rate. Investing may earn more but can also earn less, so compare the gap with the risk you are taking."}},
  formula:"Prepaying saves interest at the loan rate, so it works like a guaranteed investment growing at that rate: amount × (1 + loan rate)<sup>years</sup>. Investing grows at the expected return, and tax is taken off the gain at the end: amount × (1 + return)<sup>years</sup>, minus tax on the gain. Tax benefits on home loan interest are not included and would lower the effective loan rate."},
 {id:"loan-against-fd",group:"Loans & growth",ic:"LF",name:"Loan Against FD Calculator",lede:"Compare borrowing against your fixed deposit with breaking it early.",
  zeroOk:["pen","held"],
  fields:[["fd","Fixed deposit amount",500000,"₹"],["fr","FD interest rate (p.a.)",7,"%"],["ltv","Share of the FD you can borrow",90,"%"],["need","Amount you need",300000,"₹"],["sp","Loan rate above the FD rate",1,"%"],["m","Months you need the money for",6,"months"],["pen","Premature withdrawal penalty",1,"%"],["held","Months the FD has run so far",12,"months"]],
  calc:f=>{ const max=f.fd*f.ltv/100, lr=f.fr+f.sp, int=f.need*lr/100*f.m/12, net=f.need*f.sp/100*f.m/12, brk=f.fd*f.pen/100*f.held/12;
    return {hero:[net<=brk?"Borrowing costs less, saving":"Breaking the FD costs less, saving",inr(Math.abs(brk-net),0),"gain"],rows:[["Most you can borrow",inr(max,0)],["Loan interest rate",pct(lr)],["Interest on the loan",inr(int,0),"loss"],["Net cost of the loan (the FD keeps earning)",inr(net,0),"loss"],["Penalty if you break the FD now",inr(brk,0),"loss"]],
      note:f.need>max?"You need more than you can borrow against this FD.":null}},
  formula:"A loan or overdraft against an FD usually costs the FD rate plus 1% to 2%, and your FD keeps earning interest meanwhile, so the real cost is roughly the gap: amount × extra rate × months ÷ 12. Breaking the FD instead usually cuts the rate on the whole deposit by the penalty for the time it has already run: FD × penalty × months held ÷ 12. This is an estimate. Banks also differ in whether they apply the rate for the shorter period, which can make breaking the FD costlier."},
 {id:"income-tax",group:"Savings & salary",ic:"IT",name:"Income Tax Calculator",lede:"Compare your income tax under the new and old regimes for FY 2026-27, and see which one saves more.",
  zeroOk:["oth","c80","d80","hra","hl","nps"],
  fields:[["age","Your age",30,"years"],["sal","Salary income (yearly, before deductions)",1500000,"₹"],["oth","Other income (interest, rent, etc.)",0,"₹"],["c80","80C investments (EPF, PPF, ELSS, life insurance)",150000,"₹"],["d80","Health insurance premium (80D)",25000,"₹"],["hra","HRA exemption",0,"₹"],["hl","Home loan interest on a self-occupied home",0,"₹"],["nps","Extra NPS contribution (80CCD(1B))",0,"₹"]],
  calc:f=>{
    const slab=(x,s)=>{let t=0,prev=0;for(const[lim,r] of s){if(x>prev){t+=(Math.min(x,lim)-prev)*r/100;}prev=lim;}return t;};
    const NEW=[[400000,0],[800000,5],[1200000,10],[1600000,15],[2000000,20],[2400000,25],[Infinity,30]];
    const ex=f.age>=80?500000:f.age>=60?300000:250000, OLD=[[ex,0],[500000,5],[1000000,20],[Infinity,30]].filter(([l],k,a)=>k===0||l>a[0][0]);
    const scRate=(x,reg)=>x>50000000?(reg==="new"?25:37):x>20000000?25:x>10000000?15:x>5000000?10:0;
    const base=(x,reg)=>{ let t=slab(x,reg==="new"?NEW:OLD);
      if(reg==="new"){ if(x<=1200000) t=Math.max(0,t-60000); else t=Math.min(t,x-1200000); }
      else if(x<=500000) t=Math.max(0,t-12500);
      return t; };
    const total=(x,reg)=>{ const t=base(x,reg), rr=scRate(x,reg); let sc=t*rr/100;
      const T=[50000000,20000000,10000000,5000000].find(v=>x>v);
      if(T){ const tT=base(T,reg), cap=tT*(1+scRate(T,reg)/100)+(x-T); sc=Math.max(0,Math.min(t+sc,cap)-t); }
      return {tax:t, sc, cess:(t+sc)*0.04, all:(t+sc)*1.04}; };
    const tiN=Math.max(0,f.sal-Math.min(f.sal,75000)+f.oth);
    const dOld=Math.min(f.c80,150000)+f.d80+f.hra+Math.min(f.hl,200000)+Math.min(f.nps,50000);
    const grossOld=Math.max(0,f.sal-Math.min(f.sal,50000)+f.oth), tiO=Math.max(0,grossOld-dOld);
    const N=total(tiN,"new"), O=total(tiO,"old"), better=N.all<=O.all?"New regime":"Old regime", save=Math.abs(N.all-O.all), best=Math.min(N.all,O.all);
    let need=null; if(N.all<O.all){ let lo=0, hi=tiO; for(let k=0;k<80;k++){const m=(lo+hi)/2; if(total(Math.max(0,tiO-m),"old").all>N.all) lo=m; else hi=m;} need=(lo+hi)/2; }
    const capped=[]; if(f.c80>150000) capped.push("80C is capped at ₹1.5 lakh"); if(f.hl>200000) capped.push("home loan interest at ₹2 lakh"); if(f.nps>50000) capped.push("extra NPS at ₹50,000");
    return {hero:[`${better} saves you`,inr(save,0),"gain"],rows:[["Tax under the new regime (with cess)",inr(N.all,0)],["Tax under the old regime (with cess)",inr(O.all,0)],["Taxable income, new regime",inr(tiN,0)],["Taxable income, old regime",inr(tiO,0)],["Deductions counted in the old regime",inr(dOld,0)],[`Monthly tax under the ${better.toLowerCase()}`,inr(best/12,0)],["Effective tax rate on your total income",pct(best/(f.sal+f.oth)*100)],...(need!==null?[["Extra deductions the old regime needs to match",inr(need,0)]]:[]),...((N.sc+O.sc)>0?[["Surcharge included (new / old)",`${inr(N.sc,0)} / ${inr(O.sc,0)}`]]:[])],
      note:(capped.length?"The calculator applies the limits: "+capped.join(", ")+". ":"")+"Capital gains and other income taxed at special rates are not included."}},
  formula:"Rates for FY 2026-27 (AY 2027-28) as published at the time of writing, for resident individuals. New regime: nil up to ₹4 lakh, 5% up to ₹8 lakh, 10% up to ₹12 lakh, 15% up to ₹16 lakh, 20% up to ₹20 lakh, 25% up to ₹24 lakh and 30% above, after a ₹75,000 standard deduction on salary. A rebate makes tax nil up to ₹12 lakh of taxable income, with marginal relief just above it. Old regime: nil up to ₹2.5 lakh (₹3 lakh from age 60, ₹5 lakh from age 80), 5% up to ₹5 lakh, 20% up to ₹10 lakh and 30% above, after a ₹50,000 standard deduction and the deductions you enter, with a rebate up to ₹5 lakh. Surcharge applies above ₹50 lakh, with marginal relief, and 4% health and education cess is added. Section numbers are those of the 1961 Act. The Income-tax Act, 2025 renumbers them but keeps these rates."},
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
 {id:"kvp",group:"Savings & salary",ic:"KV",name:"Kisan Vikas Patra Calculator",lede:"See how long a Kisan Vikas Patra takes to double your money.",
  fields:[["p","Investment",100000,"₹"],["r","Interest rate (p.a.)",7.5,"%"]],
  calc:f=>{ const mo=Math.round(12*Math.log(2)/Math.log(1+f.r/100)), y=Math.floor(mo/12), m=mo%12;
    return {hero:["Time to double",`${mo} months`],rows:[["Which is",`${y} years ${m} months`],["Maturity value",inr(f.p*2,0)],["Interest earned",inr(f.p,0),"gain"]],bar:[f.p,f.p],barLabels:["Investment","Interest"]}},
  formula:"KVP doubles your money over a fixed period that the government sets along with the rate. With yearly compounding, the time to double is ln 2 ÷ ln(1 + r) years. This gives the period the government announces at a given rate, such as 115 months at 7.5%. The default is the rate at the time of writing, so check the current rate and maturity period at the post office."},
 {id:"pomis",group:"Savings & salary",ic:"MI",name:"Post Office Monthly Income Scheme Calculator",lede:"Find the monthly income from a Post Office Monthly Income Scheme deposit.",
  fields:[["p","Deposit",900000,"₹"],["r","Interest rate (p.a.)",7.4,"%"],["y","Tenure",5,"years"]],
  calc:f=>{ const mi=f.p*f.r/1200, tot=mi*12*f.y;
    return {hero:["Monthly income",inr(mi,0),"gain"],rows:[["Yearly income",inr(mi*12,0),"gain"],["Total interest over the tenure",inr(tot,0),"gain"],["Principal returned at maturity",inr(f.p,0)],["Total received",inr(f.p+tot,0)]],bar:[f.p,tot],barLabels:["Deposit","Interest"],
      note:f.p>1500000?"The scheme caps deposits, at ₹9 lakh for a single account and ₹15 lakh for a joint account at the time of writing. Check the current limits.":f.p>900000?"Above the single-account limit (₹9 lakh at the time of writing), you would need a joint account.":null}},
  formula:"Monthly income = deposit × rate ÷ 12. The interest is paid out every month and does not compound, and the deposit is returned at the end of the 5-year tenure. The government reviews the rate every quarter, and the default is the rate at the time of writing. The rate stays fixed for the deposit's term."},
 {id:"salary-hike",group:"Savings & salary",ic:"SH",name:"Salary Hike Calculator",lede:"See your new salary after a hike, and how much of the hike is real after inflation.",
  fields:[["s","Current salary (yearly)",1200000,"₹"],["h","Hike",10,"%"],["inf","Inflation (p.a.)",6,"%"]],
  calc:f=>{ const ns=f.s*(1+f.h/100), real=((1+f.h/100)/(1+f.inf/100)-1)*100;
    return {hero:["New yearly salary",inr(ns,0),"gain"],rows:[["Increase per year",inr(ns-f.s,0),"gain"],["New monthly salary",inr(ns/12,0)],["Increase per month",inr((ns-f.s)/12,0),"gain"],["Real hike after inflation",pct(real),sign(real)],["Salary in 5 years at the same hike every year",inr(f.s*Math.pow(1+f.h/100,5),0)]],
      note:real<0?"Your hike is below inflation, so your salary buys less than it did last year.":null}},
  formula:"New salary = current salary × (1 + hike ÷ 100). Real hike = (1 + hike) ÷ (1 + inflation) − 1, which shows how much more your salary can actually buy. Take-home pay rises by less than the gross hike because of tax and deductions."},
 {id:"sgb",group:"Savings & salary",ic:"SG",name:"Sovereign Gold Bond Calculator",lede:"Estimate the total return on a Sovereign Gold Bond, including its yearly interest.",
  fields:[["ip","Issue price per gram",5000,"₹"],["g","Grams held",10,"grams"],["cp","Gold price at redemption (per gram)",7500,"₹"],["y","Years held",8,"years"],["ir","Interest rate on the issue price (p.a.)",2.5,"%"]],
  calc:f=>{ const inv=f.ip*f.g, int=inv*f.ir/100*f.y, val=f.cp*f.g, cg=val-inv, tot=cg+int, ann=(Math.pow((val+int)/inv,1/f.y)-1)*100;
    return {hero:["Total return",inr(tot,0),sign(tot)],rows:[["Amount invested",inr(inv,0)],["Interest earned",inr(int,0),"gain"],["Value at redemption",inr(val,0)],["Gain from the gold price",inr(cg,0),sign(cg)],["Total return (%)",pct(tot/inv*100),sign(tot)],["Annualised return",pct(ann),sign(ann)]]}},
  formula:"Interest = issue price × grams × interest rate × years, paid every six months on the issue price, not on the current gold price. Value at redemption = gold price × grams. Total return = gold gain + interest. The annualised return treats the interest as cash received rather than reinvested. Interest is taxable at your slab rate, and the tax on the redemption gain depends on how and when you exit."},
 {id:"annuity",group:"Savings & salary",ic:"AN",name:"Annuity Calculator",lede:"See the monthly pension a corpus can buy, or the corpus you need for the pension you want.",
  zeroOk:["want"],
  fields:[["c","Corpus used to buy the annuity",5000000,"₹"],["r","Annuity rate (p.a.)",7,"%"],["want","Monthly pension you want",50000,"₹"]],
  calc:f=>{ const m=f.c*f.r/1200, need=f.want*1200/f.r;
    return {hero:["Monthly pension",inr(m,0),"gain"],rows:[["Yearly pension",inr(m*12,0)],...(f.want>0?[["Corpus needed for the pension you want",inr(need,0)],[need>f.c?"Shortfall":"Surplus",inr(Math.abs(need-f.c),0),need>f.c?"loss":"gain"]]:[])]}},
  formula:"Monthly pension = corpus × annuity rate ÷ 12. Corpus needed = desired monthly pension × 12 ÷ annuity rate. Annuity rates depend on your age and the option you choose. A pension for life with the purchase price returned to your nominee pays less than a pension for life only. Annuity income is taxed at your slab rate, and most annuities are not linked to inflation."},
 {id:"leave-encashment",group:"Savings & salary",ic:"LV",name:"Leave Encashment Calculator",lede:"Work out the money you get for unused leave and how much of it is tax-free.",
  fields:[["sal","Monthly basic pay + DA",60000,"₹"],["days","Unused leave days",120,"days"],["div","Days counted in a month",30,"days"],["cap","Tax-free limit on retirement",2500000,"₹"]],
  calc:f=>{ const day=f.sal/f.div, enc=day*f.days, free=Math.min(enc,f.cap,f.sal*10);
    return {hero:["Leave encashment",inr(enc,0)],rows:[["Salary per day",inr(day,0)],["Tax-free on retirement or resignation (non-government)",inr(free,0),"gain"],["Taxable part",inr(enc-free,0),enc>free?"loss":""],["Taxable if encashed while still in service",inr(enc,0),"loss"]]}},
  formula:"Leave encashment = (basic pay + DA) ÷ days in a month × unused leave days. Many employers count 30 days in a month, and some use 26. For non-government employees leaving a job, the tax-free part is the lowest of the encashment, the limit set by law and 10 months' average salary. The law also limits the leave counted for tax to 30 days per completed year of service. Encashment while still in service is fully taxable. The default limit is the one at the time of writing."},
 {id:"eps-pension",group:"Savings & salary",ic:"PS",name:"EPS Pension Calculator",lede:"Estimate your monthly pension from the Employees' Pension Scheme.",
  fields:[["sal","Pensionable salary (average monthly)",15000,"₹"],["y","Years of service",25,"years"]],
  calc:f=>{ const svc=Math.floor(f.y)+(f.y-Math.floor(f.y)>0.5?1:0), wt=svc>=20?2:0, cnt=svc+wt, p=Math.max(1000,f.sal*cnt/70);
    if(svc<10) return {hero:["Monthly pension","Not eligible yet"],rows:[["Years of service counted",num(svc,0)],["Years still needed for a pension",num(10-svc,0)]],note:"A monthly pension needs at least 10 years of service. With less, you can usually withdraw the pension amount when you leave instead."};
    const notes=[]; if(f.sal>15000) notes.push("Pensionable salary is capped at ₹15,000 a month unless you opted for a pension on higher wages.");
    return {hero:["Monthly pension",inr(p,0),"gain"],rows:[["Pensionable service counted",num(cnt,0)+" years"],["Bonus years for 20 or more years of service",num(wt,0)],["Yearly pension",inr(p*12,0)],["Minimum pension applied",f.sal*cnt/70<1000?"Yes":"No"]],note:notes.join(" ")||null}},
  formula:"Monthly pension = pensionable salary × pensionable service ÷ 70. Pensionable salary is the average salary of the last 60 months, capped at ₹15,000 for most members. Service of more than 6 months in a year counts as a full year, and 2 bonus years are added for 20 or more years of service. A minimum pension of ₹1,000 a month applies. The pension usually starts at 58. The cap and minimum are the figures at the time of writing."},
 {id:"notice-buyout",group:"Savings & salary",ic:"NP",name:"Notice Period Buyout Calculator",lede:"Work out what it costs to leave a job before serving the full notice period.",
  zeroOk:["served"],
  fields:[["sal","Monthly salary used for the buyout",80000,"₹"],["notice","Notice period",90,"days"],["served","Days already served",30,"days"],["div","Days counted in a month",30,"days"]],
  calc:f=>{ if(f.served>=f.notice) return {hero:["Buyout amount","₹0","gain"],rows:[],note:"You have served the full notice period, so there is nothing to buy out."};
    const day=f.sal/f.div, left=f.notice-f.served;
    return {hero:["Buyout amount",inr(day*left,0),"loss"],rows:[["Days left to buy out",num(left,0)],["Salary per day",inr(day,0)],["Notice left in months",num(left/f.div,1)]]}},
  formula:"Buyout = (monthly salary ÷ days counted in a month) × notice days left. Whether the employer uses basic pay or gross salary, and 30 or 26 days, depends on your contract, so check your offer letter. The amount is usually deducted from your final settlement, or a new employer may agree to pay it."},
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
  formula:"Simple interest = P × R × T ÷ 100, where P is the principal, R is the yearly rate and T is the time in years. The interest is the same every year because it is always worked out on the original principal. For time in months, divide by 12. For example, 18 months is 1.5 years."},
 {id:"discount",group:"Everyday",ic:"DS",name:"Discount Calculator",lede:"Work out the sale price and your saving, including an extra discount on top.",
  zeroOk:["d2"],
  fields:[["p","Original price",2000,"₹"],["d1","Discount",20,"%"],["d2","Extra discount on the reduced price",10,"%"]],
  calc:f=>{ if(f.d1>100||f.d2>100) return {hero:["Final price","—"],rows:[],note:"A discount cannot be more than 100%."};
    const a=f.p*(1-f.d1/100), fin=a*(1-f.d2/100), eff=(1-fin/f.p)*100;
    return {hero:["Final price",inr(fin)],rows:[["You save",inr(f.p-fin),"gain"],["Price after the first discount",inr(a)],["Effective total discount",pct(eff)],...(f.d2>0?[[`${num(f.d1)}% + ${num(f.d2)}% is not ${num(f.d1+f.d2)}%`,`it is ${pct(eff)}`]]:[])]}},
  formula:"Sale price = price × (1 − discount ÷ 100). An extra discount applies to the already reduced price, so two discounts combine as 1 − (1 − d1)(1 − d2), which is always less than d1 + d2. For example, 20% off and then 10% off is 28% off in total, not 30%."},
 {id:"term-insurance",group:"Everyday",ic:"TI",name:"Term Insurance Calculator",lede:"Estimate how much life cover your family needs if you were not there.",
  zeroOk:["loans","goals","assets","cover"],
  fields:[["exp","Family's yearly expenses",600000,"₹"],["yrs","Years the family needs support",25,"years"],["inf","Inflation (p.a.)",6,"%"],["ret","Return on the payout once invested (p.a.)",7,"%"],["loans","Outstanding loans",2000000,"₹"],["goals","Future goals to fund (education, marriage)",3000000,"₹"],["assets","Savings and investments",1500000,"₹"],["cover","Existing life cover",0,"₹"]],
  calc:f=>{ const n=Math.round(f.yrs), q=(1+f.inf/100)/(1+f.ret/100); let pv=0; for(let k=0;k<n;k++) pv+=f.exp*Math.pow(q,k);
    const need=Math.max(0,pv+f.loans+f.goals-f.assets-f.cover);
    return {hero:["Life cover you need",inr(need,0)],rows:[["Cost of replacing household expenses",inr(pv,0)],["Plus outstanding loans",inr(f.loans,0)],["Plus future goals",inr(f.goals,0)],["Minus savings and investments",inr(f.assets,0)],["Minus existing life cover",inr(f.cover,0)],["Cover as a multiple of yearly expenses",num(need/f.exp,1)+"×"]]}},
  formula:"Expense cover = the amount that, invested at the return you enter, pays the family's expenses for the years you enter, with expenses rising each year by inflation. Cover needed = expense cover + outstanding loans + future goals − savings and investments − existing life cover. This is a needs-based estimate, and it is worth reviewing when your income, loans or family change."},
 {id:"emergency-fund",group:"Everyday",ic:"EF",name:"Emergency Fund Calculator",lede:"Work out how big your emergency fund should be and how long it will take to build.",
  zeroOk:["emi","saved","save"],
  fields:[["exp","Essential monthly expenses",40000,"₹"],["emi","Monthly EMIs and insurance premiums",15000,"₹"],["months","Months of cover",6,"months"],["saved","Already set aside",100000,"₹"],["save","You can add every month",10000,"₹"]],
  calc:f=>{ const out=f.exp+f.emi, target=out*f.months, gap=Math.max(0,target-f.saved), mo=gap&&f.save>0?Math.ceil(gap/f.save):0;
    return {hero:["Emergency fund target",inr(target,0)],rows:[["Monthly outgoings covered",inr(out,0)],["Already set aside",inr(f.saved,0)],["Still needed",inr(gap,0),gap>0?"loss":"gain"],["Time to build it",gap===0?"Already complete":f.save>0?`${mo} ${mo===1?"month":"months"}`:"—"],["Months covered today",num(f.saved/out,1)]],
      note:gap>0&&f.save<=0?"Add a monthly amount to see how long it will take to reach the target.":null}},
  formula:"Emergency fund target = (essential monthly expenses + EMIs and premiums) × months of cover. Still needed = target − amount already set aside. Time to build it = still needed ÷ monthly saving, rounded up. Many planners suggest 3 to 6 months, or more if your income is irregular or one person earns for the whole family."},
 {id:"profit-margin",group:"Everyday",ic:"PM",name:"Profit Margin Calculator",lede:"Work out profit, margin and markup, and the selling price for the margin you want.",
  fields:[["cost","Cost price",800,"₹"],["sp","Selling price",1000,"₹"],["tm","Target margin",30,"%"]],
  calc:f=>{ const p=f.sp-f.cost;
    return {hero:["Profit margin",pct(p/f.sp*100),sign(p)],rows:[["Profit per unit",inr(p),sign(p)],["Markup on cost",pct(p/f.cost*100),sign(p)],[`Selling price for a ${num(f.tm)}% margin`,f.tm<100?inr(f.cost/(1-f.tm/100)):"—"],[`Markup needed for a ${num(f.tm)}% margin`,f.tm<100?pct(f.tm/(100-f.tm)*100):"—"]],
      note:f.tm>=100?"A margin must be below 100% of the selling price.":null}},
  formula:"Profit = selling price − cost. Margin = profit ÷ selling price, and markup = profit ÷ cost. They are not the same: a 25% markup gives a 20% margin. Selling price for a target margin = cost ÷ (1 − margin). Prices here are before GST."},
 {id:"net-worth",group:"Everyday",ic:"NW",name:"Net Worth Calculator",lede:"Add up what you own and what you owe to find your net worth.",
  zeroOk:["cash","inv","ret","prop","gold","hl","ol","cc"],
  fields:[["cash","Cash and bank balances",200000,"₹"],["inv","Stocks and mutual funds",1500000,"₹"],["ret","EPF, PPF and NPS",800000,"₹"],["prop","Property (current value)",6000000,"₹"],["gold","Gold and other assets",300000,"₹"],["hl","Home loan outstanding",3500000,"₹"],["ol","Other loans (car, personal, education)",200000,"₹"],["cc","Credit card dues",20000,"₹"]],
  calc:f=>{ const a=f.cash+f.inv+f.ret+f.prop+f.gold, l=f.hl+f.ol+f.cc, nw=a-l, liq=f.cash+f.inv+f.gold-f.ol-f.cc;
    return {hero:["Net worth",inr(nw,0),sign(nw)],rows:[["Total assets",inr(a,0)],["Total liabilities",inr(l,0),l>0?"loss":""],["Debt as a share of assets",a>0?pct(l/a*100):"—"],["Net worth excluding property and its loan",inr(nw-f.prop+f.hl,0),sign(nw-f.prop+f.hl)],["Easily usable net worth (cash, investments, gold − other debts)",inr(liq,0),sign(liq)]]}},
  formula:"Net worth = total assets − total liabilities. Assets are what you own at today's value. Liabilities are what you still owe. Excluding your home and its loan shows how much wealth you have outside the house you live in. Track it once or twice a year to see your progress."},
 {id:"break-even",group:"Everyday",ic:"BE",name:"Break-even Calculator",lede:"Find how many units a business must sell to cover its costs, and to hit a profit target.",
  zeroOk:["tp"],
  fields:[["fc","Fixed costs per month (rent, salaries)",200000,"₹"],["sp","Selling price per unit",500,"₹"],["vc","Variable cost per unit",300,"₹"],["tp","Target profit per month",50000,"₹"]],
  calc:f=>{ const cm=f.sp-f.vc; if(cm<=0) return {hero:["Break-even units","—"],rows:[],note:"The selling price must be higher than the variable cost per unit, or each sale adds to the loss."};
    const be=f.fc/cm, tu=(f.fc+f.tp)/cm;
    return {hero:["Break-even units per month",num(Math.ceil(be),0)],rows:[["Break-even revenue",inr(be*f.sp,0)],["Contribution per unit",inr(cm)],["Contribution margin",pct(cm/f.sp*100)],["Units for the target profit",num(Math.ceil(tu),0)],["Revenue for the target profit",inr(tu*f.sp,0)]]}},
  formula:"Contribution per unit = selling price − variable cost per unit. It is what each sale adds towards fixed costs and profit. Break-even units = fixed costs ÷ contribution per unit, rounded up. Units for a target profit = (fixed costs + target profit) ÷ contribution per unit. Prices and costs here are before GST."},
 {id:"gold-price",group:"Everyday",ic:"AU",name:"Gold Jewellery Price Calculator",lede:"Work out the final price of gold jewellery with making charges and GST.",
  zeroOk:["mk"],
  fields:[["rate","Gold rate per gram (for the purity you are buying)",7000,"₹"],["wt","Weight",10,"grams"],["mk","Making charges",12,"% of gold value"],["gst","GST",3,"%"]],
  calc:f=>{ const gv=f.rate*f.wt, mk=gv*f.mk/100, sub=gv+mk, g=sub*f.gst/100, tot=sub+g;
    return {hero:["Final price",inr(tot,0)],rows:[["Gold value",inr(gv,0)],["Making charges",inr(mk,0)],["GST",inr(g,0)],["Effective price per gram",inr(tot/f.wt,0)],["Paid above the gold value",inr(tot-gv,0),"loss"]]}},
  formula:"Gold value = gold rate × weight. Making charges are a percentage of the gold value here, though some jewellers charge a fixed amount per gram. GST is charged on the gold value plus making charges. Use the rate for the purity you are buying: 22K gold is about 91.6% pure, so its rate is roughly 91.6% of the 24K rate. Check the current GST rate and any hallmarking charge on your bill."},
 {id:"credit-utilisation",group:"Everyday",ic:"CU",name:"Credit Utilisation Calculator",lede:"Check how much of your credit card limit you are using and how to bring it down.",
  zeroOk:["used"],
  fields:[["lim","Total credit limit across your cards",300000,"₹"],["used","Total balance used",90000,"₹"],["t","Target utilisation",30,"%"]],
  calc:f=>{ const u=f.used/f.lim*100, mx=f.lim*f.t/100, pay=Math.max(0,f.used-mx);
    return {hero:["Credit utilisation",pct(u),u>f.t?"loss":"gain"],rows:[["Highest balance within your target",inr(mx,0)],["Pay down to reach the target",inr(pay,0),pay>0?"loss":"gain"],["Available credit",inr(Math.max(0,f.lim-f.used),0)],["Limit needed for this balance at your target",inr(f.used/(f.t/100),0)]],
      note:u>f.t?"Paying the balance before the statement date lowers the balance reported to credit bureaus.":null}},
  formula:"Credit utilisation = balance used ÷ total credit limit. Credit bureaus look at how much of your limit you use, and lower is generally better. Many lenders treat staying below about 30% as healthy. Pay down = balance − (limit × target). Paying in full every month matters more than the exact ratio."},
 {id:"no-cost-emi",group:"Everyday",ic:"NC",name:"No-Cost EMI Calculator",lede:"Find the hidden cost of a 'no-cost EMI' offer, from GST and processing fees.",
  zeroOk:["fee"],
  fields:[["price","Product price",60000,"₹"],["n","Number of EMIs",6,"months"],["r","Interest rate charged by the lender (p.a.)",15,"%"],["fee","Processing fee",199,"₹"],["gst","GST on interest and fees",18,"%"]],
  calc:f=>{ const n=Math.round(f.n), i=f.r/1200, emi=f.price/n, P=emi*(1-Math.pow(1+i,-n))/i, int=f.price-P, gi=int*f.gst/100, fe=f.fee*(1+f.gst/100), cost=gi+fe;
    return {hero:["Hidden cost of the no-cost EMI",inr(cost,0),"loss"],rows:[["EMI",inr(emi,0)],["Discount given upfront (equal to the interest)",inr(int,0)],["Interest charged by the lender",inr(int,0)],["GST on the interest",inr(gi,0),"loss"],["Processing fee with GST",inr(fe,0),fe>0?"loss":""],["Effective cost as a share of the price",pct(cost/f.price*100),"loss"]]}},
  formula:"In a no-cost EMI, the seller gives a discount equal to the interest, so your EMIs add up to the product price. The lender still charges interest, and GST is charged on that interest and on any processing fee. Those are the real extra costs. Interest is worked out on a reducing balance: the amount financed is the EMIs' present value at the lender's rate. Paying late or partly can add further charges."},
 {id:"unit-price",group:"Everyday",ic:"UP",name:"Unit Price Comparison Calculator",lede:"Compare two pack sizes to see which one is cheaper per gram, ml or piece.",
  fields:[["pa","Pack A price",120,"₹"],["sa","Pack A size",500,"g, ml or pcs"],["pb","Pack B price",210,"₹"],["sb","Pack B size",1000,"g, ml or pcs"]],
  calc:f=>{ const ua=f.pa/f.sa, ub=f.pb/f.sb, cheap=ua<=ub?"Pack A":"Pack B", sv=Math.abs(ua-ub)/Math.max(ua,ub)*100;
    return {hero:["Better value",ua===ub?"Same price per unit":cheap,"gain"],rows:[["Pack A price per 100 units",inr(ua*100)],["Pack B price per 100 units",inr(ub*100)],["Cheaper by",pct(sv)],[`Saving if you buy ${num(Math.max(f.sa,f.sb),0)} units of the better pack`,inr(Math.abs(ua-ub)*Math.max(f.sa,f.sb))]]}},
  formula:"Price per unit = pack price ÷ pack size. Comparing per 100 units, such as per 100 g or 100 ml, makes packs of different sizes easy to compare. Use the same unit for both packs, for example convert 1 kg to 1,000 g. A bigger pack only saves money if you use it before it expires."},
 {id:"habit-cost",group:"Everyday",ic:"HC",name:"Cost of a Habit Calculator",lede:"See what a small regular spend adds up to, and what it could grow to if invested.",
  fields:[["d","Amount spent each time",200,"₹"],["w","Times a week",5,"times"],["y","Years",20,"years"],["r","Return if invested instead (p.a.)",12,"%"]],
  calc:f=>{ const yr=f.d*f.w*52, mo=yr/12, n=Math.round(f.y*12), i=f.r/1200, fv=mo*((Math.pow(1+i,n)-1)/i)*(1+i);
    return {hero:["Could grow to, if invested",inr(fv,0),"gain"],rows:[["Spent a year",inr(yr,0)],["Spent a month",inr(mo,0)],[`Spent over ${num(f.y,0)} years`,inr(yr*f.y,0)],["Growth you would miss",inr(fv-yr*f.y,0)]],bar:[yr*f.y,fv-yr*f.y],barLabels:["Spent","Growth"]}},
  formula:"Yearly spend = amount × times a week × 52, and monthly spend = yearly spend ÷ 12. If that monthly amount were invested as a SIP instead, its value = P × [((1 + i)<sup>n</sup> − 1) ÷ i] × (1 + i), where i is the monthly rate and n is the number of months. Returns are assumed to be steady."},
 {id:"policy-irr",group:"Everyday",ic:"PI",name:"Insurance Policy Return Calculator",lede:"Find the real yearly return (IRR) on an endowment or money-back policy.",
  fields:[["p","Yearly premium",50000,"₹"],["py","Years you pay the premium",20,"years"],["t","Policy term (maturity after)",25,"years"],["mat","Maturity amount, with bonuses",2000000,"₹"],["alt","Return of an alternative, such as PPF (p.a.)",7.1,"%"]],
  calc:f=>{ const py=Math.round(f.py), t=Math.round(f.t); if(py>t) return {hero:["Return on the policy (IRR)","—"],rows:[],note:"The premium-paying years cannot be more than the policy term."};
    const fv=r=>{let s=0; for(let k=0;k<py;k++) s+=f.p*Math.pow(1+r,t-k); return s}; let lo=-0.99, hi=1; for(let k=0;k<200;k++){const m=(lo+hi)/2; if(fv(m)>f.mat) hi=m; else lo=m;}
    const irr=(lo+hi)/2*100, tot=f.p*py, alt=fv(f.alt/100);
    return {hero:["Return on the policy (IRR)",pct(irr),irr<f.alt?"loss":"gain"],rows:[["Total premiums paid",inr(tot,0)],["Maturity amount",inr(f.mat,0)],["Gain over premiums",inr(f.mat-tot,0),sign(f.mat-tot)],[`The same premiums at ${pct(f.alt,1)} would grow to`,inr(alt,0)],["Difference",inr(f.mat-alt,0),sign(f.mat-alt)]],
      note:irr<f.alt?"The policy returns less than the alternative. Many people buy a term plan for cover and invest the rest separately.":null}},
  formula:"Each yearly premium is paid at the start of the year, and the maturity amount is received at the end of the term. The IRR is the yearly rate r at which the premiums, grown at r to maturity, equal the maturity amount. It is found by trial. The alternative compounds the same premiums at its rate over the same period. Life cover and any survival benefits paid during the term are not included."},
 {id:"ev-vs-petrol",group:"Everyday",ic:"EV",name:"EV vs Petrol Car Calculator",lede:"Compare running costs and see how long an electric car takes to repay its higher price.",
  zeroOk:["ms"],
  fields:[["km","Distance driven per month",1500,"km"],["pp","Petrol price",105,"₹ per litre"],["mil","Petrol car mileage",15,"km per litre"],["er","Electricity cost",8,"₹ per kWh"],["eff","EV efficiency",7,"km per kWh"],["diff","Extra price of the EV",300000,"₹"],["ms","Maintenance saving with the EV",8000,"₹ a year"]],
  calc:f=>{ const pm=f.km/f.mil*f.pp, em=f.km/f.eff*f.er, ys=(pm-em)*12+f.ms;
    return {hero:["Payback period",ys>0?num(f.diff/ys,1)+" years":"Never","gain"],rows:[["Petrol cost per month",inr(pm,0)],["Charging cost per month",inr(em,0)],["Running cost per km (petrol / EV)",`${inr(f.pp/f.mil)} / ${inr(f.er/f.eff)}`],["Saving per year, with maintenance",inr(ys,0),sign(ys)],["Net saving over 8 years",inr(ys*8-f.diff,0),sign(ys*8-f.diff)]],
      note:ys<=0?"At these figures the EV does not cost less to run, so it never repays its higher price.":null}},
  formula:"Petrol cost = distance ÷ mileage × petrol price. Charging cost = distance ÷ EV efficiency × electricity cost. Yearly saving = 12 × (petrol cost − charging cost) + maintenance saving. Payback = extra price of the EV ÷ yearly saving. Insurance, resale value, battery replacement and any loan interest are not included, and home charging is usually cheaper than public charging."}
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
