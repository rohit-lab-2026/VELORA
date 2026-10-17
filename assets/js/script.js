const PRODUCTS = {
 men: [
  {name:"Everyday Heavyweight Tee",category:"T-shirts",price:1299,old:1599,image:"men-tee.svg",photo:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=85&fit=crop",badge:"Bestseller"},
  {name:"The Weekend Overshirt",category:"Shirts",price:2499,old:2999,image:"men-shirt.svg",photo:"https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=900&q=85&fit=crop",badge:"New"},
  {name:"Relaxed Straight Denim",category:"Jeans",price:2899,image:"men-jeans.svg",photo:"https://images.unsplash.com/photo-1542272604-787c3835535d?w=900&q=85&fit=crop"},
  {name:"Field Utility Jacket",category:"Jackets",price:4299,old:5299,image:"men-jacket.svg",photo:"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=900&q=85&fit=crop"},
  {name:"Tailored Easy Trousers",category:"Trousers",price:2699,image:"men-trousers.svg",photo:"https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=900&q=85&fit=crop"},
  {name:"Essential Cotton Tee",category:"T-shirts",price:999,image:"men-tee.svg",photo:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=85&fit=crop"},
  {name:"Everyday Oxford Shirt",category:"Shirts",price:2199,image:"men-shirt.svg",photo:"https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=900&q=85&fit=crop"},
  {name:"Modern Utility Layer",category:"Jackets",price:3899,image:"men-jacket.svg",photo:"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=900&q=85&fit=crop"}
 ],
 women: [
  {name:"The Sunday Midi Dress",category:"Dresses",price:3299,old:3999,image:"women-dress.svg",photo:"https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=900&q=85&fit=crop",badge:"Bestseller"},
  {name:"Linen Blend Everyday Top",category:"Tops",price:1599,image:"women-top.svg",photo:"https://images.unsplash.com/photo-1566206091558-7f218b696731?w=900&q=85&fit=crop",badge:"New"},
  {name:"Relaxed Straight Denim",category:"Jeans",price:2799,image:"women-jeans.svg",photo:"https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=900&q=85&fit=crop"},
  {name:"Modern Heritage Set",category:"Ethnic wear",price:3899,old:4599,image:"women-ethnic.svg",photo:"https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&q=85&fit=crop"},
  {name:"The Cropped Utility",category:"Jackets",price:3499,image:"women-jacket.svg",photo:"https://images.unsplash.com/photo-1548624149-f6c7f3e9b5e5?w=900&q=85&fit=crop"},
  {name:"Sculpted Shoulder Bag",category:"Accessories",price:2299,image:"women-bag.svg",photo:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=900&q=85&fit=crop"},
  {name:"Soft Structure Dress",category:"Dresses",price:2999,image:"women-dress.svg",photo:"https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=900&q=85&fit=crop"},
  {name:"Everyday Linen Layer",category:"Tops",price:1799,image:"women-top.svg",photo:"https://images.unsplash.com/photo-1566206091558-7f218b696731?w=900&q=85&fit=crop"}
 ],
 offers: [
  {name:"Essential Cotton Tee",category:"Men · T-shirts",price:999,old:1599,image:"men-tee.svg",photo:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=85&fit=crop",badge:"Save 38%"},
  {name:"The Weekend Overshirt",category:"Men · Shirts",price:1999,old:2999,image:"offer-shirt.svg",photo:"https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=900&q=85&fit=crop",badge:"Save 33%"},
  {name:"The Sunday Midi Dress",category:"Women · Dresses",price:2499,old:3999,image:"offer-dress.svg",photo:"https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=900&q=85&fit=crop",badge:"Save 38%"},
  {name:"Relaxed Straight Denim",category:"Denim",price:1999,old:2899,image:"offer-denim.svg",photo:"https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=900&q=85&fit=crop",badge:"Save 31%"},
  {name:"Soft Everyday Knit",category:"New season edit",price:1499,old:2199,image:"offer-knit.svg",photo:"https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=900&q=85&fit=crop",badge:"Save 32%"},
  {name:"Modern Heritage Shirt",category:"Everyday essentials",price:1799,old:2499,image:"offer-shirt.svg",photo:"https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=900&q=85&fit=crop",badge:"Save 28%"}
 ]
};
const CART_KEY = "velora-cart";
const money = value => new Intl.NumberFormat("en-IN", {style:"currency", currency:"INR", maximumFractionDigits:0}).format(Math.max(0, Number(value)||0));
const slug = value => String(value).toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const allProducts = () => [...PRODUCTS.men.map(p=>({...p, collection:"Men"})), ...PRODUCTS.women.map(p=>({...p, collection:"Women"})), ...PRODUCTS.offers.map(p=>({...p, collection:"Offers"}))];
const catalogue = new Map();
allProducts().forEach(p => { if(!p.id) p.id = slug(p.category+"-"+p.name); catalogue.set(p.id,p); });
function readCart(){
  try {
    const raw=localStorage.getItem(CART_KEY);
    if(!raw) return [];
    const parsed=JSON.parse(raw);
    if(!Array.isArray(parsed)) return [];
    return parsed.filter(x=>x && typeof x.id==="string" && Number.isFinite(Number(x.price)) && Number(x.price)>=0 && Number.isInteger(Number(x.quantity)) && Number(x.quantity)>0)
      .map(x=>({id:x.id,name:String(x.name||"Product"),price:Number(x.price),quantity:Math.min(999,Number(x.quantity)),image:String(x.image||"assets/images/editorial.svg"),fallback:String(x.fallback||(catalogue.has(x.id)?"assets/images/"+catalogue.get(x.id).image:"assets/images/editorial.svg"))}));
  } catch(_){ return []; }
}
function saveCart(cart){ try { localStorage.setItem(CART_KEY,JSON.stringify(cart)); } catch(_) { showToast("Your browser could not save the bag on this device."); } updateCartCount(cart); }
function cartCount(cart=readCart()){ return cart.reduce((sum,item)=>sum+item.quantity,0); }
function updateCartCount(cart=readCart()){
  document.querySelectorAll("[data-cart-count]").forEach(el=>el.textContent=String(cartCount(cart)));
  document.querySelectorAll(".cart-button").forEach(el=>el.setAttribute("aria-label",`Shopping bag, ${cartCount(cart)} items`));
}
let toastTimer;
function showToast(message){ let toast=document.querySelector(".toast"); if(!toast){toast=document.createElement("div");toast.className="toast";toast.setAttribute("role","status");toast.setAttribute("aria-live","polite");document.body.append(toast);} toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),2800); }
function imagePath(p){ return p.photo || ("assets/images/"+(p.image||"editorial.svg")); }
function productCard(p){
 const id=p.id||slug(p.category+"-"+p.name);
 return `<article class="product-card" data-product-card data-name="${escapeHTML(p.name)}" data-category="${escapeHTML(p.category)}"><div class="product-image"><img src="${escapeHTML(imagePath(p))}" data-fallback="assets/images/${escapeHTML(p.image||"editorial.svg")}" alt="${escapeHTML(p.name)}" loading="lazy">${p.badge?`<span class="badge">${escapeHTML(p.badge)}</span>`:""}</div><div class="product-info"><div class="product-meta">${escapeHTML(p.category)}</div><h3 class="product-title">${escapeHTML(p.name)}</h3><div class="price-row"><span class="price">${money(p.price)}</span>${p.old?`<span class="old-price">${money(p.old)}</span>`:""}</div><button class="add-button" type="button" data-add="${escapeHTML(id)}">Add to bag <span aria-hidden="true">＋</span></button></div></article>`;
}
function escapeHTML(value){return String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function renderProducts(target,items){const node=document.querySelector(target);if(node)node.innerHTML=items.map(productCard).join("");}
function addToCart(id){
 const p=catalogue.get(id);
 if(!p){showToast("Sorry, this product could not be found.");return;}
 const cart=readCart(), existing=cart.find(x=>x.id===id);
 if(existing) existing.quantity=Math.min(999, existing.quantity+1);
 else cart.push({id:p.id,name:p.name,price:Number(p.price),quantity:1,image:imagePath(p),fallback:"assets/images/"+(p.image||"editorial.svg")});
 saveCart(cart);showToast(`${p.name} added to your bag`);if(document.querySelector("#cart-panel"))renderCart();
}
function openCart(){
 let panel=document.querySelector("#cart-panel");
 if(!panel){
  panel=document.createElement("section");panel.id="cart-panel";panel.className="cart-panel";panel.setAttribute("role","dialog");panel.setAttribute("aria-modal","true");panel.setAttribute("aria-labelledby","cart-title");
  panel.innerHTML=`<div class="cart-backdrop" data-cart-close></div><div class="cart-drawer"><div class="cart-heading"><div><p class="eyebrow">YOUR SELECTION</p><h2 id="cart-title">Shopping bag</h2></div><button type="button" class="cart-close" data-cart-close aria-label="Close shopping bag">×</button></div><div id="cart-items" class="cart-items"></div><div id="cart-summary" class="cart-summary"></div><p class="cart-demo-note">Demo cart only. No checkout or payment is processed.</p></div>`;
  document.body.append(panel);
  panel.addEventListener("click",e=>{
   const close=e.target.closest("[data-cart-close]"); if(close){closeCart();return;}
   const control=e.target.closest("[data-cart-action]");if(!control)return;
   const {cartAction,id}=control.dataset;changeCart(id,cartAction);
  });
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&panel.classList.contains("is-open"))closeCart();});
 }
 renderCart();panel.classList.add("is-open");document.body.classList.add("cart-open");
 const close=panel.querySelector(".cart-close");if(close)close.focus();
}
function closeCart(){const panel=document.querySelector("#cart-panel");if(panel){panel.classList.remove("is-open");document.body.classList.remove("cart-open");const trigger=document.querySelector(".cart-button");if(trigger)trigger.focus();}}
function changeCart(id,action){
 let cart=readCart(),item=cart.find(x=>x.id===id);if(!item)return;
 if(action==="plus")item.quantity=Math.min(999, item.quantity+1);
 else if(action==="minus")item.quantity-=1;
 else if(action==="remove")cart=cart.filter(x=>x.id!==id);
 if(item&&item.quantity<=0)cart=cart.filter(x=>x.id!==id);
 saveCart(cart);renderCart();
}
function renderCart(){
 const panel=document.querySelector("#cart-panel");if(!panel)return;
 const cart=readCart(),items=panel.querySelector("#cart-items"),summary=panel.querySelector("#cart-summary");
 if(!cart.length){items.innerHTML=`<div class="cart-empty"><span aria-hidden="true">♧</span><h3>Your bag is taking a little breather.</h3><p>Add a few favourites and they’ll appear here.</p><button type="button" class="button" data-cart-close>Continue shopping</button></div>`;summary.innerHTML=`<div class="cart-total"><span>Total</span><strong>${money(0)}</strong></div>`;return;}
 items.innerHTML=cart.map(item=>`<article class="cart-item"><img src="${escapeHTML(item.image)}" data-fallback="${escapeHTML(item.fallback||"assets/images/editorial.svg")}" alt=""><div class="cart-item-info"><h3>${escapeHTML(item.name)}</h3><strong>${money(item.price)}</strong><div class="quantity-controls"><button type="button" data-cart-action="minus" data-id="${escapeHTML(item.id)}" aria-label="Decrease quantity of ${escapeHTML(item.name)}">−</button><span aria-label="Quantity">${item.quantity}</span><button type="button" data-cart-action="plus" data-id="${escapeHTML(item.id)}" aria-label="Increase quantity of ${escapeHTML(item.name)}">+</button><button type="button" class="remove-item" data-cart-action="remove" data-id="${escapeHTML(item.id)}">Remove</button></div></div><strong class="cart-line-total">${money(item.price*item.quantity)}</strong></article>`).join("");
 const total=cart.reduce((sum,item)=>sum+item.price*item.quantity,0);
 summary.innerHTML=`<div class="cart-subtotal"><span>Subtotal</span><strong>${money(total)}</strong></div><div class="cart-total"><span>Demo total</span><strong>${money(total)}</strong></div>`;
}
function setupCatalog(type){
 const items=PRODUCTS[type]||[],wrap=document.querySelector(".filter-row"),filters=document.querySelector(".filter-pills"),grid=document.querySelector("#product-grid");
 if(!grid)return;
 if(wrap){
  let search=wrap.querySelector("#product-search");
  if(!search){search=document.createElement("input");search.id="product-search";search.className="product-search";search.type="search";search.placeholder="Search products…";search.setAttribute("aria-label","Search products by name");wrap.insertBefore(search,filters||null);}
  let reset=wrap.querySelector("#reset-filters");
  if(!reset){reset=document.createElement("button");reset.id="reset-filters";reset.className="filter-pill filter-reset";reset.type="button";reset.textContent="Clear filters";wrap.append(reset);}
 }
 let chosen="All";
 const categories=["All Categories",...new Set(items.map(p=>p.category.split(" · ").pop()))];
 if(filters){
  filters.innerHTML=categories.map((c,i)=>`<button type="button" class="filter-pill ${i===0?"active":""}" aria-pressed="${i===0}" data-filter="${escapeHTML(c)}">${escapeHTML(c)}</button>`).join("");
 }
 const message=document.createElement("p");message.className="no-results";message.id="no-results";message.setAttribute("role","status");message.hidden=true;message.textContent="No products match your search. Try another name or clear your filters.";grid.after(message);
 const apply=()=>{
  const query=(wrap?.querySelector("#product-search")?.value||"").trim().toLowerCase();
  const filtered=items.filter(p=>(chosen==="All Categories"||chosen==="All"||p.category.split(" · ").pop()===chosen)&&p.name.toLowerCase().includes(query));
  renderProducts("#product-grid",filtered);message.hidden=filtered.length>0;
 };
 if(filters)filters.addEventListener("click",e=>{const btn=e.target.closest("[data-filter]");if(!btn)return;chosen=btn.dataset.filter;filters.querySelectorAll("[data-filter]").forEach(b=>{const active=b===btn;b.classList.toggle("active",active);b.setAttribute("aria-pressed",String(active));});apply();});
 const search=wrap?.querySelector("#product-search");if(search)search.addEventListener("input",apply);
 const reset=wrap?.querySelector("#reset-filters");if(reset)reset.addEventListener("click",()=>{chosen="All Categories";if(search)search.value="";if(filters){filters.querySelectorAll("[data-filter]").forEach(b=>{const active=b.dataset.filter==="All Categories";b.classList.toggle("active",active);b.setAttribute("aria-pressed",String(active));});}apply();if(search)search.focus();});
 apply();
}
function setupOffers(){
 const items=PRODUCTS.offers,filters=document.querySelector(".filter-pills"),grid=document.querySelector("#product-grid");
 if(grid)renderProducts("#product-grid",items);
 if(filters){
  const cats=["All Categories",...new Set(items.map(p=>p.category.split(" · ").pop()))];
  filters.innerHTML=cats.map((c,i)=>`<button type="button" class="filter-pill ${i===0?"active":""}" aria-pressed="${i===0}" data-filter="${escapeHTML(c)}">${escapeHTML(c)}</button>`).join("");
  filters.addEventListener("click",e=>{const b=e.target.closest("[data-filter]");if(!b)return;filters.querySelectorAll("button").forEach(x=>{x.classList.toggle("active",x===b);x.setAttribute("aria-pressed",String(x===b));});const selected=b.dataset.filter;renderProducts("#product-grid",selected==="All Categories"?items:items.filter(p=>p.category.split(" · ").pop()===selected));});
 }
}
function setupCoupons(){
 const host=document.querySelector(".offer-grid");if(!host)return;
 const box=document.createElement("section");box.className="coupon-box";box.setAttribute("aria-labelledby","coupon-title");
 box.innerHTML=`<div><p class="eyebrow">DEMO COUPONS</p><h2 id="coupon-title">A little something extra.</h2><p>VELORA10: 10% off a bag subtotal of ₹1,000 or more. STYLE20: 20% off a bag subtotal of ₹3,000 or more. One coupon per demo bag. Sample promotions only.</p></div><form id="coupon-form" class="coupon-form"><label for="coupon-code">Coupon code</label><div class="coupon-entry"><input id="coupon-code" name="coupon" autocomplete="off" placeholder="Enter code" required><button type="submit" class="button">Apply</button></div><p id="coupon-feedback" role="status" aria-live="polite"></p><p id="coupon-discount" class="coupon-discount"></p><button id="coupon-clear" type="button" class="text-button">Remove coupon</button></form>`;
 host.after(box);
 let active=null;
 const form=box.querySelector("#coupon-form"),input=box.querySelector("#coupon-code"),feedback=box.querySelector("#coupon-feedback"),discount=box.querySelector("#coupon-discount");
 form.addEventListener("submit",e=>{
  e.preventDefault();const code=input.value.trim().toUpperCase(),subtotal=readCart().reduce((s,x)=>s+x.price*x.quantity,0);
  const rules={"VELORA10":{rate:.10,min:1000},"STYLE20":{rate:.20,min:3000}};
  if(!rules[code]){active=null;feedback.textContent="That code isn't valid. Try VELORA10 or STYLE20.";discount.textContent="";return;}
  if(subtotal<rules[code].min){active=null;feedback.textContent=`${code} requires a demo bag subtotal of ${money(rules[code].min)}. Current subtotal: ${money(subtotal)}.`;discount.textContent="";return;}
  if(active===code){feedback.textContent=`${code} is already applied.`;return;}
  active=code;const amount=Math.min(subtotal,Math.round(subtotal*rules[code].rate));feedback.textContent=`${code} applied to this demo calculation.`;discount.textContent=`Sample discount: −${money(amount)} · Estimated total ${money(Math.max(0,subtotal-amount))}.`;
 });
 box.querySelector("#coupon-clear").addEventListener("click",()=>{active=null;input.value="";feedback.textContent="Coupon removed.";discount.textContent="";});
}
function setupContact(){
 const form=document.querySelector("#contact-form");if(!form)return;
 // Let our submit handler provide a clear inline message for invalid fields.
 form.noValidate=true;
 let feedback=form.querySelector("#form-feedback");
 if(!feedback){feedback=document.createElement("p");feedback.id="form-feedback";feedback.className="form-feedback";feedback.setAttribute("role","status");feedback.setAttribute("aria-live","polite");const submit=form.querySelector('[type="submit"]');if(submit)submit.after(feedback);}
 const email=form.querySelector('[type="email"]');if(email)email.addEventListener("input",()=>{email.setCustomValidity("");});
 form.addEventListener("submit",e=>{
  e.preventDefault();feedback.textContent="";
  if(!form.checkValidity()){form.reportValidity();const invalid=form.querySelector(":invalid");if(invalid){invalid.focus();feedback.textContent="Please check the highlighted fields and enter a valid email address.";}return;}
  feedback.textContent="Thanks! Your form passed validation. This is a demo only, and your message has not been sent or stored.";
  feedback.classList.add("success");form.reset();
 });
}
function setupReveal(){
 const nodes=document.querySelectorAll("main section, .product-card, .offer-panel, .contact-info");
 if(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
 if(!("IntersectionObserver" in window))return;
 nodes.forEach(node=>node.classList.add("reveal-pending"));
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-revealed");observer.unobserve(entry.target);}}),{threshold:.08});
 nodes.forEach(node=>observer.observe(node));
}
document.addEventListener("DOMContentLoaded",()=>{
 // Product photography is remote; switch to the bundled SVG if a URL fails.
 document.addEventListener("error",event=>{
  const image=event.target;
  if(!(image instanceof HTMLImageElement) || !image.dataset.fallback) return;
  const fallback=new URL(image.dataset.fallback,document.baseURI).href;
  if(image.src!==fallback){ image.src=fallback; }
  image.removeAttribute("data-fallback");
 },true);
 updateCartCount();
 const toggle=document.querySelector(".menu-toggle"),nav=document.querySelector(".nav-links");
 if(toggle&&nav){
  const setMenu=open=>{nav.classList.toggle("open",open);toggle.setAttribute("aria-expanded",String(open));toggle.setAttribute("aria-label",open?"Close navigation":"Open navigation");toggle.textContent=open?"×":"☰";};
  toggle.addEventListener("click",()=>setMenu(toggle.getAttribute("aria-expanded")!=="true"));
  nav.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>setMenu(false)));
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&toggle.getAttribute("aria-expanded")==="true"){setMenu(false);toggle.focus();}});
  window.addEventListener("resize",()=>{if(window.innerWidth>680)setMenu(false);});
 }
 document.addEventListener("click",e=>{
  const add=e.target.closest("[data-add]");if(add){addToCart(add.dataset.add);return;}
  const bag=e.target.closest(".cart-button");if(bag){e.preventDefault();openCart();}
 });
 const type=document.body.dataset.page;
 if(type==="men"||type==="women")setupCatalog(type);
 if(type==="offers"){setupOffers();setupCoupons();}
 const featured=document.querySelector("#featured-products");
 if(featured)renderProducts("#featured-products",[PRODUCTS.women[0],PRODUCTS.men[0],PRODUCTS.women[2],PRODUCTS.men[1]]);
 setupContact();setupReveal();
});
