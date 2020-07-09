let myLibrary = [
    {
        "title":"Norse Mythology",
        "author":"Neil Gaiman",
        "numPages":260,
        "read":false
    }
];

function Book(title, author, numPages, read) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

const container = document.querySelector("#container");
const table = document.querySelector('table');

function render(library) {

    while (table.childElementCount > 1) {
        table.removeChild(table.lastChild);
    }

    for (let i = 0; i < library.length; i++) {

        const tr = document.createElement('tr');

        for (let prop in library[i]) {
            const td = document.createElement('td');
            td.innerHTML = library[i][prop];
            if (prop == "read") {
                td.setAttribute("id", `${myLibrary.indexOf(library[i])}`);
                if (library[i].read == true) {
                    td.classList.add('read-status-true');
                }else {
                    td.classList.add('read-status-false');
                }
            }
            tr.appendChild(td);
        }

        const deleteButton = document.createElement('td');
        deleteButton.innerHTML = `<button id="${library[i].title}">remove</button>`;
        tr.appendChild(deleteButton);
        table.appendChild(tr);

    }
    deleteBook();
    toggleRead();
}

function deleteBook() {
    const removeButtons = document.querySelectorAll('#booksList button');
    removeButtons.forEach( button => button.addEventListener('click', (e) => {
        const identifier = e.target.id;
        for (i=0; i< myLibrary.length; i++) {
            if (myLibrary[i].title == identifier) {
                myLibrary.splice(myLibrary.indexOf(myLibrary[i]),1);
            }
        }
        render(myLibrary);
    }));
}

function toggleRead() {
    const getReadField = document.querySelectorAll('table tr');
    getReadField.forEach( field => field.addEventListener('click', (e) =>{
        if(myLibrary[e.target.id].read) {
            myLibrary[e.target.id].read = false;
        }else {
            myLibrary[e.target.id].read = true;
        }
        render(myLibrary);
    }));
}

function clearFields() {
    authorText.value = "";
    titleText.value = "";
    numPagesText.value = "";
    readText.checked = false;
}

const addNewBookButton = document.querySelector("#addBook");
const formDiv = document.querySelector(".form-container");
const showBooks = document.querySelector("#showBooks");
const booksListContainer = document.querySelector('#booksList');
booksListContainer.classList.add('booksListContainer');

const authorText = document.querySelector("#author");
const titleText = document.querySelector("#title");
const numPagesText = document.querySelector("#numPages");
const readText = document.querySelector("#read");
const submitBook = document.querySelector("#submit-book");

addNewBookButton.addEventListener('click', (e) => {
    formDiv.classList.toggle("form-container");
});

submitBook.addEventListener("click", (e) => {

    let author = authorText.value;
    let title = titleText.value;
    let numPages = numPagesText.value;
    let read = readText.checked;

    for (i = 0; i < myLibrary.length; i++) {
        if (title == myLibrary[i].title) {
            alert("Book already exists, try again");
            break;
        }
    }

    const newBook = new Book(title, author, numPages, read);
    addBookToLibrary(newBook);
    render(myLibrary);
    clearFields();
});

showBooks.addEventListener('click', (e) => {

    booksListContainer.classList.toggle('booksListContainer');
    render(myLibrary);

});