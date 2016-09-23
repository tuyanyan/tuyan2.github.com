// JavaScript Document

	var aSection = document.querySelector('section');
	for(var i=0;i<aSection.length;i++){
		aSection[i].style.height = document.documentElement.clientHeight+'px';
	}


	(function nav(){
		var aLi = document.querySelectorAll('.nav ul li');	
		var oLiBg = document.querySelector('#li_bg');
		for(var i=0;i<aLi.length;i++){
			(function(index){
				aLi[i].onmouseover = function(){
					move(oLiBg,{left:index*oLiBg.offsetWidth},{'duration':200,easing:Tween.Back.easeOut});	
				};	
			})(i);	
		}
	})();
	
	//打字效果
	(function text(){
		var oText = document.querySelector('.text');
		var str = '活在这个看脸的时代，但最终拼的还是实力，强大自己的技能才是王道！不断学习，是我的宗旨！！';
		var timer = null;
		for(var i=0;i<str.length;i++){
			var oSpan = document.createElement('span');	
			oSpan.innerHTML = str[i];
			oText.appendChild(oSpan);
		}
		var aSpan = oText.children;
		var i = 0;
		timer = setInterval(function(){
			aSpan[i].className = 'on';	
			i++;
			if(i==str.length){
				clearInterval(timer);
				setTimeout(function(){
					oText.innerHTML = '';
				},3000);
			}
		},200);		
	})();
	
	
	(function(){
		var pos = {x:0,y:0};
		document.onmousemove = function(ev){
			var oEvent = ev || event;	
			pos.x = oEvent.clientX;
			pos.y = oEvent.clientY;
		};
		var aLi = document.querySelectorAll(' #page ul li');
		
		for(var i=0;i<aLi.length;i++){
			chuanqiang(aLi[i]);	
		}
		
		function chuanqiang(oDiv){
			var oInnerDiv = oDiv.children[0];
			
			oDiv.onmouseenter = function(){
				var dir = findDir();
				switch(dir){
					case 't':
						oInnerDiv.style.left = 0;
						oInnerDiv.style.top = '-325'+'px';
						
						break;
					case 'l':
						oInnerDiv.style.left = '-325'+'px';
						oInnerDiv.style.top = 0;
						
						break;
					case 'b':
						oInnerDiv.style.left = 0;
						oInnerDiv.style.top = '325'+'px';
						
						break;
					case 'r':
						oInnerDiv.style.left = '325'+'px';
						oInnerDiv.style.top = 0;
						break;
				}
				 move(oInnerDiv,{left:0,top:0},{'duration':400,easing:Tween.Linear});
			};
			
			oDiv.onmouseleave = function(){
				var dir = findDir();
				switch(dir){
					case 't':
						move(oInnerDiv,{left:0,top:-oInnerDiv.offsetHeight});
						break;
					case 'l':
						move(oInnerDiv,{left:-oInnerDiv.offsetWidth,top:0});
						break;
					case 'b':
						move(oInnerDiv,{left:0,top:oInnerDiv.offsetHeight});
						break;
					case 'r':
						move(oInnerDiv,{left:oInnerDiv.offsetWidth,top:0});
						break;
				}
			};
			
			function findDir(){
				var x1 = oDiv.offsetLeft+oDiv.offsetWidth/2;
				var y1 = oDiv.offsetTop+oDiv.offsetHeight/2;
				
				var x = x1-pos.x;
				var y = y1-pos.y;
				
				var ang = Math.atan2(y,x)*180/Math.PI-90;
				
				if(ang<=45 && ang>=-45){
					//上
					return 't';	
				}else if(ang<=-45 && ang>=-135){
					//左
					return 'l';	
				}else if(ang<=-135 && ang>=-225){
					//下
					return 'b';	
				}else{
					//右
					return 'r';	
				}	
			}
		};
	})();
	
	
	
	  var iNow_page = 0;
	  var oContainer = document.getElementById('container');
	  var aPage = oContainer.getElementsByClassName('page');
	  var oNav = document.getElementById('nav');
	  var aNavLi = oNav.children;
	  var oFixnav= document.getElementById('fixnav');
	  var aFixnavLi = oFixnav.children;
	  var aB = oFixnav.getElementsByTagName('b');
	  var H = document.documentElement.clientHeight;
	  var oNav_bg =document.getElementById('li_bg') ;
	  
	  for(var i=0;i<aNavLi.length;i++){
		aNavLi[i].onmouseover = function(){
			var L = this.offsetLeft;
			move(oNav_bg,{'left':L});
		};
	  }
	  addMouseWheel(document,function(down){
		  if(down){
			iNow_page++;
			if(iNow_page>4){iNow_page = 4;}
			  pageTab()
		  }else{
			iNow_page--;
			  if(iNow_page<0){iNow_page = 0;}
			  pageTab();
		  }
		  //滚动时导航背景跟着走
		 var oNav_L = aNavLi[iNow_page].offsetLeft;
		 move(oNav_bg,{'left':oNav_L});
	
	  });
	for(var i=0;i<aNavLi.length;i++){
	  aNavLi[i].index = i;
	  aNavLi[i].onclick = function(){
		 iNow_page = this.index;
		 pageTab();
	  };
	  aFixnavLi[i].indexs = i;
	  aFixnavLi[i].onclick = function(){
		 iNow_page = this.indexs;
		 pageTab();
	  };
	
	}
	  function pageTab(){
		 for(var i=0;i<aNavLi.length;i++){
		  aNavLi[i].className = '';
		  aFixnavLi[i].className = '';
		  aB[i].className = '';
		  aPage[i].className = 'page';
		}
		  aNavLi[iNow_page].className = 'cur';
		  aFixnavLi[iNow_page].className = 'cur';
		  aB[iNow_page].className = 'cur';
		  aPage[iNow_page].className = 'current page';
		  move(oContainer,{top:-iNow_page*H},{easing:Tween.Quint.easeInOut})
	  }
	function addMouseWheel(obj,fn){
	  if(window.navigator.userAgent.toLowerCase().indexOf("firefox") != -1){
		obj.addEventListener("DOMMouseScroll",fnWheel,false); 
	  } else {
		obj.onmousewheel = fnWheel;
	  }
	  function fnWheel(ev){
		var oEvent = ev || event;
		var down = true;
		if(oEvent.wheelDelta){
		  down = oEvent.wheelDelta > 0 ? false : true;
		} else {
		  down = oEvent.detail > 0 ? true : false;  
		}
		fn && fn(down);
		oEvent.preventDefault && oEvent.preventDefault();
		return false; 
	  }
	}
	
	//手机tianqi
	var oList1 = document.getElementById('list1');
	oList1.innerHTML += oList1.innerHTML;
	var now = 0;
	setInterval(function(){
		now++;
		if(now == oList1.children.length){
		   oList1.style.top = 0;
		   now =0;
		}
	   var iTarget = -oList1.children[0].offsetHeight*now;
	   move(oList1,{'top':iTarget},{'duration':400,easing:Tween.Linear});
	},1500);
	
	
	//鼠标放到旋转图标上出音乐
	var oAnniu1 = document.getElementById('anniu1');
	var aAnLi1 = oAnniu1.getElementsByTagName('li');
	var oAnniu2 = document.getElementById('anniu2');
	var aAnLi2 = oAnniu2.getElementsByTagName('li');
	var aAudio = document.getElementsByTagName('audio');
	for(var i=0;i<aAnLi1.length;i++){
		 aAnLi1[i].index = i;
		 aAnLi1[i].onmouseover =  function(){
			aAudio[this.index].load();
			aAudio[this.index].play();
		 };
	}
	for(var i=0;i<aAnLi2.length;i++){
		 aAnLi2[i].index = i;
		 aAnLi2[i].onmouseover= function(){
			aAudio[this.index].load();
			aAudio[this.index].play();
		 };
	}
	
	//canvas  圆弧时钟
	function toDou(n){
		return n<10?'0'+n:''+n;	
	}
	function d2a(n){
		return n/180*Math.PI;	
	}
	var oC=document.querySelector('canvas');
	
	//获取画笔
	var gd=oC.getContext('2d');
	
	var cx=100;
	var cy=100;
	
	setInterval(function(){
		gd.clearRect(0,0,oC.width,oC.height);
		
		var oDate=new Date();
	
		var h=oDate.getHours();
		var m=oDate.getMinutes();
		var s=oDate.getSeconds();
		
		
		var str = toDou(h)+':'+toDou(m)+':'+toDou(s);
		gd.font = '16px 微软雅黑';
		gd.fillStyle = '#fff';
		gd.fillText(str,cx-30,cy);
	
		var oH=h%12*30;
		var oM=m*6;
		var oS=s*6;
		var oMs=oDate.getMilliseconds();
		
		drawArc(80,oH+oM/360*30,'red');  //意思是分钟在走的时候，让时钟也走；
		drawArc(60,oM+oS/360*6,'blue');
		drawArc(40,oS+oMs/1000*6);
		
			
	},16);	
	
	function drawArc(r,d,col){
		d-=90;
		
		gd.shadowColor = '#fff';
		gd.shadowOffsetX = 1;
		gd.shadowOffsetY = 1;
		gd.shadowBlur = 5;
		
		gd.beginPath();
		gd.lineWidth=8;
		gd.strokeStyle=col||'green';
		gd.arc(cx,cy,r,d2a(-90),d2a(d),false);
		gd.stroke();
	}
	
	
	
	


	
	
