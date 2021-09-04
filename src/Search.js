import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf';

class Search extends Component {

render(){
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className="close-search"
            to="/">
            Close
          </Link>          
          <div className="search-books-input-wrapper">
              <input
                type="text"
                onChange={this.props.searchBooks}
                placeholder="Search by title or author"
              />
          </div>
        </div>
        <div className="search-books-results">
            <BookShelf    updateBooks={this.props.updateBooks}
                          books={this.props.searchedBooks}
                          shelf="Search Results" />
        </div>
      </div>
    )
}
}

export default Search
