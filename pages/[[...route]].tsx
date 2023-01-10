import {GetServerSideProps, NextPage} from 'next';
import {Configuration, initialize, PageModel} from '@bloomreach/spa-sdk';
import {App} from '../components/App';
import axios from 'axios';
import {buildConfiguration, deleteUndefined} from '../lib/utils';

interface IndexPageProps {
  configuration: Omit<Configuration, 'httpClient'>
  page: PageModel
}

const Index: NextPage<IndexPageProps> = ({
                                           configuration,
                                           page,
                                         }): JSX.Element => {
  return <App
    configuration={configuration}
    page={page}
  />;
};

export const getServerSideProps: GetServerSideProps = async ({req: request, res: response, resolvedUrl: path}) => {

  const configuration = buildConfiguration(path ?? '/');
  const page = await initialize({
      ...configuration,
      httpClient: axios as any
    }
  );
  const pageJson = page.toJSON();
  const props: IndexPageProps = {configuration, page: pageJson};

  if (!request || !response) {
    return {props: props};
  }

  // eslint-disable-next-line max-len
  // Hack needed to avoid JSON-Serialization validation error from Next.js https://github.com/zeit/next.js/discussions/11209
  // >>> Reason: `undefined` cannot be serialized as JSON. Please use `null` or omit this value all together.
  if (process.env.NODE_ENV !== 'production') {
    deleteUndefined(props);
  }

  return {props: props};
};

export default Index;
