/*
submitBtn
submitBtn=event.listener('click',submit)
*/
// called when user press submit on form

arrLib = [];

// Constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.updateRead = function (index) {
    let currentReadStatus = this.read;
    this.read = !currentReadStatus;
}

let btnSubmit = document.getElementById('submit');
btnSubmit.addEventListener('click', submit);

function submit(event) {
    //event.preventDefault();
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let read = document.getElementById('read').checked;

    let book = new Book(title, author, pages, read);
    arrLib.push(book);
}

const btnDisplayLib = document.getElementById('display-library');
btnDisplayLib.addEventListener('click', displayLibrary);

function displayLibrary() {
    const results = document.querySelector('#results');
    removeAllChildNodes(results);
    let currentBook;

    // creates div with books in it & create eventlistener for buttons to delete the book
    for (index in arrLib) {
        const newBook = document.createElement('div');
        const deleteBtn = document.createElement('button');
        const readCheckBox=document.createElement('input');
        readCheckBox.type='checkbox';
        newBook.setAttribute("id", `div${index}`);
        currentBook = arrLib[index];

        newBook.textContent = `Title: ${currentBook.title} Author: ${currentBook.author} Ages: ${currentBook.pages} Read: ${currentBook.read}`;
        
        deleteBtn.setAttribute('id', `btn${index}`);
        deleteBtn.setAttribute('value', `${index}`);
        deleteBtn.textContent = `Delete ${index}`;
        newBook.appendChild(deleteBtn);

        readCheckBox.checked=currentBook.read;
        readCheckBox.setAttribute('value',`${index}`);
        
        newBook.appendChild(readCheckBox);
        results.appendChild(newBook);

        readCheckBox.addEventListener('change',readChange)
        deleteBtn.addEventListener('click', deleteBook);
    }
}

function readChange(event){
    let indexToChange=parseInt(this.value);
    arrLib[indexToChange].read=this.checked;
    displayLibrary();
}

function deleteBook() {
    let indexToDelete = parseInt(this.value);
    arrLib.splice(indexToDelete,1);
    console.log(indexToDelete);

    // after deleting update the library
    displayLibrary();
}



function removeAllChildNodes(myNode) {
    while (myNode.firstChild) {
        myNode.removeChild(myNode.lastChild);
    }
}