let projectsMap = !1;
ymaps.ready(function() {
	initProjectsMap();
	$(".eco-map-info__close").click(function(e) {
		e.preventDefault();
		projectsMap.geoObjects.each(function(el, i) {
			el.options.set({
				iconImageHref: 'static/img/ecostart/map-marker.svg',
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
				area: element.area,
				address: element.address,
				timeInterval: element.timeInterval,
				timeIntervalWeekEnd: element.timeIntervalWeekEnd,
				garbageList: element.garbageList,
			},
			geometry: {
				type: 'Point',
				coordinates: findCoords
			},
			options: {
				hideIconOnBalloonOpen: false,
				iconLayout: 'default#image',
				iconImageHref: 'static/img/ecostart/map-marker.svg',
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
		$('.eco-map-garbage').remove();
		const currMarker = e.get('target');
		const area = currMarker.properties.get('area');
		const address = currMarker.properties.get('address');
		const timeInterval = currMarker.properties.get('timeInterval');
		const timeIntervalWeekEnd = currMarker.properties.get('timeIntervalWeekEnd');

		const garbageList = currMarker.properties.get('garbageList');
		for(item of garbageList){
			if(item == "бумага"){
				$('.eco-map-info__garbage-box').append(`
				<figure class="eco-map-garbage" data-type="paper">
                <div class="eco-map-garbage__img">
                  <svg viewBox="0 0 48 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.05544 21.583C7.86471 21.1139 26.1499 14.7121 35.4413 11.5698L27.052 35.1593L20.7826 27.5367L16.4526 33.5356V25.2364C14.483 24.2141 10.2462 22.0521 9.05544 21.583Z" stroke="#008ACB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M35.2418 11.7395L16.543 25.2814" stroke="#008ACB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M35.2046 11.7957L20.8281 27.5368" stroke="#008ACB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="23.8983" cy="23.3647" r="22.4013" stroke="#008ACB" stroke-width="1.5"/>
                  </svg>
                </div>
                <figcaption class="eco-map-garbage__caption paper">бумага</figcaption>
              </figure>
				`);
			}else if(item == "пластик"){
				$('.eco-map-info__garbage-box').append(`
				<figure class="eco-map-garbage" data-type="plastic">
                <div class="eco-map-garbage__img">
                  <svg viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="23.3476" cy="23.3647" r="22.4013" stroke="#FF4D1C" stroke-width="1.5"/>
                    <path d="M15.8475 16.3241L18.8453 12.699L23.5734 12.6985C26.5753 14.0492 31.0782 16.9278 31.0782 21.1788V35.2443C31.0782 36.3489 30.1828 37.2397 29.0782 37.2397H17.6182C16.5136 37.2397 15.6182 36.3443 15.6182 35.2397V16.9614C15.6182 16.7287 15.6993 16.5034 15.8475 16.3241Z" stroke="#FF4D1C" stroke-width="1.5"/>
                    <path d="M18.9199 9.7959C18.9199 9.24361 19.3676 8.7959 19.9199 8.7959H22.723C23.2753 8.7959 23.723 9.24361 23.723 9.7959V12.6984H18.9199V9.7959Z" stroke="#FF4D1C" stroke-width="1.5"/>
                    <rect x="18.1699" y="27.8462" width="10.3568" height="6.90449" rx="1" stroke="#FF4D1C" stroke-width="1.5"/>
                    <ellipse cx="25.539" cy="18.9651" rx="4.19651" ry="1.55616" transform="rotate(50.9743 25.539 18.9651)" stroke="#FF4D1C" stroke-width="1.5"/>
                  </svg>
                </div>
                <figcaption class="eco-map-garbage__caption plastic">пластик</figcaption>
              </figure>
				`);
			}else if(item == "батарейки"){
				$('.eco-map-info__garbage-box').append(`
				<figure class="eco-map-garbage" data-type="batteries">
                <div class="eco-map-garbage__img">
                <svg viewBox="0 0 48 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="24.1444" cy="23.3647" r="22.4013" stroke="#B43AA3" stroke-width="1.5"/>
                  <path d="M26.264 35.3652L33.624 17.1277" stroke="#B43AA3" stroke-width="1.5"/>
                  <path d="M14.4655 30.7184L21.9727 12.1165" stroke="#B43AA3" stroke-width="1.5"/>
                  <path d="M26.1629 11.541C24.0274 11.0401 22.3605 11.1543 22.0437 11.9391C21.6085 13.0176 23.888 14.9543 27.1351 16.2647C30.3823 17.5751 33.3675 17.7631 33.8027 16.6846C34.1195 15.8998 32.9987 14.6606 31.1137 13.539" stroke="#B43AA3" stroke-width="1.5"/>
                  <path d="M26.2648 35.3654C25.8296 36.4437 22.8439 36.2558 19.5972 34.9455C16.3504 33.6352 14.0736 31.6994 14.5088 30.6211" stroke="#B43AA3" stroke-width="1.5"/>
                  <path d="M27.8528 14.4894C29.3647 15.0996 30.8348 14.9886 31.1363 14.2415C31.4378 13.4944 30.4565 12.3942 28.9446 11.784C27.4327 11.1738 25.9626 11.2848 25.6611 12.0319C25.3596 12.779 26.3409 13.8793 27.8528 14.4894Z" stroke="#B43AA3" stroke-width="1.5"/>
                  <path d="M25.9519 18.6826L24.0907 23.2944L26.9335 24.4416L21.2093 30.4865L23.2411 25.4519L20.3023 24.266L25.9519 18.6826Z" stroke="#B43AA3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                </div>
                <figcaption class="eco-map-garbage__caption batteries">батарейки</figcaption>
              </figure>
				`);
			}else if(item == "стекло"){
				$('.eco-map-info__garbage-box').append(`
				<figure class="eco-map-garbage" data-type="glass">
                <div class="eco-map-garbage__img">
                <svg viewBox="0 0 48 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="23.9433" cy="23.3647" r="22.4013" stroke="#029570" stroke-width="1.5"/>
                  <path d="M18.3301 35.3945H29.5562V21.1035C29.5562 18.0035 27.0431 15.4904 23.9431 15.4904V15.4904V15.4904C20.8431 15.4904 18.3301 18.0035 18.3301 21.1035V35.3945Z" stroke="#029570" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <rect x="22.0615" y="24.3606" width="7.49485" height="7.27939" rx="1" stroke="#029570" stroke-width="1.5"/>
                  <path d="M22.0615 15.4905V8.39055" stroke="#029570" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M25.584 15.4905V8.39055" stroke="#029570" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M21.0654 8.39062L26.6097 8.39063" stroke="#029570" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                </div>
                <figcaption class="eco-map-garbage__caption glass">стекло</figcaption>
              </figure>
				`);
			}else if(item == "техника"){
				$('.eco-map-info__garbage-box').append(`
				<figure class="eco-map-garbage" data-type="tech">
                <div class="eco-map-garbage__img">
                <svg viewBox="0 0 48 47" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path fill-rule="evenodd" clip-rule="evenodd" d="M23.9081 45.1614C35.8658 45.1614 45.5594 35.4678 45.5594 23.5102C45.5594 11.5525 35.8658 1.85889 23.9081 1.85889C11.9504 1.85889 2.25684 11.5525 2.25684 23.5102C2.25684 35.4678 11.9504 45.1614 23.9081 45.1614ZM23.9081 46.6614C36.6942 46.6614 47.0594 36.2963 47.0594 23.5102C47.0594 10.7241 36.6942 0.358887 23.9081 0.358887C11.122 0.358887 0.756836 10.7241 0.756836 23.5102C0.756836 36.2963 11.122 46.6614 23.9081 46.6614Z" fill="#0E5070"/>
				<path fill-rule="evenodd" clip-rule="evenodd" d="M21.7346 9.24658C22.0391 8.96573 22.5136 8.98487 22.7944 9.28934L27.5448 14.4391L31.459 10.0899C31.7361 9.782 32.2103 9.75703 32.5182 10.0341C32.8261 10.3112 32.851 10.7854 32.5739 11.0933L28.1091 16.0544C27.9679 16.2112 27.7672 16.3013 27.5562 16.3026C27.3452 16.3039 27.1434 16.2163 27.0003 16.0612L21.6919 10.3064C21.411 10.0019 21.4302 9.52743 21.7346 9.24658Z" fill="#0E5070"/>
				<path fill-rule="evenodd" clip-rule="evenodd" d="M11.6797 18.2415C11.6797 16.7227 12.9109 15.4915 14.4297 15.4915H33.3872C34.906 15.4915 36.1372 16.7227 36.1372 18.2415V30.9861C36.1372 32.5049 34.906 33.7361 33.3872 33.7361H14.4297C12.9109 33.7361 11.6797 32.5049 11.6797 30.9861V18.2415ZM14.4297 16.9915C13.7393 16.9915 13.1797 17.5511 13.1797 18.2415V30.9861C13.1797 31.6765 13.7393 32.2361 14.4297 32.2361H33.3872C34.0775 32.2361 34.6372 31.6765 34.6372 30.9861V18.2415C34.6372 17.5511 34.0775 16.9915 33.3872 16.9915H14.4297Z" fill="#0E5070"/>
				<path fill-rule="evenodd" clip-rule="evenodd" d="M14.5684 19.429C14.5684 18.7663 15.1056 18.229 15.7684 18.229H28.7173C29.3801 18.229 29.9173 18.7663 29.9173 19.429V29.7985C29.9173 30.4613 29.3801 30.9985 28.7173 30.9985H15.7684C15.1056 30.9985 14.5684 30.4613 14.5684 29.7985V19.429ZM16.0684 19.729V29.4985H28.4173V19.729H16.0684Z" fill="#0E5070"/>
				<path fill-rule="evenodd" clip-rule="evenodd" d="M16.2327 32.602C16.5012 32.9174 16.4632 33.3907 16.1478 33.6592C15.8388 33.9223 15.374 34.3286 14.9847 34.6913C14.7888 34.8738 14.6208 35.0371 14.5032 35.1619C14.4566 35.2114 14.4243 35.2481 14.4037 35.2729C14.2603 35.574 13.927 35.7524 13.5843 35.6862C13.1776 35.6075 12.9117 35.2141 12.9903 34.8074C13.0175 34.6669 13.0773 34.5618 13.1026 34.519C13.1356 34.4633 13.1715 34.4138 13.2019 34.3744C13.2632 34.295 13.3373 34.212 13.4116 34.1331C13.5623 33.9732 13.7579 33.7842 13.9622 33.5938C14.3732 33.2108 14.8561 32.789 15.1755 32.5171C15.4909 32.2486 15.9642 32.2866 16.2327 32.602Z" fill="#0E5070"/>
				<path fill-rule="evenodd" clip-rule="evenodd" d="M31.5612 32.602C31.2927 32.9174 31.3307 33.3907 31.6461 33.6592C31.9551 33.9223 32.4199 34.3286 32.8093 34.6913C33.0052 34.8738 33.1731 35.0371 33.2907 35.1619C33.3374 35.2114 33.3697 35.2481 33.3902 35.2729C33.5337 35.574 33.867 35.7524 34.2096 35.6862C34.6163 35.6075 34.8822 35.2141 34.8036 34.8074C34.7764 34.6669 34.7167 34.5618 34.6913 34.519C34.6584 34.4633 34.6225 34.4138 34.5921 34.3744C34.5307 34.295 34.4566 34.212 34.3823 34.1331C34.2316 33.9732 34.0361 33.7842 33.8318 33.5938C33.4207 33.2108 32.9379 32.789 32.6185 32.5171C32.3031 32.2486 31.8297 32.2866 31.5612 32.602Z" fill="#0E5070"/>
				<path d="M33.479 22.8857C33.479 23.4562 33.0165 23.9187 32.446 23.9187C31.8756 23.9187 31.4131 23.4562 31.4131 22.8857C31.4131 22.3153 31.8756 21.8528 32.446 21.8528C33.0165 21.8528 33.479 22.3153 33.479 22.8857Z" fill="#0E5070"/>
				<circle cx="32.446" cy="19.824" r="1.03295" fill="#0E5070"/>
				</svg>
                </div>
                <figcaption class="eco-map-garbage__caption tech">техника</figcaption>
              </figure>
				`);
			}else if(item == "аккумуляторы"){
				$('.eco-map-info__garbage-box').append(`
				<figure class="eco-map-garbage" data-type="accum">
                <div class="eco-map-garbage__img">
                <svg viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="23.7489" cy="23.4945" r="22.4013" stroke="#FF7697" stroke-width="1.5"/>
				<path d="M17.2148 27.4861H21.6584" stroke="#FF7697" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
				<rect x="9.89648" y="16.4209" width="27.7069" height="3.92086" rx="1" stroke="#FF7697" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
				<rect x="15.0986" y="13.5454" width="3.0753" height="2.87527" rx="1" stroke="#FF7697" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
				<rect x="30.8691" y="13.5454" width="3.0753" height="2.87527" rx="1" stroke="#FF7697" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
				<rect x="21.4785" y="15.5059" width="6.10568" height="0.914756" rx="0.457378" stroke="#FF7697" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M27.9629 27.4861H32.4064" stroke="#FF7697" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M30.1846 25.2644L30.1846 29.7079" stroke="#FF7697" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M11.9023 20.3418H36.1989V33.195C36.1989 33.7473 35.7512 34.195 35.1989 34.195H12.9023C12.3501 34.195 11.9023 33.7473 11.9023 33.195V20.3418Z" stroke="#FF7697" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
                </div>
                <figcaption class="eco-map-garbage__caption accum">Аккумуляторы</figcaption>
              </figure>
				`);
			}
		}

		$(".eco-map-info").fadeOut(0).delay(100).fadeIn(300);
		$(".eco-map-info__area").text(area);
		$(".eco-map-info__address").text(address);
		$(".eco-map-info__time").not('.eco-map-info__time_weekend').text(timeInterval);
		$(".eco-map-info__time_weekend").text(timeIntervalWeekEnd);


		projectsMap.geoObjects.each(function(el, i) {
			el.options.set({
				iconImageHref: 'static/img/ecostart/map-marker.svg',
			})
		});
		currMarker.options.set({
			iconImageHref: 'static/img/ecostart/map-marker-active.svg',
		});
	});
}
