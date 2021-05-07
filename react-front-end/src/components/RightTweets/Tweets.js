import React from "react";

export default function Tweets(props) {
  const { name, handle, text, img } = props;

  return (
    <article>
      <header>
        <div className="tweeter">
          <span className="profile">
            <img src={img} alt="" />
            {name}
          </span>
          <a
            className="handle"
            href={`https://twitter.com/${handle}`}
            target="_blank"
          >
            {handle}
          </a>
        </div>
      </header>
      <div className="tweet">{text}</div>
      <footer>
        <div className="interact"></div>
      </footer>
    </article>
  );
}
