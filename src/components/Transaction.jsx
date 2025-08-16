import React from "react";

function Transaction({transaction}) {
  return (
    <tr data-testid="transaction">
      <td className="transaction-date">{transaction.date}</td>
      <td className="transaction-description">{transaction.description}</td>
      <td className="transaction-category">{transaction.category}</td>
      <td className="transaction-amount">{transaction.amount}</td>
    </tr>
  );
}

export default Transaction;
