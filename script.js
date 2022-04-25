var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#search-for-city");
var searchHistoryContainerEl = document.querySelector(
  "#search-history-container"
);
var rootUrl = "https://api.openweathermap.org";
var weatherApiKey = "05de828319fc1cf4cf97ed816ea2b0fc";
var searchHistory = JSON.parse(localStorage.getItem("searchHistory"));

var repoContainerEl = document.querySelector("#search-history-container"); // <div> element that we'll write all of the repository data to.

var onSearchHistoryClick = function(event) {
  var indexId = event.target.id;   // to go reach inside the seach history array and grab the exact index.
  var result = searchHistory[indexId];  // result = one item from your search history
  if(result !== null) {
    getForecastData(result.lat, result.lon); //the function needs tp pass what its expecting.
  };
};


var getForecastData = function (lat, lon) {
  var forecastUrl = `${rootUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`;

  fetch(forecastUrl).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
      //build current and five day forecast
    });
  });
};

var buildSearchHistoryItems = function () {
  console.log(searchHistoryContainerEl);
  // build search history buttons. thats it!
  if (searchHistory !== null) {
    for (var i = 0; i < searchHistory.length; i++) {
      var currentSearchHistoryItem = searchHistory[i]; ////////////////
      var buttonEl = document.createElement("button");
      buttonEl.setAttribute("id", i);
      buttonEl.setAttribute("class", "saved-search"); //css class
      buttonEl.innerHTML = currentSearchHistoryItem.city;
      buttonEl.addEventListener("click", onSearchHistoryClick);
      searchHistoryContainerEl.appendChild(buttonEl);
    }
  }
};

var updateSearchHistory = function (searchData) {
  var newSearchHistoryItem = {
    city: searchData.name,
    lat: searchData.lat,
    lon: searchData.lon, // adding more search inputs
  };

  if (searchHistory === null) {
    searchHistory = [];
  }

  searchHistory.push(newSearchHistoryItem); //pushing new city, lat and lon to local storage
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  //build button for search history
};

var getCoordinatesByCityName = function (cityName) {
  // format the github api url
  var limit = 5; // setting limits
  var lat = null;
  var lon = null;
  var geoUrl = `${rootUrl}/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${weatherApiKey}`;

  // make a request to the url
  fetch(geoUrl).then(function (response) {
    response.json().then(function (data) {
      
      console.log(data[0]); //test it in console.log
      lat = data[0].lat;
      lon = data[0].lon;
      getForecastData(lat, lon);
      updateSearchHistory(data[0]);
    });
  }); //-- Now that we've created the function, let's set it up so that when the response data is
}; // 

var formSubmitHandler = function (event) {
  event.preventDefault();
  // get value from input element
  var cityName = nameInputEl.value.trim(); //git the input data from the form and trim all the extra space out of the front and back

  if (cityName) {
    getCoordinatesByCityName(cityName); // If there is in fact a value to cityName, we pass that data to getCoordinatesByCityName() as an argument
    nameInputEl.value = ""; // then we clear out input feild
  } else {
    alert("Please enter a city"); // pop up alert for empty input field
  }
  console.log(event);
};

var displayRepos = function (repos) {
  console.log(repos);

  repoContainerEl.textContent = ""; // be sure to clear out the old content before displaying new content.

  for (var i = 0; i < repos.length; i++) {
    // the for loop, we're taking each repository (repos[i]) and writing some of its data to the page
    // loop over repos name

    var repoName = repos[i].owner.login + "/" + repos[i].name; //repos[i]) and writing some of its data to the page.  (NAME)

    var repoEl = document.createElement("div"); // create a  <div> container for each repo                        (DIV)
    repoEl.classList = "list-item flex-row justify-space-between align-center"; //                       (STYLE)

    var titleEl = document.createElement("span"); // create a span element to hold repository name
    titleEl.textContent = repoName;

    repoEl.appendChild(titleEl); // append to container

    repoContainerEl.appendChild(repoEl); // append container to the dom
  }
};

userFormEl.addEventListener("submit", formSubmitHandler);

var pageLoad = function () {
  buildSearchHistoryItems();
};

pageLoad();
