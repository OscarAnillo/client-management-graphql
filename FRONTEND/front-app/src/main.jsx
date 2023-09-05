import React from 'react'
import ReactDOM from 'react-dom/client'
import {ApolloProvider, ApolloClient,InMemoryCache} from '@apollo/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
     fields: {
      clients: {
        merge(existing, incoming) {
          return incoming
        }
      },
      projects: {
        merge(existing, incoming) {
          return incoming
        }
      }
     } 
    }
  }
})

const client = new ApolloClient({
  cache: cache,
  uri:"http://localhost:5000/graphql"
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </ApolloProvider>
)
