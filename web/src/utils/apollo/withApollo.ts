import { createWithApollo } from './createWithApollo';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { NextPageContext } from 'next';
import { createUploadLink } from 'apollo-upload-client';
import { GRAPHQL_SERVER_URL } from '../../constants';

const link = createUploadLink({
  uri: GRAPHQL_SERVER_URL,
  credentials: 'include',
});

const createClient = (ctx: NextPageContext) =>
  new ApolloClient({
    link,
    credentials: 'include',
    headers: {
      cookie:
        (typeof window === 'undefined'
          ? ctx?.req?.headers.cookie
          : undefined) || '',
    },
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            userImages: {
              merge: false,
            },
            multiUpload: {
              merge: false,
            },
          },
        },
      },
    }),
  });

export const withApollo = createWithApollo(createClient);
