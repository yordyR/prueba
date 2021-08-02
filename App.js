import React from 'react';
import Navigation from './navigations/Naigations';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";


const client = new ApolloClient({
  uri: 'https://jr-master-test.dev.elenas.la/gql/',
  headers: {
    authorization: localStorage.getItem("token") || ""
  },
  cache: new InMemoryCache()
});


// client
//   .query({
//     query: gql`
//         query clientsSearch {
//           clientsSearch{
//               currentPage
//           }
//       }
//     `
//   })
//   .then(result => console.log(result));

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Navigation />
    </ApolloProvider>
  );
}
