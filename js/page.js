	//alert(location.href)
	function lxfEndtime(){
    $(".lxftime").each(function(){
        var lxfday=$(this).attr("lxfday");//用来判断是否显示天数的变量
        var endtime = new Date($(this).attr("endtime")).getTime();//取结束日期(毫秒值)
        var nowtime = new Date().getTime();        //今天的日期(毫秒值)
        var youtime = endtime-nowtime;//还有多久(毫秒值)
        var seconds = youtime/1000;
        var minutes = Math.floor(seconds/60);
        var hours = Math.floor(minutes/60);
        var days = Math.floor(hours/24);
        var CDay= days ;
        var CHour= hours % 24;
        var CMinute= minutes % 60;
        var CSecond= Math.floor(seconds%60);//"%"是取余运算，可以理解为60进一后取余数，然后只要余数。
        if(endtime<=nowtime){
            $(this).html("已过期")//如果结束日期小于当前日期就提示过期啦
        }else{
            if(days==0){
                $(this).html(CHour+"<span>时</span>"+CMinute+"<span>分</span>"+CSecond+"<span>秒</span>");//输出没有天数的数据
            }else{
                $(this).html(days+"<span>天</span>"+CHour+"<span>时</span>"+CMinute+"<span>分</span>"+CSecond+"<span>秒</span>");//输出有天数的数据
            }
        }
      });
    	setTimeout("lxfEndtime()",1000);
	};
	$(function(){
		lxfEndtime(); //倒计时
		
	})
	var str=location.href;
	var arr=str.split("?")[1];
	var id=arr.split("=")[1];
	$.ajax({
		type:"get",
		url:"http://127.0.0.1/meilihui/json/data.json",
		success:function(res){
			var str="";
			//console.log(res.list)
			for(var i in res.list){
				//console.log(res.list[i].id)
				if(id==res.list[i].id){
					var ch=res.list[i];
					var st=(ch.name).substr(0,2);
					var zhe=((ch.price/ch.yuan)*10).toFixed(1);
					str=`<p class="shop-top">
							<a href="http://127.0.0.1/meilihui/index.html">首页</a>&ensp;&gt;&ensp;
							<a href="#">家居</a>&ensp;&gt;&ensp;
							<a href="http://127.0.0.1/meilihui/list.html">LA CHANSON</a>&ensp;&gt;&ensp;
							<span class="shop-t">${ch.name}</span>
						</p>
						<div class="shop-main">
							<div class="shop-ml">
								<div class="shop-tul">
									<img src="images/d${ch.src}" style="display:block;" />
									<img src="images/e${ch.src}" />
									<img src="images/f${ch.src}" />
								</div>
								<ul class="shop-mlb">
									<li><img src="images/d${ch.src}" /></li>
									<li><img src="images/e${ch.src}" /></li>
									<li><img src="images/f${ch.src}" /></li>
								</ul>
								<input type="button" value="<" class="shop-l"/>
								<input type="button" value=">" class="shop-r"/>
							</div>
							<div class="shop-mr">
								<h1>LA CHANSON</h1>
								<p class="shop-na">${ch.name}</p>
								<div class="shop-pr">
									<p class="shop-prl">
										<span class="shop-price">￥${ch.price}</span>
										<span class="shop-yuan" style="text-decoration: line-through;">￥${ch.yuan}</span>
									</p>
									<p><span class="shop-zhe">${zhe}</span>折</p>
								</div>
								<div class="shop-man">
									<p>满688元全场免运</p>
								</div>
								<div class="shop-xuan">
									<p>颜色：<span class="shop-xt">${st}</span></p>
									<img src="images/d${ch.src}" style="width: 75px; height: 100px;"/>
									<p>数量</p>
									<div class="shop-num">
										<input type="button" value="-" class="shop-jian"/>
										<input type="text" value="1"  class="shop-number" />
										<input type="button" value="+" class="shop-jia"/>
									</div>
									<div class="shop-fa">
										<p><span>品牌直发</span>预计5天内发货</p>
										<p><a href="#" style="text-decoration: underline;">查看详情</a></p>
									</div>
									<div class="shop-btn">
										<input type="button" value="加入购物袋" class="shop-gou" />
										<input type="button" value="立即购买" class="shop-mai" />
									</div>
									<div class="shop-dao">
										<div class="shop-dl">
											<p>限时抢购</p>
											<span>活动剩余</span>
										</div>
										<div class="shop-dr lxftime"  endtime="10/1/2017 00:00:00">
											
										</div>
									</div>
									<div class="shop-zheng">
										<span>100%正品保证</span>&ensp;&ensp;
										<span>7天无理由退货</span>
									</div>
								</div>
							</div>
						</div>`;
				}
			}
			$(".shop").html(str);
			$(".shop-xiang").html(`
			<img src="images/d${ch.src}" class="shop-x1"/>
			<img src="images/e${ch.src}" class="shop-x2"/>
			<img src="images/f${ch.src}" class="shop-x3"/>	
			`);
			$(".shop-jian").click(function(){
				var num=Number($(".shop-number").val());
				if(num==1){
					$(".shop-number").val(1);
				}else{
					$(".shop-number").val(num-1);
				}
			})
			$(".shop-jia").click(function(){
				var num=Number($(".shop-number").val());
				$(".shop-number").val(num+1);
			})
			$(".shop-mlb").on("click","li",function(){
				$(".shop-tul").find("img").eq($(this).index()).show().siblings().hide();
				//$(".shop-tu").attr("src",$(this).find("img").attr("src"));
			})
			var index=0;
			$(".shop-l").click(function(){
				index--;
				if(index<=0){
					index=0;
				}
				$(".shop-tul").find("img").eq(index).show().siblings().hide();
			})
			$(".shop-r").click(function(){
				index++;
				if(index>=2){
					index=2;
				}
				$(".shop-tul").find("img").eq(index).show().siblings().hide();
			})
		}
	});