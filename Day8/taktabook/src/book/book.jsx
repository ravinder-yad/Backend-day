import React, { useEffect, useState } from "react";
import "./Book.css";

function Book() {
  const [book, setBook] = useState("");
  const [price, setPrice] = useState("");
  const [author, setAuthor] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");

  const [submittedBook, setSubmittedBook] = useState(null);

  //  PAGE REFRESH PAR DATA LOAD
  useEffect(() => {
    const savedBook = localStorage.getItem("bookData");
    if (savedBook) {
      setSubmittedBook(JSON.parse(savedBook));
    }
  }, []);

  const addBook = () => {
    if (!book || !price || !author) {
      alert("Please fill required fields");
      return;
    }

    const todayDate = new Date().toLocaleDateString("en-GB");

    const bookDetails = {
      Tiktname: book,
      Parice: price,
      Movename: author,
      contectnumber: contact,
      Address: address,
      date: todayDate,
    };

    //  STATE + LOCAL STORAGE
    setSubmittedBook(bookDetails);
    localStorage.setItem("bookData", JSON.stringify(bookDetails));

    // reset form
    setBook("");
    setPrice("");
    setAuthor("");
    setContact("");
    setAddress("");
  };

  return (
    <div className="app">
      <div className="container">
        {/* FORM */}
        <div className="card glass">
              <h2>📘 Text Book Entry</h2>
          <input
            placeholder="📕 Text Name"
            value={book}
            onChange={(e) => setBook(e.target.value)}
          />

          <input
            placeholder="💰 Price ₹"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            placeholder="✍ Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />

          <input
            placeholder="📞 Contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />

          <textarea
            placeholder="🏠 Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <button onClick={addBook}>Save Text Book</button>
        </div>

        {/* CARD */}
        {submittedBook && (
          <div className="book-card">
            <div className="badge">Saved</div>
            <h3>{submittedBook.Tiktname}</h3>

            <div className="info">
              <p><span>Author:</span> {submittedBook.Movename}</p>
              <p><span>Price:</span> ₹ {submittedBook.Parice}</p>
              <p><span>Contact:</span> {submittedBook.contectnumber}</p>
              <p><span>Address:</span> {submittedBook.Address}</p>
              <p><span>Date:</span> {submittedBook.date}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Book;
