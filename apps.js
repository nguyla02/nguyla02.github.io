$(document).ready(function () {
function showResult(contentHtml) {
$('#content').html(contentHtml);
}
function startSearch(inputText) {
$.ajax({
//url: 'https://ru.wikipedia.org/w/api.php?format=json&action=mobileview&redirects&prop=sections|normalizedtitle&sectionprop=toclevel|line|index&page=%D0%A4%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D1%8F%20(%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5)',
url: 'https://en.wikipedia.org/w/api.php?format=json&action=parse&redirects&prop=text&mobileformat=html&page=' + inputText + '&section=0',
//url: 'http://en.wikipedia.org/w/api.php?format=json&action=query&titles=Main%20Page&prop=revisions&rvprop=content&callback=?',
dataType: 'jsonp'
}).done(function (data) {
console.log(data);
if (data.error) {
switch (data.error.code) {
case 'missingtitle':
$.ajax({
url: 'https://en.wikipedia.org/w/api.php?format=json&action=query&list=search&srnamespace=0&srlimit=10&srsearch=' + inputText,
dataType: 'jsonp'
}).done(function (data) {
console.log(data);
if (data.error) {
}
else {
var $ul = $('<ol></ol>');
for (var i = 0; i < data.query.search.length; i++) {
var item = data.query.search[i];
var $li = $('<li></li>');
$li.append('<h3><a href="#" class="snippet-item">' + item.title +  '</a></h3>');
$li.append(item.snippet);
$ul.append($li);
}
showResult($ul);


}

});
break;
}
}
else {
showResult(data.parse.text['*']);
}
});
}

var searchWikipedia = function(currentTerm){
var url = "http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=";
$.ajax({
url: url + currentTerm,
type: 'GET',
dataType: 'jsonp',
error: function(data){
console.log("We got problems");
console.log(data.status);
},
success: function(data){
console.log("WooHoo!");
//Check the browser console to see the returned data
console.log(data);
//Use jQuery to insert the search term into the appropriate DOM element
//The data we want is the first item in the returned JSON, hence value "0"
$("#searchTerm").html(data[0]);
//The data we want is the second item in the returned JSON, hence value "1"
//Create a var to save the array of search results
var searchResults = data[1];

/*var $ul = $('<ol></ol>');
for (var i = 0; i < data.query.search.length; i++) {
var item = data.query.search[i];
var $li = $('<li></li>');

$li.append('<h3><a href="#" class="snippet-item">' + item.title +  '</a></h3>');
$li.append(item.snippet);
$ul.append($li);*/
//Loop through the array of results
for (var i = 0; i < searchResults.length; i++){
//Use 'replace' and a regular expression to substitue white space with '_' character
var resultTerms = searchResults[i].replace(/\s/g, '_');
var curURL = 'http://en.wikipedia.org/wiki/' + item;
//Use jQuery's append() function to add the searchResults to the DOM
//The argument for the append function will be a string of HTML
$("#resultsTarget").append(
"<p class='wikiResults'>" +
"<a href=" + curURL + ">" +
searchResults[i] +
"</a>" +
"</p>"
);
}
}
});
};
$('#search-button').on('click', function () {
var inputText = $.trim($('#query').val());
startSearch(inputText);
});
$(document).on('click', '.snippet-item', function (event) {
//event.preventDefault();
//var newSearchTerm = $("#query").val();
//searchWikipedia(newSearchTerm);
var text = $(this).text();
startSearch(text);
});
});
