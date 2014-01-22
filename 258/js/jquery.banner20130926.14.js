(function($) {

 var banner2013092614eFfect = function(element, options){
   var settings = $.extend({}, $.fn.banner2013092614effect.defaults, options); //초반 셋팅값 가져오기
     var vars = {
            currentSlide: 0,
			oldSlide: 0,
            totalSlides: 0,
			Slideheight: 0,
			Slidewidth: 0,
		    randAnim: 1000,
			titleAnim: '',
            running: false,
            paused: false,
            stop: false
        };

       var slider = $(element);		
	   
		slider.find('.part').each(function() {
         
			vars.totalSlides++;
		});    
		
		//초기셋팅 
	  vars.oldSlide = vars.currentSlide;	
	 
	 vars.Slidewidth = $(".part", slider).width()/settings.wcut;
	 vars.Slideheight = $(".part", slider).height()/settings.hcut;
    
	 $(".titlepart", slider).find("img").css({'float':'left','position': 'relative'}); 
	 $(".part[rel='" + vars.currentSlide + "']", slider).css({'z-index' : '10', 'opacity':1});
     $(".parttitlebody li[rel='" + vars.currentSlide + "']", slider).addClass("select");
	 $(".parttitlebody li[rel='" + vars.currentSlide + "']", slider).find("img").css({'left':'-' + ($(".parttitlebody li[rel='" + vars.currentSlide + "']", slider).find("img").width()/2) + 'px'});
   
	
	 var timer = 0;
	timer = setInterval(function(){ imgeffectRun(slider, settings, false); }, settings.pauseTime);


	var imgeffectRun = function(slider, settings, nudge){
       //Trigger the lastSlide callback
			
	        vars.runing = true;
            if(vars && (vars.currentSlide == vars.totalSlides - 1)){ 
				settings.lastSlide.call(this);
			}
            if((!vars || vars.stop) && !nudge) return false;
			settings.beforeChange.call(this);
			//이전꺼 처리
			vars.currentSlide++;		
			if(vars.currentSlide == vars.totalSlides){ 
				
				vars.currentSlide = 0;
				vars.startSlide =0;
				
				settings.slideshowEnd.call(this);	
			}

			 

            
       if(vars.oldSlide == vars.currentSlide){
		}else{
			
			$(".parttitlebody li[rel='" + vars.oldSlide + "']", slider).removeClass("select");
	        $(".parttitlebody li[rel='" + vars.oldSlide + "']", slider).find("img").animate({'left':'0px'}, settings.animSpeed);
			 
					
			//분활
		   $(".part[rel='" + vars.oldSlide + "']", slider).animate({'z-index':'1', 'opacity':0}, settings.animSpeed);
			var h = 0;
			for(i=0;i<settings.wcut;i++){
				for(j=0;j<settings.hcut;j++){
					$(".partbody").append('<div class="cutSlide" rel="' + h+  '" style="float:left;position: absolute;width:' + vars.Slidewidth + 'px;height:' + vars.Slideheight + 'px;z-index:' + ( vars.randAnim + h ) + ';top:' + (vars.Slideheight * i) + 'px;left:' + (vars.Slidewidth * j) + 'px;background-position:-' + (vars.Slidewidth * j) + 'px -' + (vars.Slideheight * i) + 'px;background-image:url(' + $(".part[rel='" + vars.oldSlide + "']", slider).find("img").attr("src") + ')"></div>');
			    	
					h++;
				}
			}
            
			$(".part[rel='" + vars.currentSlide + "']", slider).css({'z-index':'1'}).animate({'opacity':'1'}, settings.animSpeed, '', function(){ $(this).css({'z-index':'10'}); vars.runing = false; });
		  // $(".cutSlide", slider).animate({'height':'0px'},  settings.animSpeed, '', function(){ $(this).remove(); });
		
			var d =0; //구분자
			var h = 0;
			
			for(i=0;i<settings.wcut;i++){
			   for(j=0;j<settings.hcut;j++){
				   //시간차 공격
					$(".cutSlide[rel='" + h + "']", slider).animate({'opacity':0},  (settings.animSpeed + (h * 80)), '', function(){ $(this).remove(); });
					h++;
			   }
			}
			
			
			
	        $(".parttitlebody li[rel='" + vars.currentSlide + "']", slider).find("img").animate({'left':'-' + ($(".parttitlebody li[rel='" + vars.currentSlide + "']", slider).find("img").width()/2) + 'px'}, settings.animSpeed,'',function(){ $(".parttitlebody li[rel='" + vars.currentSlide + "']", slider).addClass("select"); });
		}
		   
		    
        
	  
		
	vars.oldSlide = vars.currentSlide;			
	}
   
   //오버설정
   //멈춤기능활성화시기위해서 부분 제거

    slider.hover(function(){
		
                vars.paused = true;
                clearInterval(timer);
                timer = '';           
		
            }, function(){
			
                vars.paused = false;
				if(timer == '' && !settings.manualAdvance){
					timer = setInterval(function(){   imgeffectRun(slider,  settings, false);	}, settings.pauseTime);
				}
			
      });

$(".titlepart", slider).click(function(){
		vars.oldSlide = vars.currentSlide;	
		vars.currentSlide = $(this).parent().attr("rel") -1;
		imgeffectRun(slider,  settings, true);

});
$(".Num", slider).click(function(){
		vars.oldSlide = vars.currentSlide;	
		vars.currentSlide = $(this).attr("rel") -1;
		imgeffectRun(slider,  settings, true);

});
$(".parttitlebody", slider).find("a").trigger('focus').focus(function(){
	if(vars.runing == false){
			  clearInterval(timer);
			  timer = '';      	
			  vars.oldSlide = vars.currentSlide;	
			  vars.currentSlide = $(this).parent().parent().attr("rel") -1;
			  imgeffectRun(slider,  settings, true);
	}
	
})
$(".parttitlebody", slider).find("a").trigger('focusout').focusout(function(){
		 if(timer == '' && !settings.manualAdvance){
					timer = setInterval(function(){   imgeffectRun(slider,  settings, false);	}, settings.pauseTime);
		}
	})


   settings.afterLoad.call(this);
	return this;
	 };


  
 $.fn.banner2013092614effect = function(options) {
    //데이터 로딩셋팅
        return this.each(function(key, value){
            var element = $(this);
			
			  banner2013092614eFfect($(element), options);
			  $("a:last").focus();
        });

	};

//Default settings
	$.fn.banner2013092614effect.defaults = {
		animSpeed: 1000, //이벤트 속도
		pauseTime: 4000, //대기시간
	    wcut: 10, //분할수
		hcut: 10, //분할수
		pauseOnHover: true,
		beforeChange: function(){},
		afterChange: function(){},
		slideshowEnd: function(){},
        lastSlide: function(){},
        afterLoad: function(){}
	};
	
	$.fn._reverse = [].reverse;

})(jQuery);

