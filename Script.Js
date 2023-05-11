const searchbar =document.querySelector (".searchbar-container");
const profilecontainer =document.querySelector(".profile-container");
const root = document.documentElement.style;
const get = (param) => document.getElementById(`${param}`);
const url =  "https://api.github.com/users/";
const noresults = get("no-results");
const btnmode = get("btn-mode");
const modetext = get("mode-text");
const modeicon = get("mode-icon");
const btnsubmit =get("submit");
const input = get("input");
const avatar = get("avatar");
const userName = get("name");
const user = get("user");
const date = get("date");
const months = ["Jan", "Feb", "March", "April", "May", "Jun", "Aug", "Sept", "Oct", "Nov", "Dec"];
const bio = get("bio");
const repos = get("repos");
const followers = get("followers");
const following = get("following");
const user_location = get("location");
const page = get("page");
const twitter = get("twitter");
const company = get("company");
let darkMode = false;

// //Intializing
// function init() {
//   darkMode = false;
  
//   const value = localStorage.getItem("dark-mode");

//   if(value == null){
//     localStorage.setItem("dark-mode", darkMode);
//     lightModeProperties();
//   }

//   if(value == "true"){
//     darkModeProperties();
//   }else{
//     lightModeProperties();
//   }

//   getUserData(url + "Kapilch15");
// }
// init();

// Event listener
btnsubmit.addEventListener("click", function() {
  console.log("click event Fired");
    if(input.value !== "") {
        getUserData(url + input.value);
    }
});

input.addEventListener("keydown", function (e) {
  if(e.key == "Enter"){
    if(input.value !== ""){
      getUserData(url + input.value);
    }
  }
}, false);

input.addEventListener("input", function() {
  noresults.style.display = "none";
});

btnmode.addEventListener("click", function() {
  console.log("Dark mode fired")
  if(darkMode == false){
    darkModeProperties();
  }else{
    lightModeProperties();
  }
})


// Functions
function getUserData(gitUrl) {
  console.log("Get userData function fired");
    fetch(gitUrl) 
      .then((response) => response.json()) 
      .then((data) => {
        // console.log(data);
        updateProfile(data);
      })
      .catch((error) =>{
        throw error 
      });
}

function updateProfile(data) { 
    if(data.message !== "Not Found"){
      console.log("If condition not fired");
      noresults.style.display = "none";
        function checkNull(param1, param2) {
            if(param1 === "" || param1 === null) {
            param2.style.opacity = 0.5;
            param2.previousElementSibling.style.opacity = 0.5;
            return false;
        } else{
            return true;
        }
       } 

       avatar.src = `${data.avatar_url}`;
       userName.innerText = data.name === null ? data.login : data.name;
       user.innerText = `@${data.login}`;
       user.href = `${data.html_url}`;
       datesegments = data.created_at.split("T").shift().split("-");
       date.innerText = `Joined ${datesegments[2]} ${months[datesegments[1] -1]} ${datesegments[0]}`;
       bio.innerText = data.bio == null ? "This Profile has no bio" : `${data.bio}`;
       repos.innerText = `${data.public_repos}`;
       followers.innerText = `${data.followers}`;
       following.innerText = `${data.following}`;
       user_location.innerText = checkNull(data.locaction, user_location) ? data.locaction : "Not Available";
       page.innerText = checkNull(data.blog, page) ? data.blog : "Not Available"
       page.href = checkNull(data.blog, page) ? data.blog : "#";
       twitter.innerText = checkNull(data.twitter_username, twitter) ? `https://twitter.com/${data.twitter_username}` : "#";
       company.innerText = checkNull(data.company, company) ? data/company : "not Available";
       searchbar.classList.toggle("active");
       profilecontainer.classList.toggle("active");
      }
      else{
        noresults.style.display = "block";
      }
    }


    // //dark mode default
    function init() {
      darkMode = false;

      const value = localStorage.getItem("dark-mode");

      if(value === null){
        console.log("Null value");
        localStorage.setItem("dark-mode", darkMode);
        lightModeProperties();
      }
      else if(value == "true"){
        console.log("true is fired");
        darkModeProperties();
      }else if(value == "false"){
        console.log("false is fired");
        lightModeProperties();
      }

      //by Default, It shows Pranay Gupta in UI
      getUserData(url + "thepranaygupta");    

      }
    // const prefersDarkMode = window.matchMedia && window.matchMedia("prefers-color-scheme: dark").matches;
   init();

    function darkModeProperties() {
      root.setProperty("--lm-bg", "#141D2F");
      root.setProperty("--lm-bg-content", "#1E2A47");
      root.setProperty("lm-text", "white");
      root.setProperty("--lm-text-alt", "white");
      root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
      modetext.innerText = "LIGHT";
      modeicon.src = "./Asset/images/sun-icon.svg";
      root.setProperty("--lm-icon-bg", "brgithness(100%)");
      darkMode = true;
      localStorage.setItem("dark-mode", true);
    }
    function lightModeProperties() {
      root.setProperty("--lm-bg", "#F6F8FF");
      root.setProperty("--lm-bg-content", "#FEFEFE");
      root.setProperty("--lm-text", "#4B6A98");
      root.setProperty("--lm-text-alt", "#2B3442");
      root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
      modetext.innerText = "Dark";
      modeicon.src = "./Asset/images/moon-icon.svg";
      darkMode = false;
      localStorage.setItem("dark-mode", false);
    }
