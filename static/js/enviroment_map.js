ymaps.ready(init);
    
    function init() {
        var myMap = new ymaps.Map('enviroment_map', {
            center: [56.309806419916086, 43.97442257598092],
            zoom: 12
        });
        
        category_arrays = [category_all];
        for( var a = 0, e = category_arrays.length; a < e; a++ ){
          
        var th_category = category_arrays[a];
          
        if( Object.keys(th_category.objects).length > 0 ){
            for (var i = 0, l = Object.keys(th_category.objects).length; i < l; i++) {
            
                var baloon_content = '<div class="bal_obg">'+
                                    	'<div class="bal_obg_image">'+
                                    	
                                    		`<div class="bal_obg_image_border" style="background-color: ${th_category.objects[i].isRestored ? '#57D395' : th_category.color}"></div>`+
                                    		'<a href="'+th_category.objects[i].link+'"><img src="'+th_category.objects[i].img+'" alt="'+th_category.objects[i].pagetitle+'"/></a>'+
                                    	'</div>'+
                                    	'<div class="bal_obg_text">'+
                                    		'<a href="'+th_category.objects[i].link+'">'+
                                    			'<div class="bal_obg_text_title">'+th_category.objects[i].pagetitle+'</div>'+
                                    		'</a>'+
                                    	'</div>'+
                                    '</div>';
            
            
                var place_coords = th_category.objects[i].coords;
                var place_coords_arr = place_coords.split(',');
                
                var th_coords = [];
                
                myMap.geoObjects.add(new ymaps.Placemark(place_coords_arr, {
                    balloonContent: baloon_content
                }, {
                    preset: 'islands#icon',
                     iconLayout: 'default#image',
                    // Изображение иконки метки.
                    iconImageHref: th_category.objects[i].isRestored ? 'static/img/placemark-icon-green.svg' : 'static/img/placemark-icon-orange.svg',
                    // Размеры метки.
                    iconImageSize: [23, 37],
                }));
           
            
            }  
            
        }
          
      }        
      
    }
