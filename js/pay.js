$(function(){
	var arr=getCookie("shopli");
	var str="";
	for(var i in arr){
		str+=`<div class="pay-shop">
				<div class="pay-shopl">
					<img src="images/${arr[i].src}" style="width: 60px; height: 80px;" />
					<div class="pay-shoplr">
						<p style="font-weight: bold;">LA CHANSON</p>
						<p class="pay-shopn">${arr[i].name}</p>
						<p class="pay-shopc">${arr[i].color}</p>
					</div>
				</div>
				<p class="pay-shopd">${arr[i].price}</p>
				<p class="pay-shops">${arr[i].count}</p>
				<p class="pay-shopy">0.00</p>
				<p class="pay-shopx">${arr[i].count*arr[i].price}</p>
			</div>`;
	}
	$(".pay-s").html(str);
	var num="";
	$(".pay-shopx").each(function(){
		num=Number(num)+Number($(this).html());
	})
	$(".pay-num").html(num);
	var sum=Number($(".pay-num").html())+Number($(".pay-yun").html());
	$(".pay-sum").html(`￥${sum}.00`);
	/*$.ajax({
		type:"get",
		url:"http://127.0.0.1/meilihui/json/data.json",
		success:function(res){
		
		}
	});*/
})