$(function(){
	setImgWidth();
	function setImgWidth(){
		var w = $(window).width();
		$('.banner').css({width:w+'px'});
		$('.imgList').css({width:parseInt($('.imgList .img').width())*parseInt($('.imgList .img').length)+'px',left:-parseInt($('.imgList .img').width())+'px'});
		$('.img').css({width:w+'px'});
	}
	$(window).resize(function(){
		var w = $(window).width();
		$('.banner').css({width:w+'px'});
		$('.imgList').css({width:parseInt($('.imgList .img').width())*parseInt($('.imgList .img').length)+'px'});
		$('.img').css({width:w+'px'});
	});
	var _index = 1;
	var imgListClone = $('.imgList').clone();
	var _sizey = $('.imgList .img').length;
	var imgListFirstClone = $('.imgList').find('div').first().clone();
	var imgListLastClone  = $('.imgList').find('div').last().clone();
	$('.imgList').prepend(imgListLastClone);
	$('.imgList').append(imgListFirstClone);
	$('.imgList').css({width:parseInt($('.imgList .img').width())*parseInt($('.imgList .img').length)+'px',left:-parseInt($('.imgList .img').width())+'px'});
	
	var _time = setInterval(autoScroll,3000);
	function autoScroll(){
		_index++;
		$('.imgList').stop().animate({left:-_index*parseInt($('.imgList .img').width())+'px'},function(){
			autoSpan(_index);
			if(_index == _sizey+1){
				_index = 1;
				$('.imgList').css({left:-_index*parseInt($('.imgList .img').width())+'px'});
			}
		});
	}

	$('.mleft').click(function(){
		clearInterval(_time);
		_index--;
		$('.imgList').stop().animate({left:-_index*parseInt($('.imgList .img').width())+'px'},function(){
			autoSpan(_index);
			if(_index == 0){
				_index = _sizey;
				$('.imgList').css({left:-_index*parseInt($('.imgList .img').width())+'px'});
			}
		});
		_time = setInterval(autoScroll,3000);
	});

	$('.mright').click(function(){
		clearInterval(_time);
		_index++;
		$('.imgList').stop().animate({left:-_index*parseInt($('.imgList .img').width())+'px'},function(){
			autoSpan(_index);
			if(_index == _sizey+1){
				_index = 1;
				$('.imgList').css({left:-_index*parseInt($('.imgList .img').width())+'px'});
			}
		});
		_time = setInterval(autoScroll,3000);
	});


	createSpan();
	function createSpan(){
		for(var a = 0; a<_sizey; a++){
			$('.spanList').append($('<span></span>'));
			$('.spanList').find('span').eq(a).css({background:'url('+imgListClone.find('.img').eq(a).find('img').attr('src')+') no-repeat',backgroundSize:'100% 100%'});
			$('.opacity').append($('<span></span>'));
		}
		$('.spanList').css({left:'50%',marginLeft:-$('.spanList').width()/2+'px'});
		$('.opacity').css({left:'50%',marginLeft:-$('.opacity').width()/2+'px'});
		$('.spanList').find('span').eq(0).css({borderColor:'yellow'});
		$('.opacity').find('span').eq(0).css({background:'rgba(0,0,0,0)'});
	}

	function autoSpan(index){
		index--;
		if(index < _sizey){
			$('.spanList').find('span').eq(index).css({borderColor:'yellow'}).siblings().css({borderColor:'green'});
			$('.opacity').find('span').eq(index).css({background:'rgba(0,0,0,0)'}).siblings().css({background:'rgba(0,0,0,0.7)'});
		}else{
			$('.spanList').find('span').eq(0).css({borderColor:'yellow'}).siblings().css({borderColor:'green'});
			$('.opacity').find('span').eq(0).css({background:'rgba(0,0,0,0)'}).siblings().css({background:'rgba(0,0,0,0.7)'});
		}
	}

	$('.opacity span').on('click',function(){
		_index = $(this).index()
		_index++;
		clearInterval(_time);
		$('.imgList').stop().animate({left:-_index*parseInt($('.imgList .img').width())+'px'});
		autoSpan(_index);
		_time = setInterval(autoScroll,3000);
	});
});




