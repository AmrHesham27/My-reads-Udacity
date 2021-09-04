# MyReads Project

This is the third project of Udacity Front End Nano degree.

It is a book app where the user can move a book from shelf to another shelf (currently reading - want to read - None) and he can search for books based on their names.

The project was built by React and uses an API provide by Udacity.

## How to start ?
Install the code on your pc

In your shell type
```
git clone https://github.com/AmrHesham27/My-reads-Udacity
cd myreads
```

then download the dependencies 

In your shell type `npm i`

then type `npm start` to start the project.


## Backend Server

The file [`BooksAPI.js`](src/BooksAPI.js) contains the needed methods to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.
