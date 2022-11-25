import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [value, setValue] = useState('');
  const [books, setBooks] = useState([]);
  const [shouldShowBook, setShouldShowBook] = useState(false);
  const [bookToDisplay, setBookToDisplay] = useState([]);
  const [wishList, setWishList] = useState([]);

  const onInputChange = (e) => {
    setValue(e.target.value);
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${value}`
      );
      return response.data.items;
    } catch (err) {
      console.log(err);
    }
  };
  const getAllBooks = async () => {
    if (value.length >= 3 && value.length <= 10) {
      const resBooks = await fetchData();
      setBooks(resBooks);
    }
  };

  const showBook = (e) => {
    setShouldShowBook(true);
    const bookName = e.target.innerText;
    const bookObj = books.find((book) => {
      if (book.volumeInfo.title === bookName) return book;
    });
    setBookToDisplay(bookObj.volumeInfo);
  };

  const addBookToWishList = () => {
    setWishList([...wishList, bookToDisplay]);
  };

  useEffect(() => {
    getAllBooks();
  }, [value]);

  return (
    <div className='App'>
      <input value={value} onChange={onInputChange} />
      <div className='container'>
        <ul>
          {books?.map((book, index) => (
            <li key={index}>
              <span onClick={showBook}>{book.volumeInfo.title}</span>
            </li>
          ))}
        </ul>
        {shouldShowBook && (
          <div>
            <p>author: {bookToDisplay.authors}</p>
            <button onClick={addBookToWishList}>add to wishList</button>
          </div>
        )}
        <div>
          {wishList?.map((book, index) => {
            return (
              <li key={index}>
                <span>{book.title}</span>
              </li>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
