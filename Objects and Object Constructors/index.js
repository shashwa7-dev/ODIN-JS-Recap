//chapter:https://www.theodinproject.com/lessons/node-path-javascript-objects-and-object-constructors

/*
Exercise
Write a constructor for making “Book” objects. We will revisit this in the next project. Your book objects should have the book’s title, author, the number of pages, and whether or not you have read the book.
*/
function Book({ title, author, pages, alreadyRead, info }) {
  if (!new.target) {
    throw Error("Must use new operator while initializing the instance");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.alreadyRead = alreadyRead;
  this.info = () => info;
}


const harryPotterP1 = new Book({
  title: "Harry Potter",
  author: "JK Rowling",
  pages: 300,
  alreadyRead: false,
  info: "A book about a kid becoming WiZard!",
});

// console.log("created book", harryPotterP1);
// console.log("created book info", harryPotterP1.info());

//Prototype: an object more like a base class obj that we can use to create multiple obj instances that will share all methods and prop defined in that base class obj
console.log(Object.getPrototypeOf(harryPotterP1), Book.prototype);

//note:Only constructor functions and classes have a .prototype property.
//adding prototype of base class
Book.prototype.isAvailable = function () {
  console.log("The Boook is available to issue!");
};
//adding prototype at instance level: this wont work
// harryPotterP1.prototype.showMagic = function () {
//   console.log("Lingadiam LEviosa!");
// };

//but can add speacial props/method to an instance like this
harryPotterP1.showMagic = function () {
  console.log("Lingadiam LEviosa!");
};

harryPotterP1.isAvailable(); //from parent
harryPotterP1.showMagic(); //from local

/** 
 What’s this.valueOf function, and where did it come from if we did not define it ? It comes as a result of Object.getPrototypeOf(Book.prototype) having the value of Object.prototype! This means that Book.prototype is inheriting from Object.prototype.This.valueOf function is defined on Object.prototype just like .isAvailable is defined on Book.prototype.
    
**/
console.log(harryPotterP1.valueOf());

// harryPotterP1.hasOwnProperty('valueOf'); // false
// Object.prototype.hasOwnProperty('valueOf'); // true

//hasOwnProperty: defines the actual owner of a defined prop
console.log(harryPotterP1.hasOwnProperty("isAvailable")); //false
console.log(harryPotterP1.hasOwnProperty("showMagic")); //true
console.log(Book.prototype.hasOwnProperty("isAvailable")); //true
console.log(Book.prototype.hasOwnProperty("valueOf")); //false
console.log(Object.prototype.hasOwnProperty("valueOf")); //true

/*
Recommended method for prototypal inheritance
Now, how do you utilize Prototypal Inheritance? What do you need to do to use it? Just as we use Object.getPrototypeOf() to ‘get’ or view the prototype of an object, we can use Object.setPrototypeOf() to ‘set’ or mutate it. Let’s see how it works by adding a Animal Object Constructor to the Dog example, and making Dog inherit from Animal!
*/

function Animal({ name, species }) {
  this.name = name;
  this.species = species;
}
Animal.prototype.sayName = function () {
  return `Hello, I'm ${this.name}!`;
};

/**
Here’s the key:
	•	this.name and this.species are being set on the object created by new Animal(...) — i.e., the instance itself.
	•	They’re not properties of the prototype (Animal.prototype).
	•	Animal.prototype only gets the method sayName.
 */

function Dog({ name }) {
  this.name = name;
}

const Lab = new Dog({ name: "labrador" });
// console.log("lab accessing sayName proto", Lab.sayName()); cant access sayName proto here as it not inheriting Animal yet

console.log(Object.getPrototypeOf(Animal.prototype)); // returns Object.prototype
console.log(Object.getPrototypeOf(Dog.prototype)); // returns Object.prototype

// Now make `Dog` objects inherit from `Animal`
Object.setPrototypeOf(Dog.prototype, Animal.prototype);
console.log(Object.getPrototypeOf(Dog.prototype)); // returns Animal.prototype

const GrmShprd = new Dog({
  name: "German Shepheard",
});

console.log('lab accessing sayName proto', Lab.sayName())
console.log("GrmShprd accessing sayName proto", GrmShprd.sayName());