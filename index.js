'use strict';

let rootUrl;

const apiKey = "a06fce7623cf5eb14abe05e3eb9b2b2168230d6c"

function sendGetRequest() {
    let userName = $('#js-userName-search').val();
    console.log(userName);
    rootUrl = `https://cors-anywhere.herokuapp.com/https://api.github.com/users/${userName}/repos`
    
    const options = {
        headers: new Headers({
          "X-Api-Key": apiKey})
    };
    
    fetch(rootUrl, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => responseJson.forEach(repo => displayRepos(repo)))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}, Please try another username.`);
    });
}

function displayRepos(responseJson) {
   console.log(responseJson);
  
  $('#results-list').append(
    `<li><h3><a href="${responseJson.html_url}">Link:${responseJson.full_name}</a></h3>
    <p>Repo name: ${responseJson.name}</p>
    <p>description: ${responseJson.description}</p>
    </li>`);
    $('#results').removeClass('hidden');
    $('#clear').removeClass('hidden');
}

function clearResults() {
    $('#results-list').empty();
}

function watchForm() {
    $('#js-form').submit(event => {
      event.preventDefault();
      clearResults();
      sendGetRequest();
    });
  }
  
  $(watchForm);