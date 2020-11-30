//Listen for form submit
document.getElementById('myForm').addEventListener('submit',saveBookmark);

function saveBookmark(e) {

	//Get form value
	var siteName = document.getElementById('siteName').value;
	var siteURL = document.getElementById('siteURL').value;

	if (!validateForm(siteName, siteURL)) {
		return false;
	}

	var bookmark = {
		name: siteName,
		url: siteURL
	}

	if (localStorage.getItem('bookmarks') === null) {
		var bookmarks = [];
		bookmarks.push(bookmark);
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	} else{
		//Get bookmarks from localstorage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		//Add bookmark to array
		bookmarks.push(bookmark);
		//Re-Set to localStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}

	//Clear form
	document.getElementById('myForm').reset();

	// Re-fetch bookmarks
	fetchBookmarks();
	
	//Prevent form from submit
	e.preventDefault();
}

//Delete Bookmark
function deleteBookmark(url) {
	//Get bookmarks from localstorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	// Loop through bookmarks
	for (var i = 0; i < bookmarks.length; i++) {
		if(bookmarks[i].url == url){
			//Remove from array
			bookmarks.splice(i, 1);
		}
	}

	//Re-Set to localStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	// Re-fetch bookmarks
	fetchBookmarks();
	
}

//Fetch bookmarks
function fetchBookmarks() {
	//Get bookmarks from localstorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	//Get output Id
	var bookmarksResults = document.getElementById('bookmarksResults');

	//Build Output
	bookmarksResults.innerHTML = '';
	for (var i = 0; i < bookmarks.length; i++) {
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;

		bookmarksResults.innerHTML += '<div class"well">' +
		'<h3>' +name+
		' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> '+
		' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" target="_blank" href="#">Delete</a> '+
		'</h3>'+
		'</div>';
	}
}


// Validate form
function validateForm(siteName, siteURL) {
	if (!siteName || !siteURL) {
		alert('Please Fill the Form');
		return false;
	}

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\bookmarks(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if (siteURL.match(regex)) {
		alert('Please use a valid URL');
		return false;
	}

	return true;
}