/*jshint esversion: 6 */

// EVENT: DISPLAY BOOKMARKS
// document.addEventListener('DOMContentLoaded', fetchBookmarks());

// CREATE A LISTENER TO LISTEN TO FORM SUBMIT
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
  e.preventDefault();

  // Get form values
  let siteName = document.getElementById('siteName').value;
  let siteUrl = document.getElementById('siteUrl').value;

  if(!validateForm(siteName, siteUrl)) {
    return false;
  }

  let bookmark = {
    name: siteName,
    url: siteUrl
  };

  // Local Storage only stores strings.
  // localStorage.setItem('test', 'Hello world');
  // console.log(localStorage.getItem('test'));
  // localStorage.removeItem('test');
  // console.log(localStorage.getItem('test'));

  if(localStorage.getItem('bookmarks') === null) {
    let bookmarks = [];
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  // Clear FORM
  document.getElementById('myForm').reset();

  fetchBookmarks();
}

// Fetch bookmarks
function fetchBookmarks() {
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  //Get output Id
  let bookmarksResults = document.getElementById('bookmarksResults');

  // Build output
  bookmarksResults.innerHTML = '';

  // for(var i = 0; i < bookmarks.length; i++) {
  //   let name  = bookmarks[i].name;
  //   let url = bookmarks[i].url;
  // }
  bookmarks.forEach((bookmark) => {
    let name = bookmark.name;
    let url = bookmark.url;

    bookmarksResults.innerHTML += '<div class="well">' +
                                  '<h3>' + name +
                                  ' <a class="btn btn-default" target="_blank" href="'+ url +'">Visit</a> ' +
                                  ' <a onclick="deleteBookmark(\''+ url + '\')" class="btn btn-danger" href="#">Delete</a> ' +
                                  '</h3>' +
                                  '</div>';
  });

  console.log(bookmarks);
}

// Delete Bookmarks
function deleteBookmark(url) {
  // console.log(url);
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  // loop through bookmarks
  for(var i = 0; i < bookmarks.length; i++) {
    if(bookmarks[i].url == url) {
      bookmarks.splice(i, 1);
    }
  }
  // bookmarks.forEach((bookmark) => {
  //   if(bookmark.url == url) {
  //     // Remove from array
  //     bookmarks.splice(1);
  //   }
  // });

  // Re-set back to local storage.
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  fetchBookmarks();
}

function validateForm(siteName, siteUrl) {
  if(!siteName || !siteUrl) {
    alert('Please fill in the form');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteUrl.match(regex)) {
    alert('Please use a valid URL');
    return false;
  }

  return true;
}
