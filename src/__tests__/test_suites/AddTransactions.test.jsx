import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import App from '../../components/App';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { expect } from 'vitest';

describe('Our App will', () => {
    test('add a transaction', async () => {
        global.setFetchResponse(global.baseTransactions)
        let { getByText, getByPlaceholderText, getByTestId } = render(<App />);

        const form = getByTestId("add-form");
        const dateInput = form.querySelector('input[type=date]');
        const descriptionInput = getByPlaceholderText("Description");
        const categoryInput = getByPlaceholderText("Category");
        const amountInput = getByPlaceholderText("Amount");
        const button = getByText("Add Transaction");

        fireEvent.change(dateInput, { target: { value: "2025-08-13" } });
        fireEvent.change(descriptionInput, { target: { value: "Sundae from Scream Truck" } });
        fireEvent.change(categoryInput, { target: { value: "Food" } });
        fireEvent.change(amountInput, { target: { value: "-7.50" } });
        fireEvent.click(button);

        await waitFor(() => {
            expect(screen.getByText("Sundae from Scream Truck")).toBeInTheDocument();
        });
    })
})