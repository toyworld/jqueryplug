(function($) {

 var markbannereFfect = function(element, options){
   var settings = $.extend({}, $.fn.markbannereffect.defaults, options); //초반 셋팅값 가져오기
     var vars = {
            currentSlide: 0,
			oldSlide: 0,
            totalSlides: 0,
		    randAnim: 100,
			settingAnim: 500,
            running: false,
            paused: false,
            stop: false
        };

       var slider = $(element);		
	   
		$('.mainbanner a', slider).each(function() {
         
			vars.totalSlides++;
		});    
		
		//초기셋팅 
	  vars.settingAnim = settings.animSpeed;
	  vars.oldSlide = vars.currentSlide;	
	  $(".mainbanner a").css({'z-index':'21'}).show();
      $(".mainbanner a").eq(vars.currentSlide).css({'z-index' : 40, left : 0 +'px'}).find('.txtbox').css({top: settings.boll + 'px'});
      $(".tmpbox a").eq(vars.currentSlide).addClass("active");
	
   
	
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
  
		//큰베너이동
		$(".mainbanner a").eq(vars.oldSlide).css({'z-index' : 21}).animate({left : - $(".mainbanner a").width() +'px'}, slider.animSpeed,'',function(){ $(this).css({ 'left' : $(".mainbanner a").width() + 'px'});$('.txtbox', slider).css({top : -190 + 'px'}); });
		$(".mainbanner a").eq(vars.currentSlide).css({'z-index' : 40}).animate({left : 0+'px'}, slider.animSpeed,'',function(){ $(this).find('.txtbox').animate({top: settings.boll + 'px'}, {duration : settings.duration, easing: settings.easing}); });
        $(".tmpbox a").eq(vars.oldSlide).removeClass("active");
        $(".tmpbox a").eq(vars.currentSlide).addClass("active");    
       
		   
		    
        
	  
		
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

    $(".lab", slider).hover(function(){	$(this).css({'opacity':'0.7'});	},function(){ $(this).css({'opacity':'1'}) });
    $(".rab", slider).hover(function(){	$(this).css({'opacity':'0.7'});	},function(){ $(this).css({'opacity':'1'}) });
    $(".rab", slider).click(function(){
		
		imgeffectRun(slider, settings, false); 
	});
	$(".lab", slider).click(function(){
		vars.currentSlide = vars.currentSlide -2;
		imgeffectRun(slider, settings, false); 
	});
	$(".tmpbox a", slider).hover(function(){
    	settings.animSpeed = vars.randAnim;
		if(vars.currentSlide !=$(this).attr("rel")){
			vars.currentSlide = $(this).attr("rel") -1;
			imgeffectRun(slider, settings, false); 
		}
    },function(){
    	settings.animSpeed = vars.settingAnim;
    });
    
	$(".tmpbox a", slider).hover(function(){	$(this).find('.num').animate({'opacity':'0.7'}, 300).animate({'opacity':'1'}, 300);	});
   settings.afterLoad.call(this);
	return this;
	 };


  
 $.fn.markbannereffect = function(options) {
    //데이터 로딩셋팅
        return this.each(function(key, value){
            var element = $(this);
			
			  markbannereFfect($(element), options);
			 
        });

	};

//Default settings
	$.fn.markbannereffect.defaults = {
		animSpeed: 1000, //이벤트 속도
		pauseTime: 4000, //대기시간
		boll : 380, //볼이 정지할 위치
		duration : 1000, //떨어지는 효과 시간
		easing : "easeOutBounce",//떨어지는 효과
		pauseOnHover: true,
		beforeChange: function(){},
		afterChange: function(){},
		slideshowEnd: function(){},
        lastSlide: function(){},
        afterLoad: function(){}
	};
	
	$.fn._reverse = [].reverse;

})(jQuery);

