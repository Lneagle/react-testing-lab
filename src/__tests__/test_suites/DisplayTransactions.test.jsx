import React from 'react';	
import { render } from '@testing-library/react';
import App from '../../components/App';
import '@testing-library/jest-dom';
import { test } from 'vitest';

describe('Our app will', () => {
    test('display transactions on startup', async () => {
        global.setFetchResponse(global.baseTransactions)
        let { findAllByTestId } = render(<App />);
        const transactionItems = await findAllByTestId('transaction');
        expect(transactionItems).toHaveLength(global.baseTransactions.length);

        const transactionDates = transactionItems.map((item) => item.querySelector('.transaction-date').textContent);
        const baseTransactionDates = global.baseTransactions.map((transaction) => transaction.date);
        expect(transactionDates).toEqual(baseTransactionDates);

        const transactionDescriptions = transactionItems.map((item) => item.querySelector('.transaction-description').textContent);
        const baseTransactionDescriptions = global.baseTransactions.map((transaction) => transaction.description);
        expect(transactionDescriptions).toEqual(baseTransactionDescriptions);

        const transactionCategories = transactionItems.map((item) => item.querySelector('.transaction-category').textContent);
        const baseTransactionCategories = global.baseTransactions.map((transaction) => transaction.category);
        expect(transactionCategories).toEqual(baseTransactionCategories);

        const transactionAmounts = transactionItems.map((item) => Number(item.querySelector('.transaction-amount').textContent));
        const baseTransactionAmounts = global.baseTransactions.map((transaction) => transaction.amount);
        expect(transactionAmounts).toEqual(baseTransactionAmounts);
    });
})