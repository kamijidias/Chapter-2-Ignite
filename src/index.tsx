import React from 'react';
import ReactDOM from 'react-dom/client';
import { createServer, Model } from 'miragejs'
import { App } from './App';

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelance de website',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date('2022-02-06 09:00:00'),
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Dev',
          amount: 1100,
          createdAt: new Date('2022-04-06 11:00:00'),
        }
      ],
    })
  },

  routes(): void{
    this.namespace = 'api';

    this.get('transactions', (schema) => {
      return schema.db.transactions;
    });

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('transactions', data);
    })
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
