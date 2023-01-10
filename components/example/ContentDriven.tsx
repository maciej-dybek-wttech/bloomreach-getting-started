import React from 'react';
import {BrManageContentButton, BrProps, useHTML} from '@bloomreach/react-sdk';
import {Document, Image, ImageSet, Reference} from '@bloomreach/spa-sdk';
import HbImage from '../hbImage/HbImage';

interface ContentDrivenParameters {
  document?: Reference;
}

interface ContentParameters {
  title?: string
  introduction?: string
  content?: { value: string }
  image: Reference
}


export function ContentDriven({component, page}: BrProps): React.ReactElement | null {

  const {document: ref} = component?.getModels<ContentDrivenParameters>() || {};
  const referencedDocument = ref && page?.getContent<Document>(ref);
  const safeHTML = useHTML(page, ref, 'content');

  if (!referencedDocument) {
    return page?.isPreview() ? <div>Please specify reference</div> : null;
  }


  const {title, introduction, image: imageRef} = referencedDocument.getData<ContentParameters>()
  const image: Image | undefined = imageRef && page?.getContent<ImageSet>(imageRef)?.getOriginal();


  return (
    <div className={`${page?.isPreview() ? 'has-edit-button' : ''} content-driven`}>
      <BrManageContentButton content={referencedDocument}/>
      {title && <h3>{title}</h3>}
      {introduction && <p>{introduction}</p>}
      {safeHTML && <div dangerouslySetInnerHTML={{__html: safeHTML}}/>}
      {image ? <HbImage image={image} width={300}/> : null}
    </div>
  );
}
