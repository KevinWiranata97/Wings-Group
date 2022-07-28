import Navbar from "../components/navbar";
import { useState, useEffect } from "react";
export default function ReportViews() {
    const [transaction, setTransaction] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3000/transaction")
          .then((response) => response.json())
          .then((data) => setTransaction(data));
      }, []);
console.log(transaction);
  return (
    <>
      <div className="container mx-auto p-5">
        <Navbar></Navbar>
      </div>

      <div className="container py-16 mx-auto">
        <div className="max-w-lg mx-auto shadow rounded overflow-hidden text-center">
          <table>
            <tr>
              <th>Transaction</th>
              <th>User</th>
              <th>Total</th>
              <th>Date</th>
              <th>Item</th>
            </tr>
            {transaction.map((transaction) => (
                <tr>
                <td>{transaction.document_code} - {transaction.document_number}</td>
                <td>{transaction.user}</td>
                <td> Rp.{transaction.total.toLocaleString("id-ID")},00</td>
                <td>{transaction.date}</td>
                <td>{transaction.product_name}</td>
              </tr>
            ))}
       
      
          </table>
        </div>
      </div>
    </>
  );
}
