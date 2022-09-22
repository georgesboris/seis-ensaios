jQuery.noConflict(),jQuery(document).ready(function(t){function i(t,i,e,s,n){for(this.name=t,this.color=i,this.size=e,this.path=n,this.sound=s,this.interaction=Array(M),p=0;this.interaction.length>p;p++)this.interaction[p]=1}function e(){var t=Math.floor(107*Math.random()+100),e=Math.floor(56*Math.random()),s=Math.floor(3*Math.random()+1),n=Math.floor(6*Math.random()+1)
f[f.length]=new i("Ponto","#"+m[e],t,s,n)}function s(t,i){this.type=u,this.visible=!0,this.index=w.length,this.lifeTime=0,this.sound=!1,this.x=t,this.y=i,this.pX,this.pY,this.initX=t,this.initY=i,this.trajX=t,this.trajY=i,this.trajpX,this.trajpY,this.trajangle=0,this.trajspeed=.05,this.traj3angle=0,this.traj3section=0,this.traj6section=0,this.traj6angle=0,this.traj8angle=0,this.traj8section=0}t("#mainbody").fadeIn(1e3),"seis ensaios sobre a complexidade"==document.title?t("header").fadeIn(1e3):t("#header-show").fadeIn(1e3),t("#header-show").click(function(i){t(this).fadeOut(200),t("header").fadeIn(200),i.preventDefault()}),t("header p a").click(function(i){t("header").fadeOut(200),t("#header-show").fadeIn(200),i.preventDefault()}).hover(function(){t("header").animate({opacity:.7},100)},function(){t("header").animate({opacity:1},100)})
var n=document.getElementById("body-canvas")
if(n&&n.getContext("2d")){var a=n.getContext("2d")
if(null!=a){var h=.005,r=.15,o=4,l=0,c=n.width,g=n.height,u=0,f=Array(),M=8,w=Array(),m=["000000","505050","FFFFFF","225C66","004966","3B0099","7F0C00","660C00","7F3430","662C00","CCBB42","50FF79","339944","00A898","787878","B4B4B4","4DC9FF","318399","005F99","6D00CC","66007F","CC2200","994734","664123","CC5C00","B2CC44","42CC5C","00FFBC","DCDCDC","4AC2CC","40A8CC","0075CC","9500FF","B200CC","FF3600","CC6144","CC8544","FF7900","998A33","997F00","606624","00CC92","5AECFF","266466","0086FF","C480FF","F685FF","E600FF","FF7B52","FFA852","E5CA2E","FFE000","CCAA00","D5FF52","1B4C20","007F55"]
e(),s.prototype.move=function(){this.pX=this.x,this.pY=this.y,this.trajangle+=this.trajspeed
var t=f[this.type].size
switch(0!=this.lifeTime&&(this.trajpX=this.trajX,this.trajpY=this.trajY),f[this.type].path){case 1:this.trajX=this.initX-Math.cos(this.trajangle)*t,this.trajY=this.initY+Math.sin(this.trajangle)*t
break
case 2:this.trajX=this.initX-Math.sin(this.trajangle)*t,this.trajY=this.initY+Math.sin(this.trajangle)*t
break
case 3:switch(this.traj3angle+=this.trajspeed,this.traj3section){case 0:this.trajX=this.initX-t,this.trajY=this.initY-Math.sin(this.traj3angle)*t,Math.sin(this.traj3angle)>Math.sin(this.traj3angle+this.trajspeed)&&(this.traj3angle=0,this.traj3section++)
break
case 1:this.trajX=this.initX-Math.cos(this.traj3angle)*t,this.trajY=this.initY-t,Math.cos(this.traj3angle)<Math.cos(this.traj3angle+this.trajspeed)&&(this.traj3angle=0,this.traj3section++)
break
case 2:this.trajX=this.initX+t,this.trajY=this.initY-Math.cos(this.traj3angle)*t,Math.cos(this.traj3angle)<Math.cos(this.traj3angle+this.trajspeed)&&(this.traj3angle=0,this.traj3section++)
break
case 3:this.trajX=this.initX+Math.cos(this.traj3angle)*t,this.trajY=this.initY+t,Math.cos(this.traj3angle)<Math.cos(this.traj3angle+this.trajspeed)&&(this.traj3angle=0,this.traj3section++)
break
case 4:this.trajX=this.initX-t,this.trajY=this.initY+Math.cos(this.traj3angle)*t,Math.cos(this.traj3angle)<Math.cos(this.traj3angle+this.trajspeed)&&(this.traj3angle=0,this.traj3section=1)}break
case 4:this.trajX=this.initX+Math.sin(this.trajangle)*t,this.trajY=this.initY
break
case 5:this.trajX=this.initX,this.trajY=this.initY+Math.sin(this.trajangle)*t
break
case 6:switch(this.traj6angle+=this.trajspeed,this.traj6section){case 0:this.trajX=this.initX-t+Math.cos(this.traj6angle)*t,this.trajY=this.initY+Math.sin(this.traj6angle)*t,Math.cos(this.traj6angle)<Math.cos(this.traj6angle+this.trajspeed)&&this.traj6section++
break
case 1:this.trajX=this.initX-t+Math.cos(this.traj6angle)*t,this.trajY=this.initY+Math.sin(this.traj6angle)*t,Math.cos(this.traj6angle)>Math.cos(this.traj6angle+this.trajspeed)&&(this.traj6angle=0,this.traj6section++)
break
case 2:this.trajX=this.initX+t-Math.cos(this.traj6angle)*t,this.trajY=this.initY+Math.sin(this.traj6angle)*t,Math.cos(this.traj6angle)<Math.cos(this.traj6angle+this.trajspeed)&&this.traj6section++
break
case 3:this.trajX=this.initX+t-Math.cos(this.traj6angle)*t,this.trajY=this.initY+Math.sin(this.traj6angle)*t,Math.cos(this.traj6angle)>Math.cos(this.traj6angle+this.trajspeed)&&(this.traj6angle=0,this.traj6section=0)}break
case 7:this.trajX=this.initX+Math.sin(this.trajangle)*t,this.trajY=this.initY+Math.sin(this.trajangle)*t
break
case 8:switch(this.traj8angle+=this.trajspeed,this.traj8section){case 0:this.trajX=this.initX-Math.sin(this.traj8angle)*t,this.trajY=this.initY+t-Math.cos(this.traj8angle)*t,Math.sin(this.traj8angle)>Math.sin(this.traj8angle+this.trajspeed)&&(this.traj8angle=0,this.trajX=this.initX-t+Math.sin(this.traj8angle)*t,this.trajY=this.initY+Math.cos(this.traj8angle)*t,this.traj8section++)
break
case 1:this.trajX=this.initX-t+Math.sin(this.traj8angle)*t,this.trajY=this.initY+Math.cos(this.traj8angle)*t,Math.cos(this.traj8angle)<Math.cos(this.traj8angle+this.trajspeed)&&(this.traj8angle=0,this.trajX=this.initX-Math.cos(this.traj8angle)*t,this.trajY=this.initY-t+Math.sin(this.traj8angle)*t,this.traj8section++)
break
case 2:this.trajX=this.initX-Math.cos(this.traj8angle)*t,this.trajY=this.initY-t+Math.sin(this.traj8angle)*t,Math.cos(this.traj8angle)<Math.cos(this.traj8angle+this.trajspeed)&&(this.traj8angle=0,this.trajX=this.initX+t-Math.sin(this.traj8angle)*t,this.trajY=this.initY-Math.cos(this.traj8angle)*t,this.traj8section++)
break
case 3:this.trajX=this.initX+t-Math.sin(this.traj8angle)*t,this.trajY=this.initY-Math.cos(this.traj8angle)*t,Math.cos(this.traj8angle)<Math.cos(this.traj8angle+this.trajspeed)&&(this.traj8angle=0,this.trajX=this.initX+Math.cos(this.traj8angle)*t,this.trajY=this.initY+t-Math.sin(this.traj8angle)*t,this.traj8section++)
break
case 4:this.trajX=this.initX+Math.cos(this.traj8angle)*t,this.trajY=this.initY+t-Math.sin(this.traj8angle)*t,Math.sin(this.traj8angle)>Math.sin(this.traj8angle+this.trajspeed)&&(this.traj8angle=0,this.trajX=this.initX-Math.sin(this.traj8angle)*t,this.trajY=this.initY+t-Math.cos(this.traj8angle)*t,this.traj8section=0)}}0==this.lifeTime&&(this.trajpX=this.trajX,this.trajpY=this.trajY),this.x+=(this.trajX-this.trajpX)/2,this.y+=(this.trajY-this.trajpY)/2},s.prototype.moveInteraction=function(){if(this.lifeTime>0&&w[1])for(j=0;w.length>j;j++)if(j!=this.index){var t=(w[j].x-this.x)*h,i=(w[j].y-this.y)*h
switch(f[this.type].interaction[w[j].type]){case 2:1>t&&t>-1?t>.5?this.x--:-.5>t&&this.x++:this.x-=t,1>i&&i>-1?i>.5?this.y--:-.5>i&&this.y++:this.y-=i
break
case 3:1>t&&t>-1?t>.5?this.x++:-.5>t&&this.x--:this.x+=t,1>i&&i>-1?i>.5?this.y++:-.5>i&&this.y--:this.y+=i}}},s.prototype.display=function(){a.beginPath(),a.moveTo(this.pX,this.pY),a.lineTo(this.x,this.y),a.lineWidth=1,a.strokeStyle=f[this.type].color,a.stroke()},s.prototype.live=function(){this.move(),this.moveInteraction(),this.visible&&this.display(),this.lifeTime++}
for(var d=-1,X=["praça","esquina","cidades","tecido","fábrica"],Y=document.title,p=0;X.length+1>p;p++){if(-1!=Y.indexOf(X[p])){d=p
break}p==X.length&&(d=p)}switch(d){case 0:f[0]=new i("01","#BC5C24",200,1,5),u=0,w[w.length]=new s(300,150),setTimeout(function(){w[w.length]=new s(299,152)},800),setTimeout(function(){w[w.length]=new s(300,149)},1200),setTimeout(function(){f[1]=new i("01","#BC5C24",150,1,1),f[1].interaction[0]=3,u=1,w[w.length]=new s(180,90)},1500),setTimeout(function(){w[w.length]=new s(150,150)},2200),setTimeout(function(){w[w.length]=new s(270,200)},2700),setTimeout(function(){w[w.length]=new s(380,170)},3500)
break
case 1:f[0]=new i("01","#53B091",150,1,3),u=0,w[w.length]=new s(300,300),setTimeout(function(){w[w.length]=new s(150,200)},800),setTimeout(function(){w[w.length]=new s(100,280)},1200),setTimeout(function(){w[w.length]=new s(400,180)},1500),setTimeout(function(){w[w.length]=new s(320,120)},2200),setTimeout(function(){w[w.length]=new s(120,90)},2700)
break
case 3:f[0]=new i("01","#BC3582",200,1,1),f[0].interaction[0]=3,u=0,w[w.length]=new s(280,200),setTimeout(function(){w[w.length]=new s(200,100)},800),setTimeout(function(){w[w.length]=new s(150,150)},1200),setTimeout(function(){w[w.length]=new s(250,180)},1500),setTimeout(function(){w[w.length]=new s(230,140)},2200),setTimeout(function(){w[w.length]=new s(190,90)},2700),setTimeout(function(){f[1]=new i("01","#BC3582",80,1,8),f[1].interaction[0]=3,u=1,w[w.length]=new s(330,90)},3500),setTimeout(function(){w[w.length]=new s(260,150)},4e3),setTimeout(function(){w[w.length]=new s(340,147)},4400)
break
case 2:f[0]=new i("01","#796A8C",200,1,3),f[0].interaction[0]=3,f[0].interaction[1]=3,u=0,w[w.length]=new s(280,200),setTimeout(function(){w[w.length]=new s(230,130)},800),setTimeout(function(){w[w.length]=new s(280,180)},1200),setTimeout(function(){w[w.length]=new s(250,200)},1500),setTimeout(function(){w[w.length]=new s(300,160)},2200),setTimeout(function(){w[w.length]=new s(200,120)},2700),setTimeout(function(){f[1]=new i("01","#796A8C",80,1,1),f[1].interaction[0]=3,f[1].interaction[1]=3,u=1,w[w.length]=new s(330,90),w[w.length-1].visible=!1},3500),setTimeout(function(){w[w.length]=new s(260,150),w[w.length-1].visible=!1},4e3),setTimeout(function(){w[w.length]=new s(340,147),w[w.length-1].visible=!1,w[w.length]=new s(340,147),w[w.length-1].visible=!1,w[w.length]=new s(340,147),w[w.length-1].visible=!1},4400)
break
case 4:f[0]=new i("01","#EF1D2D",200,1,3),u=0,w[w.length]=new s(200,150),setTimeout(function(){w[w.length]=new s(200,150)},800),setTimeout(function(){w[w.length]=new s(200,150)},1200),setTimeout(function(){w[w.length]=new s(200,150)},1300),setTimeout(function(){w[w.length]=new s(199,150)},1900),setTimeout(function(){w[w.length]=new s(200,150)},2500),setTimeout(function(){w[w.length]=new s(200,150)},3e3),setTimeout(function(){w[w.length]=new s(202,152)},4e3),setTimeout(function(){f[1]=new i("01","#EF1D2D",100,1,6),f[1].interaction[0]=3,f[1].interaction[1]=2,u=1,w[w.length]=new s(280,150)},4200),setTimeout(function(){w[w.length]=new s(240,150)},6e3),setTimeout(function(){w[w.length]=new s(350,190)},7e3)
break
case 5:f[1]=new i("path","#fff",300,1,8),u=1,w[w.length]=new s(300,300),w[w.length-1].visible=!1,w[w.length]=new s(300,300),w[w.length-1].visible=!1,w[w.length]=new s(300,300),w[w.length-1].visible=!1,w[w.length]=new s(300,300),w[w.length-1].visible=!1,w[w.length]=new s(300,300),w[w.length-1].visible=!1,f[0]=new i("01","#458782",100,1,1),f[0].interaction[1]=3,f[0].interaction[0]=2,u=0,setTimeout(function(){w[w.length]=new s(150,260)},800),setTimeout(function(){w[w.length]=new s(180,280)},1500),setTimeout(function(){w[w.length]=new s(200,350)},2200),setTimeout(function(){w[w.length]=new s(450,390)},2800)}setInterval(function(){if(g=n.height,c=n.width,l==o?(a.rect(0,0,c,g),a.fillStyle="rgba(255,255,255,"+r+")",a.fill(),l=0):l++,w[0])for(var t=0;w.length>t;t++)w[t].live()},33)}}})
