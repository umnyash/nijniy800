let projectsMap = !1;
ymaps.ready(function() {
	initProjectsMap();
	$(".eco-map-info__close").click(function(e) {
		e.preventDefault();
		projectsMap.geoObjects.each(function(el, i) {
			el.options.set({
				iconImageHref: 'static/img/newYear/map-marker-def.svg',
			})
		});
		$(".eco-map-info").fadeOut(300);
	});
});
let geoArray = [];
function initProjectsMap() {
	projectsMap = new ymaps.Map('eco-map',{
		center: [56.305357, 44.003675],
		zoom: 11,
		controls: [],
	});
	let geolocationControl = new ymaps.control.GeolocationControl({});
	projectsMap.controls.add(geolocationControl);
	let zoomControl = new ymaps.control.ZoomControl({});
	projectsMap.controls.add(zoomControl);
	projectsMap.behaviors.disable("scrollZoom");
	const hintHtml = `<div class='my-hint'>{{ properties.name }}</div>`
	HintLayout = ymaps.templateLayoutFactory.createClass(hintHtml, {
		getShape: function() {
			var el = this.getElement()
			  , result = null;
			if (el) {
				var firstChild = el.firstChild;
				result = new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([[0, 0], [firstChild.offsetWidth, firstChild.offsetHeight]]));
			}
			return result;
		}
	});
	fanzonesMap.forEach(element=>{
		let findCoords = element.сoords;
		geoArray.push({
			type: 'Feature',
			properties: {
				id: element.externalId,
				title: element.title,
				text: element.text,
				timeInterval: element.timeInterval,
				timeIntervalWeekEnd: element.timeIntervalWeekEnd,
			},
			geometry: {
				type: 'Point',
				coordinates: findCoords
			},
			options: {
				hideIconOnBalloonOpen: false,
				iconLayout: 'default#image',
				iconImageHref: 'static/img/newYear/map-marker-def.svg',
				iconImageSize: [30, 42],
				iconImageOffset: [-15, -42],
				hintLayout: HintLayout
			}
		});
		window.myObjects = ymaps.geoQuery({
			type: "FeatureCollection",
			features: geoArray
		}).addToMap(projectsMap);
	}
	);
	projectsMap.geoObjects.events.add('click', function(e) {
		const currMarker = e.get('target');
		const title = currMarker.properties.get('title');
		const text = currMarker.properties.get('text');
		const timeInterval = currMarker.properties.get('timeInterval');
		const timeIntervalWeekEnd = currMarker.properties.get('timeIntervalWeekEnd');

		$(".eco-map-info").fadeOut(0).delay(100).fadeIn(300);
		
		if( title !='' ){
			$(".eco-map-info__area").text(title);
			$(".eco-map-info__area").show();
		} else {
			$(".eco-map-info__area").hide();
		}
		
		if( text !='' ){
			$(".eco-map-info__address").text(text);
			$(".eco-map-info__address").show();
		} else {
			$(".eco-map-info__address").hide();
		}
		
		if( timeInterval !='' ){
			$(".eco-map-info__time").not('.eco-map-info__time_weekend').text(timeInterval);
			$(".eco-map-info__time-box").show();
		} else {
			$(".eco-map-info__time-box").hide();
		}
		
		if( timeIntervalWeekEnd !='' ){
			$(".eco-map-info__time_weekend").text(timeIntervalWeekEnd);
			$(".eco-map-info__time_weekend").show();
		} else {
			$(".eco-map-info__time_weekend").hide();
		}
		
		


		projectsMap.geoObjects.each(function(el, i) {
			el.options.set({
				iconImageHref: 'static/img/newYear/map-marker-def.svg',
			})
		});
		currMarker.options.set({
			iconImageHref: 'static/img/newYear/map-marker.svg',
		});
	});
}
