import { assetPath } from '../../../lib/asset-path';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import works from '../../../lib/works.json';

export function generateStaticParams() { return works.filter(w=>w.slug!=='qinglv').map(w=>({slug:w.slug})); }
export async function generateMetadata({params}:{params:Promise<{slug:string}>}) { const {slug}=await params; const work=works.find(w=>w.slug===slug); return {title:work ? `${work.titleApproved ? work.title : '作品 '+work.displayNumber} — RYAN SZETO` : '作品未找到'}; }
export default async function Work({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params;
  const index=works.findIndex(w=>w.slug===slug);
  if(index<0) notFound();
  const work=works[index];const next=works[(index+1)%works.length];
  return <main className="film-page">
    <header className="film-nav"><Link href="/works">← 全部作品</Link><Link href="/">RS.</Link><span>{work.category}</span></header>
    <section className="film-intro library-intro"><p className="eyebrow">作品 / {String(work.displayNumber).padStart(2,'0')}</p><h1>{work.titleApproved ? work.title : `作品 ${work.displayNumber}`}</h1><div className="film-facts"><p>类别<span>{work.category}</span></p><p>时长<span>{work.duration}</span></p></div></section>
    <section className="film-player" aria-label="影片播放"><video key={slug} controls playsInline preload="none" poster={work.coverApproved ? assetPath(work.poster) : undefined} src={assetPath(work.video)}>你的浏览器不支持视频播放。</video><div className="film-player-caption"><span>影片播放</span><span></span></div></section>
    <div className="next-work"><span className="eyebrow">下一部</span><Link href={`/works/${next.slug}`}>{next.titleApproved ? next.title : `作品 ${next.displayNumber}`} <span>↗</span></Link></div>
    <div className="film-end"><Link href="/works">← 返回全部作品</Link><span>Ryan Szeto</span></div>
  </main>;
}
