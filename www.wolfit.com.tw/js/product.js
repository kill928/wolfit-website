$(document).on('click', function(e) {
    var $target = $(e.target);
    if (!$target.closest('.payatransportmore').length) {
        $('.transportdetails').slideUp(500);
		$('.paydetails').slideUp(500);
    }
});
$(function($) {
	$R_P_S=$.ajax({url:"common-getproductpicsize.html",async:false});
    $R_P_S=$R_P_S.responseText;
	
	$('#example1').sliderPro({
		width:600,
		height: $R_P_S,
		buttons: false,
		thumbnailPointer: true,
		thumbnailHeight: 120,
		autoplay: false,
		autoScaleLayers: false,
		loop:false,
		arrows: true,
	});

	$('.gallery a').simpleLightbox({});
});
function show(n){
	$(".prodtran").each(function(){
		if($(this).attr('id')==n){
			$(this).toggle();
		}else{
			$(this).hide();
		}
	});
}
function cnum(n,stocks,isopen,isinfinite){
	var nowv=parseInt($("#qty").val());
	var newv=nowv+n;
	newv=newv?newv:1;

	if(isopen && !isinfinite){
	  if(newv>stocks){
	    showdiag('error','\u5eab\u5b58\u4e0d\u8db3','');
	    $(".spec-choose-number").text(stocks);
	  }else{
	    $("#qty").val(newv);$(".spec-choose-number").text(newv);
	  }
	}else{
	  $("#qty").val(newv);$(".spec-choose-number").text(newv);
	}
}
function cnum_addition(id,n,stocks,isopen,isinfinite){
	var nowv=parseInt($("#addition_qty"+id).val());
	var newv=nowv+n;
	newv=newv?newv:1;

	if(isopen && !isinfinite){
	  newv>stocks?showdiag('error','\u5eab\u5b58\u5df2\u9054\u4e0a\u9650',''):$("#addition_qty"+id).val(newv);
	}else{
	  $("#addition_qty"+id).val(newv);
	}
}
function changestandard(id,stocks,newprice){
    $("#addition_qty"+id).val(1);
    $("#addition_qty"+id).attr("rel",stocks);
    $("#addition_p"+id).attr("rel",stocks);
    $("#addition_s"+id).attr("rel",stocks);
    $(".additioneachprice"+id).text(newprice);
}
function replaceNotNumber(o,stocks,isopen,isinfinite){
	var pattern = /[^0-9]/g;
	if(o.value<1){
	    o.value=1;
	}else{
		if(pattern.test(o.value)){
			o.value = o.value.replace(pattern,1);
		}
	}

    if(isopen && !isinfinite){
		if(parseInt(o.value)>parseInt(stocks)){
			showdiag('error','\u5eab\u5b58\u4e0d\u8db3','');
			o.value=stocks;
		}
    }
}
function showdiag(f,t,m) {
     var shortCutFunction = f;
     var msg =t;
     var title = m;
     toastr.options = {
     "closeButton": false,
	 "debug": false,
	 "positionClass": "toast-top-full-width",
	 "onclick": null,
	 "showDuration": "300",
	 "hideDuration": "1000",
	 "timeOut": "5000",
	 "extendedTimeOut": "1000",
	 "showEasing": "swing",
	 "hideEasing": "linear",
	 "showMethod": "fadeIn",
	 "hideMethod": "fadeOut"
     };
     var $toast = toastr[shortCutFunction](msg, title);
}

function str_replacepr($v){
  $v = $v.replaceAll(/\@101/g,'/');
  $v = $v.replaceAll(/\@102/g,'-');
  $v = $v.replaceAll(/\@103/g,'$');
  $v = $v.replaceAll(/\@104/g,"'");
  $v = $v.replaceAll(/\@105/g,'#');
  $v = $v.replaceAll(/\@106/g,'±');
  $v = $v.replaceAll(/\@107/g,'"');
  $v = $v.replaceAll(/\@108/g,'.');
  $v = $v.replaceAll(/\@109/g,'+');
  $v = $v.replaceAll(/\@110/g,"(");
  $v = $v.replaceAll(/\@111/g,")");
  $v = $v.replaceAll(/\@112/g,"%");
  $v = $v.replaceAll(/\@113/g,"&");
  $v = $v.replaceAll(/\@114/g,"<");
  $v = $v.replaceAll(/\@115/g,">");
  return $v;
}

function getstrnumber($c,$v){
   var str=$c.split('');
   var len=str.length;
   if(len>$v){
       var str="";
       str=$c.substr(0,$v)+"…";
   }
   return str;
}

function gethasselect(o){
	var v=0;
	$(o).each(function(){
		if($(this).hasClass('select')){
			v=1;return false;
		}
	});
	return v;
}

function getnewstandard(o='div'){
   var S=[];
   var arr=$(o+'.select');
   for(var i=0;i<arr.length;i++){
     S.push($(arr[i]).attr('property'));
   }
   return S.join('@102');
}

function getnewstandard2(id,stock,name,nums,First,from){
   var v=0;
   $.post('product-standard'+(name?"c":"")+'.html',
   {
   	 id:id,
	 n:name,
	 num:nums,
	 s:stock,
	 f:from,
	 first:First,
   },
   function(data,status){
     if(status=="success"){
        $('#standard2').html(data);
		$('#standard-field-name').val(getnewstandard());
		$('.product_standard_name,.spec-choose-txt').html(getstrnumber(str_replacepr(getnewstandard()),30));
		$('.spec-choose-number').text(1);
		for(var S=1;S<=nums;S++){
		  $MH=(S>2?$('.standorders'+(S-1)).height()*1+parseInt($('.standorders'+(S-1)).css('top'))*1:0);
		  $('.standorders'+S).css({"position":"absolute","top":(S==1)?0:((S==2)?$('.standorders'+(S-1)).height():$MH)+"px"});
		  v=v+$('.standorders'+S).height();
		  if(S==(nums+1)){
		  $('.standorders'+S+'> .gcontent1').css("margin-top","-30px");
		  }
		}
		$('#standard2').css('height',v+20);

		$('.s_type').on('click',function(){
		   $('.qty').val(1);
		   $('.S'+$(this).attr('data-rel')).removeClass('select');
		   $(this).toggleClass('select');
		   if(parseInt(nums)>1){
			  getnewstandard2(id,stock,getnewstandard(),nums,First,$(this).attr('from'));
		   }else{
			   newrel=getnewstandard();
			   $couponprice=$('#coupon-field-value').val()?$('#coupon-field-value').val():0;
			   $('#standard-field-name').val(newrel);
			   $('.product_standard_name,.spec-choose-txt').html(getstrnumber(str_replacepr(newrel),30));
			   $('.orgion_prod_price').text(toThousands(inital_prices[newrel]));
			   $('.now_prod_price').text(toThousands(prices[newrel]));
			   $('.spec-choose-txt').html(str_replacepr(newrel));
			   $('.spec-choose-number').html(1);
			   if($couponprice){
			   $('.now_prod_coupon_price').text(toThousands(Math.round(prices[newrel]*($couponprice/10))));
			   }
			   if(stock){
				  $('.psun').text(stocks[newrel]?stocks[newrel]:'已售罄');
                  $('.addcart,.gotocart,.addadditionprods').attr('disabled',(parseInt(stocks[newrel])<=0)?true:false);
			   }
		   }
		   changeimg(getnewstandard()?getnewstandard():First);
		});
		if($('.S1:not(.hidden).select').length*1==0){
		   $('.S1:not(.hidden)').first().trigger('click');
		}
     }else{
     	alert('error:NET-ERROR');
     }
   });
}

function getnewstandard3(id,stock,name,nums,First,from){
   var v=0;
   $.post('product-standardt'+(name?"c":"")+'.html',
   {
   	 id:id,
	 n:name,
	 num:nums,
	 s:stock,
	 f:from,
	 first:First,
   },
   function(data,status){
     if(status=="success"){
        $('#standard3').html(data);
        if(!name){
			for(var n=1;n<=nums;n++){
				$('.select_n_'+n).text(str_replacepr($('.S'+n+'.select').attr('rel')));
			}
		}else{
		    $E_TEXT=getnewstandard('li').split('@102');
		    for(var n=1;n<=nums;n++){
				$('.select_n_'+n).text(str_replacepr($E_TEXT[n-1]));
			}
		}
		newrel=getnewstandard('li');
		$('#standard-field-name').val(newrel);
		$('.product_standard_name,.spec-choose-txt').html(getstrnumber(str_replacepr(newrel),30));
		$('.spec-choose-number').text(1);
		$(".defaultstandard").bind("click",function(){
			$(".standardselect ul").slideUp(400);
			var ul = $(this).siblings('ul')
			if(ul.is(":hidden")){
				ul.slideDown('400', function() {
					$(this).find("li").bind("click",function(){
						var selectLi=$(this).text();
						$(this).parent().parent().find('span').text(str_replacepr(selectLi));
						$(".standardselect ul").slideUp(400);

						$('.qty').val(1);
		                $('.S'+$(this).attr('data-rel')).removeClass('select');
		                $(this).toggleClass('select');
			            if(parseInt(nums)>1){
						  	getnewstandard3(id,stock,getnewstandard('li'),nums,First,$(this).attr('from'));
					    }else{
						    newrel=getnewstandard('li');
							$couponprice=$('#coupon-field-value').val()?$('#coupon-field-value').val():0;
						    $('#standard-field-name').val(newrel);
						    $('.orgion_prod_price').text(toThousands(inital_prices[newrel]));
						    $('.now_prod_price').text(toThousands(prices[newrel]));
							$('.spec-choose-txt').html(str_replacepr(newrel));
							$('.spec-choose-number').text(1);
							if($couponprice){
							   $('.now_prod_coupon_price').text(toThousands(Math.round(prices[newrel]*($couponprice/10))));
							}
						    if(stock){
							  $('.psun').text(stocks[newrel]?stocks[newrel]:'已售罄');
			                  $('.addcart,.gotocart,.addadditionprods').attr('disabled',(parseInt(stocks[newrel])<=0)?true:false);
						    }
  						}
	   					changeimg(getnewstandard('li')?getnewstandard('li'):First);
					})
					ul.mouseleave(function() {
						$('.standardselect ul').slideUp(400);
					});
				});
			}else{
				$(this).siblings('ul').slideUp(400)
			}
		})
     }else{
     	alert('error:NET-ERROR');
     }
   });
}