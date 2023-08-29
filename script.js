var map;

var longitude;
var latitude;
var altitude;
var heading;
var speed;

var messageElement;
var timeInfo;

var watchID;


function WatchPosition(){

	if (navigator.geolocation) {

		watchID = navigator.geolocation.watchPosition(

			function(position){

				// 中心の緯度・経度とズームレベルを指定
				map.setView([position.coords.latitude, position.coords.longitude], 16);
				//表示するタイルレイヤのURLとAttributionコントロールを設定
				L.tileLayer(
				// OpenStreetMap を利用
				'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' , {
					attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				}).addTo(map);
				// マーカーを表示
				L.marker([ position.coords.latitude, position.coords.longitude ] ).addTo(map)
				.bindPopup('You are here.')
				.openPopup();

				// テキスト情報の表示
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
			},

			null,

			{
				enableHighAccuracy: true,
				timeout: 3000,
				maximumAge: 600000
			}

		);

	} else {
		window.alert("お使いの環境では Geolocation が使えません");
	}

}

function clearWatchPosition() {
	navigator.geolocation.clearWatch(watchID);
}

window.onload = function() {

	// div要素のID
	map = L.map('map');

	// テキスト要素のID
	longitude = document.getElementById('longitude');
	latitude = document.getElementById('latitude');
	accuracy = document.getElementById('accuracy');
	altitude = document.getElementById('altitude');
	altitudeAccuracy = document.getElementById('altitudeAccuracy');
	heading = document.getElementById('heading');
	speed = document.getElementById('speed');

	WatchPosition();

}


