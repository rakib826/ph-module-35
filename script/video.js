// fetch, load and show categories
// create load Category function
const loadCatagories = () => {
  fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
  .then((res)=> res.json())
  .then(data => displayCatagories(data.categories))
  .catch((error)=>console.log(error));
}
// create display Category function
const displayCatagories = (data) => {
  //add data in html
  console.log(data);
}


loadCatagories(); // call loadCatagories function