/*公共部分*/
$("#header_wrap").load("public.html .header",function(){
	$("#ph").hover(function(){
		$(this).next().show()
	},function(){
		$(this).next().hide()
	})
	$(".zhuce-a").click(function(){
			location.href="sign.html";
		})
	var uname=getCookie("username");
	if(!(uname=="")){
		$(".zhuce-a").html(uname);
		$(".denglu-a").html("退出");
		$(".zhuce-a").click(function(){
			location.href="account.html";
		})
	};
	$(".denglu-a").click(function(){
		location.href="login.html";
	})
});
$("#nav_wrap").load("public.html .nav",function(){
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
	$(".nav-car").hover(function(){
		$(".nav-car").show();
	},function(){
		$(".nav-car").hide();
	})
	var _arr=getCookie("shoplist");
	if(_arr.length==0){
		$(".nav-car").html(`<p class="nav-cp">购物袋暂无商品</p>`);
	}else{
		
		var st=`<div class="nav-cd">`;
		var sum="";
		var count="";
		for(var i=0; i<_arr.length; i++){
			st+=`<div class="nav-cdt">
					<img src="images/${_arr[i].src}"  />
					<div class="nav-cdtr">
						<p class="nav-cdtrn">${_arr[i].name}</p>
						<p class="nav-cdtry">${_arr[i].color}</p>
						<span class="nav-cdtrnum">${_arr[i].count}</span>×
						<span class="nav-cdtrpri">${_arr[i].price}</span>
						<span data-id=${_arr[i].id}  data-name=${_arr[i].name} data-src=${_arr[i].src} data-color=${_arr[i].color} data-price=${_arr[i].price}   style="display:none" class="nav-s"></span>
						<a class="nav-cshan">删除</a>
					</div>
				</div>`;
				count=Number(count)+Number(_arr[i].count);
				sum=Number(sum+_arr[i].count*_arr[i].price);
		}
		st+=`<p class="nav-cdc">购物袋小计：￥<span class="nav-carsum">${sum}</span></p>
				<div class="nav-cdd">
					<input type="button" value="结算" class="nav-carjie" />	
				</div>
			</div>`;
			
		$(".nav-car").html(st);
		$(".nav-rs").html(count);
		$(".nav-rp").html(sum);
	}
	$(".nav-carjie").click(function(){
		var crr = [];
		$(".nav-cdt").each(function(){
			var bjson = {
				id:$(this).parent().parent().find(".nav-s").eq($(this).index()).data("id"),
				name:$(this).parent().parent().find(".nav-s").eq($(this).index()).data("name"),
				src:$(this).parent().parent().find(".nav-s").eq($(this).index()).data("src"),
				price:$(this).parent().parent().find(".nav-s").eq($(this).index()).data("price"),
				color:$(this).parent().parent().find(".nav-s").eq($(this).index()).data("color"),
				count:$(this).parent().parent().find(".nav-cdtrnum").eq($(this).index()).html()
			}
			crr.push(bjson);
		})
		setCookie("shopli",JSON.stringify(crr));
		location.href="pay.html";
	})
	$(".nav-cshan").click(function(){
		var c=confirm("确定要删除吗？")
		if(c){
			$(this).parent().parent().remove();
			var id=$(this).prev().data("id");
			for(var i in _arr){
				if(id==_arr[i].id){
					_arr.splice(i,1);
					if(_arr.length==0){
						$(".nav-car").html(`<p class="nav-cp">购物袋暂无商品</p>`);
						$(".nav-rs").html(0);
						$(".nav-rp").html(0);
					}
					$(".nav-rs").html(count);
					$(".nav-rp").html(sum);
					setCookie("shoplist",JSON.stringify(_arr));
				}
			}
		}
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
$("#returnTop_wrap").load("public.html .returnTop",function(){
	$(window).scroll(function(){
		var sTop=$(document).scrollTop();
		$(".returnTop").css("top",sTop+400)
		if(sTop>500){
			$(".clickOn").show();
		}else{
			$(".clickOn").hide();
		}
		$(".clickOn").click(function(){
			$("body,html").stop().animate({"scrollTop":0})
		})
	})
});
$("#huodong_wrap").load("public.html .huodong",function(){
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
	var now=new Date();
	var week=now.getDay();
	if(week==0){
		$(".week2").html("周二");
		$(".week3").html("周三");
		$(".week4").html("周四");
		$(".week5").html("周五");
	}
	if(week==1){
		$(".week2").html("周三");
		$(".week3").html("周四");
		$(".week4").html("周五");
		$(".week5").html("周六");
	}
	if(week==2){
		$(".week2").html("周四");
		$(".week3").html("周五");
		$(".week4").html("周六");
		$(".week5").html("周日");
	}
	if(week==3){
		$(".week2").html("周五");
		$(".week3").html("周六");
		$(".week4").html("周日");
		$(".week5").html("周一");
	}
	if(week==4){
		$(".week2").html("周六");
		$(".week3").html("周日");
		$(".week4").html("周一");
		$(".week5").html("周二");
	}
	if(week==5){
		$(".week2").html("周日");
		$(".week3").html("周一");
		$(".week4").html("周二");
		$(".week5").html("周三");
	}
	if(week==6){
		$(".week2").html("周一");
		$(".week3").html("周二");
		$(".week4").html("周三");
		$(".week5").html("周四");
	}
});
$("#footer_wrap").load("public.html .footer_advantage");
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

