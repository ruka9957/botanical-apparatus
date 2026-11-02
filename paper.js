export function mountPaper(){
 const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
 svg.id='paper-ground';svg.setAttribute('aria-hidden','true');
 svg.innerHTML=`<defs><linearGradient id="paper-tone" x2=".85" y2="1"><stop stop-color="#fbf8f0"/><stop offset=".55" stop-color="#f8f5ec"/><stop offset="1" stop-color="#f5f2e9"/></linearGradient><filter id="paper-relief" x="-2%" y="-2%" width="104%" height="104%"><feDropShadow dx="0" dy="1.2" stdDeviation="1.4" flood-color="#858875" flood-opacity=".15"/></filter><filter id="paper-fibers"><feTurbulence type="fractalNoise" baseFrequency=".78 .18" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><clipPath id="paper-clip"><path/></clipPath></defs><path class="sheet" fill="url(#paper-tone)" filter="url(#paper-relief)"/><rect class="fibers" width="100%" height="100%" filter="url(#paper-fibers)" clip-path="url(#paper-clip)" opacity=".037"/><path class="edge" fill="none" stroke="#fffdf6" stroke-width="1.4" opacity=".8"/>`;
 document.querySelector('#app').prepend(svg);
 function fit(){
  const page=document.querySelector('#app').getBoundingClientRect(),w=page.width,h=page.height,m=w<700?7:12,points=[];
  const rough=(n,seed)=>Math.sin(n*2.37+seed)*1.1+Math.sin(n*.73+seed*2)*1.6+Math.sin(n*5.17)*.6;
  const side=(len,fn,seed)=>{const count=Math.ceil(len/7);for(let i=0;i<=count;i++)points.push(fn(i/count,rough(i,seed)));};
  side(w-2*m,(u,n)=>[m+u*(w-2*m),m+n],1);
  side(h-2*m,(u,n)=>[w-m+n,m+u*(h-2*m)],4);
  side(w-2*m,(u,n)=>[w-m-u*(w-2*m),h-m+n],7);
  side(h-2*m,(u,n)=>[m+n,h-m-u*(h-2*m)],11);
  const d='M'+points.map(p=>p.map(v=>v.toFixed(2)).join(' ')).join('L')+'Z';
  svg.setAttribute('viewBox',`0 0 ${w} ${h}`);svg.querySelectorAll('path').forEach(p=>p.setAttribute('d',d));
 }
 fit();addEventListener('resize',fit);
}
