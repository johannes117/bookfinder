/* Programming for Design group Project 2 */

// Group Members Moudar and Johannes

/* 29th of October 2020 */

var outputList = document.getElementById("list-output");

class bookCover {

     // bookCover class returns the corresponding book cover for the ISBN number using openlibrary 
    constructor(isbn, size = 'S', key = 'isbn') {
        this.isbn = isbn;
        this.size = '-' + size;
        this.key = key + "/";
        this.url_a = '<img src="http://covers.openlibrary.org/b/'
        this.url_b = '.jpg" />'
    }
    //Display Function:
    display() {

        // correct html is returned for the cover
        return this.url_a + this.key + this.isbn + this.size + this.url_b; 
    }

}

class bookDetail {

    // bookdetail class returns the corresponding book details for the ISBN number using openlibrary 
    constructor(isbn, size = 'S', key = 'isbn') {
        this.isbn = isbn;
        this.key = key.toUpperCase() + ":";
        this.bc = new bookCover(isbn, size, key);
        this.url_a = 'https://openlibrary.org/api/books?bibkeys=';
        this.url_b = '&format=json&jscmd=data';
        this.detail = "";
    }

    cover() {

        // Returns display function 
        return this.bc.display();
    }
    
    async getDetail() {

        // Waits for getBookDetail function to return and stores it into this.detail property
        let dets = await getBookDetail(this.url_a, this.key, this.isbn, this.url_b);
        this.detail = dets[this.key + this.isbn];

    }

    getAuthor() {

        // Gets the author from the json object
        return this.detail['authors'][0]['name'];
        
    }


}

async function getBookDetail(url_a, key, isbn, url_b) {

    // Gets the url and puts it into the this.detail property
    let url = url_a + key + isbn + url_b;

    // Try/Catch statement, waits for fetch(url)
    try {
        const resp = await fetch(url);
    /*  Returns a promise that resolves with the result of parsing the text as JSON  */
        const jres = await resp.json();
        console.log(jres);

        return jres    
        
    } catch (err) {
        throw err;
    }

}

// main() function ran when button is pressed
async function main() {
    
    //empty html output
    outputList.innerHTML = ""; 

    // Declare an array to be used as the list of books. 
    var bookarr = []

    // Loop for every element in array isbnlist
    for (let i = 0; i < isbnlist.length; i++) {
        let book = new bookDetail(isbnlist[i], "M");
        await book.getDetail();
        bookarr.push(book);
    }

    // Loop for every item in the array
    for (x of bookarr) {
        //Stores the String returned from getAuthor in author
        author = x.getAuthor();
        //Stores HTML returned from cover() in bookImg
        bookImg = x.cover();
        //Creates a new Row, and adds a new htmlCard to the page
        outputList.innerHTML += '<div class="row mt-4">' +
        formatOutput(bookImg, author) +
        '</div>';
    }

    // formatOutput function which takes bookImg, and author inputs and builds a htmlCard
    function formatOutput(bookImg, author) {
        // HTML for htmlCard
        var htmlCard = `
        <div class="col-lg-6">
          <div class="card" style="">
            <div class="row no-gutters">
              <div class="col-md-4">
                <p> ${bookImg} </p>
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <p class="card-text">Author: ${author}</p>
                </div>
              </div>
            </div>
          </div>
        </div>`
        //returns htmlCard
        return htmlCard;
      }
}
