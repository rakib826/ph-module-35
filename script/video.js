// Fetch, load, and display categories
const loadCategories = () => {
  fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

// Convert seconds into a human-readable format
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

// Remove the 'active' class from all category buttons
const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
};

// Display categories in the HTML
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories");
  categories.forEach((item) => {
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
      <button id="btn-${item.category_id}" onclick="loadVideosByCategory(${item.category_id})" class="btn category-btn">${item.category}</button>
    `;
    categoryContainer.append(buttonContainer);
  });
};

// Load videos based on search text
const loadVideos = (searchText = "") => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};

// Load videos by category ID
const loadVideosByCategory = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.classList.add("active");
      displayVideos(data.category);
    })
    .catch((error) => console.log(error));
};

// Load video details by video ID
const loadDetails = async (videoId) => {
  const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  const res = await fetch(uri);
  const data = await res.json();
  displayDetails(data.video);
};

// Display video details in a modal
const displayDetails = (video) => {
  const detailContainer = document.getElementById("modal-content");
  detailContainer.innerHTML = `
    <img class="rounded-lg" src=${video.thumbnail} />
    <p class="py-4">${video.description}</p>
  `;
  document.getElementById("showModalData").click();
};

// Display videos in the HTML
const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos");
  videoContainer.innerHTML = "";

  if (videos.length === 0) {
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = `
      <div class="min-h-screen flex flex-col gap-5 justify-center items-center">
        <img class="max-h-24" src="./assets/Icon.png" />
        <h1 class="text-2xl font-bold">No Videos Found</h1>
      </div>
    `;
    return;
  } else {
    videoContainer.classList.add("grid");
  }

  videos.forEach((video) => {
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
      <figure class="h-52 relative">
        <img class="h-full w-full object-cover rounded-2xl" src=${video.thumbnail} alt="Video Thumbnail" />
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
          <p><button onclick="loadDetails('${video.video_id}')" class="btn btn-sm btn-error">details</button></p>
        </div>
      </div>
    `;
    videoContainer.append(card);
  });
};

// Add event listener to search input for real-time search
document.getElementById("search-input").addEventListener("keyup", (e) => {
  loadVideos(e.target.value);
});

// Initial load of categories and videos
loadCategories();
loadVideos();