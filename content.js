chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.method === "getSelection")
      sendResponse({data: window.getSelection().toString()});
    else if (request.method === "displayResults")
    	getDataFromJisho(request.data);
    else {
      sendResponse({}); // snub them.
    }
});

function createPopup(k, r, m) {
	var data = [k, r, m];
	var POPUP_ID = 'popup-id-for-chrome-extension';
	var body = document.getElementsByTagName('body')[0];
	var frame = document.getElementById(POPUP_ID);
	if (frame) 
		body.removeChild(frame);
	frame = document.createElement('div');
	frame.id = POPUP_ID;
	frame.style.position = 'fixed'; 
	frame.style.top = 0;
	frame.style.right = 0;
	frame.setAttribute("style", 
		"position: fixed;" +
		"top: 0px;" +
		"right: 0px;" +
		"width: 300px;" +
		"background-color: white;" +
		"border: 1px solid black;" +
		"z-index: 100000" 
	);
	let div;
	for (var i = 0; i < data.length ; i++) {
		div = document.createElement('div');
		div.setAttribute("style", 
			"width: 100%; height:30px; text-align: center; font-size:25px; background-color: #ddd; padding: 2px;"
			+ "border: 3px solid white;"
		);
		div.innerHTML = data[i];
		frame.appendChild(div)
	}
	console.log(frame);
	body.appendChild(frame);
}

function getDataFromJisho(query) {
	var url = 'http://beta.jisho.org/api/v1/search/words?keyword=' + query;
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
	  if (xhr.readyState === 4) {
	  	var json = JSON.parse(xhr.response);
	  	var kanji = json.data[0].japanese[0].word;
	  	var reading = json.data[0].japanese[0].reading;
	  	var meaning = json.data[0].senses[0].english_definitions[0];
	    createPopup(kanji, reading, meaning) //Outputs a DOMString by default
	  }
	}
	xhr.open('GET', url, true);
	xhr.send('');
}