import React, { useEffect, useState } from "react";
import "./App.css";
import Table from "./components/Table";

function App() {
  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Product Name" },
    { key: "price", label: "Price" },
    { key: "category", label: "Category" },
  ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/products")   // 👈 goes to backend via proxy
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h2>Products</h2>
      {loading ? <p>Loading...</p> : <Table columns={columns} data={data} />}
    </div>
  );
}

export default App;