import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

class HomePage extends Component {
    render() {
        return <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>

            <div className="list-books-content">

                <BookShelf  shelf="Currently Reading" 
                            books={this.props.currentlyReading}
                            updateBooks={this.props.updateBooks} />,

                <BookShelf  shelf="Want to Read"
                            books={this.props.wantToRead}
                            updateBooks={this.props.updateBooks} />,

                <BookShelf  shelf="Read"
                            books={this.props.read}
                            updateBooks={this.props.updateBooks} />

            </div>

            <div className="open-search">
                <Link
                    to="/search">
                    Add a book
                </Link>
            </div>
        </div>
    }
}

export default HomePage;