$(function(){
	var gameSwiper = new Swiper('.game-field.swiper-container', {
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		spaceBetween: 30,
		grabCursor: false,
		loop: false,
		allowTouchMove:false,
		autoHeight:true,
		// effect: 'fade',
		// fadeEffect: {
		// crossFade: true
		// },
	});

	var test_results = '';

	$('.js-start-game').click(function(){
		gameSwiper.slideNext();
	});

	$('.question-row__label').click(function(){
		$(this).parent().find('input').prop('checked',true);
		$(this).parents('.game__question').find('button').removeClass('disabled')
	});

	$('.grid-question-item__label').click(function(){
		$(this).parent().find('input').prop('checked',true);
		$(this).parents('.game__question').find('button').removeClass('disabled')
	});

	$('.grid-question-item__pic, .question-row__input').click(function(){
		$(this).parent().find('input').prop('checked',true);
		$(this).parents('.game__question').find('button').removeClass('disabled')
	});
	//question-row__input

	$('.js-next-question').click(function(){
		if( !$(this).hasClass('disabled') ){
			var th_answer = $(this).parents('.game__question').find('input:checked').attr('data-voteplus');
			console.log(th_answer);
			test_results += th_answer+',';
			console.log(test_results);

			if( $(this).hasClass('js-goto-result') ){
				test_make_result();
			}
			gameSwiper.slideNext();
		}
	});

	$('.js-restart-game').click(function(){
		test_results = '';
		$('.question-row__input').prop('checked',false)
		$('.js-next-question').addClass('disabled');
		gameSwiper.slideTo(0, 500);
	})



	function test_make_result(){

		test_results = test_results.substring(0,test_results.length - 1);
		var array = test_results.split(',');

		counts = {};

		$.each(array, function(key,value) {
		if (!counts.hasOwnProperty(value)) {
			counts[value] = 1;
		} else {
			counts[value]++;
		}
		});

		var arr_n = []; // Array

		$.each(counts, function(key,value) {
			arr_n.push({name: key, val: value})
		});

		var sorted = arr_n.sort(function(a, b) {
			return b.val - a.val;
		});

		var my_res = sorted[0].name;

		//$('.tal_test_steps').hide();
		$('.game__final').hide();
		$('.game__final[data-result="'+my_res+'"]').show();
	}
})