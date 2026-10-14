import { assetPath } from '../../../lib/asset-path';
import Link from 'next/link';

export default function Qinglv() {
  return <main className="film-page">
    <header className="film-nav"><Link href="/#works">← 返回精选作品</Link><Link href="/">RS.</Link><span>访谈纪录片</span></header>
    <section className="film-intro"><p className="eyebrow">导演作品</p><h1>只此青绿<span>访谈纪录片</span></h1><div className="film-facts"><p>职责<span>创意策划 · 导演</span></p><p>类型<span>访谈纪录片</span></p><p>时长<span>04:56</span></p></div></section>
    <section className="film-player" aria-label="影片播放"><video controls playsInline preload="none" poster={assetPath("/projects/qinglv/cover.jpg")}  src={assetPath("/library/qinglv.mp4")} >你的浏览器不支持视频播放。</video><div className="film-player-caption"><span>只此青绿 / 完整影片</span><span>创意策划 · 导演 / Ryan Szeto</span></div></section>
    <figure className="film-still"><img src={assetPath("/projects/qinglv/costume-panorama.jpg")}  alt="只此青绿戏服全景陈列" /><figcaption>影片画面 / 戏服全景</figcaption></figure>
    <div className="film-end"><Link href="/#works">← 探索精选作品</Link><span>Ryan Szeto</span></div>
  </main>;
}
