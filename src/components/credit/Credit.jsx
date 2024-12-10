import React from 'react'
import "./Credit.css";

export default function Credit() {
  return (
    <div className="creditWrapper">
      <div className='creditFrame'>
        <div className='creditSectionWrapper'>
          <section className='creditSection'>
            <h2>このサイトについて</h2>
            <ul className='creditLists'>
              <li>七瀬すず菜さんの思っちゃった/てかさぁ！した場面をランダムで連続自動再生する非公式サイトです。</li>
              <li>このサイトでは、YouTubeの公式埋め込みプレイヤーを使用しています。再生はYouTube上での視聴回数に反映され、広告が表示される場合、その収益はチャンネルに還元されます。</li>
            </ul>
          </section>
          <section className='creditSection'>
            <h2>参考にさせていただいたサイト</h2>
            <ul className='creditLists'>
              <li><a href="https://koucho-endless.com/" target="_blank" rel="noopener noreferrer">校長先生の話エンドレス</a></li>
              {/* <li><a href="https://note.com/yudutu/n/n33c03ce7919b" target="_blank" rel="noopener noreferrer">加賀美ハヤト社長の歌を検索・視聴できるサイトを作りました</a></li> */}
              <li><a href="https://example.com" target="_blank" rel="noopener noreferrer">ダミーテキスト</a></li>
            </ul>
          </section>
          <section className='creditSection'>
            <h2>七瀬すず菜さん</h2>
            <ul className='creditLists'>
              <li>Youtube（<a href='https://www.youtube.com/@NanaseSuzuna' target="_blank" rel="noopener noreferrer">@NanaseSuzuna</a>）</li>
              <li>X（<a href='https://x.com/suzuna_nanase' target="_blank" rel="noopener noreferrer">@Suzuna_Nanase</a>）</li>
            </ul>
          </section>
          <section className='creditSection'>
            <h2>Special Thanks</h2>
            <ul className='creditLists'>
              <li>リスナーさんの「思っちゃったか」「はい七瀬さん」「てかさぁ！」等のチャットを参考に配信を切り抜かせていただきました。</li>
            </ul>
          </section>
          <section className='creditSection'>
            <h2>制作</h2>
            <ul className='creditLists withoutDot'>
              <li>愛犬オー（<a href='https://x.com/big_aphrodite' target="_blank" rel="noopener noreferrer">@big_aphrodite</a>）</li>
              <li>もし何かございましたら、<a href='https://x.com/big_aphrodite' target="_blank" rel="noopener noreferrer">XのDM</a>または<a href='mailto:iken.o.dev@gmail.com'>メール</a>までご連絡ください。</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
