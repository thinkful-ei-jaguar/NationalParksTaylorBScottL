'use strict';

// put your own value below!
const apiKey = 'ysqb3S6KECrFXhWjmWfxwFkeddjhL1izDgIBGSns'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatSearchParam (params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        return queryItems.join('&')
}

function displayResults (responseJson) {
    console.log(responseJson);
    $('#results-list').empty();
    for (let i = 0; i < responseJson.data.length; i++){
        $('#results-list').append(
            `<li>
            <h3>${responseJson.data[i].fullName}</h3>
            <p>${responseJson.data[i].description}</p>
            <a href="${responseJson.data[i].url}">Website</a>
            </li>`
        )};
     $('#results').removeClass('hidden');       
}

function getNationalParks (query, limit=10) {
const params = {
    stateCode: [query],
    limit, 
    api_key: apiKey,
}
const queryString = formatSearchParam(params);
const url = searchURL + '?' + queryString;

console.log(url); 

fetch(url)
.then(response => {
  if (response.ok) {
    return response.json();
  }
  throw new Error(response.statusText);
})
.then(responseJson => displayResults(responseJson))
.catch(err => {
  $('#js-error-message').text(`Something went wrong: ${err.message}`);
});

}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        const maxResults = $('#js-max-results').val();
        getNationalParks(searchTerm, maxResults);
    });

}

$(watchForm);