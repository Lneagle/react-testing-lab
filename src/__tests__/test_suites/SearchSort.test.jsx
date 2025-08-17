import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import App from '../../components/App';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { expect } from 'vitest';

describe('Our App will', () => {
    test('filter by a search term', async () => {
        global.setFetchResponse(global.baseTransactions)
        let { getByText, getByPlaceholderText } = render(<App />);

        const searchInput = getByPlaceholderText("Search your Recent Transactions");

        fireEvent.change(searchInput, { target: { value: "Lyft" } });

        await waitFor(() => {
            expect(screen.getByText("Lyft Ride")).toBeInTheDocument();
            expect(screen.queryByText("Chipotle")).toBeNull();
        });
    })
})