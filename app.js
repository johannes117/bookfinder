/* Always write a comment at the top of your file saying what is for
you might even include your name and the date */

// Object orientation

/* writing a class

*/

var outputList = document.getElementById("list-output");

class bookCover {

    /* this class returns the bookcover for an isbn number in correct html using the openlibrary api*/

    constructor(isbn, size = 'S', key = 'isbn') {
        this.isbn = isbn;
        this.size = '-' + size;
        this.key = key + "/";
        /* visit https://openlibrary.org/dev/docs/api/covers */
        this.url_a = '<img src="http://covers.openlibrary.org/b/'
        this.url_b = '.jpg" />'
    }

    size(val = "S") {
        this.size = '-' + val;
    }

    display() {

        // return the correct html for this book cover
        return this.url_a + this.key + this.isbn + this.size + this.url_b;
        
    }

}

class bookDetail {

    /* this class returns the book details for an isbn number in correct html using the openlibrary api*/

    constructor(isbn, size = 'S', key = 'isbn') {
        this.isbn = isbn;
        this.key = key.toUpperCase() + ":";
        this.bc = new bookCover(isbn, size, key);
        /* visit https://openlibrary.org/dev/docs/api/books */
        this.url_a = 'https://openlibrary.org/api/books?bibkeys=';
        this.url_b = '&format=json&jscmd=data';
        /* 'https://openlibrary.org/api/books?bibkeys=ISBN:0201558025&format=json' */
        this.detail = "";
    }

    size(val = "S") {
        this.bc.size(val);
    }

    cover() {
        return this.bc.display();
    }
    
    async getDetail() {

        let dets = await getBookDetail(this.url_a, this.key, this.isbn, this.url_b);
        this.detail = dets[this.key + this.isbn];

    }

    getAuthor() {
        // get the author from the json object
        return this.detail['authors'][0]['name'];
        
    }


}

async function getBookDetail(url_a, key, isbn, url_b) {
    // get the url and put it into the this.detail property
    let url = url_a + key + isbn + url_b;

    try {
        const resp = await fetch(url);
        const jres = await resp.json();
        console.log(jres);

        return jres    
        
    } catch (err) {
        throw err;
    }

}

async function main() {
    outputList.innerHTML = ""; //empty html output
    // this is the list of books we are going to create
    var bookarr = []

    // loop for every element in array isbnlist
    for (let i = 0; i < isbnlist.length; i++) {
        let book = new bookDetail(isbnlist[i], "M");
        await book.getDetail();
        bookarr.push(book);
    }

    // the for (variable of iterable) will loop through each item in an array
    for (x of bookarr) {
        author = x.getAuthor();
        bookImg = x.cover();
        outputList.innerHTML += '<div class="row mt-4">' +
        formatOutput(bookImg, author) +
        '</div>';
    }

    function formatOutput(bookImg, author) {
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
        return htmlCard;
      }
}
