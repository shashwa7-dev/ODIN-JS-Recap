//book constructor
function Book({ id, title, author, isRead }) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.isRead = isRead;
}

let myLibrary = [
  new Book({
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    isRead: false,
  }),
  new Book({
    id: 2,
    title: "The Alchemist",
    author: "Paulo Coelho",
    isRead: false,
  }),
];

const books_ctr = document.querySelector(".books");
const dialog = document.querySelector("dialog");
const showButton = document.querySelector("#add_book_cta");
const closeButton = document.querySelector("#close_dialog_cta");
const form = document.querySelector("#book_form");

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  dialog.showModal();
});
closeButton.addEventListener("click", () => {
  dialog.close();
});

Book.prototype.toggleRead = function () {
  this.isRead = !this.isRead;
};

function addBookToLibrary(book) {
  const newBook = new Book({
    id: crypto.randomUUID(),
    title: book.title,
    author: book.author,
    isRead: false,
  });
  myLibrary.push(newBook);
  const new_card = renderBookCard(newBook);
  books_ctr.append(new_card);
}

// function removeBook(bookId) {
//   const filtered_books = myLibrary.filter((book) => book.id !== bookId);
//   myLibrary = [...filtered_books];
//   renderLibrary(); //will cause whole re-render
//

//optimized ver
function removeBook(bookId) {
  myLibrary = myLibrary.filter((book) => book.id !== bookId);
  const bookCard = document.querySelector(`[data-id="${bookId}"]`);
  if (bookCard) bookCard.remove(); // just remove this element
}

function renderBookCard(book) {
  const card = document.createElement("div");
  card.className = "book_card";
  card.innerHTML = `<h3>${book.title}</h3><p>${book.author}</p>`;
    card.dataset.id = book.id; //set id so we can isolate each card while performing crud ops and improve overall rendering of list
    
  //remove button
  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.onclick = () => removeBook(book.id);

  //status button
  const toggleBtn = document.createElement("button");
  toggleBtn.textContent = book.isRead ? "Mark as Unread" : "Mark as Read";
  toggleBtn.onclick = () => {
    book.toggleRead(); // prototype function
    toggleBtn.textContent = book.isRead ? "Mark as Unread" : "Mark as Read";
  };

  card.append(removeBtn, toggleBtn);

  return card;
}
function renderLibrary() {
  books_ctr.innerHTML = "";
  myLibrary.forEach((book) => {
    const book_card = renderBookCard(book);
    books_ctr.appendChild(book_card);
  });
}

//handle form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const book = Object.fromEntries(formData);
  addBookToLibrary(book);
  form.reset();
  dialog.close();
});

renderLibrary();
