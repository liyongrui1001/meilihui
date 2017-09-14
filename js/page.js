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
	window.onload=function(){
		var str=location.href;
		var arr=str.split("?")[1];
		var id=arr.split("=")[1];
		var data={
			arr:[],
			zhe:""
		}
		ajaxGet("json/data.json",function(res){
			var arr=JSON.parse(res).list;
			for(var i in arr){
				if(id==arr[i].id){
					data.arr=arr[i];
				}
			}
			var zhe=((data.arr.price/data.arr.yuan)*10).toFixed(1);
			data.zhe=zhe;
			var html=template("list",data);
			$(".shop").html(html);
			var str=template("bottom",data);
			$(".shop-xiang").html(str);
			
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
			$(".shop-mai").click(function(){
				var shopcount=$(".shop-number").val();
				var brr = [];
				var ajson = {
					id:$(this).prev().data("id"),
					name:$(this).prev().data("name"),
					src:$(this).prev().data("src"),
					price:$(this).prev().data("price"),
					color:$(this).prev().data("color"),
					count:shopcount
				}
				brr.push(ajson);
				setCookie("shopli",JSON.stringify(brr));
				location.href="pay.html";
			})
			var st="";
			$(".shop-gou").click(function(){
				
				var shopcount=$(".shop-number").val();
				var arr = [];
				var flag = true;//可以向数组中添加数据
				var _json = {
					id:$(this).next().data("id"),
					name:$(this).next().data("name"),
					src:$(this).next().data("src"),
					price:$(this).next().data("price"),
					price:$(this).next().data("price"),
					color:$(this).next().data("color"),
					count:shopcount
				}
				//当再次点击按钮时，cookie信息被覆盖  解决 ： 先取出cookie数据 存入到数组中，然后在把新增的商品存入到数组中
				var cookieInfo = getCookie("shoplist");
				if( cookieInfo.length != 0 ){//表示cookie中有数据
					arr = cookieInfo;
					//点击相同商品时，需要做商品数量的累加    用当前点击的商品编号id   和  取出来的cookie的 数据中商品id做比较 发现有相等的，count++
					for(var i in arr){
						if(_json.id == arr[i].id){
							arr[i].count=Number(arr[i].count)+Number(shopcount);
							flag = false;
							break;
						}
					}
					
				}
				
				
				if(flag){
					arr.push(_json);
				}
				
				setCookie("shoplist",JSON.stringify(arr));
				
				st=`<div class="nav-cd">`;
				
				var sum="";
				var count="";
				for(var i in arr){
					st+=`<div class="nav-cdt">
							<img src="images/${arr[i].src}"  />
							<div class="nav-cdtr">
								<p class="nav-cdtrn">${arr[i].name}</p>
								<p class="nav-cdtry">${arr[i].color}</p>
								<span class="nav-cdtrnum">${arr[i].count}</span>×
								<span class="nav-cdtrnum">${arr[i].price}</span>
								<a class="nav-cshan">删除</a>
							</div>
						</div>`;
						count=Number(count)+Number(arr[i].count);
						sum=Number(sum+arr[i].count*arr[i].price);
				}
				st+=`<p class="nav-cdc">购物袋小计：￥<span class="nav-carsum">${sum}</span></p>
						<div class="nav-cdd">
							<input type="button" value="结算" class="nav-carjie" />	
						</div>
					</div>`;
				$(".nav-car").html(st)
				$(".nav-rs").html(count);
				$(".nav-rp").html(sum);
				//console.log( document.cookie );
				$(".nav-car").show();
			})
		})
	}
	$(function(){
		lxfEndtime(); //倒计时
		
	})
	/*var str=location.href;
	var arr=str.split("?")[1];
	var id=arr.split("=")[1];
	$.ajax({
		type:"get",
		url:"json/data.json",
		success:function(res){
			var str="";
			/*for(var i in res.list){
				if(id==res.list[i].id){
					var ch=res.list[i];
					var zhe=((ch.price/ch.yuan)*10).toFixed(1);
					str=`<p class="shop-top">
							<a href="index.html">首页</a>&ensp;&gt;&ensp;
							<a href="#">家居</a>&ensp;&gt;&ensp;
							<a href="list.html">LA CHANSON</a>&ensp;&gt;&ensp;
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
									<p>颜色：<span class="shop-xt">${ch.color}</span></p>
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
										<span data-id=${ch.id}  data-name=${ch.name} data-src=${ch.src} data-color=${ch.color} data-price=${ch.price}   style="display:none"></span>
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
			`);*/
			/*$(".shop-jian").click(function(){
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
			})*/
			/*$(".shop-mlb").on("click","li",function(){
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
			$(".shop-mai").click(function(){
				var shopcount=$(".shop-number").val();
				var brr = [];
				var ajson = {
					id:$(this).prev().data("id"),
					name:$(this).prev().data("name"),
					src:$(this).prev().data("src"),
					price:$(this).prev().data("price"),
					color:$(this).prev().data("color"),
					count:shopcount
				}
				brr.push(ajson);
				setCookie("shopli",JSON.stringify(brr));
				location.href="pay.html";
			})
			var st="";
			$(".shop-gou").click(function(){
				
				var shopcount=$(".shop-number").val();
				var arr = [];
				var flag = true;//可以向数组中添加数据
				var _json = {
					id:$(this).next().data("id"),
					name:$(this).next().data("name"),
					src:$(this).next().data("src"),
					price:$(this).next().data("price"),
					price:$(this).next().data("price"),
					color:$(this).next().data("color"),
					count:shopcount
				}
				//当再次点击按钮时，cookie信息被覆盖  解决 ： 先取出cookie数据 存入到数组中，然后在把新增的商品存入到数组中
				var cookieInfo = getCookie("shoplist");
				if( cookieInfo.length != 0 ){//表示cookie中有数据
					arr = cookieInfo;
					//点击相同商品时，需要做商品数量的累加    用当前点击的商品编号id   和  取出来的cookie的 数据中商品id做比较 发现有相等的，count++
					for(var i in arr){
						if(_json.id == arr[i].id){
							arr[i].count=Number(arr[i].count)+Number(shopcount);
							flag = false;
							break;
						}
					}
					
				}
				
				
				if(flag){
					arr.push(_json);
				}
				
				setCookie("shoplist",JSON.stringify(arr));
				/*var f = confirm("是否继续购买?确定--继续购买，取消---去购物车结算");
				if( !f ){
					location.href = "shopcar.html";
				}*/
				/*st=`<div class="nav-cd">`;
				
				var sum="";
				var count="";
				for(var i in arr){
					st+=`<div class="nav-cdt">
							<img src="images/${arr[i].src}"  />
							<div class="nav-cdtr">
								<p class="nav-cdtrn">${arr[i].name}</p>
								<p class="nav-cdtry">${arr[i].color}</p>
								<span class="nav-cdtrnum">${arr[i].count}</span>×
								<span class="nav-cdtrnum">${arr[i].price}</span>
								<a class="nav-cshan">删除</a>
							</div>
						</div>`;
						count=Number(count)+Number(arr[i].count);
						sum=Number(sum+arr[i].count*arr[i].price);
				}
				st+=`<p class="nav-cdc">购物袋小计：￥<span class="nav-carsum">${sum}</span></p>
						<div class="nav-cdd">
							<input type="button" value="结算" class="nav-carjie" />	
						</div>
					</div>`;
				$(".nav-car").html(st)
				$(".nav-rs").html(count);
				$(".nav-rp").html(sum);
				//console.log( document.cookie );
				$(".nav-car").show("fast",function(){
					/*var timer=setTimeout(function(){
						$(".nav-car").hide();
					},2000)
					$(".nav-car").hover(function(){
						clearTimeout(timer);
					},function(){
						setTimeout(function(){
							$(".nav-car").hide();
						},2000)
					})*/
				//});
			//})*/*/
		//}
	//});*/