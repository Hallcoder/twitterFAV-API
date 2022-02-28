let getTweetsfunc = document.getElementById("getTweets");
let getUsersfunc = document.getElementById("getUsers");
let getTweetDetailsfunc = document.getElementById("getTweetDetails");
let getInfofunc = document.getElementById("getInfo");
let getLinksfunc = document.getElementById("getLinks");
let idForm = document.getElementById("idFormInput");
let screenName = document.getElementById("nameInput");
let getUserfunc = document.getElementById("getUsers");

getTweetsfunc.addEventListener("click", getTweets);
function getTweets(e) {
  fetch("https://tweet-favorites.herokuapp.com/tweets")
    .then((res) => res.json())
    .then((data) => {
      let response = document.getElementById("responses2");
      let result = `<h2>Tweets</h2>`;
      data.forEach((tweet) => {
        result += `
            <ul>
            <li>Created at:${tweet.CreateTime}</li>
            <li>ID:${tweet.id}</li>
            <li>Text:${tweet.text}</li>
            </ul>
            `;
      });
      response.innerHTML = result;
    });
  e.preventDefault();
}

getUsersfunc.addEventListener("click", getUsers);
function getUsers(e) {
  fetch("https://tweet-favorites.herokuapp.com/users")
    .then((res) => res.json())
    .then((data) => {
      let response = document.getElementById("responses2");
      let result = `<h2>Users</h2>`;
      data.forEach((tweet) => {
        result += `
            <ul>
            <li>User:${tweet.description}</li>
            </ul>
            `;
      });
      response.innerHTML = result;
    });
  e.preventDefault();
}
getTweetDetailsfunc.addEventListener("click", getTweetDetails);
function getTweetDetails(e) {
  let err = new Error();
  let formInput = document.getElementById("IdFormInput");
  let realinput = formInput.value;
  let URL = "https://tweet-favorites.herokuapp.com/tweet/" + realinput;
  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      let response = document.getElementById("responsesDiv");
      let result = `<h2>Tweet Details</h2>
        <table class='table .table-bordered'>
        <tr>
        <th>Property</th>
        <th>Value</th>
        </tr>
        </table>`;
      for (property in data) {
        result += `
       <table class='table .table-bordered'>
       <tr><td>${property}</td>
     <td> ${data[property]}</td></tr>
       </table>
       
       `;
      }
      response.innerHTML = result;
    });
  e.preventDefault();
}
getInfofunc.addEventListener("click", getInfo);
function getInfo(e) {
  let nameInputted = screenName.value;
  fetch("https://tweet-favorites.herokuapp.com/tweet/:screen_name")
    .then((res) => res.json())
    .then((data) => {
      let response = document.getElementById("responsesDiv");
      let result = `<h2 style='text-align:center;'>User Details</h2>
      <table>
      <tr><th>Property</th>
      <th>Value</th></tr> </table>`;
      data.forEach((tweet) => {
        if (tweet.user.screen_name == nameInputted) {
          for (detail in tweet.user) {
            result += `
                         <table class='table .table-bordered'>
                           
                        <tr>
                        <td>${detail}</td>
                        <td>${tweet.user[detail]}</td>
                          </tr>
                         </table>
                          `;
          }
        }
      });
      response.innerHTML = result;
    });
  e.preventDefault();
}

getLinksfunc.addEventListener("click", getLinks);
function getLinks(e) {
  fetch("https://tweet-favorites.herokuapp.com/links")
    .then((res) => res.json())
    .then((data) => {
      let response = document.getElementById("responses2");
      let result = `<h2>Links in the Tweets</h2>
      <ol>  </ol>`;
      data.forEach((tweet) => {
        for (prop in tweet) {
          if (
            JSON.stringify(tweet[prop]).search(
              /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/i
            ) > 0
          ) {
            result += `
                   <li>
                       link: ${JSON.stringify(tweet[prop])}
                         <br></li> `;
          }
        }
      });
      response.innerHTML = result;
    });
  e.preventDefault();
}

getUserfunc.addEventListener("click", getUser);
function getUser(e) {
  fetch("properties.json")
    .then((res) => res.json())
    .then((data) => {
      let response = document.getElementById("responses2");
      let result = `<h2>Users</h2>`;
      data.forEach((tweet) => {
        result += `
            <ul>
            <li>User:${tweet.user.description}</li>
            </ul>
            `;
      });
      response.innerHTML = result;
    });
  e.preventDefault();
}
 //let postTweet = document.getElementById("postTweet").addEventListener('submit')
// getTweetsfunc.addEventListener("click", getTweets);
// function getTweets(e) {
//   fetch("https://tweet-favorites.herokuapp.com/tweets")
//     .then((res) => res.json())
//     .then((data) => {
//       let response = document.getElementById("responses2");
//       let result = `<h2>Tweets</h2>`;
//       data.forEach((tweet) => {
//         result += `
//             <ul>
//             <li>Created at:${tweet.CreateTime}</li>
//             <li>ID:${tweet.id}</li>
//             <li>Text:${tweet.text}</li>
//             </ul>
//             `;
//       });
//       response.innerHTML = result;
//     });
//   e.preventDefault();
// }
let postTweet = document.getElementById("post").addEventListener('click',getpostText)

function getpostText(e){
  e.preventDefault();
let text = document.getElementById("textPost").value;

  fetch("https://tweet-favorites.herokuapp.com/tweet/post",{
    method:"POST",
    mode:"no-cors",
    headers:{
      "Accept":"application/json",
      "Content-type":"application/json"
    },
    body:JSON.stringify({text:text}),
  })
  .then(res =>res)
  .then(data => console.log(data.tweet));
}