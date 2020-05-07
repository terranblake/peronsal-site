import React from 'react';
import './App.css';

import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import { ApolloProvider, Query } from 'react-apollo';

const apolloServerURI = process.env.APOLLO_SERVER_URI;

const client = apolloServerURI
  ? new ApolloClient({
    uri: process.env.APOLLO_SERVER_URI
  })
  : null;

function App() {
  return client
    ? (
      <ApolloProvider client={client}>
        <div>Hello World</div>
        <Query
          query={
            gql`
              {
                posts {
                  title
                  createdAt
                }
              }
            `
          }
        >
          {
            (data) => {
              data = data.data
              if (!data || data.posts === undefined) return null;

              return (
                <ul>
                  {
                    data.posts.map(({ title, createdAt }) => {
                      return <li key={createdAt}>{createdAt} - {title}</li>
                    })
                  }
                </ul>
              )
            }
          }
        </Query>
      </ApolloProvider>
    )
    : <div>apollo server not configured</div>
}

export default App;
