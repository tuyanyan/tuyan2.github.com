// JavaScript Document
	var main={};
	var oLoading = Query("#loading");
	main.init = function(){//页面初始化
	  var loading=new MF_Loading({
		LDpage:true,
		LDtween:true,
		LDup:function(v){
		  Query(".load_txt").innerHTML = v+"%";
		  
		},
		LDsuccess:function(){
			oLoading.style.display = "none";
			Query("#audio").play();
		}
  });

	  loading.add({type:"img",src:"images/paopao.png"});
	  loading.add({type:"img",src:"images/loading.png"});
	  loading.add({type:"img",src:"images/rocket.png"});
	  loading.add({type:"img",src:"images/1.jpg"});
	  loading.add({type:"img",src:"images/2.jpg"});
	  loading.add({type:"img",src:"images/3.jpg"});
	  loading.add({type:"img",src:"images/4.jpg"});
	  loading.add({type:"img",src:"images/5.jpg"});
	  loading.add({type:"img",src:"images/6.jpg"});
	  loading.add({type:"audio",src:"music/music.mp3"});
	
	  loading.addEventListener("complete",function(){
		main.events(); //调用配置事件
	  });
	
	  loading.start();//开始加载
	};


//配置事件 
	main.events = function(){
	
	  var aLi = QueryAll('li');
	  var nowImg = 0;
	  setInterval(fadeOut_In,2000);
		function fadeOut_In(){
		  nowImg ++;
		  nowImg %= aLi.length;
		  for(var i=0;i<aLi.length;i++){
			move(aLi[i],{'opacity':0},{'duration':300,easing:Tween.Linear});
		  }
			move(aLi[nowImg],{'opacity':1},{'duration':500,easing:Tween.Linear});
		}
	
	};//配置事件
	
	function Query(e){
	  return document.querySelector(e);
	}
	function QueryAll(e){
	  return document.querySelectorAll(e);
	}
	
	
	main.init();
	
	
	
	
	
