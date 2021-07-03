const generateWebPage = (name, imageSkylinkUrl, userID, filePath) => {
  return new File(
    [certificate(name, imageSkylinkUrl, userID, filePath)],
    'index.html',
    {
      type: 'text/html',
    }
  );
};

export default generateWebPage;

const skynetJsUrl = 'https://skynet-js.hns.siasky.net/4.0-beta/index.js';

const certificate = (name, imageSkylinkUrl, userID = '', filePath = '') => {
  // Define date variables
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  // Define sources
  const resources =
    'https://siasky.net/PALEjinbHTTnydodyL370S9koJByTPBIdN5VlANcxfucmA';

  /* eslint-disable */
  return `
<!DOCTYPE html>
<html lang="en" dir="ltr">
	<head>
		<meta charset="utf-8">
		<title>Skynet Certificate</title>
		<meta name="description" content="Certificate">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" href="${resources}/css/reset.css" type="text/css" />
		<link rel="stylesheet" href="${resources}/css/style.css" type="text/css" />
		<script src="${skynetJsUrl}"></script>
	</head>

	<body>
		<div id="myDIV" class="header">
			<h2>My To Do List</h2>
			<input type="text" id="myInput" placeholder="Title...">
			<span onclick="newElement()" class="addBtn">Add</span>
		</div>
		
		<ul id="myUL">
			<li>Hit the gym</li>
			<li class="checked">Pay bills</li>
			<li>Meet George</li>
			<li>Buy eggs</li>
			<li>Read a book</li>
			<li>Organize office</li>
		</ul>
				

		<script>
		var myNodelist = document.getElementsByTagName("LI");
		var i;
		for (i = 0; i < myNodelist.length; i++) {
		var span = document.createElement("SPAN");
		var txt = document.createTextNode("\u00D7");
		span.className = "close";
		span.appendChild(txt);
		myNodelist[i].appendChild(span);
		}

		// Click on a close button to hide the current list item
		var close = document.getElementsByClassName("close");
		var i;
		for (i = 0; i < close.length; i++) {
		close[i].onclick = function() {
			var div = this.parentElement;
			div.style.display = "none";
		}
		}

		// Add a "checked" symbol when clicking on a list item
		var list = document.querySelector('ul');
		list.addEventListener('click', function(ev) {
		if (ev.target.tagName === 'LI') {
			ev.target.classList.toggle('checked');
		}
		}, false);

		// Create a new list item when clicking on the "Add" button
		function newElement() {
		var li = document.createElement("li");
		var inputValue = document.getElementById("myInput").value;
		var t = document.createTextNode(inputValue);
		li.appendChild(t);
		if (inputValue === '') {
			alert("You must write something!");
		} else {
			document.getElementById("myUL").appendChild(li);
		}
		document.getElementById("myInput").value = "";

		var span = document.createElement("SPAN");
		var txt = document.createTextNode("\u00D7");
		span.className = "close";
		span.appendChild(txt);
		li.appendChild(span);

		for (i = 0; i < close.length; i++) {
			close[i].onclick = function() {
			var div = this.parentElement;
			div.style.display = "none";
			}
		}
		}
		// Only run this script if we're past step 3 and have a publicKey
		if ("${userID}"){

			// initialize our client
			const client = new skynet.SkynetClient();

			console.log("userid: ${userID}");
			console.log("filePath: ${filePath}");

			// get SkyDB entry, then...
			client.file.getJSON("${userID}", "${filePath}").then( ({data}) => {

				// call function with our SkyDB color
				setHoverColor(data.color);
				console.log(data.color);
			} );
		}

		</script>


	</body>

</html>
`;
  /* eslint-enable */
};
