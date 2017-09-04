/*公共部分*/
$("#header_wrap").load("public.html .header",function(){
	$("#ph").hover(function(){
		$(this).next().show()
	},function(){
		$(this).next().hide()
	})
});
$("#nav_wrap").load("public.html .nav");
$("#returnTop_wrap").load("public.html .returnTop",function(){
	$(window).scroll(function(){
		var sTop=$(document).scrollTop();
		$(".returnTop").css("top",sTop+400)
		if(sTop>200){
			$(".clickOn").show();
		}else{
			$(".clickOn").hide();
		}
		$(".clickOn").click(function(){
			$("body,html").animate({"scrollTop":0},1000)
		})
	})
});
$("#footer_wrap").load("public.html .footer_advantage");

