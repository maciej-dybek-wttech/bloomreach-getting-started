import {BrComponent, BrPage} from '@bloomreach/react-sdk';
import {Configuration, PageModel} from '@bloomreach/spa-sdk';
import axios from 'axios';
import React from 'react';
import {HelloWorld} from './example/HelloWorld';
import {ContentDriven} from './example/ContentDriven';
import {PageSpecific} from './example/PageSpecific';
import {MenuComponent} from './example/MenuComponent';

interface AppProps {
  configuration: Omit<Configuration, 'httpClient'>;
  page: PageModel;
}

export function App({
                      configuration,
                      page,
                    }: AppProps): JSX.Element {
  const mapping = {HelloWorld, ContentDriven, PageSpecific, MenuComponent};

  return (
    <BrPage configuration={{...configuration, httpClient: axios as any}} mapping={mapping}>
      {/*<BrPageContext.Consumer>*/}
      {/*  {page =>*/}
      {/*    <>*/}
      {/*      <Link href={page?.getUrl('/') || ''}>Home</Link>*/}
      {/*    </>*/}
      {/*  }*/}
      {/*</BrPageContext.Consumer>*/}
      <div>
        <BrComponent path="menu">
          <MenuComponent/>
        </BrComponent>
      </div>
      <div>
        <BrComponent path="main">
          <p>Main</p>
          <BrComponent/>
        </BrComponent>
      </div>
      <div>
        test
        <BrComponent path="section">
          <p>section</p>
          <BrComponent/>
          <div>
          <BrComponent path="container">
            <p>container</p>
            <BrComponent/>
          </BrComponent>
          </div>
        </BrComponent>
      </div>
    </BrPage>
  );
}
