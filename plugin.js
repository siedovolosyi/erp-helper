function initalizePlugin() {
  document.querySelector('#fill-erp-create-application')
    .addEventListener('click', function() {
      chrome.tabs.executeScript(null, {file: 'fill-application-form.js'});
    });
  document.querySelector('#fill-todo')
    .addEventListener('click', function() {
      chrome.tabs.executeScript(null, {file: 'fill-todo-form.js'});
    });
}

document.addEventListener("DOMContentLoaded", initalizePlugin);