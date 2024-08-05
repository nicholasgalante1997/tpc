import React, { memo } from 'react';
import CardProps from './types';

function Card({ desc, img, link, title }: CardProps) {
  return (
    <article className="content-box">
      <div className="inner">
        <img className="content-box-thumb" src={img} />
        <h1 className="content-box-header space-mono-bold">{title}</h1>
        <p className="content-box-blurb space-mono-regular">{desc}</p>
        <div className="link-container">
          <a className="readmore-link space-mono-regular" target="_self" href={link}>
            Read More
          </a>
        </div>
      </div>
    </article>
  );
}

export default memo(Card);
