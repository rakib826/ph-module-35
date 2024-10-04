// fetch, load and show categories
// create load Category function
const loadCatagories = () => {
  fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
  .then((res)=> res.json())
  .then(data => displayCatagories(data.categories))
  .catch((error)=>console.log(error));
}

//convert seconds
function convertSeconds(seconds) {
  const SECONDS_IN_A_MINUTE = 60;
  const SECONDS_IN_AN_HOUR = 60 * SECONDS_IN_A_MINUTE;
  const SECONDS_IN_A_DAY = 24 * SECONDS_IN_AN_HOUR;
  const SECONDS_IN_A_YEAR = 365 * SECONDS_IN_A_DAY;

  const years = Math.floor(seconds / SECONDS_IN_A_YEAR);
  seconds %= SECONDS_IN_A_YEAR;

  const days = Math.floor(seconds / SECONDS_IN_A_DAY);
  seconds %= SECONDS_IN_A_DAY;

  const hours = Math.floor(seconds / SECONDS_IN_AN_HOUR);
  seconds %= SECONDS_IN_AN_HOUR;

  const minutes = Math.floor(seconds / SECONDS_IN_A_MINUTE);
  seconds %= SECONDS_IN_A_MINUTE;

  let result = '';
  if (years > 0) result += `${years}y `;
  if (days > 0) result += `${days}d `;
  if (hours > 0) result += `${hours}h `;
  if (minutes > 0) result += `${minutes}m `;
  if (seconds > 0 || result === '') result += `${seconds}s`;

  return result.trim();
}

// create display Category function
const displayCatagories = (categories) => {
  //add data in html
  const categoryContainer = document.getElementById("categories");
  categories.forEach((item) => {
    console.log(item);
    //create button
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
    <button onclick="loadVideosByCategory(${item.category_id})" class="btn">${item.category}</button>
    `
    
    categoryContainer.append(buttonContainer);
  });
};


const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
  .then(res => res.json())
  .then(data => displayVideos(data.videos))
  .catch(error => console.log(error))
}

const loadVideosByCategory = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
  .then(res => res.json())
  .then(data => displayVideos(data.category))
  .catch(error => console.log(error))
}
// {
//   "category_id": "1003",
//   "video_id": "aaae",
//   "thumbnail": "https://i.ibb.co/Yc4p5gD/inside-amy.jpg",
//   "title": "Inside Amy Schumer",
//   "authors": [
//       {
//           "profile_picture": "https://i.ibb.co/YD2mqH7/amy.jpg",
//           "profile_name": "Amy Schumer",
//           "verified": ""
//       }
//   ],
//   "others": {
//       "views": "3.6K",
//       "posted_date": "15147"
//   },
//   "description": "'Inside Amy Schumer' is a comedy show by the popular comedian Amy Schumer, blending sharp satire and unfiltered humor to tackle everyday issues and societal norms. With 3.6K views, the show promises a blend of hilarious sketches, thought-provoking stand-up, and candid interviews. It's a must-watch for fans of bold, edgy comedy."
// }
const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos");
  videoContainer.innerHTML = "";
  if(videos.length === 0) {
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = `
    <div class="min-h-screen flex flex-col gap-5 justify-center items-center">
      <img class="max-h-24" src="./assets/Icon.png" />
      <h1 class="text-2xl font-bold">No Videos Found</h1>
    </div>
    `
    return;
  }else {
    videoContainer.classList.add("grid");
  }
  videos.forEach(video => {
    console.log(video)
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
    <figure class="h-52 relative">
      <img class="h-full w-full object-cover rounded-2xl"
        src=${video.thumbnail}
        alt="Shoes" />
        ${video.others.posted_date === "" ? '' : `<span class="absolute right-2 bottom-2 bg-transparent rounded p-1 text-gray-400 text-xs font-light">${convertSeconds(video.others.posted_date)} ago</span>`}
    </figure>
    <div class="px-0 py-2 flex gap-2">
      <div>
        <img class="w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture} />
      </div>
      <div>
        <h2 class="font-bold">${video.title}</h2>
        <div class="flex items-center gap-2">
          <p class="text-gray-500">${video.authors[0].profile_name}</p>
          ${video.authors[0].verified === true ? '<img class="h-4" src="https://img.icons8.com/?size=48&id=SRJUuaAShjVD&format=png"/>' : ''}
        </div>
        <p></p>
      </div>
    </div>
    `
    videoContainer.append(card);
  });
}


loadCatagories();
loadVideos();