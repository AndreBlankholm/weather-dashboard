
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#search-for-city");

var repoContainerEl = document.querySelector("#repos-container");  // <div> element that we'll write all of the repository data to.



var getUserRepos = function (user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
  
    // make a request to the url
    fetch(apiUrl).then(function (response) {
      response.json().then(function (data) {
        displayRepos(data, user);
        console.log(data);
      });
    });                                                //-- Now that we've created the function, let's set it up so that when the response data is 
  };                                                   //   converted to JSON, it will be sent from getUserRepos() to displayRepos() --)
  
  var formSubmitHandler = function (event) {
    event.preventDefault();
    // get value from input element
    var username = nameInputEl.value.trim();           //git the input data from the form and trim all the extra space out of the front and back
  
    if (username) {             
      getUserRepos(username);                           // If there is in fact a value to username, we pass that data to getUserRepos() as an argument
      nameInputEl.value = "";                           // then we clear out input feild
    } else {
      alert("Please enter a city");                     // pop up alert for empty input field
    }
    console.log(event);
  };


  var displayRepos = function(repos, ) {
    console.log(repos);
    

    repoContainerEl.textContent = "";                     // be sure to clear out the old content before displaying new content.
    


    for (var i = 0; i < repos.length; i++) {              // the for loop, we're taking each repository (repos[i]) and writing some of its data to the page
        // loop over repos name
    
        var repoName = repos[i].owner.login + "/" + repos[i].name;    //repos[i]) and writing some of its data to the page.  (NAME)
    
        var repoEl = document.createElement("div");        // create a  <div> container for each repo                        (DIV)
        repoEl.classList = "list-item flex-row justify-space-between align-center";                 //                       (STYLE)
      
        var titleEl = document.createElement("span");      // create a span element to hold repository name
        titleEl.textContent = repoName;
        
        repoEl.appendChild(titleEl);                       // append to container
      
        repoContainerEl.appendChild(repoEl);              // append container to the dom 
    
      }
  };

  userFormEl.addEventListener("submit", formSubmitHandler);