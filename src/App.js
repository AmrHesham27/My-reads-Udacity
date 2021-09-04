import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './Search'
import HomePage from './HomePage'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    allBooks : [],
    currentlyReading : [],
    wantToRead : [],
    read : [],
    // state for search function
    query: '',
    searchedBooks: [],
}

componentDidMount(){
    BooksAPI.getAll().then( books => {
        this.setState({ allBooks : books });
        this.filterBooks();
    })
}

// make search function to put it in the input 
searchBooks = (event) => {
  let query = event.target.value;
  // if the query is not empty means if the user has inputed anything
  // ,get the searched result of the API
  if (query !== '') { 
      BooksAPI.search(query).then(searchResults => {
      // if error make the array empty
      if (searchResults.error || !searchResults) {
        this.setState({ searchedBooks: [] })
        return
      }
      else {
        // i will process the search results before i put it in the state
        // firstly make all the undefined books , defined to none
        let newSearchResults = searchResults.map(obj=> ({ ...obj, shelf: 'none' }))
        // this is all the books on all shelves and their ids
        let myBooks = this.state.currentlyReading.concat(this.state.wantToRead).concat(this.state.read);
        let idsOfMyBooks = myBooks.map(b => b.id);
        // now this is the books that exist in both my search results and my book shelves 
        let newBooks = newSearchResults.filter(b => idsOfMyBooks.includes(b.id) );
        let idsOfnewBooks = newBooks.map(b => b.id); 
        // remove it , resulst should be the searched results without the intersected books
        let result = newSearchResults.filter( x => !idsOfnewBooks.includes(x.id));
        // get the book we just removed from myBooks (the books on the shelves) 
        let myBooks2 = myBooks.filter( x => idsOfnewBooks.includes(x.id));
        // add this book to filtered search reusults
        let newSearchedBooks = result.concat(myBooks2);
        // finally set state
        this.setState({searchedBooks : newSearchedBooks});
      }
      })
  }else{
      // if the query is empty , make the searched results empty
      this.setState({ searchedBooks: [] })
  }
}

updateBooks = (book,newShelf) => {
  // firstly update the BooksAPI
  BooksAPI.update(book,newShelf);

  // if the book is not in allBooks , add it
  if( (newShelf !== 'none') && (book.shelf==='none') ){
      book.shelf = newShelf;
      this.setState((prevState) => ({
        allBooks : prevState.allBooks.concat(book)
      }));
      // use (set time out) otherwise filterBooks() would fire before setState is done 
      setTimeout(() => {this.filterBooks()}, 250);
      console.log(this.state.allBooks);
  }
  
  // if the book is in all books change its shelf
  if( newShelf !== 'none' ){ 
      book.shelf = newShelf;
      this.filterBooks();
    };

  // remove book if user choosed none
  if(newShelf === "none"){
      book.shelf = 'none';
      this.filterBooks();
    }; 
}

// function to filter the books based on its shelf
filterBooks = () => {
  this.setState({currentlyReading : this.state.allBooks.filter(b => b.shelf === 'currentlyReading')});
  this.setState({wantToRead : this.state.allBooks.filter(b => b.shelf === 'wantToRead')});
  this.setState({read : this.state.allBooks.filter(b => b.shelf === 'read')});
}

render() { 
    if(this.state.books !== [])
    {return ( 
      <div className="app"> 
        <Route path="/search" exact render={() => <Search   searchedBooks={this.state.searchedBooks}
                                                            updateBooks={this.updateBooks}
                                                            searchBooks={this.searchBooks}  />}/> 

        <Route path="/" exact render={() =>       <HomePage currentlyReading={this.state.currentlyReading}
                                                            wantToRead={this.state.wantToRead}
                                                            read={this.state.read}
                                                            updateBooks={this.updateBooks}  /> }/> 
      </div> 
    )}
}
}

export default BooksApp
