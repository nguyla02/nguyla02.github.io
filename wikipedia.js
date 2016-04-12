function save_options() {
var select1 = document.getElementById("language");
var language = select1.children[select1.selectedIndex].value;
localStorage["language"] = language;
var select2 = document.getElementById("protocol");
var protocol = select2.children[select2.selectedIndex].value;
localStorage["protocol"] = protocol;
}
function restore_options() {
var select1 = document.getElementById("language");
for (var i = 0; i < select1.children.length; i++) {
var child1 = select1.children[i];
if (child1.value == localStorage["language"]) {
child1.selected = "true";
break;
}
}
var select2 = document.getElementById("protocol");
for (var i = 0; i < select2.children.length; i++) {
var child2 = select2.children[i];
if (child2.value == localStorage["protocol"]) {
child2.selected = "true";
break;
}
}
}
window.addEventListener('load',function(){
var select1 = document.getElementById("language");
for (var i = 0; i < select1.children.length; i++) {
var child1 = select1.children[i];
if (child1.value == localStorage["language"]) {
child1.selected = "true";
break;
}
}
var select2 = document.getElementById("protocol");
for (var i = 0; i < select2.children.length; i++) {
var child2 = select2.children[i];
if (child2.value == localStorage["protocol"]) {
child2.selected = "true";
break;
}
}
});
function startSearch(event) {document.getElementById("searchform").submit(); }
window.onload = function(){document.querySelector('input[value="Save"]').onclick=save_options;}
