/* Lesson 4 */

/* DATA */

// Step 1: Declare a new variable to hold information about yourself
const myself = {};
// Step 2: Inside of the object, add a property named name with a value of your name as a string
myself.name = "Brandon Niles";
// Step 3: Add another property named photo with a value of the image path and name (used in Task 2) as a string
myself.photo = "images/profile.jpg";

// Step 4: Add another property named favoriteFoods with a value of an array of your favorite foods as strings ( hint: [] )
myself.favoriteFoods = ["Sushi", "Pasta", "Chili Dog"];
// Step 5: Add another property named hobbies with a value of an array of your hobbies as strings
myself.hobbies = ["Pickleball", "Video Games", "Board Games"];
// Step 6: Add another property named placesLived with a value of an empty array
myself.placesLived = [];
// Step 7: Inside of the empty array above, add a new object with two properties: place and length and values of an empty string
myself.placesLived.push({ place: "", length: "" });
// Step 8: For each property, add appropriate values as strings
myself.placesLived[0].place = "Rexburg";
myself.placesLived[0].length = "7 years";
// Step 9: Add additional objects with the same properties for each place you've lived
myself.placesLived.push({ place: "Merritt Island", length: "1 years" });
myself.placesLived.push({ place: "Elk River", length: "17 years" });

/* OUTPUT */

// Step 1: Assign the value of the name property (of the object declared above) to the HTML <span> element with an ID of name
const nameElement = document.getElementById('name');
nameElement.textContent = myself.name;
// Step 2: Assign the value of the photo property as the src attribute of the HTML <img> element with an ID of photo
const photoElement = document.getElementById('photo');
photoElement.src = myself.photo;
// Step 3: Assign the value of the name property as the alt attribute of the HTML <img> element with an ID of photo
photoElement.alt = myself.name;
// Step 4: For each favorite food in the favoriteFoods property, create an HTML <li> element and place its value in the <li> element
const favoriteFoodsElement = document.getElementById('favorite-foods');
myself.favoriteFoods.forEach(food => {
  const li = document.createElement('li');
  li.textContent = food;
  favoriteFoodsElement.appendChild(li);
});
// Step 5: Append the <li> elements created above as children of the HTML <ul> element with an ID of favorite-foods
// Step 6: Repeat Step 4 for each hobby in the hobbies property
const hobbiesElement = document.getElementById('hobbies');
myself.hobbies.forEach(hobby => {
  const li = document.createElement('li');
  li.textContent = hobby;
  hobbiesElement.appendChild(li);
});


// Step 7: Repeat Step 5 using the HTML <ul> element with an ID of hobbies

// Step 8: For each object in the <em>placesLived</em> property:
// - Create an HTML <dt> element and put its place property in the <dt> element
// - Create an HTML <dd> element and put its length property in the <dd> element
const placesLivedElement = document.getElementById('places-lived');
myself.placesLived.forEach(place => {
  const dt = document.createElement('dt');
  dt.textContent = place.place;
  placesLivedElement.appendChild(dt);

  const dd = document.createElement('dd');
  dd.textContent = place.length;
  placesLivedElement.appendChild(dd);
});
// Step 9: Append the HTML <dt> and <dd> elements created above to the HTML <dl> element with an ID of places-lived
const placesLivedElement = document.getElementById('places-lived');
myself.placesLived.forEach(place => {
  const dt = document.createElement('dt');
  dt.textContent = place.place;
  placesLivedElement.appendChild(dt);

  const dd = document.createElement('dd');
  dd.textContent = place.length;
  placesLivedElement.appendChild(dd);
});