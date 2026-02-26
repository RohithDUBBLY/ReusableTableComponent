import React, { useState, useMemo } from "react";

function Table({ columns, data }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"

  // Handle sorting when header is clicked
  const handleSort = (key) => {
    if (sortKey === key) {
      // Toggle order if same column clicked
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filteredData = data.filter((row) =>
      Object.values(row)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    if (sortKey) {
      filteredData.sort((a, b) => {
        if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
        if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filteredData;
  }, [data, searchTerm, sortKey, sortOrder]);

  return (
    <div>
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {/* Table */}
      <table
        border="1"
        cellPadding="8"
        cellSpacing="0"
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() => handleSort(col.key)}
                style={{ cursor: "pointer", background: "#f0f0f0" }}
              >
                {col.label}
                {sortKey === col.key ? (sortOrder === "asc" ? " ▲" : " ▼") : ""}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {filteredAndSortedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: "center" }}>
                No data found
              </td>
            </tr>
          ) : (
            filteredAndSortedData.map((row, index) => (
              <tr key={index}>
                {columns.map((col) => (
                  <td key={col.key}>{row[col.key]}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;