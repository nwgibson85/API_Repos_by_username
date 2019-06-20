'use strict';

const rootUrl = 'https://api.github.com/users/${userName}/repos';

// const apiKey;

function sendGetRequest() {
    let userName = $('#js-userName-search').val();
    console.log(${userName});
    fetch(`https://api.github.com/users/${userName}/repos`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayRepos(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function displayRepos(responseJson) {
   console.log(responseJson);
  $('#results-list').empty();
  $('#results-list').append(
    `<li><h3><a href="${responseJson.html_url}">${responseJson.full_Name}</a></h3>
    <p>${responseJson.name}</p>
    <p>${responseJson.description}</p>
    </li>`);
    $('#results').removeClass('hidden');
}

function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      sendGetRequest();
    });
  }
  
  $(watchForm);