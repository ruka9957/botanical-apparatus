// One orthographic scale and one horizon. Only the camera's x changes by act.
export function layoutFor(w,h){
 const windowWidth=w;w=Math.min(w,h*1.72);
 const small=w<700,scale=small?w/1260:Math.max(.3,Math.min(w/1550,(h-250)/730));
 const y=small?h*.4:Math.max(35,h*.955-101-725*scale);
 const chime=980,collectX=w*(small?.35:.26)-chime*scale;
 const apparatusX=chime+w*.47/scale-225;
 const labShift=Math.max(0,(w*(small?.18:.27)+(small?30:80))/scale-349);
 const releaseX=Math.max(2400,labShift+1180+w/(2*scale)+180);
 return {small,w,h,windowWidth,scale,y,chime,collectX,apparatusX,labShift,releaseX};
}
export function cameraPose(layout,phase,progress=0){
 const l=layout;let x=l.w*.65-l.chime*l.scale;
 if(phase==='collect')x=l.collectX;
 if(phase==='distilling'||phase==='distilled'){
  const p=phase==='distilled'?1:Math.max(0,Math.min(1,progress));
  const u=Math.max(0,Math.min(1,(p-.18)/.74)),ease=u*u*(3-2*u);
  x=l.w*.5-(l.apparatusX+l.labShift+900+280*ease)*l.scale;
 }
 if(phase==='release')x=l.w*.5-(l.apparatusX+l.releaseX+(l.small?480:760))*l.scale;
 const mobileX=660+(l.small?0:l.w*(phase==='observe'?-.11:.05)/l.scale);
 return {x,y:l.y,scale:l.scale,mobileX,mobileZoom:phase==='observe'?1.18:1};
}
export function arrangeSet(l){
 document.querySelector('#mobile').style.top=(65-(l.small?0:l.h*.055/l.scale))+'px';
 const app=document.querySelector('#apparatus'),svg=app.querySelector('.glass-scene');
 app.style.left=l.apparatusX+'px';app.style.width=(l.releaseX+1540)+'px';
 svg.setAttribute('viewBox',`0 0 ${l.releaseX+1540} 840`);
 const extension=document.querySelector('#glass-extension');extension.setAttribute('transform',`translate(${l.labShift} 0)`);extension.dataset.shift=l.labShift;
 const transfer=`M331 408H375Q402 408 402 381V205Q402 180 429 180H${663+l.labShift}Q${690+l.labShift} 180 ${690+l.labShift} 207V310`;
 document.querySelectorAll('#collection-connection path').forEach(p=>p.setAttribute('d',transfer));
 const bridge=`M${1597+l.labShift} 564H${1780+l.labShift}Q${1810+l.labShift} 564 ${1810+l.labShift} 532V310Q${1810+l.labShift} 280 ${1845+l.labShift} 280H${l.releaseX+65}`;
 document.querySelectorAll('#release-connection path').forEach(p=>p.setAttribute('d',bridge));
 const station=document.querySelector('#release-station');station.style.left=l.releaseX+'px';station.style.top='80px';
 const printer=document.querySelector('#card-printer');printer.style.left=(l.releaseX+(l.small?250:1040))+'px';printer.style.top=(l.small?510:-30)+'px';
}
