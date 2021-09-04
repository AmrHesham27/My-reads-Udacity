import React, { Component } from 'react';

class BookShelf extends Component {
    
    render() {
        return  <div className="bookshelf">
                    <h2 className="bookshelf-title">{this.props.shelf}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                        {this.props.books.map((book, index) =>
                            <li key={index}>
                                    <div className="book">
                                        <div className="book-top">
                                            <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                                            <div className="book-shelf-changer">
                                                <select  onChange={(event) => this.props.updateBooks(book, event.target.value)}  value={book.shelf}> 
                                                    <option disabled>Move to...</option>
                                                    <option value="currentlyReading">Currently Reading</option>
                                                    <option value="wantToRead">Want to Read</option>
                                                    <option value="read">Read</option>
                                                    <option value="none">None</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="book-title">{book.title}</div>
                                        {/* some book have no authors this next line is for that */}
                                        <div className="book-authors">{Array.isArray(book.authors) ? book.authors.join(', '): 'author is undeifned'}</div>
                                    </div>
                            </li>
                        )}
                        </ol>
                    </div>
                </div>
    }
}

export default BookShelf;