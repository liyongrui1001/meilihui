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
                $(this).html(CHour+"时"+CMinute+"分"+CSecond+"秒");//输出没有天数的数据
            }else{
                $(this).html(days+"天"+CHour+"时"+CMinute+"分"+CSecond+"秒");//输出有天数的数据
            }
        }
      });
    setTimeout("lxfEndtime()",1000);
};

window.onload=function(){
	var data={
		arr:[]
	}
	ajaxGet("json/data.json",function(res){
		var arr=JSON.parse(res).list;
		data.arr=arr;
		var html=template("list",data);
		$(".list-main").html(html);
	})
}

//加载json数据
$(function(){
	lxfEndtime(); //倒计时
	/*$.ajax({
		type:"get",
		url:"json/data.json",
		success:function(res){
			var html="";
			for(var i in res){
				for(var j in res[i]){
					var ch=res[i][j];
					html+=`<div class="shop-box">
							<div class="shop-tui">买手推荐</div>
							<a href="page.html?id=${ch.id}"><img src="images/${ch.src}"  class="shop-img" /></a>
							<ul class="shop-small">
								<li><img src="images/d${ch.src}"/></li>
								<li><img src="images/e${ch.src}"/></li>
								<li><img src="images/f${ch.src}"/></li>
							</ul>
							<div class="shop-b">
								<p>LA CHANSON</p>
								<p>${ch.name}</p>
								<p>
			                    	<span style="color: red;">￥${ch.price}</span>
			                    	<span style="text-decoration: line-through; font-size:12px;">￥${ch.yuan}</span>
			                    </p>
							</div>
						</div>`;
				}
			}
			$(".list-main").html(html);
		}
	});*/
	//商品图片鼠标移入效果
	$(".list-main").on("mouseenter","a",function(){
		$(this).next().show();
	})
	$(".list-main").on("mouseleave",$(".shop-box"),function(){
		$(this).find($(".shop-small")).hide();
	})
	$(".list-main").on("mouseenter","li",function(){
		var src=$(this).find("img").attr("src")
		$(this).parent().prev().find("img").attr("src",src);
		$(this).parent().prev().find("img").css({"width":235,"height":313})
	})
})
