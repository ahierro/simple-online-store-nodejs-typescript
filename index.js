class User {
    name;
    last_name;
    pets;
    books;

    constructor(name, last_name, books, pets) {
        this.name = name;
        this.last_name = last_name;
        this.books = books;
        this.pets = pets;
    }

    getFullName() {
        return `${this.name} ${this.last_name}`
    }

    addPet(pet) {
        if (this.pets) {
            this.pets.push(pet)
        } else {
            this.pets = [pet]
        }
    }

    countPets() {
        return this.pets?.length || 0;
    }

    addBook(title, author) {
        if (this.books) {
            this.books.push({title, author})
        } else {
            this.books = [{title, author}]
        }
    }

    getBookTitles() {
        return this.books?.map((book) => book.title);
    }

    print(){
        console.log("---------------");
        console.log("this.getFullName()", this.getFullName());
        console.log("this.countPets()", this.countPets());
        console.log(`this.addPet("loro");`);
        this.addPet("loro");
        console.log("this.countPets()", this.countPets());
        console.log("this.getBookTitles()", this.getBookTitles());
        this.addBook("Sistemas Operativos","Stallings");
        console.log(`this.addBook("Sistemas Operativos","Stallings");`);
        console.log("this.getBookTitles()", this.getBookTitles());
        console.log("---------------");

    }
}

new User("Juan",
    "Perez",
    [
        {title: "The Lord of the rings", author: "Tolkien"},
        {title: "El quijote", author: "Cervantes"}
    ],
    ["gato", "perro"]).print();

 new User("Ana",
    "Gomez").print();

