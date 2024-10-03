// fetch, load and show categories
// create load Category function
const loadCatagories = () => {
  fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
  .then((res)=> res.json())
  .then(data => displayCatagories(data.categories))
  .catch((error)=>console.log(error));
}
// create display Category function
const displayCatagories = (categories) => {
  //add data in html
  const categoryContainer = document.getElementById("categories");
  categories.forEach((item) => {
    console.log(item);
    //create button
    const button = document.createElement("button");
    button.classList.add("btn");
    button.innerText = item.category;
    
    categoryContainer.append(button);
  });
};


loadCatagories(); // call loadCatagories function