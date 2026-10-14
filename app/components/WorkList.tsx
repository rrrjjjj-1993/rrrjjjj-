'use client';
import { assetPath } from '../../lib/asset-path';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import works from '../../lib/works.json';
const categories=['商业广告','导演作品','数字营销影像','AI创作'];
type Work=(typeof works)[number];
function Film({work,index}:{work:Work;index:number}) {
 const card=useRef<HTMLElement>(null),preview=useRef<HTMLVideoElement>(null);
 const timer=useRef<ReturnType<typeof setTimeout>|null>(null);
 const hover=useRef(false),mainPlaying=useRef(false);
 const [seen,setSeen]=useState(false),[motion,setMotion]=useState(false),[playing,setPlaying]=useState(false);
 function stop(){hover.current=false;if(timer.current)clearTimeout(timer.current);preview.current?.pause();setPlaying(false);}
 useEffect(()=>{
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  const observer=new IntersectionObserver(e=>{if(e.some(x=>x.isIntersecting)){setSeen(true);observer.disconnect();}},{threshold:.08});
  const update=()=>{setMotion(!media.matches);if(media.matches){setSeen(true);stop();}};
  const hide=()=>{if(document.hidden)stop();};
  update();if(card.current)observer.observe(card.current);media.addEventListener('change',update);document.addEventListener('visibilitychange',hide);
  return()=>{observer.disconnect();media.removeEventListener('change',update);document.removeEventListener('visibilitychange',hide);if(timer.current)clearTimeout(timer.current);preview.current?.pause();};
 },[]);
 function play(){const v=preview.current;if(!v||!hover.current)return;v.currentTime=Math.min(v.duration*.15,15);v.play().then(()=>{if(hover.current)setPlaying(true);else v.pause();}).catch(()=>setPlaying(false));}
 function start(){
  if(mainPlaying.current||!matchMedia('(min-width: 768px) and (hover: hover) and (pointer: fine)').matches||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  hover.current=true;timer.current=setTimeout(()=>{const v=preview.current;if(!v||!hover.current)return;if(!v.getAttribute('src')){v.src=assetPath(work.video);v.load();}else play();},350);
 }
 return <article ref={card} className={`inline-film motion-film ${motion?'motion-enabled':''} ${seen?'is-visible':''}`} style={{transitionDelay:`${index%2*90}ms`}}>
  <div className="inline-film-heading"><h3>{work.title}</h3><span>{work.category} · {work.duration}</span></div>
  <div className={`film-hover ${playing?'preview-playing':''}`} onPointerEnter={start} onPointerLeave={stop}>
   <video controls playsInline preload="none" poster={work.coverApproved?assetPath(work.poster):undefined} src={assetPath(work.video)} aria-label={work.title} onPlay={()=>{mainPlaying.current=true;stop();}} onPause={()=>{mainPlaying.current=false;}} onEnded={()=>{mainPlaying.current=false;}}/>
   <video ref={preview} className="film-hover-preview" muted playsInline preload="none" aria-hidden="true" tabIndex={-1} onLoadedMetadata={play} onError={stop} onTimeUpdate={()=>{const v=preview.current;if(v&&v.currentTime>Math.min(v.duration*.15,15)+6)v.currentTime=Math.min(v.duration*.15,15);}} onEnded={play}/>
   <span className="preview-caption" aria-hidden="true">无声预览</span>
  </div>
  {work.approved&&<div className="inline-film-credit"><span>创意策划 · 导演</span><Link href="/works/qinglv">查看项目详情 ↗</Link></div>}
 </article>;
}
export default function WorkList(){
 const [category,setCategory]=useState('商业广告'),[leaving,setLeaving]=useState(false);
 const timer=useRef<ReturnType<typeof setTimeout>|null>(null);
 useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current);},[]);
 function change(next:string){if(timer.current)clearTimeout(timer.current);if(next===category){setLeaving(false);return;}if(matchMedia('(prefers-reduced-motion: reduce)').matches){setCategory(next);setLeaving(false);return;}setLeaving(true);timer.current=setTimeout(()=>{setCategory(next);setLeaving(false);},170);}
 return <>
  <div className="archive-filter" role="group" aria-label="作品分类">{categories.map(c=><button key={c} aria-pressed={category===c} onClick={()=>change(c)}>{c}</button>)}</div>
  <span className="sr-only" aria-live="polite">{category}</span>
  <div className={`inline-films motion-list ${leaving?'switching-out':''}`}>{works.filter(w=>w.category===category).map((work,index)=><Film key={work.slug} work={work} index={index}/>)}</div>
 </>;
}
