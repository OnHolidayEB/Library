

const Library = (() =>{
    let _myLibrary= [];

    const getLibrary = () => {
        return _myLibrary;
    }

    const addToLibrary = () => {
        const newBook = new Book(
            document.getElementById('title').value,
            document.getElementById('author').value,
            document.getElementById('genre').value,
            document.getElementById('read').checked
            );
        _myLibrary.push(newBook);
        DisplayController.createCard(newBook);
        DisplayController.closePopUp();
    }
    const reIndex = () => {
        let books = document.getElementById('.bookCard');
        let i = 0;
        books.forEach(book => {
            book.dataset.index = i;
            i++;
        })
    }

    return{
        getLibrary, addToLibrary, reIndex
    }
})();

class Book {
    constructor(title, author, genre, read) {
        this.title = title
        this.author = author
        this.genre = genre
        this.read = read
    }

    info(){
        return `${this.title} 
        By: ${this.author}
        Genre: ${this.genre}
        Read: ${this.read ? "Already Read" : "Have Not Read"}`;
    }

    
}

const DisplayController = (() =>{

    

    function openPopUp() {
        const bform = document.getElementById('addBookForm'); 
        bform.style.display = 'flex';
        document.getElementById('addPopUp').style.zIndex = "1";
    }
    
    function closePopUp(){
        const bform = document.getElementById('addBookForm');
        bform.style.display ='none';
        bform.style.zIndex = "-1";
        document.getElementById('addPopUp').style.zIndex = "-1";
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
        Library.getLibrary().splice(libIndex, 1);
        this.parentNode.parentNode.remove();
        Library.reIndex();
    }

    function readToggle(){
        let myLibrary = Library.getLibrary();
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
        let myLibrary = Library.getLibrary();

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

    return{
        openPopUp, closePopUp, createCard,
    }

})();

const Listeners = (() => {
    document.getElementById('addBook').addEventListener('click', DisplayController.openPopUp);
    document.getElementById('closePopUp').addEventListener('click', DisplayController.closePopUp);
    document.getElementById('submit').addEventListener('click', Library.addToLibrary);

})();
   








