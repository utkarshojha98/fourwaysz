(function(){
  var NS="http://www.w3.org/2000/svg", WA="919717166480";
  function el(n,a){var e=document.createElementNS(NS,n);for(var k in a)e.setAttribute(k,a[k]);return e}
  function $(id){return document.getElementById(id)}

  // bottle graduations: 0 ml at y=400, 1000 ml at y=150
  var g=$("grad");
  if(g){
    for(var ml=0;ml<=1000;ml+=50){
      var y=400-ml*0.25, major=ml%250===0;
      g.appendChild(el("line",{class:"tick"+(major?" major":""),x1:228,x2:major?204:216,y1:y,y2:y}));
      if(major&&ml>0&&ml<1000){var t=el("text",{class:"lab",x:198,y:y+4,"text-anchor":"end"});t.textContent=ml+" ml";g.appendChild(t)}
    }
    g.appendChild(el("line",{class:"tick major",x1:58,x2:262,y1:150,y2:150,"stroke-dasharray":"3 4"}));
  }

  // ruler divider: uneven ticks every 8px, a label every 100 ml
  [].forEach.call(document.querySelectorAll(".ruler svg"),function(s){
    for(var i=0,x=4;x<2400;i++,x+=8){
      var h=i%25===0?20:i%5===0?13:7;
      s.appendChild(el("line",{x1:x,x2:x,y1:0,y2:h}));
      if(i%25===0&&i>0){var t=el("text",{x:x+4,y:30});t.textContent=(i*4)+" ml";s.appendChild(t)}
    }
  });

  // property picker on the navy band
  var S={
    hotel:{a:"one floor",w:"one floor"},
    cafe:{a:"one counter",w:"one counter or one kitchen"},
    school:{a:"one block",w:"one block or one corridor"},
    hospital:{a:"one waiting area",w:"one waiting area or office floor"}
  };
  var bs=document.querySelectorAll(".seg button");
  function pick(k){
    [].forEach.call(bs,function(b){b.setAttribute("aria-checked",b.getAttribute("data-k")===k?"true":"false")});
    [].forEach.call(document.querySelectorAll("[data-area]"),function(e){e.textContent=S[k].a});
    [].forEach.call(document.querySelectorAll("[data-where]"),function(e){e.textContent=S[k].w});
    var hn=$("hosp-note");if(hn)hn.hidden=k!=="hospital";
    try{localStorage.setItem("fw-seg",k)}catch(e){}
  }
  if(bs.length){
    [].forEach.call(bs,function(b){b.addEventListener("click",function(){pick(b.getAttribute("data-k"))})});
    var start="hotel";try{var k=localStorage.getItem("fw-seg");if(S[k])start=k}catch(e){}
    pick(start);
  }

  // impact estimates. null keeps a figure blank on the page until a real weight is measured.
  var CAN_G=200, SACHET_G=null, KG_CO2_PER_TKM=0.307/3.5;
  var inp=$("litres"), km=$("km");
  if(inp&&km){
    var fmt=function(n){return n>=100?Math.round(n).toLocaleString("en-IN"):(Math.round(n*10)/10).toLocaleString("en-IN")};
    var put=function(id,val,unit,blank,approx){var e=$(id);
      e.innerHTML=val==null?'<span class="blank">'+blank+'</span>':(approx?"~":"")+fmt(val)+'<span class="u">'+unit+'</span>'};
    var calc=function(){
      var L=Math.max(0,parseFloat(inp.value)||0), waterKg=L, D=Math.max(0,parseFloat(km.value)||0);
      put("out-water",waterKg,"kg","",true);
      put("out-plastic",CAN_G!=null&&SACHET_G!=null?(L/5)*(CAN_G-5*SACHET_G)/1000:null,"kg","[__ kg]");
      put("out-co2",(waterKg/1000)*D*KG_CO2_PER_TKM,"kg CO₂");
    };
    inp.addEventListener("input",calc);km.addEventListener("input",calc);calc();
  }

  // sample form: builds a WhatsApp message with a send button and a copy backup
  var f=$("req");
  if(f){
    [].forEach.call(f.querySelectorAll("input:not([type=radio])"),function(i){
      i.addEventListener("input",function(){i.setAttribute("data-typed","1");if(i.checkValidity()&&i.value.trim())i.classList.remove("touched")});
      i.addEventListener("blur",function(){if(i.getAttribute("data-typed"))i.classList.add("touched")});
    });
    var pre=new URLSearchParams(location.search), pt=pre.get("type"), pp=pre.get("product");
    [].forEach.call(f.querySelectorAll("input[type=radio]"),function(r){if(r.value===pt||r.value===pp)r.checked=true});
    f.addEventListener("submit",function(e){
      e.preventDefault();
      f.classList.add("tried");
      var bad=[].filter.call(f.querySelectorAll("[required]"),function(i){return !i.value.trim()||!i.checkValidity()});
      if(bad.length){
        $("r-msg").textContent="Please fill in "+bad.map(function(i){return f.querySelector('label[for="'+i.id+'"]').firstChild.textContent.trim().toLowerCase()}).join(", ")+".";
        bad[0].focus();return;
      }
      var d=new FormData(f), v=function(k){return (d.get(k)||"").toString().trim()};
      var msg="Hello Fourways, I'd like a free sample.\n"+
        "Property: "+v("prop")+" ("+v("type")+")\n"+
        (v("size")?"Rooms or covers per day: "+v("size")+"\n":"")+
        "City: "+v("city")+"\n"+
        "Product to try first: "+v("prod")+"\n"+
        "Name: "+v("name")+"\nPhone: "+v("phone")+
        (v("pay")?"\nCurrent supplier cost: "+v("pay"):"");
      f.innerHTML='<div class="done" role="status" tabindex="-1"><h3></h3><p>Tap below to send your request to us on WhatsApp. It is already written for you. We\'ll message you on WhatsApp within one working day.</p><pre></pre><div class="cta-row"><a class="btn btn-green" target="_blank" rel="noopener">Send on WhatsApp</a><button type="button" class="btn btn-line">Copy message</button></div><p class="note">If WhatsApp doesn\'t open, copy the message and send it to <b class="tel">+91 97171 66480</b>.</p></div>';
      f.querySelector("h3").textContent="Thanks, "+v("name")+". One last step.";
      f.querySelector("pre").textContent=msg;
      f.querySelector("a").href="https://wa.me/"+WA+"?text="+encodeURIComponent(msg);
      f.querySelector(".done").focus();
      var cb=f.querySelector("button");
      cb.addEventListener("click",function(){
        var p=f.querySelector("pre");
        function sel(){var r=document.createRange();r.selectNodeContents(p);var s=getSelection();s.removeAllRanges();s.addRange(r);cb.textContent="Selected. Press copy"}
        try{navigator.clipboard.writeText(msg).then(function(){cb.textContent="Copied"},sel)}catch(err){sel()}
      });
    });
  }
})();
