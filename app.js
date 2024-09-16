const title = document.getElementById('title');
const author = document.getElementById('author');
const pageNumber = document.getElementById('number-of-pages');
const submitBtn = document.querySelector('.btn');

const myLibrary = [
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    numberOfPages: 200,
    read: true
  }
];

function Book(title, author, numberOfPages, read) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.read = read;
}
Book.prototype.info = () => {
  return `${this.title} by ${this.author} has ${this.numberOfPages} pages, not read yet`;
}


function addBookToLibrary() {
  if(!title.value || !author.value || pageNumber.value) {
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
  const tableBody = document.getElementById('table-body');
  tableBody.innerHTML = '';

  data.forEach(item => {
    const tableRow = document.createElement('tr');

    Object.values(item).forEach(value => {
      const tableData = document.createElement('td');
      tableData.textContent = value;

      tableRow.appendChild(tableData);
    })

    tableBody.appendChild(tableRow);
  })


}

function clearInput() {
  title.value = '';
  author.value = '';
  pageNumber.value = '';
  document.querySelectorAll('input[type="radio"]').forEach(radio => radio.checked = false);

}

submitBtn.addEventListener('click', addBookToLibrary);
