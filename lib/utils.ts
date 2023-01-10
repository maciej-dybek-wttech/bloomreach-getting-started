import {Configuration} from '@bloomreach/spa-sdk';
import {NEXT_PUBLIC_BR_MULTI_TENANT_SUPPORT, NEXT_PUBLIC_BRXM_ENDPOINT} from './constants';


type BuildConfigurationOptions = {
  endpoint: string | (string | null)[];
  baseUrl: string;
};

type ConfigurationBuilder = Omit<Configuration & Partial<BuildConfigurationOptions>, 'httpClient'>;

export function notEmpty<T>(value: T | null | undefined): value is T {
  return !!value;
}

// eslint-disable-next-line max-len
// Hack needed to avoid JSON-Serialization validation error from Next.js https://github.com/zeit/next.js/discussions/11209
// >>> Reason: `undefined` cannot be serialized as JSON. Please use `null` or omit this value all together.
export function deleteUndefined(obj: Record<string, any> | undefined): void {
  if (obj) {
    Object.keys(obj).forEach((key: string) => {
      if (obj[key] && typeof obj[key] === 'object') {
        deleteUndefined(obj[key]);
      } else if (typeof obj[key] === 'undefined') {
        delete obj[key]; // eslint-disable-line no-param-reassign
      }
    });
  }
}

export function buildConfiguration(
  path: string,
  endpoint: string = NEXT_PUBLIC_BRXM_ENDPOINT,
  hasMultiTenantSupport: boolean = NEXT_PUBLIC_BR_MULTI_TENANT_SUPPORT,
): ConfigurationBuilder {
  const configuration: ConfigurationBuilder = {
    path,
    endpoint
  };
  return configuration;
}
