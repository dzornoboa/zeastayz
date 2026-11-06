
(() => {
  'use strict';
  const listings = window.ZEA_PROPERTIES || [];
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  const price = n => 'GH₵' + Number(n).toLocaleString('en-GH');
  const url = p => 'property.html?stay=' + encodeURIComponent(p.slug);
  const safe = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const searchParams = new URLSearchParams(location.search);
  const saved = (()=>{try{return new Set(JSON.parse(localStorage.getItem('zea-saved') || '[]'))}catch{return new Set()}})();
  const publishSaved = () => {try{localStorage.setItem('zea-saved', JSON.stringify([...saved]))}catch{}};
  const page = document.body.dataset.page || 'home';
  const navItems=[['Home','index.html'],['Explore stays','stays.html'],['Concierge services','concierge.html'],['About ZeaStayz','about.html'],['Contact','contact.html']];
  const header = document.createElement('header');
  header.className='site-header';
  const browseTabs=[['All','🌍','index.html'],['Homes','🏡','stays.html'],['Hotels','🛎️','stays.html?type=Hotel'],['Experiences','🎈','concierge.html#experiences'],['Services','🍽️','concierge.html']];
  const icons={
    'grid-2x2':'<rect x="2" y="2" width="8" height="8" rx="1"/><rect x="14" y="2" width="8" height="8" rx="1"/><rect x="2" y="14" width="8" height="8" rx="1"/><rect x="14" y="14" width="8" height="8" rx="1"/>',
    'house':'<path d="m3 11 9-8 9 8"/><path d="M5 10v11h14V10M10 21v-7h4v7"/>',
    'bed-double':'<path d="M3 21V7m18 14V7M3 12h18v7H3zM5 7V5h14v2M7 12V9h4v3m2 0V9h4v3"/>',
    'sparkles':'<path d="m12 3 1.9 6.1L20 11l-6.1 1.9L12 19l-1.9-6.1L4 11l6.1-1.9L12 3zM20 18l.8 2.2L23 21l-2.2.8L20 24l-.8-2.2L17 21l2.2-.8L20 18z"/>',
    'concierge-bell':'<path d="M4 16a8 8 0 0 1 16 0H4zM2 19h20M12 7V5m-2 0h4"/>'
  };
  const navIcon=key=> icons[key] ? '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+icons[key]+'</svg>' : '<span aria-hidden="true" class="tab-emoji">'+key+'</span>';
  const logo='<img class="brand-img" src="assets/zea-brand-symbol.svg" alt="" width="39" height="32"><span>ZeaStayz</span>';
  header.innerHTML='<div class="nav-shell air-nav"><a class="brandlogo" href="index.html" aria-label="ZeaStayz home">'+logo+'</a><nav class="menu-links air-top-tabs" aria-label="Browse categories">'+browseTabs.map(([n,key,href],i)=>'<a class="browse-tab '+((page==='home'&&i===0)||(page==='stays'&&i===1)||(page==='concierge'&&i===4)?'active':'')+'" href="'+href+'"><span class="tab-icon">'+navIcon(key)+'</span><span>'+n+'</span></a>').join('')+'</nav><div class="nav-actions"><a class="host-action" href="contact.html?subject=List+my+property">Become a host</a><a class="circle-action" href="stays.html?saved=1" title="Saved stays" aria-label="Saved stays">'+navIcon('house')+'</a><button class="circle-action" id="menu-trigger" aria-label="More options" aria-expanded="false">☰</button></div><div id="nav-drop" class="nav-drop">'+navItems.map(([n,href])=>'<a href="'+href+'">'+n+'</a>').join('')+'<a href="stays.html?saved=1">♡ Saved stays</a><a href="https://zeastayz.com/" target="_blank" rel="noopener">Existing ZeaStayz website ↗</a></div></div>';
  if(page==='home'||page==='stays'||page==='concierge'){
    header.insertAdjacentHTML('beforeend','<div class="air-search-shell"><div class="layout" id="header-search-mount"></div></div>');
  }
  document.body.prepend(header);
  const foot = document.createElement('footer');
  foot.className='site-footer';
  foot.innerHTML='<div class="layout footer-cols"><div><a class="brandlogo" href="index.html"><img class="brand-img" src="assets/zea-brand-symbol.svg" alt="" width="39" height="32"><span>ZeaStayz</span></a><p>Premium Stays. Trusted Service. Local Insight.<br>Oyarifa, Accra, Ghana</p></div><div><strong>Explore</strong>'+navItems.map(([n,h])=>'<a href="'+h+'">'+n+'</a>').join('')+'</div><div><strong>Get in touch</strong><a href="tel:+233209154964">+233 20 915 4964</a><a href="mailto:info@zeahomes.com">info@zeahomes.com</a><a href="https://zeastayz.com/terms-and-conditions/" target="_blank" rel="noopener">Terms & conditions ↗</a></div></div><div class="layout" style="padding-top:30px;color:#808080;font-size:12px">© '+new Date().getFullYear()+' ZeaStayz. Property details and rates are subject to confirmation.</div>';
  document.body.append(foot);
  $('#menu-trigger').addEventListener('click', () => {
    const open = $('#nav-drop').classList.toggle('open');
    $('#menu-trigger').setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', e => {if(!e.target.closest('.nav-actions') && !e.target.closest('.nav-drop')) $('#nav-drop').classList.remove('open')});
  const card = p => '<article class="listing motion-reveal"><a class="listing-picture" href="'+url(p)+'" aria-label="View '+safe(p.name)+'"><img src="'+p.photos[0]+'" loading="lazy" alt="Actual ZeaStayz listing photograph: '+safe(p.name)+'"><span class="listing-pill">'+safe(p.type)+' in '+safe(p.area)+'</span></a><button class="save '+(saved.has(p.slug)?'saved':'')+'" data-save="'+safe(p.slug)+'" aria-label="Save '+safe(p.name)+'" aria-pressed="'+saved.has(p.slug)+'">'+(saved.has(p.slug)?'♥':'♡')+'</button><a href="'+url(p)+'"><h3 class="listing-title">'+safe(p.name)+'</h3></a><div class="listing-meta">'+safe(p.area)+', Accra · '+p.guests+' guests · '+p.beds+' bed'+(p.beds===1?'':'s')+'</div><div class="listing-price"><strong>'+price(p.price)+'</strong> / night</div></article>';
  const observer = ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) ? new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('revealed');observer.unobserve(e.target)}})},{threshold:.08}) : null;
  function reveal(root=document){$$('.motion-reveal',root).forEach(el=> observer?observer.observe(el):el.classList.add('revealed'))}
  document.addEventListener('click',e=>{const btn=e.target.closest('[data-save]');if(!btn)return;const slug=btn.dataset.save;if(saved.has(slug))saved.delete(slug);else saved.add(slug);publishSaved();btn.classList.toggle('saved',saved.has(slug));btn.setAttribute('aria-pressed',String(saved.has(slug)));btn.textContent=saved.has(slug)?'♥':'♡';});
  function searchBar(){return '<form id="stay-search" class="search-panel"><label><strong>Where</strong><input name="where" placeholder="Search destinations" value="'+safe(searchParams.get('where')||'')+'"></label><label><strong>When</strong><input name="checkin" type="date" aria-label="Check-in" value="'+safe(searchParams.get('checkin')||'')+'"></label><label class="checkout-field"><strong>Check-out</strong><input name="checkout" type="date" aria-label="Check-out" value="'+safe(searchParams.get('checkout')||'')+'"></label><label><strong>Who</strong><select name="guests">'+[1,2,3,4,5,6].map(n=>'<option value="'+n+'" '+((+(searchParams.get('guests')||2))===n?'selected':'')+'>'+n+' guest'+(n===1?'':'s')+'</option>').join('')+'</select></label><button type="submit" aria-label="Search stays">⌕</button></form>'}
  const attachSearch = root=>{
    const form=$('#stay-search',root);if(!form)return;
    form.addEventListener('submit',e=>{e.preventDefault();const v=new FormData(form);if(v.get('checkin')&&v.get('checkout')&&v.get('checkout')<=v.get('checkin')){alert('Check-out must follow check-in');return}location.href='stays.html?'+new URLSearchParams([...v.entries()]).toString()});
  };
  if(page==='home'||page==='stays'){
    const mount=$('#header-search-mount');
    if(mount){mount.innerHTML=searchBar();attachSearch(mount)}
  }
  const categories = ['All','Apartment','House','Condo','Villa','Hotel','Guest House'];
  function mountCatalog(root, isHome=false){
    root.innerHTML='<div class="filters" role="group" aria-label="Stay type">'+categories.map((n,i)=>'<button type="button" class="'+(i===0?'active':'')+'" data-category="'+n+'">'+n+'</button>').join('')+'</div><div id="result-count" class="listing-meta" aria-live="polite"></div><div id="listing-cards" class="listing-grid" style="margin-top:19px"></div><p class="legal-note">Prices are indicative, based on the existing ZeaStayz listings. Dates and availability require confirmation with the team.</p>';
    if(isHome){
      const rows=[
        ['Available in Accra this weekend',listings.slice(0,8)],
        ['Places to stay in East Legon',listings.filter(p=>p.area==='East Legon'||p.area==='East Airport')],
        ['Beautiful homes and villas',listings.filter(p=>p.type==='House'||p.type==='Condo')],
        ['Affordable apartments in Accra',listings.filter(p=>p.price<=1000)]
      ];
      root.innerHTML=rows.map((row,i)=>'<section class="air-row motion-reveal"><div class="air-heading"><h2>'+row[0]+' <a aria-label="Explore all stays" href="stays.html">➜</a></h2><div><button aria-label="Scroll left" data-row-left="'+i+'">‹</button><button aria-label="Scroll right" data-row-right="'+i+'">›</button></div></div><div class="air-rail" id="air-rail-'+i+'">'+row[1].map(card).join('')+'</div></section>').join('')+'<p class="legal-note">Property prices and dates require confirmation with ZeaStayz before booking.</p>';
      $('[data-row-left]',root).forEach(b=>b.addEventListener('click',()=>$('#air-rail-'+b.dataset.rowLeft,root).scrollBy({left:-700,behavior:'smooth'})));
      $('[data-row-right]',root).forEach(b=>b.addEventListener('click',()=>$('#air-rail-'+b.dataset.rowRight,root).scrollBy({left:700,behavior:'smooth'})));
      reveal(root);
      return;
    }
    let category=categories.includes(searchParams.get('type'))?searchParams.get('type'):'All';const form=$('#stay-search',header);let selectedSaved=searchParams.get('saved')==='1';
    if(selectedSaved){root.insertAdjacentHTML('afterbegin','<h2>Saved stays</h2>')}
    const render=()=>{
      const v=new FormData(form),where=String(v.get('where')||'').toLowerCase().trim(),guests=Number(v.get('guests')||1);
      const items=listings.filter(p=>(category==='All'||p.type===category)&&(!where||[p.name,p.area,p.type].join(' ').toLowerCase().includes(where))&&p.guests>=guests&&(!selectedSaved||saved.has(p.slug)));
      const grid=$('#listing-cards',root);grid.innerHTML=items.length?items.map(card).join(''):'<p class="no-results">No matching stays yet. Try another location, property type or guest count.</p>';
      $('#result-count',root).textContent=items.length+' stay'+(items.length===1?'':'s')+' found';reveal(grid);
    };
    $('[data-category]',root).forEach(b=>b.classList.toggle('active',b.dataset.category===category));
    $('[data-category]',root).forEach(b=>b.addEventListener('click',()=>{category=b.dataset.category;$$('[data-category]',root).forEach(x=>x.classList.toggle('active',x===b));render()}));
    // Header search performs navigation; local filters refresh the listings.
    if(!isHome)form.querySelectorAll('input,select').forEach(i=>i.addEventListener('change',render));
    render();
  }
  if(page==='home'||page==='stays'){
    const root=$('#catalog');
    if(root)mountCatalog(root,page==='home');
  }
  if(page==='property'){
    const slug=searchParams.get('stay')||'';
    const p=listings.find(p=>p.slug===slug);
    const target=$('#property-page');
    if(!p){target.innerHTML='<div class="layout simple-content"><h1>Stay not found</h1><p>Explore available ZeaStayz properties.</p><a class="solid-btn" href="stays.html">Browse stays</a></div>'}
    else {
      document.title=p.name+' | ZeaStayz';
      const amenities=['Air conditioning','Kitchen','Wi-Fi / Internet','Comfortable sleeping space','Local concierge','Support from ZeaStayz'];
      target.innerHTML='<div class="layout"><section class="page-top"><div class="crumbs"><a href="index.html">Home</a> / <a href="stays.html">Stays</a> / '+safe(p.area)+'</div><h1>'+safe(p.name)+'</h1><p>'+safe(p.type)+' in '+safe(p.area)+', Accra, Ghana · '+p.guests+' guests · '+p.beds+' bedroom'+(p.beds===1?'':'s')+' · '+p.baths+' bathroom'+(p.baths===1?'':'s')+'</p><div class="tour-cta"><a class="tour-launch" href="tour.html?stay='+encodeURIComponent(p.slug)+'">✦ Start immersive 3D photo tour <span>↗</span></a><span>Move through property photos with your mouse and scroll</span></div></section><section class="gallery" aria-label="Property photo gallery">'+[0,1,2,3,4].map(i=>'<img src="'+p.photos[i%p.photos.length]+'" alt="'+safe(p.name)+' photo '+(i+1)+'" loading="'+(i===0?'eager':'lazy')+'" data-lightbox="'+i+'">').join('')+'<a class="tour-gallery" href="tour.html?stay='+encodeURIComponent(p.slug)+'">✧ 3D photo tour</a><button class="gallery-more" id="show-all">▦ Show all photos</button></section><div class="details-grid"><div class="property-copy"><h2>Welcome to your stay in '+safe(p.area)+'</h2><p>'+p.guests+' guests · '+p.beds+' bedrooms · '+p.baths+' bathrooms</p><hr class="hairline"><h2>About this place</h2><p>'+safe(p.description)+'</p><hr class="hairline"><h2>What this place offers</h2><div class="amenities">'+amenities.map(x=>'<span>✓ '+x+'</span>').join('')+'</div><p class="legal-note">Amenity availability varies by property. Confirm details with ZeaStayz before booking.</p><hr class="hairline"><h2>Where you’ll be</h2><p>'+safe(p.area)+', Accra, Ghana. Exact address and arrival guidance are provided by the ZeaStayz team.</p><a href="'+p.source+'" target="_blank" rel="noopener">View original property details ↗</a></div><aside class="reserve"><h2>'+price(p.price)+' <span style="font-size:15px;font-weight:400">/ night</span></h2><form id="booking"><label>CHECK-IN<input name="checkin" type="date" required></label><label>CHECK-OUT<input name="checkout" type="date" required></label><label>GUESTS<select name="guests">'+Array.from({length:p.guests},(_,i)=>'<option value="'+(i+1)+'" '+(i===1?'selected':'')+'>'+(i+1)+' guest'+(i===0?'':'s')+'</option>').join('')+'</select></label><button class="solid-btn" type="submit">Request to book</button></form><p id="price-estimate"></p><p class="legal-note">No payment is taken here. Prices and date availability must be confirmed by ZeaStayz. Booking requests open your email app.</p></aside></div></div><section class="walk-section" id="walkthrough"><div class="layout"><div class="eyebrow" style="color:#a9c0ff">Interactive photo tour</div><h2>Look closer. Feel the space.</h2><p>Drag left or right to pan across a photograph. Scroll over the viewer, or use the controls, to explore the different photos of this home.</p><div class="walk-canvas" id="walk-canvas" tabindex="0" aria-label="Interactive property photo tour. Use arrow keys to change the photograph, mouse drag to pan." data-index="0"><img id="walk-image" src="'+p.photos[0]+'" alt="Property tour image 1"><div class="walk-top"><span class="tour-tag">PHOTO WALKTHROUGH · SIMULATED</span><span class="tour-tag walk-counter" id="walk-counter">1 / '+p.photos.length+'</span></div><div class="walk-bottom"><span class="walk-hint">↔ Drag to look around · Scroll to change views</span><div class="walk-controls"><button class="walk-btn" id="prev-view" aria-label="Previous view">←</button><button class="walk-btn" id="next-view" aria-label="Next view">→</button><button class="walk-btn" id="fullscreen-view" aria-label="Fullscreen tour">⛶</button></div></div></div><div class="thumbs" id="walk-thumbs">'+p.photos.map((src,i)=>'<button aria-label="Show view '+(i+1)+'" data-view="'+i+'" class="'+(!i?'selected':'')+'"><img alt="Property photo thumbnail '+(i+1)+'" src="'+src+'" loading="lazy"></button>').join('')+'</div><p class="legal-note" style="color:#d8e0ff">This is an interactive tour assembled from real listing photographs, not a spatial 3D model or 360° capture. The camera positions and transitions are simulated; room-to-room movement does not represent measured geometry.</p></div></section><div class="layout"><section class="intro motion-reveal"><span class="eyebrow">More places to explore</span><h2>Similar stays near you</h2><div class="listing-grid">'+listings.filter(x=>x.slug!==p.slug).slice(0,5).map(card).join('')+'</div></section></div><div id="image-modal" class="image-modal" role="dialog" aria-modal="true" aria-label="Property photo viewer"><button id="close-gallery" aria-label="Close gallery">×</button><img id="modal-photo" alt=""></div>';
      const book=$('#booking');const from=searchParams.get('checkin'),to=searchParams.get('checkout');if(from)book.elements.checkin.value=from;if(to)book.elements.checkout.value=to;
      const calc=()=>{const a=book.elements.checkin.value,b=book.elements.checkout.value;if(!a||!b){$('#price-estimate').textContent='';return}const nights=Math.round((new Date(b+'T00:00:00')-new Date(a+'T00:00:00'))/86400000);$('#price-estimate').textContent=nights>0?nights+' nights × '+price(p.price)+' ≈ '+price(nights*p.price)+' before any fees':'Choose a valid check-out date'};
      book.addEventListener('change',calc);calc();
      book.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(book);if(d.get('checkout')<=d.get('checkin')){alert('Choose a check-out date after check-in.');return}const body='Hello ZeaStayz, I would like to enquire about '+p.name+' ('+p.source+').\nCheck-in: '+d.get('checkin')+'\nCheck-out: '+d.get('checkout')+'\nGuests: '+d.get('guests')+'\nPlease confirm availability, final price and booking instructions.';location.href='mailto:info@zeahomes.com?subject='+encodeURIComponent('Booking enquiry — '+p.name)+'&body='+encodeURIComponent(body)});
      const modal=$('#image-modal');const openPhoto=i=>{const img=$('#modal-photo');img.src=p.photos[i%p.photos.length];img.alt=p.name+' — photo '+(i+1);modal.classList.add('open')};$$('[data-lightbox]').forEach(el=>el.addEventListener('click',()=>openPhoto(Number(el.dataset.lightbox))));$('#show-all').addEventListener('click',()=>openPhoto(0));$('#close-gallery').addEventListener('click',()=>modal.classList.remove('open'));modal.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('open')});document.addEventListener('keydown',e=>{if(e.key==='Escape')modal.classList.remove('open')});
      const canvas=$('#walk-canvas'),img=$('#walk-image');let index=0,drag=false,startX=0,startY=0,panX=0,panY=0,lastWheel=0;
      function pan(){img.style.transform='scale(1.12) translate('+panX+'%, '+panY+'%)'}
      function view(n){index=(n+p.photos.length)%p.photos.length;img.style.opacity='.3';panX=0;panY=0;img.style.transform='scale(1.14)';const src=p.photos[index];const preload=new Image();preload.onload=()=>{img.src=src;img.alt=p.name+' — view '+(index+1);requestAnimationFrame(()=>{img.style.opacity='1';pan()})};preload.onerror=()=>{img.style.opacity='1'};preload.src=src;$('#walk-counter').textContent=(index+1)+' / '+p.photos.length;$$('[data-view]').forEach(b=>b.classList.toggle('selected',Number(b.dataset.view)===index));}
      $('#prev-view').addEventListener('click',()=>view(index-1));$('#next-view').addEventListener('click',()=>view(index+1));$$('[data-view]').forEach(b=>b.addEventListener('click',()=>view(Number(b.dataset.view))));
      canvas.addEventListener('pointerdown',e=>{if(e.target.closest('button'))return;drag=true;startX=e.clientX;startY=e.clientY;canvas.setPointerCapture(e.pointerId)});
      canvas.addEventListener('pointermove',e=>{if(!drag)return;panX=Math.max(-5,Math.min(5,panX+(e.clientX-startX)*.018));panY=Math.max(-5,Math.min(5,panY+(e.clientY-startY)*.018));startX=e.clientX;startY=e.clientY;pan()});
      canvas.addEventListener('pointerup',()=>drag=false);canvas.addEventListener('pointercancel',()=>drag=false);
      canvas.addEventListener('wheel',e=>{if(Math.abs(e.deltaY)<5)return;e.preventDefault();const now=performance.now();if(now-lastWheel>430){view(index+(e.deltaY>0?1:-1));lastWheel=now}},{passive:false});
      canvas.addEventListener('keydown',e=>{if(e.target.closest('button'))return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();view(index+(e.key==='ArrowRight'?1:-1))}});
      $('#fullscreen-view').addEventListener('click',()=>{if(document.fullscreenElement)document.exitFullscreen();else canvas.requestFullscreen?.()});
      if(!matchMedia('(prefers-reduced-motion: reduce)').matches)canvas.addEventListener('pointermove',e=>{if(drag)return;const r=canvas.getBoundingClientRect();panX=(e.clientX-r.left-r.width/2)/r.width*3;panY=(e.clientY-r.top-r.height/2)/r.height*3;pan()});
      reveal(target);
    }
  }
  const contactForm=$('#contact-form');if(contactForm){contactForm.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(contactForm);location.href='mailto:info@zeahomes.com?subject='+encodeURIComponent(d.get('subject')||'ZeaStayz enquiry')+'&body='+encodeURIComponent('Name: '+d.get('name')+'\nEmail: '+d.get('email')+'\n\n'+d.get('message'))})}
  reveal();
})();
