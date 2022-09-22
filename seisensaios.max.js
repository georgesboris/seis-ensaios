jQuery.noConflict();

jQuery(document).ready(function($) {

	// SHOW CONTENT AT STARTUP
	$('#mainbody').fadeIn(1000);
	if (document.title == 'seis ensaios sobre a complexidade') {
		$('header').fadeIn(1000);
	} else {
		$('#header-show').fadeIn(1000);
	}
	
	// INDEX OPEN AND CLOSE
	$('#header-show').click(function(e) {
		$(this).fadeOut(200);
		$('header').fadeIn(200);
		e.preventDefault();
	});
	$('header p a').click(function(e) {
		$('header').fadeOut(200);
		$('#header-show').fadeIn(200);
		e.preventDefault();
	}).hover(function() {
			$('header').animate({
				opacity: 0.7
			},100);
		},function() {
			$('header').animate({
				opacity: 1
			},100);
	});
	
	// -------------------------------------------------------
	// BODY CANVAS
	var mainCanvas = document.getElementById('body-canvas');
	if (mainCanvas && mainCanvas.getContext('2d')) {
		var ctx = mainCanvas.getContext('2d');
		if (ctx != null) {
			// -------------------------------------------------------
			// GLOBAL VARIABLE SETUP
			
			var visMode = 1;
			
			var interactionMag = 0.005;
			var fadeMag = 0.15;
			var fadeSteps = 4;
			var curFadeStep = 0;
			
			var width = mainCanvas.width;
			var height = mainCanvas.height;
			
			// INIT CREATURES
			
			function reloadCreatures() {
				curType = 0;
				creaturesArr.length = 0;
				creaturesTypeArr.length = 0;
				createRandomCreatureType();
				$('#objEditorCall').css('background-color',creaturesTypeArr[curType].color);
				ctx.fillStyle = 'rgb(240,240,240)';
				ctx.rect(0,0,width,height);
				ctx.fill();
			}
			
			// -------------------------------------------------------
			// DISTANCE BETWEEN TWO CREATURES
			
			function creaturesDist(creatA,creatB) {
				return Math.ceil(Math.sqrt(Math.pow((creatB.x-creatA.x),2)+Math.pow((creatB.y-creatA.y),2)));
			}
			
			// -------------------------------------------------------
			// CREATURES SETUP
			
			var curType = 0;
			var creaturesTypeArr = new Array();
			var creaturesTypeArrMax = 8;
			var creaturesArr = new Array();
			
			// -------------------------------------------------------
			// COLORS ARRAY SETUP
			
			var colorsArr = ['000000','505050','FFFFFF','225C66','004966','3B0099','7F0C00','660C00','7F3430','662C00','CCBB42','50FF79','339944','00A898','787878','B4B4B4','4DC9FF','318399','005F99','6D00CC','66007F','CC2200','994734','664123','CC5C00','B2CC44','42CC5C','00FFBC','DCDCDC','4AC2CC','40A8CC','0075CC','9500FF','B200CC','FF3600','CC6144','CC8544','FF7900','998A33','997F00','606624','00CC92','5AECFF','266466','0086FF','C480FF','F685FF','E600FF','FF7B52','FFA852','E5CA2E','FFE000','CCAA00','D5FF52','1B4C20','007F55'];
			
			
			// -------------------------------------------------------
						
			function createBlankCreatureType() {
				var newCreatureIndex = creaturesTypeArr.length;
				creaturesTypeArr[newCreatureIndex] = new CreatureType('Círculo','#'+colorsArr[0],100,1,4);
			}
			function CreatureType(name,color,size,sound,path) {
				this.name = name;
				this.color = color;
				this.size = size;
				this.path = path;
				this.sound = sound;
				this.interaction = new Array(creaturesTypeArrMax);
				for (i=0;i<this.interaction.length;i++) {
					this.interaction[i] = 1;
				}
			}
			
			// -------------------------------------------------------
			// INIT FIRST CREATURE AND ESSENTIAL VARIABLES
			
			function createRandomCreatureType() {
				var size = Math.floor((Math.random()*107)+100);
				var color = Math.floor((Math.random()*56));
				var sound = Math.floor((Math.random()*3)+1);
				var path = Math.floor((Math.random()*6)+1);
				creaturesTypeArr[creaturesTypeArr.length] = new CreatureType('Ponto','#'+colorsArr[color],size,sound,path);
			}
			createRandomCreatureType();
			
			// -------------------------------------------------------
			// CREATURES
			function Creature(x,y) {
				this.type = curType;
				this.visible = true;
				this.index = creaturesArr.length;
				this.lifeTime = 0;
				//sound
				this.sound = false;
				//movement
				this.x = x;
				this.y = y;
				this.pX;
				this.pY;
				this.initX = x;
				this.initY = y;
				//traj variables
				this.trajX = x;
				this.trajY = y;
				this.trajpX;
				this.trajpY;
				this.trajangle = 0;
				this.trajspeed = 0.05;
				//traj especific variables
				this.traj3angle = 0;
				this.traj3section = 0;
				this.traj6section = 0;
				this.traj6angle = 0;
				this.traj8angle = 0;
				this.traj8section = 0;
			}
			Creature.prototype.move = function() {
				this.pX = this.x;
				this.pY = this.y;
				this.trajangle += this.trajspeed;
				var moveScale = creaturesTypeArr[this.type].size;
				if (this.lifeTime != 0) {
					this.trajpX = this.trajX;
					this.trajpY = this.trajY;
				}
				switch(creaturesTypeArr[this.type].path) {
					case 1: // CIRCLE
						this.trajX=this.initX-Math.cos(this.trajangle)*moveScale;									this.trajY=this.initY+Math.sin(this.trajangle)*moveScale;	
						break;
					case 2: // FOWARD DIAGONAL
						this.trajX=this.initX-Math.sin(this.trajangle)*moveScale;
						this.trajY=this.initY+Math.sin(this.trajangle)*moveScale;
						break;
					case 3: // SQUARE
						this.traj3angle+=this.trajspeed;
						switch(this.traj3section) {
							case 0:
								this.trajX=this.initX-moveScale;
								this.trajY=this.initY-Math.sin(this.traj3angle)*moveScale;
								if (Math.sin(this.traj3angle) > Math.sin(this.traj3angle+this.trajspeed)) {
									this.traj3angle=0;
									this.traj3section++;
								}
								break;
							case 1:
								this.trajX=this.initX-Math.cos(this.traj3angle)*moveScale;
								this.trajY=this.initY-moveScale;
								if (Math.cos(this.traj3angle) < Math.cos(this.traj3angle+this.trajspeed)) {
									this.traj3angle=0;
									this.traj3section++;
								}
								break;
							case 2:
								this.trajX=this.initX+moveScale;
								this.trajY=this.initY-Math.cos(this.traj3angle)*moveScale;
								if (Math.cos(this.traj3angle) < Math.cos(this.traj3angle+this.trajspeed)) {
									this.traj3angle=0;
									this.traj3section++;
								}
								break;
							case 3:
								this.trajX=this.initX+Math.cos(this.traj3angle)*moveScale;
								this.trajY=this.initY+moveScale;
								if (Math.cos(this.traj3angle) < Math.cos(this.traj3angle+this.trajspeed)) {
									this.traj3angle=0;
									this.traj3section++;
								}
								break;
							case 4:
								this.trajX=this.initX-moveScale;
								this.trajY=this.initY+Math.cos(this.traj3angle)*moveScale;
								if (Math.cos(this.traj3angle) < Math.cos(this.traj3angle+this.trajspeed)) {
									this.traj3angle=0;
									this.traj3section=1;
								}
								break;
						}
						break;
					case 4: // HORIZONTAL LINE
						this.trajX=this.initX+Math.sin(this.trajangle)*moveScale;
						this.trajY=this.initY;
						break;
					case 5: // VERTICAL LINE
						this.trajX=this.initX;
						this.trajY=this.initY+Math.sin(this.trajangle)*moveScale;
						break;
					case 6: // INFINITY FIGURE
						this.traj6angle += this.trajspeed;
						switch(this.traj6section) {
							case 0:
								this.trajX=this.initX-moveScale+Math.cos(this.traj6angle)*moveScale;
								this.trajY=this.initY+Math.sin(this.traj6angle)*moveScale;
								if (Math.cos(this.traj6angle) < Math.cos(this.traj6angle+this.trajspeed)) {
									this.traj6section++;
								}
								break;
							case 1:
								this.trajX=this.initX-moveScale+Math.cos(this.traj6angle)*moveScale;
								this.trajY=this.initY+Math.sin(this.traj6angle)*moveScale;
								if (Math.cos(this.traj6angle) > Math.cos(this.traj6angle+this.trajspeed)) {
									this.traj6angle=0;
									this.traj6section++;
								}
								break;
							case 2:
								this.trajX=this.initX+moveScale-Math.cos(this.traj6angle)*moveScale;
								this.trajY=this.initY+Math.sin(this.traj6angle)*moveScale;
								if (Math.cos(this.traj6angle) < Math.cos(this.traj6angle+this.trajspeed)) {
									this.traj6section++;
								}
								break;
							case 3:
								this.trajX=this.initX+moveScale-Math.cos(this.traj6angle)*moveScale;
								this.trajY=this.initY+Math.sin(this.traj6angle)*moveScale;
								if (Math.cos(this.traj6angle) > Math.cos(this.traj6angle+this.trajspeed)) {
									this.traj6angle = 0;
									this.traj6section = 0;
								}
								break;
						}
						
						break;
					case 7: // BACKWARD DIAGONAL
						this.trajX=this.initX+Math.sin(this.trajangle)*moveScale;
						this.trajY=this.initY+Math.sin(this.trajangle)*moveScale;
						break;
					case 8: // FLOWER FIGURE
						this.traj8angle+=this.trajspeed;
						switch(this.traj8section) {
							case 0:
								this.trajX=this.initX-Math.sin(this.traj8angle)*moveScale;
								this.trajY=this.initY+moveScale-Math.cos(this.traj8angle)*moveScale;
								if (Math.sin(this.traj8angle) > Math.sin(this.traj8angle+this.trajspeed)) {
										this.traj8angle=0;
										this.trajX=this.initX-moveScale+Math.sin(this.traj8angle)*moveScale;
										this.trajY=this.initY+Math.cos(this.traj8angle)*moveScale;
										this.traj8section++;
									}
								break;
							case 1:
								this.trajX=this.initX-moveScale+Math.sin(this.traj8angle)*moveScale;
								this.trajY=this.initY+Math.cos(this.traj8angle)*moveScale;
								if (Math.cos(this.traj8angle) < Math.cos(this.traj8angle+this.trajspeed)) {
										this.traj8angle=0;
										this.trajX=this.initX-Math.cos(this.traj8angle)*moveScale;
										this.trajY=this.initY-moveScale+Math.sin(this.traj8angle)*moveScale;

										this.traj8section++;
									}
								break;
							case 2:
								this.trajX=this.initX-Math.cos(this.traj8angle)*moveScale;
								this.trajY=this.initY-moveScale+Math.sin(this.traj8angle)*moveScale;
								if (Math.cos(this.traj8angle) < Math.cos(this.traj8angle+this.trajspeed)) {
										this.traj8angle=0;
										this.trajX=this.initX+moveScale-Math.sin(this.traj8angle)*moveScale;
										this.trajY=this.initY-Math.cos(this.traj8angle)*moveScale;
										this.traj8section++;
									}
								break;
							case 3:
								this.trajX=this.initX+moveScale-Math.sin(this.traj8angle)*moveScale;
								this.trajY=this.initY-Math.cos(this.traj8angle)*moveScale;
								if (Math.cos(this.traj8angle) < Math.cos(this.traj8angle+this.trajspeed)) {
										this.traj8angle=0;
										this.trajX=this.initX+Math.cos(this.traj8angle)*moveScale;
										this.trajY=this.initY+moveScale-Math.sin(this.traj8angle)*moveScale;
										this.traj8section++;
									}
								break;
							case 4:
								this.trajX=this.initX+Math.cos(this.traj8angle)*moveScale;
								this.trajY=this.initY+moveScale-Math.sin(this.traj8angle)*moveScale;
								if (Math.sin(this.traj8angle) > Math.sin(this.traj8angle+this.trajspeed)) {
										this.traj8angle=0;
										this.trajX=this.initX-Math.sin(this.traj8angle)*moveScale;
										this.trajY=this.initY+moveScale-Math.cos(this.traj8angle)*moveScale;
										this.traj8section=0;
									}
								break;
						}
						break;
				}
				
				if (this.lifeTime == 0) {
					this.trajpX = this.trajX;
					this.trajpY = this.trajY;
				}
				// ATTRACT TO TRAJXY
				this.x += (this.trajX - this.trajpX)/2;
				this.y += (this.trajY - this.trajpY)/2;
			}
			// -------------------------------------------------------
			// INTERACTION MOVE
			Creature.prototype.moveInteraction = function() {
				if (this.lifeTime > 0) {
					if (creaturesArr[1]) {
						for (j=0;j<creaturesArr.length;j++) {
							if (j != this.index) {
								var xDifference = (creaturesArr[j].x-this.x)*interactionMag;
								var yDifference = (creaturesArr[j].y-this.y)*interactionMag;
								switch (creaturesTypeArr[this.type].interaction[creaturesArr[j].type]) {
									case 2: // repel
										if (xDifference < 1 && xDifference > -1) {
											if (xDifference > 0.5) {
												this.x--;
											} else if (xDifference < -0.5) {
												this.x++;
											}
										} else {
											this.x -= xDifference;
										}
										
										if (yDifference < 1 && yDifference > -1) {
											if (yDifference > 0.5) {
												this.y--;
											} else if (yDifference < -0.5 ) {
												this.y++;
											}
										} else {
											this.y -= yDifference;
										}
										break;
									case 3: // attract
										if (xDifference < 1 && xDifference > -1) {
											if (xDifference > 0.5) {
												this.x++;
											} else if (xDifference < -0.5) {
												this.x--;
											}
										} else {
											this.x += xDifference;
										}
										
										if (yDifference < 1 && yDifference > -1) {
											if (yDifference > 0.5) {
												this.y++;
											} else if (yDifference < -0.5 ) {
												this.y--;
											}
										} else {
											this.y += yDifference;
										}
										break;
								}
							}
						}
					}
				}
			}
			// -------------------------------------------------------
			Creature.prototype.display = function() {
					ctx.beginPath();
					ctx.moveTo(this.pX,this.pY);
					ctx.lineTo(this.x,this.y);
					ctx.lineWidth = 1;
					ctx.strokeStyle = creaturesTypeArr[this.type].color;
					ctx.stroke();
			}
			Creature.prototype.live = function() {
				this.move();
				this.moveInteraction();
				if (this.visible) this.display();
				this.lifeTime++;
			}
			// CREATE CREATURES
			var curPage = -1;
			var pages = ['praça','esquina','cidades','tecido','fábrica'];
			var pageTitle = document.title;
			for (var i = 0; i < pages.length+1 ; i++) {
				if (pageTitle.indexOf(pages[i]) != -1) {
					curPage = i;
					break;
				} else if (i == pages.length) {
					curPage = i;
				}
			}
			switch(curPage) {
				case 0:
					creaturesTypeArr[0] = new CreatureType('01','#BC5C24',200,1,5);
					curType = 0;
					creaturesArr[creaturesArr.length] = new Creature(300,150);
					setTimeout(function() {
						creaturesArr[creaturesArr.length] = new Creature(299,152);
						}, 800);
					setTimeout(function() {
						creaturesArr[creaturesArr.length] = new Creature(300,149);
						}, 1200);
					setTimeout(function() {
						creaturesTypeArr[1] = new CreatureType('01','#BC5C24',150,1,1);
						creaturesTypeArr[1].interaction[0] = 3;
						curType = 1;
						creaturesArr[creaturesArr.length] = new Creature(180,90);
						}, 1500);
					setTimeout(function() {
						creaturesArr[creaturesArr.length] = new Creature(150,150);
						}, 2200);
					setTimeout(function() {
						creaturesArr[creaturesArr.length] = new Creature(270,200);
						}, 2700);
					setTimeout(function() {
						creaturesArr[creaturesArr.length] = new Creature(380,170);
						}, 3500);
					break;
				case 1:
					creaturesTypeArr[0] = new CreatureType('01','#53B091',150,1,3);
					curType = 0;
					creaturesArr[creaturesArr.length] = new Creature(300,300);
					setTimeout(function() {
						creaturesArr[creaturesArr.length] = new Creature(150,200);
						}, 800);
					setTimeout(function() {
						creaturesArr[creaturesArr.length] = new Creature(100,280);
						}, 1200);
					setTimeout(function() {
						creaturesArr[creaturesArr.length] = new Creature(400,180);
						}, 1500);
					setTimeout(function() {
						creaturesArr[creaturesArr.length] = new Creature(320,120);
						}, 2200);
					setTimeout(function() {
						creaturesArr[creaturesArr.length] = new Creature(120,90);
						}, 2700);
					break;
				case 3:
					creaturesTypeArr[0] = new CreatureType('01','#BC3582',200,1,1);
					creaturesTypeArr[0].interaction[0] = 3;
					curType = 0;
					creaturesArr[creaturesArr.length] = new Creature(280,200);
					setTimeout(function() {
						creaturesArr[creaturesArr.length] = new Creature(200,100);
						}, 800);
					setTimeout(function() {
						creaturesArr[creaturesArr.length] = new Creature(150,150);
						}, 1200);
					setTimeout(function() {
						creaturesArr[creaturesArr.length] = new Creature(250,180);
						}, 1500);
					setTimeout(function() {
						creaturesArr[creaturesArr.length] = new Creature(230,140);
						}, 2200);
					setTimeout(function() {
						creaturesArr[creaturesArr.length] = new Creature(190,90);
						}, 2700);
					setTimeout(function() {
						creaturesTypeArr[1] = new CreatureType('01','#BC3582',80,1,8);
						creaturesTypeArr[1].interaction[0] = 3;
						curType = 1;
						creaturesArr[creaturesArr.length] = new Creature(330,90);
						}, 3500);
					setTimeout(function() {
						creaturesArr[creaturesArr.length] = new Creature(260,150);
						}, 4000);
					setTimeout(function() {
						creaturesArr[creaturesArr.length] = new Creature(340,147);
						}, 4400);
					break;
				case 2:
					creaturesTypeArr[0] = new CreatureType('01','#796A8C',200,1,3);
					creaturesTypeArr[0].interaction[0] = 3;
					creaturesTypeArr[0].interaction[1] = 3;
					curType = 0;
					creaturesArr[creaturesArr.length] = new Creature(280,200);
					setTimeout(function() {
						creaturesArr[creaturesArr.length] = new Creature(230,130);
						}, 800);
					setTimeout(function() {
						creaturesArr[creaturesArr.length] = new Creature(280,180);
						}, 1200);
					setTimeout(function() {
						creaturesArr[creaturesArr.length] = new Creature(250,200);
						}, 1500);
					setTimeout(function() {
						creaturesArr[creaturesArr.length] = new Creature(300,160);
						}, 2200);
					setTimeout(function() {
						creaturesArr[creaturesArr.length] = new Creature(200,120);
						}, 2700);
					setTimeout(function() {
						creaturesTypeArr[1] = new CreatureType('01','#796A8C',80,1,1);
						creaturesTypeArr[1].interaction[0] = 3;
						creaturesTypeArr[1].interaction[1] = 3;
						curType = 1;
						creaturesArr[creaturesArr.length] = new Creature(330,90);
						creaturesArr[creaturesArr.length-1].visible = false;
						}, 3500);
					setTimeout(function() {
						creaturesArr[creaturesArr.length] = new Creature(260,150);
						creaturesArr[creaturesArr.length-1].visible = false;
						}, 4000);
					setTimeout(function() {
						creaturesArr[creaturesArr.length] = new Creature(340,147);
						creaturesArr[creaturesArr.length-1].visible = false;
						creaturesArr[creaturesArr.length] = new Creature(340,147);
						creaturesArr[creaturesArr.length-1].visible = false;
						creaturesArr[creaturesArr.length] = new Creature(340,147);
						creaturesArr[creaturesArr.length-1].visible = false;
						}, 4400);
					break;
				case 4:
					creaturesTypeArr[0] = new CreatureType('01','#EF1D2D',200,1,3);
					curType = 0;
					creaturesArr[creaturesArr.length] = new Creature(200,150);
					setTimeout(function() {
						creaturesArr[creaturesArr.length] = new Creature(200,150);
						}, 800);
					setTimeout(function() {
						creaturesArr[creaturesArr.length] = new Creature(200,150);
						}, 1200);
					setTimeout(function() {
						creaturesArr[creaturesArr.length] = new Creature(200,150);
						}, 1300);
					setTimeout(function() {
						creaturesArr[creaturesArr.length] = new Creature(199,150);
						}, 1900);
					setTimeout(function() {
						creaturesArr[creaturesArr.length] = new Creature(200,150);
						}, 2500);
					setTimeout(function() {
						creaturesArr[creaturesArr.length] = new Creature(200,150);
						}, 3000);
					setTimeout(function() {
						creaturesArr[creaturesArr.length] = new Creature(202,152);
						}, 4000);
					setTimeout(function() {
						creaturesTypeArr[1] = new CreatureType('01','#EF1D2D',100,1,6);
						creaturesTypeArr[1].interaction[0] = 3;
						creaturesTypeArr[1].interaction[1] = 2;
						curType = 1;
						creaturesArr[creaturesArr.length] = new Creature(280,150);
						}, 4200);
					setTimeout(function() {
						creaturesArr[creaturesArr.length] = new Creature(240,150);
						}, 6000);
					setTimeout(function() {
						creaturesArr[creaturesArr.length] = new Creature(350,190);
						}, 7000);
					break
				case 5:
					creaturesTypeArr[1] = new CreatureType('path','#fff',300,1,8);
					curType = 1;
					creaturesArr[creaturesArr.length] = new Creature(300,300);
					creaturesArr[creaturesArr.length-1].visible = false;
					creaturesArr[creaturesArr.length] = new Creature(300,300);
					creaturesArr[creaturesArr.length-1].visible = false;
					creaturesArr[creaturesArr.length] = new Creature(300,300);
					creaturesArr[creaturesArr.length-1].visible = false;
					creaturesArr[creaturesArr.length] = new Creature(300,300);
					creaturesArr[creaturesArr.length-1].visible = false;
					creaturesArr[creaturesArr.length] = new Creature(300,300);
					creaturesArr[creaturesArr.length-1].visible = false;
					creaturesTypeArr[0] = new CreatureType('01','#458782',100,1,1);
					creaturesTypeArr[0].interaction[1]=3;
					creaturesTypeArr[0].interaction[0]=2;
					curType = 0;
					setTimeout(function() {
						creaturesArr[creaturesArr.length] = new Creature(150,260);
					}, 800);
					setTimeout(function() {
						creaturesArr[creaturesArr.length] = new Creature(180,280);
					}, 1500);
					setTimeout(function() {
						creaturesArr[creaturesArr.length] = new Creature(200,350);
					}, 2200);
					setTimeout(function() {
						creaturesArr[creaturesArr.length] = new Creature(450,390);
					}, 2800);
					break;
			}
			// -------------------------------------------------------
			// CANVAS DRAW
			setInterval(function() {
				
				// GET CANVAS SIZES FOR EVERY FRAME
				height = mainCanvas.height;
				width = mainCanvas.width;
				
				// DRAW BACKGROUND & FADE
				if (curFadeStep == fadeSteps) {
				ctx.rect(0,0,width,height);
				ctx.fillStyle = 'rgba(255,255,255,'+fadeMag+')';
				ctx.fill();
				curFadeStep = 0;
				} else {
					curFadeStep++;
				}
				
				// UPDATE CREATURES
				if (creaturesArr[0]) {
					for (var i=0; i<creaturesArr.length; i++) {
						creaturesArr[i].live();
					}
				}
									
			},33);
		}			
	} else {
		// DISPLAY NO CANVAS ERROR
	}
	// -------------------------------------------------------

});