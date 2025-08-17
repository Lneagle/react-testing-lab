import React, {useState, useEffect} from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";
import Sort from "./Sort";

function AccountContainer() {
  const [transactions,setTransactions] = useState([])
  const [search,setSearch] = useState("")
  // console.log(search)

  useEffect(()=>{
    fetch("http://localhost:6001/transactions")
    .then(r=>r.json())
    .then(data=>setTransactions(data))
  },[])

  function postTransaction(newTransaction){
    fetch('http://localhost:6001/transactions',{
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTransaction)
    })
    .then(r=>r.json())
    .then(data=>setTransactions([...transactions,data]))
  }
  
  // Sort function here
  function onSort(sortBy){
    let sortedTransactions = transactions.sort((a, b) => {
      const termA = a[sortBy];
      const termB = b[sortBy];

      if (termA < termB) {
        return -1;
      }
      if (termA > termB) {
        return 1;
      }

      return 0;
    });
    console.log(sortedTransactions);
    setTransactions(sortedTransactions);
  }

  // Filter using search here and pass new variable down
  const filteredTransactions = transactions.filter(transaction => transaction.description.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <Search setSearch={setSearch}/>
      <AddTransactionForm postTransaction={postTransaction}/>
      <Sort onSort={onSort}/>
      <TransactionsList transactions={filteredTransactions} />
    </div>
  );
}

export default AccountContainer;
