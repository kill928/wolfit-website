$.fn.maps = function (_0x2091x1) {
	var options = { speed : 300 };
	$.extend (options, _0x2091x1);
	var is_open = 0;
	var is_768 = 0;
	$(".venus-menu").prepend("<li class='showhide' style='display:none'><span class='glyphicon glyphicon-menu-hamburger'></span></li>");
	$(document).ready(function(){howwidth(0);})
	$(window).resize(function (){let ourl=document.URL;let Fdir="manage";let xurl=ourl.indexOf(Fdir);if(xurl==-1){howwidth(1)}});
	window.onorientationchange = function(){window.location.reload();}

    $R_T_P=$.ajax({url:"common-gettopormenu.html",async:false});
    $R_T_P=$R_T_P.responseText;
    $R_T_P=$R_T_P.split('|');
    $T_P=$R_T_P[0];$M_P=$R_T_P[1];$A_P=$R_T_P[5];

	function howwidth(e){
	    if(e){
	         setCookie("P_L_R","",-1);setCookie("F_P_W","",-1);setCookie("P_F_M","",-1);setCookie("F_DOWN","",-1);setCookie("T_H","",-1);
	         if($(window).width()>1280){location.reload();}
	    }
		if(window.innerWidth<830){
		        $('.F_L').css('margin-left','');
			    $('#M_E_N_U').removeClass('menu');
			    $('.smenu').removeClass('smenut');
				if(is_768==0){
				    $(".venus-menu").find("li").each(function(){
					if($(this).children("ul").length>0){
						   $(this).append("<span class='indicator'><i class='fa fa-angle-down'></i></span>");
						};
					});

					$(".venus-menu").find("li,a,span").unbind();
					$(".venus-menu").find("ul").hide(0);
					goto_s();
					is_768=1;
				}
		} else {
		      $(".ipadrota").css('display','none');
		      if(parseInt($M_P)>0){
		            $('#M_E_N_U').removeClass('menu');
		            $(".venus-menu").find("li,a,span").unbind();
                    $(".venus-menu").find("ul").hide(0);
					$(".venus-menu li").bind("mouseover",function(){
						$(this).children("ul").stop(true,true).fadeIn(100);
					}).bind("mouseleave",function(){
						$(this).children("ul").stop(true,true).fadeOut(100);
					});
					G_MENU($T_P,0,e);
		      }else{
			        $('#M_E_N_U').removeClass('smenut');
			        var $w=$n=0;
			        var max_height=$(window).height()-$(".top").outerHeight();
					$(function(){
				        $('.menu > ul > li > ul').each(function(){
				          if($(this).height()>max_height){
					        $(this).height(max_height-100);
					        $(this).css('overflow-y','auto');
					        $(this).addClass('scroll');
					      }
					    });
					    G_MENU($T_P,0,e);
				    })

				    $('.menu > ul > li > ul:not(:has(ul))').addClass('normal-sub');
				    $('.menu > ul > li > ul:not(:has(ul))').parent().css('position','relative');
				    $(".menu > ul > li").hover(function(e){
				        $current_width=$(window).width();
	                    if($current_width>1024){
	                      if($current_width>1280){
	                        $max_nums=$R_T_P[2];
	                      }else{
	                        $max_nums=$R_T_P[3];
	                      }
	                    }else{
	                       $max_nums=$R_T_P[4];
	                    }

				        $items_length=$(this).children("ul").children("li").length;
				        $items_length=(parseInt($items_length)>$max_nums)?$max_nums:$items_length;
				        $items_length_next=$(this).children("ul").children("li").children("ul").length;
				        $('.menu > ul > li > ul > li').css('width',($items_length_next?(100/$items_length):100)+'%');
				        if($(window).width() > 820) {
				            $(this).children("ul").stop(true, false).fadeToggle(150);
				        }
				    });

				    $(".menu > ul > li").click(function(e){
				        if($(window).width() <= 820){
				            $(this).children("ul").fadeToggle(150);
				        }
				    });
			 }
		}
};

function goto_s() {
	    $(".ipadrota").css('display','block');
		$(".venus-menu > li.showhide").show(0);
		$(".venus-menu > li.showhide").bind("click", function(){
			if($(".venus-menu > li").is(":hidden")){
				$(".venus-menu > li").slideDown(300);
				is_open = 1;
			}else{
				$(".venus-menu > li:not(.showhide)").slideUp(300);
				$(".venus-menu > li.showhide").show(0);
				is_open = 0;
			};
		});

		$(".venus-menu").find("ul").removeClass("zoom-out");
		$(".venus-menu li:not(.showhide)").each(function(){
			if($(this).children("ul").length>0){
				$(this).children("a").bind("click",function(){
					if($(this).siblings("ul").css("display")=="none"){
						$(this).siblings("ul").slideDown(300).addClass("slide-left");
						is_open = 1;
					}else{
						$(this).siblings("ul").slideUp(300).removeClass("slide-left");
					};
					return false;
				});
				$(this).children(".indicator").bind("click",function(){
					if($(this).siblings("ul").css("display")=="none"){
						$(this).siblings("ul").slideDown(300).addClass("slide-left");
						is_open = 1;
					}else{
						$(this).siblings("ul").slideUp(300).removeClass("slide-left");
					};
				});
			};
		});
	};
};
function G_MENU(s,c,e,o){
   var $w=$w1=$n=$c=0;
   if(s==0){
     if(c==0){
        $('.smenu').addClass('top_left_menu');
     }else{
        $('.smenu').css('position','relative');
        if(e==1){
          $('.scut-container').addClass('scut-container-T');
        }
      }
   }

   $('.smenu > li').each(function(){
       if(e==1){
         $(this).find('a').removeAttr('style');
       }
       $w1=$w1+$(this).find('a').width();
       $n=$n+1;
   });
   $w1=$w1+80;
   if((e==0&&!getCookie("P_L_R"))||e==1){
	   $w=$('.smenu').width()-$w1;
	   if(o==0){ $w=getCookie("F_P_W"); }
	   if(o=='down'){
		  if(!getCookie("F_DOWN")){
			  $w=$('.smenu').width()-$w1;
			  setCookie("F_DOWN",$('.smenu').width());
		  }else{
	          $w=getCookie("F_DOWN")-$w1;
		  }
	   }

	   $('.firstmenu').css('padding-left',(($w/$n)/2)+'px');
	   $('.firstmenu').css('padding-right',(($w/$n)/2)+'px');

	   $('.smenu > li > ul:not(:has(ul))').find('a').css('padding-left','0px');
	   $('.F_L').css('margin-left',((($w/$n)/2)-20)+'px');

	   if(e==0){
	     setCookie("F_P_W",$w);setCookie("P_L_R",(($w/$n)/2));
         setCookie("P_F_M",((($w/$n)/2)-20));
	   }
   }
}

$(function(){
	var tn=0;
	$(".searchdiv").hover(function(){
		if(!tn){
			tn=1;
			$(this).addClass("searchdiv2");
		}
	},function(){
			$(".searchdiv").removeClass("searchdiv2");
			tn=0;
	});
	$(".searcha").click(function(){
		$(".searchdivxs").slideToggle();
	});
	$("#my-menu").trigger("open");
	$("#my-menu").trigger("close");

	$('.scrollup').click(function(){
		$("html, body").animate({ scrollTop:0},800);
		return false;
	});
	
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$('.scrollup').fadeIn();
		} else {
			$('.scrollup').fadeOut();
		}
	});

	$().maps();
   
    if(typeof YOUTUBE_VIDEO_MARGIN == 'undefined') {YOUTUBE_VIDEO_MARGIN=5;}
    $('iframe').each(function(index,item) {
	   if($(item).attr('src').match(/youtube\.com/)) {
		   var w=$(item).attr('width');
		   var h=$(item).attr('height');
		   var ar = h/w*100;ar=ar.toFixed(2);
		   $(item).css({'position':'absolute','top':'0','left':'0','width':'100%','height':'100%','max-width':w+'px','max-height':h+'px'});
		   $(item).wrap('<div style="max-width:'+w+'px;margin:0 auto;padding:'+YOUTUBE_VIDEO_MARGIN+'px;"/>');
		   $(item).wrap('<div style="position:relative;padding-bottom:'+ar+'%;height:0;overflow:hidden;"/>');
	   }
	   if($(item).attr('src').match(/facebook\.com/)){
		   var w=$(item).attr('pcwidth');var wapw=$(item).attr('wapwidth');
	       var h=$(item).attr('pcheight');var waph=$(item).attr('wapheight');
		   if($(window).width()*1<1000){
		   $(this).css({'width':wapw,'height':waph});
		   }else{
		   $(this).css({'width':w,'height':h});
		   }
	   }
    }); 
});

window.addEventListener("load", function() {
	if((($(document).height()*1)-($(window).height()*1)>100)&&$(window).width()>1280) {
        var scrollTop=0;
        $(window).scroll(function(){			
            if ($(this).scrollTop()>120) {
                $('.smenu').css('position','relative');
                $('.top').addClass('mintop');
                $('.smenu').addClass('col-lg-9');
                if($T_P==1){
                $('.smenu').addClass('mintop_scroll');
                }
				$('.logoie').addClass('col-lg-3');
				$('.scut-container').addClass('topicon');
				if($(this).scrollTop()>90){
				S_P();G_MENU($T_P,1,1,'down');
				}
            } else if($(this).scrollTop()<120) {
                $('.smenu').css('position','');
                if($A_P==0){
                $('.top').removeClass('mintop');
                }
                if($T_P==1){
                $('.smenu').removeClass('col-lg-9');
				$('.logoie').removeClass('col-lg-3');
				}
				$('.scut-container').removeClass('topicon');
				if($A_P==0){
				$('.scut-container').removeClass('scut-container-T');
				}
                S_P();G_MENU($T_P,0,1,$(this).scrollTop());
            }
        });
    }
});

function createDiv()
{
    var btnShow = document.getElementById("btnshow");
    btnShow.disabled=true;

    var shadow = document.createElement("div");
    shadow.setAttribute("id","shadow");
    shadow.style.zIndex="9999";
	shadow.style.height=document.documentElement.scrollHeight+"px";
	$(shadow).css({'width':'100%','position':'fixed','left':'0','top':'0','background':'#000','filter':'Alpha(opacity=10)','-moz-opacity':'0.1','opacity':'0.1'});

    var box=document.createElement("div");
    box.setAttribute("id","box");
    box.style.zIndex="99999999";
    document.body.appendChild(shadow);
    document.body.appendChild(box);
    $(box).append('<img src="images/loading/loading.gif" style="width:32px;">');
    $(box).css({'text-align':'center','position':'fixed','left':'50%','top':'50%'});
}
function hideDiv()
{
    var box=document.getElementById("box");
    var shadow=document.getElementById("shadow");
    var btnShow=document.getElementById("btnShow");
    document.body.removeChild(box);
    document.body.removeChild(shadow);
}
function getprice(pid,nowprice){
   $.post('getprice.html',
   {
   	 p2:pid,
   	 p3:nowprice,
   },
   function(data,status){
     if(status=="success"){
        $('.product3').html(data);
     }else{
     	alert('error:NET-ERROR');
     }
   });
}
function toThousands(num) {
   return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
}
function S_P(){
	$(function(){
		if($(window).width()<768||$(window).width()>1280){
		   $('#indcon,#indcon2').css('padding-top',(getCookie("T_H")?getCookie("T_H"):$(".top").outerHeight())+'px');			
	    }
	});
}
function setCookie(cname,cvalue){
    $.cookie(cname,cvalue,{expires:1});
}
function getCookie(cname){
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name)==0) { return c.substring(name.length,c.length); }
    }
    return "";
}