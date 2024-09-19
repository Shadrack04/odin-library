const title = document.getElementById('title');
const author = document.getElementById('author');
const pageNumber = document.getElementById('number-of-pages');
const submitBtn = document.querySelector('.btn');
const openModal = document.querySelector('.modal-btn');
const closeModal = document.querySelector('.modal-close-btn');
const modal = document.querySelector('.modal-container');
const modalOverlay = document.querySelector('.modal-container-overlay');

const myLibrary = [
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    numberOfPages: 200,
    read: true
  },
  {
    title: 'Things fall apart',
    author: 'Chinua Achebe',
    numberOfPages: 490,
    read: true
  }
];

function Book(title, author, numberOfPages, read) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.read = read;
}
Book.prototype.info = function info() {
  return `${this.title} by ${this.author} has ${this.numberOfPages} pages, not read yet`;
}


function addBookToLibrary() {
  if(!title.value || !author.value || !pageNumber.value) {
    alert('Please fill in all the fields.');
    return;
  }
  const isRead = document.querySelector('input[type="radio"]:checked')?.value;

  // create a new instance of the Book constructor
  const book = new Book(title.value, author.value, pageNumber.value, isRead === 'false');

  myLibrary.push(book);
  displayBooks(myLibrary);
  clearInput();
}

function displayBooks(data) {
  const tableBody = document.querySelector('#table-body');
  tableBody.innerHTML = '';

  data.forEach((item, index) => {
    const tableRow = document.createElement('tr');

    // create a button to change the read status
    const doneBtn = document.createElement('button');
    doneBtn.classList.add('done-btn');
    doneBtn.innerText = 'Done';

    // create a button to remove book from array
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.innerText = 'Delete';

    // create table data cell for each item property
    Object.values(item).forEach(value => {
      const tableData = document.createElement('td');
      tableData.textContent = value;

      tableRow.appendChild(tableData);
    })
    // append the two buttons doneBtn/deleteBtn
    tableRow.insertCell(4).appendChild(doneBtn);
    tableRow.insertCell(5).appendChild(deleteBtn);

    //append the table row to the table body
    tableBody.appendChild(tableRow);
    checkRead(doneBtn, index);
    deleteBook(deleteBtn, index);
  })

}

function clearInput() {
  title.value = '';
  author.value = '';
  pageNumber.value = '';
  document.querySelectorAll('input[type="radio"]').forEach(radio => radio.checked = false);

}

submitBtn.addEventListener('click', (e)=> {
  addBookToLibrary();
  exitModal();
  e.preventDefault();
})
  
displayBooks(myLibrary);

openModal.addEventListener('click', () => {
  modal.classList.remove('hidden');
  modalOverlay.classList.remove('hidden');
});
closeModal.addEventListener('click', exitModal);

function exitModal() {
  modal.classList.add('hidden');
  modalOverlay.classList.add('hidden');
}

function deleteBook(button, index) {
  button.addEventListener('click', ()=> {
    myLibrary.splice(index, 1);
    displayBooks(myLibrary);
  })
}

function checkRead(button, index) {
  button.addEventListener('click', ()=> {
    if(myLibrary[index].read == false) {
      myLibrary[index].read = true;
      displayBooks(myLibrary);
    } else {
      myLibrary[index].read = false;
      displayBooks(myLibrary);
    }
    
  })
}