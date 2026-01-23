import {useEffect, useState} from 'react'
import styles from './Table.module.css'
import axios from "axios";

function Table() {


  useEffect(()=>{ 
      const userId = localStorage.getItem("userId");
      const fetchTransactions = async ()=>{
        try{
          const result = await axios.get(`http://localhost:5000/view/transactions?userId=${userId}`)
          const data = result.data.data.result
          setTransactions(data);
          console.log(typeof transactions)
          console.log(result)
        } catch (error){
          console.log(error);
        }
    }

    fetchTransactions();

  },[])
  
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');

  const handleDelete = async (transactionId) => {
  try {
    const result = await axios.delete(`http://localhost:5000/view/deletetransaction/${transactionId}`);
    setTransactions(prev =>
      prev.filter(tx => tx.transactionId !== transactionId)
    );

    console.log(result.data.deletedId)
  } catch (err) {
    console.error(err);
  }


  
  
};
  return (
    <div className={styles.tableContainer}>
      <input type="text" className={styles.filterInput} onChange={(e)=>{setSearch(e.target.value)}} placeholder='Filter Here' />
      <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="5">No transactions found</td>
              </tr>
            ) : (
              transactions.filter((tx)=>{
                const lowerSearch = search.toLowerCase();

                return lowerSearch === '' ? tx : tx.title.toLowerCase().includes(lowerSearch) ||
                                      tx.description.toLowerCase().includes(lowerSearch) ||
                                      tx.amount.toString().includes(lowerSearch) ||
                                      new Date(tx.datecreated).toLocaleDateString().includes(lowerSearch);
                }).map(tx => (
                <tr key={tx.transactionId}>
                  <td>{tx.title}</td>
                  <td>{tx.description}</td>
                  <td>₱{tx.amount}</td>
                  <td>{new Date(tx.datecreated).toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => handleDelete(tx.transactionId)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
    </div>
  )
}

export default Table