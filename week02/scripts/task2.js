/* Lesson 2 */

/* VARIABLES */

// Step 1: declare and instantiate a variable to hold your name
let myname = "Brandon Niles";

// Step 2: place the value of the name variable into the HTML file (hint: document.querySelector())
let theNameElement = document.getElementById('name').innerHTML = myname;

// Step 3: declare and instantiate a variable to hold the current year
let curyr = 2023;

// Step 4: place the value of the current year variable into the HTML file
document.querySelector('#year').innerHTML = curyr;

// Step 5: declare and instantiate a variable to hold the name of your picture
let myImage = "images/profile.jpg";

// Step 6: copy your image into the "images" folder
document.querySelector('img').src = myImage;

// Step 7: place the value of the picture variable into the HTML file (hint: document.querySelector().setAttribute())



/* ARRAYS */

// Step 1: declare and instantiate an array variable to hold your favorite foods
const foods = ['Pasta', 'Sushi', 'Cereal'];

// Step 2: place the values of the favorite foods variable into the HTML file
document.querySelector('#food').textContent = foods;

// Step 3: declare and instantiate a variable to hold another favorite food
let food2 ='Pizza'; 

// Step 4: add the variable holding another favorite food to the favorite food array
foods.push(food2);

// Step 5: repeat Step 2
document.querySelector('#food').textContent = foods;

// Step 6: remove the first element in the favorite foods array
foods.shift();

// Step 7: repeat Step 2
document.querySelector('#food').textContent = foods;

// Step 8: remove the last element in the favorite foods array
foods.pop();

// Step 7: repeat Step 2
document.querySelector('#food').textContent = foods;


