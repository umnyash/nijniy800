$(document).ready(function () {	
//console.log($("#map_event_create").length);	
	if( $("#map_event_create").length > 0 ){
		
		var map_center = [56.326476, 44.003040];

			function init() {
				var myPlacemark,
					myMap = new ymaps.Map('map_event_create', {
						center: map_center,
						zoom: 10
					});			
				var coords_v = $('.js-place-coords').val();
			//	console.log(coords_v)
				var coords_ar = coords_v.split(',');;
			//	console.log(coords_ar)
				if ( coords_v && coords_v !='' ){
					//coords_ar = coords.split(',');
					
					myPlacemark = createPlacemark(coords_ar);
					myMap.geoObjects.add(myPlacemark);
						// Слушаем событие окончания перетаскивания на метке.
						myPlacemark.events.add('dragend', function () {
							getAddress(myPlacemark.geometry.getCoordinates());
						});
					myMap.setCenter(coords_ar);
				}		
				// Слушаем клик на карте.
				myMap.events.add('click', function (e) {
					var coords = e.get('coords');
			
					// Если метка уже создана – просто передвигаем ее.
					if (myPlacemark) {
						myPlacemark.geometry.setCoordinates(coords);
					}
					// Если нет – создаем.
					else {
						myPlacemark = createPlacemark(coords);
						myMap.geoObjects.add(myPlacemark);
						// Слушаем событие окончания перетаскивания на метке.
						myPlacemark.events.add('dragend', function () {
							getAddress(myPlacemark.geometry.getCoordinates());
						});
					}
					getAddress(coords);
				});
			
				// Создание метки.
				function createPlacemark(coords) {
				//	console.log('createPlacemark')
					
					return new ymaps.Placemark(coords, {
						iconCaption: 'поиск...'
					}, {
						preset: 'islands#violetDotIconWithCaption',
						draggable: true
					});
				}
			
				// Определяем адрес по координатам (обратное геокодирование).
				function getAddress(coords) {
					myPlacemark.properties.set('iconCaption', 'поиск...');
					ymaps.geocode(coords).then(function (res) {
						var firstGeoObject = res.geoObjects.get(0);
						var add_str = firstGeoObject.getAddressLine().replace('Россия, ','');
						
						$('.map-input-box input').val(add_str);
						
						$('.map-input-box input.js-place-coords').val(firstGeoObject.geometry.getCoordinates())
			
						myPlacemark.properties
							.set({
								// Формируем строку с данными об объекте.
								iconCaption: [
									// Название населенного пункта или вышестоящее административно-территориальное образование.
									firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
									// Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
									firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
								].filter(Boolean).join(', '),
								// В качестве контента балуна задаем строку с адресом объекта.
								balloonContent: add_str
							});
					});
				}
			}		
				
			ymaps.ready(init);					
			$('#mapsearch').focusout(function(){
				var th_val = $(this).val();
				var request = th_val;
				if ( request != '' && request != ' ' && request != null && request != NaN && request != undefined )
				{
					ymaps.geocode(request).then(function (res) {
						var obj = res.geoObjects.get(0);
					//	console.log(obj.geometry.getCoordinates());
						//map_center = obj.geometry.getCoordinates();
						var marker_place = obj.geometry.getCoordinates();
						
						$('.map-input-box input.js-place-coords').val(marker_place)
						
					})
				}
				
			})	
	}	
    
	if( $("#map_event").length > 0 ){
		var coords = $('.maplabel__content_title').attr('data-coords');
		var coords_ar = coords.split(',');
		
		var place_title = $('.maplabel__content_title span').text() +' '+ $('.maplabel__content_subtitle p').text();
		
		//console.log(coords);
		//console.log(coords_ar)
		//console.log(place_title)
	
		function init_map_event() {
			
			var map_center;
			var marker_place;
			
			if( coords && coords !='' ){
				map_center = coords_ar;
				marker_place = coords_ar;
				
				map_and_marker_event(map_center,marker_place);
			} else {
				
				var request = place_title;
				//console.log(request);
		
				if ( request != '' && request != ' ' && request != null && request != NaN && request != undefined )
				{
					ymaps.geocode(request).then(function (res) {
						var obj = res.geoObjects.get(0);
					//	console.log(obj.geometry.getCoordinates());
						map_center = obj.geometry.getCoordinates();
						marker_place = obj.geometry.getCoordinates();
						
						
						map_and_marker_event(map_center,marker_place);
					})
				}
				
			}
		}	
		function map_and_marker_event(map_center,marker_place){
				map_event = new ymaps.Map('map_event', {
					center: map_center,
					zoom: 12,
					controls: ['geolocationControl', 'zoomControl']
				}
				);
				
				map_event.geoObjects.add(new ymaps.Placemark(marker_place, {
					balloonContent: place_title,
					iconCaption: place_title,
					
				}, {
					preset: 'islands#greenDotIconWithCaption',
					iconColor: '#805846'
				}));
			
		}		
		ymaps.ready(init_map_event);
		
	}

});
