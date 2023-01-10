import React from 'react';
import {BrManageContentButton, BrProps} from '@bloomreach/react-sdk';
import {Document, Reference} from '@bloomreach/spa-sdk';


interface TestParameters {
  Title?: string;
  reference?: Reference
}

export function Test({component, page}: BrProps): React.ReactElement | null {
  if (!component || !page) {
    return <p>Empty</p>;
  }
  const {reference: documentRef} = component.getModels<TestParameters>();
  const document = documentRef && page.getContent<Document>(documentRef);


  const {Title} = component.getParameters<TestParameters>();

  const {title: referencedTitle, content: content} = document?.getData<{ title: string }>() || {};
  const html = page.rewriteLinks(content);

  return (
    <div className={`${page.isPreview() ? 'has-edit-button' : ''} mw-container mx-auto my-4`}>
      <p>TEst component</p>
      {/* The button allows to go directly to a link content*/}
      <BrManageContentButton content={document}/>
      {Title && <h3 className="mb-4">{Title}</h3>}
      {referencedTitle && <h4 className="mb-4">{referencedTitle}</h4>}
      {content && <div dangerouslySetInnerHTML={{__html: html}}/>}
      {/*<div>*/}
      {/*  {content && <div dangerouslySetInnerHTML={{ __html: page.rewriteLinks(page.sanitize(content.value)) }} />}*/}
      {/*</div>*/}
    </div>
  );
}
