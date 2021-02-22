let myLibrary= [];
let library = document.getElementById('library');



document.getElementById('addBook').addEventListener('click', openPopUp);
document.getElementById('closePopUp').addEventListener('click', closePopUp);
document.getElementById('submit').addEventListener('click', addToLibrary);




function Book(title, author, genre, read) {
    this.title = title
    this.author = author
    this.genre = genre
    this.read = read
}

Book.prototype.info = function (){
    return `${this.title} 
    By: ${this.author}
    Genre: ${this.genre}
    Read: ${this.read ? "Already Read" : "Have Not Read"}
    `
    
};

function getBook(){
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const genre = document.getElementById('genre').value;
    const read = document.getElementById('read').checked;

    return new Book(title, author, genre, read);
}

function addToLibrary(){
    const newBook = getBook();
    myLibrary.push(newBook);
    createCard(newBook);
    closePopUp();
}

function openPopUp(){
    document.getElementById('addBookForm').style.display = 'flex';
}

function closePopUp(){
    document.getElementById('addBookForm').style.display ='none';
    resetForm();
}

function resetForm(){
    document.getElementById('title').value = "";
    document.getElementById('author').value = "";
    document.getElementById('genre').value = "";
    document.getElementById('read').checked = false;
}

function closeCard(){
    const libIndex = parseInt(this.parentNode.parentNode.dataset.index);
    myLibrary.splice(libIndex, 1);
    this.parentNode.parentNode.remove();
    reIndex();
}

function reIndex(){
    let books = document.querySelectorAll('.bookCard');
    let i = 0;
    books.forEach(book => {
        book.dataset.index = i;
        i++;
    })
}

function readToggle(){
    let hasRead = parseInt(this.value);
    const libIndex = parseInt(this.parentNode.parentNode.parentNode.dataset.index);
            

    if(hasRead === 1){
        this.classList.remove('sliderNotRead')
        this.classList.add('sliderRead');
        myLibrary[libIndex].read = true;
        }

    else if(hasRead === 0){

        this.classList.remove('sliderRead');
        this.classList.add('sliderNotRead');
        myLibrary[libIndex].read = false;
        }

}




function createCard(newBook){
    const div = document.createElement('div');
    div.classList.add('bookCard');
    div.id = 'bookCard';
    div.setAttribute('data-index', `${myLibrary.length - 1}`)
    library.appendChild(div);

    //close button
    const closeWrapper = document.createElement('div');
    closeWrapper.id = 'closeWrapper';
    div.appendChild(closeWrapper);
    
    const close = document.createElement('button');
    close.id = 'closeBtn';
    close.addEventListener('click', closeCard);
    close.textContent = 'X';

    //wraps book info
    const textWrapper = document.createElement('div');
    textWrapper.id = 'textWrapper';
    div.appendChild(textWrapper);

    //book info
    const title = document.createElement('h3');
    title.textContent=`${newBook.title}`;
    closeWrapper.appendChild(close);
    
    const author = document.createElement('h4');
    author.textContent = `By: ${newBook.author}`;
    
    const genre = document.createElement('h5');
    genre.textContent = `Genre: ${newBook.genre}`;
   
    const readDiv = document.createElement('div');
    readDiv.id = 'readWrapper';

    //read slider
    const read = document.createElement('input');
    read.id = 'readSlider';
    read.textContent = `Read: `
    read.setAttribute('type','range');
    read.setAttribute('max', 1);
    read.setAttribute('min', 0);
    read.value = newBook.read ? 1 : 0;
    read.classList.add('slider');
    read.classList.add(`${parseInt(read.value) === 1 ? 'sliderRead' : 'sliderNotRead'}`);
    read.addEventListener('input', readToggle)    
    const readLabel = document.createElement('label');
    readLabel.setAttribute('for', 'read');
    readLabel.textContent = `Read: `
    
    
    textWrapper.appendChild(title);
    textWrapper.appendChild(author);
    textWrapper.appendChild(genre);
    textWrapper.appendChild(readDiv);
    readDiv.appendChild(readLabel);
    readDiv.appendChild(read);
}






