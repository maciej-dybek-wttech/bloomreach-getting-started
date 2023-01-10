import React from 'react';
import {BrProps} from '@bloomreach/react-sdk';
import {ContainerItem, getContainerItemContent} from '@bloomreach/spa-sdk';

interface TitleAndTextCompound {
  title?: string
  text?: string
}

interface ContentParameters {
  headingSize?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}


export function PageSpecific({component, page}: BrProps<ContainerItem>): React.ReactElement | null {

  if (!component || !page) {
    return page?.isPreview() ? <div/> : null;
  }
  let title;
  let text;

  const content = getContainerItemContent<TitleAndTextCompound>(component, page);
  if (content !== null) {
    title = content.title;
    text = content.text;
  }

  const {headingSize = 'h2'} = component.getParameters<ContentParameters>();

  return (
    <div className="page-specific">
      {headingSize === 'h1' && <h1>{title}</h1>}
      {headingSize === 'h2' && <h2>{title}</h2>}
      {headingSize === 'h3' && <h3>{title}</h3>}
      {headingSize === 'h4' && <h4>{title}</h4>}
      {headingSize === 'h5' && <h5>{title}</h5>}
      {headingSize === 'h6' && <h6>{title}</h6>}
      {text && <p>{text}</p>}
    </div>
  );
}
