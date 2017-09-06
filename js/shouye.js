/*公共部分*/
$("#header_wrap").load("http://127.0.0.1/meilihui/public.html .header",function(){
	$("#ph").hover(function(){
		$(this).next().show()
	},function(){
		$(this).next().hide()
	})
	var uname=getCookie("username");
	if(!(uname=="")){
		$(".zhuce-a").html(uname);
		$(".denglu-a").html("退出");
	};
	$(".denglu-a").click(function(){
		location.href="http://127.0.0.1/meilihui/login.html";
	})
});
$("#nav_wrap").load("http://127.0.0.1/meilihui/public.html .nav",function(){
	/*$(".nav_left").on("click","li",function(){
		$(this).addClass("nav-on").siblings().removeClass("nav-on");
	})*/
	$(".nav_left").on("mousemove","li",function(){
		$(this).find($(".nav-mo")).show()
	})
	$(".nav_left").on("mouseout","li",function(){
		$(this).find($(".nav-mo")).hide()
	})
	$(".nav_right").hover(function(){
		$(".nav-car").show();
	},function(){
		$(".nav-car").hide();
	})
	$(window).scroll(function(){
		var sTop=$(document).scrollTop();
		if(sTop<120){
			$(".nav").css("position","");
		}else{
			$(".nav").css({"position":"fixed","top":0,"z-index":999});
		}
	})
});
$("#returnTop_wrap").load("http://127.0.0.1/meilihui/public.html .returnTop",function(){
	$(window).scroll(function(){
		var sTop=$(document).scrollTop();
		$(".returnTop").css("top",sTop+400)
		if(sTop>200){
			$(".clickOn").show();
		}else{
			$(".clickOn").hide();
		}
		$(".clickOn").click(function(){
			$("body,html").stop().animate({"scrollTop":0},1000)
		})
	})
});
$("#huodong_wrap").load("http://127.0.0.1/meilihui/public.html .huodong",function(){
	$(".huo-dd").hover(function(){
		$(this).find($(".huo-dd-zhe")).show();
		$(this).find($(".huo-dd-zi")).show();
	},function(){
		$(this).find($(".huo-dd-zhe")).hide();
		$(this).find($(".huo-dd-zi")).hide();
	})
	$(".huo-u").on("click","li",function(){
		$(this).addClass("huo-on").siblings().removeClass("huo-on");
		$(".huo-d").eq($(this).index()).show().siblings().hide();
	})
});
$("#footer_wrap").load("http://127.0.0.1/meilihui/public.html .footer_advantage");
//图片公共特效
$(".img-t").hover(function(){
	$(this).find($(".img-zhe")).show();
	$(this).find($(".img-zi")).show();
	$(this).find($(".img-m")).stop().animate({"left":-10,"top":-10,"width":340,"height":212,},500);
},function(){
	$(this).find($(".img-zhe")).hide();
	$(this).find($(".img-zi")).hide();
	$(this).find($(".img-m")).stop().animate({"left":0,"top":0,"width":320,"height":192,},500);
})

