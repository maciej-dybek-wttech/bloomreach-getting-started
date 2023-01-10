import React from 'react';
import {BrComponent, BrProps, BrManageContentButton} from '@bloomreach/react-sdk';
import {Component} from '@bloomreach/spa-sdk';

interface HelloWorldParameters {
  heading: string;
}

export function HelloWorld({ component, page }: BrProps): React.ReactElement | null {

  if ((!component || !page)) {
    return null;
  }

  const { heading } = component.getParameters<HelloWorldParameters>();

  return (
    <div className="hello-world">
      {heading && <h3>{heading}</h3>}
    </div>
  );
}
