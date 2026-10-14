'use client';
import { assetPath } from '../../lib/asset-path';
import { useEffect, useRef, useState } from 'react';

type Method = 'phone' | 'email' | 'wechat';
const methods: { id: Method; label: string }[] = [{id:'phone',label:'电话'},{id:'email',label:'邮箱'},{id:'wechat',label:'微信'}];
function Icon({type}:{type:Method}) {
  if(type==='phone') return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m5 3 4 1 1 5-3 2c1.5 3 3 4.5 6 6l2-3 5 1 1 4c0 1-1 2-3 2C9 20 4 15 3 6c0-2 1-3 2-3Z" strokeLinejoin="round"/></svg>;
  if(type==='email') return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7" strokeLinejoin="round"/></svg>;
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M14 14c-1.1.6-2.5 1-4 1l-4 2 1-3c-2-1.1-3-2.7-3-4.5C4 6.5 7 4 10.5 4S17 6.5 17 9"/><path d="M21 14c0-2.8-2.4-5-5.5-5S10 11.2 10 14s2.4 5 5.5 5c.7 0 1.3-.1 2-.3L21 20l-1-3c.7-.9 1-1.9 1-3Z"/><circle cx="8" cy="9" r=".7" fill="currentColor" stroke="none"/><circle cx="12" cy="9" r=".7" fill="currentColor" stroke="none"/><circle cx="14" cy="13" r=".7" fill="currentColor" stroke="none"/><circle cx="18" cy="13" r=".7" fill="currentColor" stroke="none"/></svg>;
}
export default function Contact() {
  const [active,setActive]=useState<Method|null>(null);
  const closeTimer=useRef<ReturnType<typeof setTimeout>|null>(null);
  useEffect(()=>()=>{if(closeTimer.current)clearTimeout(closeTimer.current);},[]);
  const keepOpen=()=>{if(closeTimer.current)clearTimeout(closeTimer.current);};
  const reveal=(method:Method)=>{keepOpen();setActive(method);};
  const hide=()=>{keepOpen();closeTimer.current=setTimeout(()=>setActive(null),240);};
  return <footer id="contact" className="compact-contact" onKeyDown={e=>{if(e.key==='Escape')setActive(null);}}>
    <div className="compact-contact-row"><h2>CONTACT</h2><div className="contact-icon-list" onPointerEnter={keepOpen} onPointerLeave={e=>{if(e.pointerType==='mouse')hide();}}>{methods.map(m=><button key={m.id} type="button" title={m.label} aria-label={m.label} aria-expanded={active===m.id} aria-controls="contact-detail" onPointerEnter={e=>{if(e.pointerType==='mouse')reveal(m.id);}} onFocus={()=>reveal(m.id)} onClick={()=>reveal(m.id)}><Icon type={m.id}/></button>)}</div></div>
    {active&&<div id="contact-detail" className="contact-detail" onPointerEnter={keepOpen} onPointerLeave={e=>{if(e.pointerType==='mouse')hide();}}><div className="contact-detail-top"><span>{methods.find(m=>m.id===active)?.label}</span><button type="button" onClick={()=>setActive(null)} aria-label="关闭联系方式">×</button></div>
      {active==='phone'&&<a className="contact-detail-link" href="tel:19200907985">19200907985</a>}
      {active==='email'&&<a className="contact-detail-link" href="mailto:siturongjian@163.com">siturongjian@163.com</a>}
      {active==='wechat'&&<div className="contact-wechat"><a className="qr-window" href={assetPath("/contact/wechat-qr.jpg")}  target="_blank" rel="noopener noreferrer" aria-label="查看微信好友二维码大图"><img src={assetPath("/contact/wechat-qr.jpg")}  alt="Ryan 的微信好友二维码" /></a><p>扫码添加好友<span>点击放大</span></p></div>}
    </div>}
    <div className="compact-contact-bottom"><span>© 2026 RYAN SZETO</span><a href="#home">回到顶部 ↑</a></div>
  </footer>;
}
