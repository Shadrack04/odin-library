const myLibrary = [];

function Book(title, author, numberOfPages, read) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.read = read;
}
Book.prototype.info = () => {
  return `${this.title} by ${this.author} has ${this.numberOfPages} pages, not read yet`;
}

