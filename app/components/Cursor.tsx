'use client';
import { useEffect, useRef } from 'react';
export default function Cursor() {
  const dot=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const media=matchMedia('(min-width: 768px) and (hover: hover) and (pointer: fine)');
    const root=document.documentElement;
    const node=dot.current;
    if(!node)return;
    const clear=()=>{node.classList.remove('cursor-visible','cursor-hover');root.classList.remove('has-glow-cursor');};
    const move=(e:PointerEvent)=>{
      if(!media.matches||e.pointerType!=='mouse'){clear();return;}
      node.style.left=e.clientX+'px';node.style.top=e.clientY+'px';
      node.classList.add('cursor-visible');root.classList.add('has-glow-cursor');
      node.classList.toggle('cursor-hover',e.target instanceof Element&&!!e.target.closest('a,button,video,input,textarea'));
    };
    const out=(e:PointerEvent)=>{if(e.relatedTarget===null)clear();};
    window.addEventListener('pointermove',move);document.addEventListener('pointerout',out);window.addEventListener('blur',clear);media.addEventListener('change',clear);
    return()=>{clear();window.removeEventListener('pointermove',move);document.removeEventListener('pointerout',out);window.removeEventListener('blur',clear);media.removeEventListener('change',clear);};
  },[]);
  return <div ref={dot} className="glow-cursor" aria-hidden="true"/>;
}
