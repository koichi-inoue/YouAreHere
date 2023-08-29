var longitude;
var latitude;
var altitude;
var heading;
var speed;
var geoLocationOptions;
var watchID;

var messageElement;
var timeInfo;

function StampTime(){
	var t = new Date();
	var hh = t.getHours(); if(hh<10){ hh = "0"+hh;}
	var mm = t.getMinutes(); if(mm<10){ mm = "0"+mm;}
	var ss = t.getSeconds(); if(ss<10){ ss = "0"+ss;}
	return hh+ ':' + mm + ':' + ss;
}

function CheckPosition(){

	if (navigator.geolocation) {

		watchID = navigator.geolocation.watchPosition(

			function(position){
				var longitudeText = position.coords.longitude + '';
				var latitudeText = position.coords.latitude + '';
				var altitudeText = position.coords.altitude + '';
				var headingText = position.coords.heading + '';
				var speedText = position.coords.speed + '';

				longitude.innerText = longitudeText.substring(0, 12);
				latitude.innerText = latitudeText.substring(0, 12);
				altitude.innerText = altitudeText.substring(0, 12);
				heading.innerText = headingText.substring(0, 12);
				speed.innerText = speedText.substring(0, 12);

				timeInfo.innerText = '[ ' + StampTime() + ' ]';

				// div要素のid
				var map = L.map('map');

				// 中心の緯度・経度とズームレベルを指定
				map.setView([position.coords.latitude, position.coords.longitude], 20);
			
				//表示するタイルレイヤのURLとAttributionコントロールを設定
				L.tileLayer(
				// OpenStreetMap を利用
				'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' , {
					attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				}).addTo(map);
			
				L.marker([ position.coords.latitude, position.coords.longitude ] ).addTo(map)
				.bindPopup('You are here.')
				.openPopup();
			},

			function(positionError){
				messageElement.innerText = positionError.code + ': ' + positionError.message;
			},

			geoLocationOptions

		);

	} else {
		window.alert("お使いの環境では Geolocation が使えません");
	}

	function clearWatchPosition() {
    	navigator.geolocation.clearWatch(watchID);
	}

}

window.onload = function() {

	// Get Location /////////////
	longitude = document.getElementById('longitude');
	latitude = document.getElementById('latitude');
	accuracy = document.getElementById('accuracy');
	altitude = document.getElementById('altitude');
	altitudeAccuracy = document.getElementById('altitudeAccuracy');
	heading = document.getElementById('heading');
	speed = document.getElementById('speed');

	geoLocationOptions = {
		enableHighAccuracy: true,
		timeout: 3000,
		maximumAge: 600000
	};

	messageElement = document.getElementById('message');
	
	timeInfo = document.getElementById('timeInfo');
	timeInfo.innerText = '[ ' + StampTime() + ' ]';

	CheckPosition();

}


