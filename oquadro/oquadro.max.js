jQuery.noConflict();

jQuery(document).ready(function($) {
	// -------------------------------------------------------
	// GET WINDOW SIZE
	
	function resizeCanvas() {
		var winW = 1024, winH = 768;
		
		if (document.body && document.body.offsetWidth) {
		 winW = document.body.offsetWidth;
		 winH = document.body.offsetHeight;
		}
		if (document.compatMode=='CSS1Compat' &&
		    document.documentElement &&
		    document.documentElement.offsetWidth ) {
		 winW = document.documentElement.offsetWidth;
		 winH = document.documentElement.offsetHeight;
		}
		if (window.innerWidth && window.innerHeight) {
		 winW = window.innerWidth;
		 winH = window.innerHeight;
		}
		
		$('#mainCanvas').attr({
			width: winW,
			height: winH
		});
	}
	
	resizeCanvas();
	$(window).resize(function() {resizeCanvas();});
	
	// -------------------------------------------------------
	// CANVAS INTERACTION
	var mainCanvas = document.getElementById('mainCanvas');
	if (mainCanvas && mainCanvas.getContext('2d')) {
		var ctx = mainCanvas.getContext('2d');
		if (ctx != null) {
			
			// -------------------------------------------------------
			// GLOBAL VARIABLE SETUP
			
			var appRunning = false;
			
			var visMode = 1;
			
			var soundVol = 90;
			var soundOn = true
			
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
			// CREATURES SETUP
			
			var curType = 0;
			var creaturesTypeArr = new Array();
			var creaturesTypeArrMax = 6;
			var creaturesArr = new Array();
			
			// -------------------------------------------------------
			// COLORS ARRAY
			
			var namesArr = ['Pedestre','Ciclista','Idoso','Criança','Adolescente','Skatista','Policial','Padeiro','Vendedor','Catador de Lixo','Bicicleta','Bueiro','Semáforo','Rua','Calçada','Loja','Casa','Casarão','Casinha','Prédio','Museu','Avenida','Poste','Banca de Jornal','Barraco','Hotel','Comércio','Vendinha','Feira','Faculdade','Porta','Homem','Mulher','Senhor','Bebê','Cachorro','Pato','Cavalo','Chuva','Sol','Vento','Árvore','Parque','Praça','Banco', 'Banco'];
			var colorsArr = ['000000','505050','FFFFFF','225C66','004966','3B0099','7F0C00','660C00','7F3430','662C00','CCBB42','49DB64','339944','00A898','787878','B4B4B4','8BB8C6','318399','005F99','6D00CC','66007F','CC2200','994734','664123','CC5C00','B2CC44','42CC5C','00D89A','DCDCDC','4AC2CC','40A8CC','0075CC','9500FF','B200CC','FF3600','CC6144','CC8544','FF7900','998A33','997F00','606624','00CC92','50CFD8','266466','0086FF','C480FF','F685FF','E600FF','FF7B52','FFA852','E5CA2E','E0BF00','CCAA00','96580C','1B4C20','007F55'];
			
			// -------------------------------------------------------
						
			function createBlankCreatureType() {
				var newCreatureIndex = creaturesTypeArr.length;
				var name = Math.floor((Math.random()*45));
				creaturesTypeArr[newCreatureIndex] = new CreatureType(namesArr[name],'#'+colorsArr[0],100,1,1);
			}
			function CreatureType(name,color,size,sound,path) {
				this.index = curType;
				this.name = name;
				this.color = color;
				this.size = size;
				this.path = path;
				this.sound = sound;
				this.firstSound = false;
				this.soundPlaying = [0,1];
				this.interaction = new Array(creaturesTypeArrMax);
				for (i=0;i<this.interaction.length;i++) {
					this.interaction[i] = 1;
				}
				console.log('New creature index:'+this.index);
			}
			
			CreatureType.prototype.sounds = function() {
			
				var typeExists = false;
				for (var i=0; i<creaturesArr.length; i++) {
					if (creaturesArr[i].type == this.index) {
						typeExists = true;
						break;
					}
				}
				
				if (typeExists) {
					if (this.firstSound == false) {
						var curIndex = this.index;
						setTimeout(function() {
							creaturesTypeArr[curIndex].soundPlaying[1] = 0;
						}, 3000);
						this.firstSound = true;
					}
					for (var i = 0;i < this.soundPlaying.length;i++) {
						if (this.soundPlaying[i] == 0) {
							
							this.soundPlaying[i] = 1;
							var pan = 0;
							var pitch = 0;
							
							// GET DIMENSIONS
						
							var minX = width;
							var minY = height;
							var maxX = 0;
							var maxY = 0;
							var midX = 0;
							var midY = 0;
							var sumY = 0;
							var yNumber = 0;
							var leftMag = 0;
							var rightMag = 0;
							var upMag = 0;
							var downMag = 0;
							var leftNumber = 0;
							var rightNumber = 0;
							
							for (var j=0; j<creaturesArr.length; j++) {
								if (creaturesArr[j].type == this.index) {
									var x = Math.floor(creaturesArr[j].x);
									var y = Math.floor(creaturesArr[j].y);
									if (x < minX) minX = x;
									if (x > maxX) maxX = x;
									if (y < minY) minY = y;
									if (y > maxY) maxY = y;					
								}
							}
							
							midX = Math.floor(minX+((maxX - minX)/2));
							midY = Math.floor(minY+((maxY - minY)/2));
							
							for (var j=0; j<creaturesArr.length; j++) {
								if (creaturesArr[j].type == this.index) {
									var x = Math.floor(creaturesArr[j].x);
									var y = Math.floor(creaturesArr[j].y);
									if (x < midX) {
										leftMag+= midX-x;
										leftNumber++;
									} else if (x > midX) {
										rightMag+= x-midX;
										rightNumber++;
									}
									if (y < midY) {
										upMag+= midY-y;
									} else if (y > midY) {
										downMag+= y-midY;
									}
									yNumber++;
									sumY += y-minY;
								}
							}
							
							// CALCULATE PAN
							
							if (midX == minX && midX == maxX) {
								pan = 0;
							} else if (leftMag > rightMag) {
								pan = Math.floor(-100*((leftMag/leftNumber)/(midX-minX)));
							} else {
								pan = Math.floor(100*((rightMag/rightNumber)/(maxX-midX)));
							}
							
							// CALCULATE PITCH
							
							var pitchRange = 0; // first sound for pitch
							
							if (yNumber != 1) {
								pitch = Math.floor((sumY/yNumber)/(maxY-minY)*10); // gives a number between 0.0-1.0
							} else {
								pitch = Math.floor(midY/height*10);
							}
							
							// PLAY SOUND
							
							var curIndex = this.index;
							var soundIndex = i;
							var soundId = this.index+'_'+(this.sound-1)+'_'+i+'_'+pitch;
							
							//console.log('playing sound: '+soundId);
							
							if ((this.sound != 5 && this.soundPlaying != 1) || (this.sound != 6 && this.soundPlaying !=1)) {
								soundManager.play(soundId,{
									volume: soundVol,
									pan: pan,
									onfinish: function() {
										creaturesTypeArr[curIndex].soundPlaying[soundIndex] = 0;
									}
								});
							}
							
							
							//console.log('midX :'+midX+' minX:'+minX+' maxX:'+maxX+' leftMag:'+leftMag+' rightMag:'+rightMag+' pan:'+pan+' pitch:'+pitch);
							
						}
					}
				}
				
			}
			
			// -------------------------------------------------------
			// INIT FIRST CREATURE AND ESSENTIAL VARIABLES
			function createRandomCreatureType() {
				var name = Math.floor((Math.random()*45));
				var size = Math.floor((Math.random()*107)+100);
				var color = Math.floor((Math.random()*56));
				var sound = Math.floor((Math.random()*3)+1);
				var path = Math.floor((Math.random()*6)+1);
				creaturesTypeArr[creaturesTypeArr.length] = new CreatureType(namesArr[name],'#'+colorsArr[color],size,sound,path);
			}
			createRandomCreatureType();
			// -------------------------------------------------------
			// CREATURES
			function Creature(x,y) {
				this.type = curType;
				this.index = creaturesArr.length;
				this.lifeTime = 0;
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
			// DISPLAY
			Creature.prototype.display = function() {
				if (visMode < 3) {
					ctx.beginPath();
					ctx.moveTo(this.pX,this.pY);
					ctx.lineTo(this.x,this.y);
					ctx.lineWidth = 1;
					ctx.strokeStyle = creaturesTypeArr[this.type].color;
					ctx.stroke();
				} else {
					ctx.globalAlpha = 0.8;
					ctx.fillStyle = creaturesTypeArr[this.type].color;
					ctx.beginPath();
					ctx.arc(this.x,this.y,6,0,2*Math.PI, false);
					ctx.fill();
					ctx.globalAlpha = 1;
				}
			}
			// -------------------------------------------------------
			// CREATURE LIVE
			Creature.prototype.live = function() {
				this.move();
				this.moveInteraction();
				this.display();
				this.lifeTime++;
			}
			// -------------------------------------------------------
			// CLICK TO CREATE NEW CREATURE
			$('#mainCanvas').click(function(e) {
				if (appRunning) {
					var mouseX = e.pageX - $('#mainCanvas').offset().left;
					var mouseY = e.pageY - $('#mainCanvas').offset().top;
					creaturesArr[creaturesArr.length] = new Creature(mouseX,mouseY);
					console.log('Number of creatures is: '+creaturesArr.length);
				}
			});
			// -------------------------------------------------------
			// CANVAS DRAW
			setInterval(function() {
				
				// GET CANVAS SIZES FOR EVERY FRAME
				height = mainCanvas.height;
				width = mainCanvas.width;
				
				// DRAW BACKGROUND & FADE
				switch(visMode) {
					case 0:
						break;
					case 1:
						if (curFadeStep == fadeSteps) {
						ctx.rect(0,0,width,height);
						ctx.fillStyle = 'rgba(240,240,240,'+fadeMag+')';
						ctx.fill();
						curFadeStep = 0;
						} else {
							curFadeStep++;
						}
						break;
					case 2:
					case 3:
						ctx.rect(0,0,width,height);
						ctx.fillStyle = 'rgba(240,240,240,'+0.9+')';
						ctx.fill();
						break;
				}
				
				// UPDATE CREATURES AND SOUND
				if (creaturesArr[0]) {
					for (var i=0; i<creaturesArr.length; i++) {
						creaturesArr[i].live();
					}
					// SOUND
					if (soundOn) {
						for (var i=0; i<creaturesTypeArr.length; i++) {
							creaturesTypeArr[i].sounds();
						}
					}
				}
				
									
			},33);
			// -------------------------------------------------------
			// OBJECT EDITOR CALL
			function objEditorCallDisplay() {
				var objEditorCall = '<div id="objEditorCall"></div>';
				$('#mainWrapper').append(objEditorCall);
				$('#objEditorCall').css('background-color',creaturesTypeArr[curType].color);
				$('#objEditorCall').fadeIn(1000);
				$('#objEditorCall').hover(function() {
					if ($('#objEditor').length > 0) {
						$('#objEditor').animate({opacity:0.5},200);
					} else if ($('#appMenu').length > 0) {
						$('#appMenu').animate({opacity:0.5},200);
						$('#appMenuCall').animate({opacity:0.5},200);
						$('#objEditorCall').animate({opacity:1},200);
					} else {
						$('#objEditorCall').css('border-color','#f8f8f8');
					}
				}, function() {
					if ($('#objEditor').length > 0) {
						$('#objEditor').animate({opacity:1},200);
						$('#objEditorCall').css({'opacity':'01','border-color':'#fff'});
					} else if ($('#appMenu').length > 0) {
						$('#appMenu').animate({opacity:1},200);
						$('#appMenuCall').animate({opacity:1},200);
						$('#objEditorCall').animate({opacity:0.5},200);
					} else {
						$('#objEditorCall').css('border-color','#fff');
					}
				});
				$('#objEditorCall').click(function() {
					if ($('#objEditor').length > 0) {
						$('#objEditor').fadeOut(200,function() {
							$('#objEditor').remove();
						});
						$('#appMenuCall').animate({opacity:1},200);
					} else if ($('#appMenu').length > 0) {
						$('#appMenu').fadeOut(200,function() {
							$('#appMenu').remove();
							objectEditorDisplay();
							$('#objEditorCall').css({'opacity':'01','border-color':'#fff'});
						});
						$('#appMenuCall').animate({opacity:0.5},200);
					} else {
						objectEditorDisplay();
						$('#objEditorCall').css({'opacity':'01','border-color':'#fff'});
						$('#appMenuCall').animate({opacity:0.5},200)
					}
				});
			}
			// -------------------------------------------------------
			// OBJECT EDITOR DISPLAY
			function objectEditorDisplay() {
				var objectEditor = '<article id="objEditor"> 				<ul id="objEd-Index"></ul> 				<input id="objEd-Name" type="text" value="Círculo" maxlength="32" /> 				<div id="objEd-Color" class="objEd-Option"> 					<h2>Cor</h2> 				</div> 				<div id="objEd-Size" class="objEd-Option"> 					<h2>Tamanho</h2> 				</div> 				<div id="objEd-Trajectory" class="objEd-Option"> 					<h2>Trajetória</h2> 				</div> 				<div id="objEd-Interaction" class="objEd-Option"> 					<h2>Interação</h2> 				</div> 				<div id="objEd-Sound" class="objEd-Option"> 					<h2>Som</h2> 				</div></article>';
					$('#mainWrapper').append(objectEditor);
					objectEditorLoad();
					$('#objEditor').fadeIn(200);
			}
			// -------------------------------------------------------
			// OBJECT EDITOR UPDATE
			function objectEditorUpdate() {
				var objectEditorUpdate = '<ul id="objEd-Index"></ul> 				<input id="objEd-Name" type="text" value="Círculo" maxlength="32" /> 				<div id="objEd-Color" class="objEd-Option"> 					<h2>Cor</h2> 				</div> 				<div id="objEd-Size" class="objEd-Option"> 					<h2>Tamanho</h2> 				</div> 				<div id="objEd-Trajectory" class="objEd-Option"> 					<h2>Trajetória</h2> 				</div> 				<div id="objEd-Interaction" class="objEd-Option"> 					<h2>Interação</h2> 				</div> 				<div id="objEd-Sound" class="objEd-Option"> 					<h2>Som</h2> 				</div> 				<div id="objEditor-close"></div>';
				$('#objEditor').html(objectEditorUpdate);
				objectEditorLoad();
			}
			// -------------------------------------------------------
			// OBJECT EDITOR
			function objectEditorLoad() {
				// -------------------------------------------------------
				// INIT EDITOR
				(function() {
					// LOAD INDEX, NAME AND COLOR
					$('#objEd-Index').html('');
					for (i=0;i<creaturesTypeArr.length;i++) {
						var index = "0"+(i+1);
						$('#objEd-Index').append('<li class="objEd-ObjIndex">'+index+'</li>');
					}
					if (creaturesTypeArr.length < creaturesTypeArrMax) {
						var objEdAdd = '<li id="objEd-Index-Add"><img src="img/settings/set_plus.png" alt="create objet" width="8px" height="8px" /></li>';
						$('#objEd-Index').append(objEdAdd);
					}
					var curTypeIndex = curType+1;
					$('#objEd-Index li:nth-child('+curTypeIndex+')').addClass('active');
					$('#objEd-Name').val(creaturesTypeArr[curType].name).css('border-color',creaturesTypeArr[curType].color);
					$('#objEditorCall').css('background-color',creaturesTypeArr[curType].color);					
				})();
				// -------------------------------------------------------
				// INDEX
				$('#objEd-Index li.objEd-ObjIndex').click(function() {
					curType = $(this).index();
					objectEditorUpdate();
				});
				// -------------------------------------------------------
				// ADD OBJECT
				$('#objEd-Index-Add').click(function() {
					curType = creaturesTypeArr.length;
					createRandomCreatureType();
					objectEditorUpdate();
				});
				// -------------------------------------------------------
				// NAME SELECTION
				$('#objEd-Name').keyup(function() {
					creaturesTypeArr[curType].name = $(this).val();
					var objEdNameIndex = curType+1;
					$('#objEd-Interacao tr:nth-child('+objEdNameIndex+')').children('td:nth-child(3)').html(creaturesTypeArr[curType].name);
				});
				// -------------------------------------------------------
				// LOAD COLORS
				function objEdLoadColors() {
					$('#objEd-Color').append('<div id="objEd-Colors"></div>');
					for (i=0;i<colorsArr.length;i++) {
						$('#objEd-Colors').append('<div class="objEd-colorSelect" id="objEdCor-'+colorsArr[i]+'"></div>');
						$('#objEdCor-'+colorsArr[i]).css('background-color','#'+colorsArr[i]);
						if (creaturesTypeArr[curType].color == '#'+colorsArr[i]) {
							$('#objEdCor-'+colorsArr[i]).addClass('active');
						}
					}
					$('#objEd-Colors div').click(function(e) {
						var selectedColor = $(this).attr('id');
						selectedColor = selectedColor.replace('objEdCor-','#');
						console.log('color selected: '+selectedColor);
						if (selectedColor != creaturesTypeArr[curType].color) {
							creaturesTypeArr[curType].color = selectedColor;
							$('#objEditorCall').css('background-color',creaturesTypeArr[curType].color);
							$(this).addClass('active').siblings().removeClass('active');
							$('#objEd-Name').css('border-color',creaturesTypeArr[curType].color);
							var curTypeIndex = curType + 1;
							$('#objEd-Interacao tr:nth-child('+curTypeIndex+')').children('td:nth-child(2)').css('background-color',creaturesTypeArr[curType].color);
						}
						e.stopPropagation();
					});
					$('#objEd-Colors').slideDown(200);
				}
				$('#objEd-Color').click(function() {
					$(this).addClass('active');
					objEdCloseTabs();
					objEdLoadColors();
				});
				// -------------------------------------------------------
				// LOAD SIZE
				function objEdLoadSize() {
					$('#objEd-Size').append('<div id="objEd-Size-Slider"></div>');
					$('#objEd-Size-Slider').slider({
						min: 50,
						max: 300,
						value: creaturesTypeArr[curType].size,
						change: function(event, ui) {
							creaturesTypeArr[curType].size = $('#objEd-Size-Slider').slider('option','value');
						},
						slide : function(event, ui) {
							creaturesTypeArr[curType].size = $('#objEd-Size-Slider').slider('option','value');
						}
					});
					$('#objEd-Size-Slider').slider('option','value',creaturesTypeArr[curType].size);
					$('#objEd-Size-Slider').slideDown(200);	
				}
				$('#objEd-Size').click(function() {
					$(this).addClass('active');
					objEdCloseTabs();
					objEdLoadSize();
				});
				// -------------------------------------------------------
				// LOAD TRAJECTORY
				function objEdLoadTraj() {
					$('#objEd-Trajectory').append('<div id="objEd-Traj-Options"></div>');
					for (i=0;i<8;i++) {
						var trajImg = 'traj_0'+(i+1);
						$('#objEd-Traj-Options').append('<img src="img/editor/'+trajImg+'.png" alt="trajetoria 06" width="50px" height="50px" />');
					}
					$('#objEd-Traj-Options img:nth-child('+creaturesTypeArr[curType].path+')').addClass('active');
					$('#objEd-Traj-Options img').click(function(e) {
						var index = $(this).index()+1;
						if (index != creaturesTypeArr[curType].path) {
								creaturesTypeArr[curType].path = index;
								curTraj = creaturesTypeArr[curType].path;
								$('#objEd-Traj-Options img.active').removeClass('active');
								$('#objEd-Traj-Options img:nth-child('+curTraj+')').addClass('active');
							}
						e.stopPropagation();
					});
					$('#objEd-Traj-Options').slideDown(200);
				}
				$('#objEd-Trajectory').click(function() {
					$(this).addClass('active');
					objEdCloseTabs();
					objEdLoadTraj();
				});
				// -------------------------------------------------------
				// LOAD INTERACTION
				function objEdLoadInteraction() {
					$('#objEd-Interaction').append('<div id="objEd-Int-Options"><table></table></div>');
					for (i=0;i<creaturesTypeArr.length;i++) {
						var objRow = i+1;
						$('#objEd-Int-Options table').append('<tr><td></td><td></td><td>ignorar</td><td>repelir</td><td>atrair</td></tr>');
						$('#objEd-Int-Options tr:nth-child('+objRow+')').children('td:nth-child(1)').html('0'+objRow);
						$('#objEd-Int-Options tr:nth-child('+objRow+')').children('td:nth-child(2)').css('background-color',creaturesTypeArr[i].color);
						var interaction = creaturesTypeArr[curType].interaction[i] + 2;
						$('#objEd-Int-Options tr:nth-child('+objRow+')').children('td:nth-child('+interaction+')').addClass('active');
					}
					$('#objEd-Int-Options').slideDown(200);
					$('#objEd-Int-Options td').click(function(e) {
						var intClicked = $(this).index()-1; // 1 2 3
						var typeClicked = $(this).parent().index(); // 0 1 2..
						var prevInt = creaturesTypeArr[curType].interaction[typeClicked];
						if (intClicked != prevInt && intClicked > 0) {
							creaturesTypeArr[curType].interaction[typeClicked] = intClicked;
							typeClicked++;
							prevInt+=2;
							intClicked+=2;
							$('#objEd-Int-Options tr:nth-child('+typeClicked+')').children('td:nth-child('+prevInt+')').removeClass('active');
							$('#objEd-Int-Options tr:nth-child('+typeClicked+')').children('td:nth-child('+intClicked+')').addClass('active')
						}
						e.stopPropagation();
					});
				}
				$('#objEd-Interaction').click(function() {
					$(this).addClass('active');
					objEdCloseTabs();
					objEdLoadInteraction();
				});
				// -------------------------------------------------------
				// LOAD SOUND
				function objEdLoadSound() {
					$('#objEd-Sound').append('<div id="objEd-Sound-Options"><ul></ul></div>');
					for (var i=0;i<sounds.length;i++) {
						var itemIndex = '0'+(i+1);
						$('#objEd-Sound-Options ul').append('<li>'+itemIndex+'</li>');
					}
					var sound = creaturesTypeArr[curType].sound;
					$('#objEd-Sound-Options li:nth-child('+sound+')').addClass('active');
					$('#objEd-Sound-Options').slideDown(200);
					$('#objEd-Sound-Options li').click(function(e) {
						creaturesTypeArr[curType].sound = $(this).index() + 1;
						console.log('New creature sound: '+creaturesTypeArr[curType].sound);
						$(this).addClass('active').siblings().removeClass('active');
						e.stopPropagation();
					});
				}
				$('#objEd-Sound').click(function() {
					$(this).addClass('active');
					objEdCloseTabs();
					objEdLoadSound();
				});
				// -------------------------------------------------
				// OPEN & CLOSE OBJECT EDITOR TABS
				function objEdCloseTabs() {
					var tabsArr = ['objEd-Colors','objEd-Size-Slider','objEd-Traj-Options','objEd-Int-Options','objEd-Sound-Options'];
					for (i=0;i<tabsArr.length;i++) {
						var tagExists = $('#'+tabsArr[i]);
						if (tagExists) {
							tagExists.parent().removeClass('active');
							tagExists.hide(200, function() {
								$(this).remove();
							});
						}
					}
				}
				// -------------------------------------------------------
			}
			// END OF OBJECT EDITOR
			// -------------------------------------------------------
			// -------------------------------------------------------
			// APP MENU CALL DISPLAY
			function appMenuCallDisplay() {
				var appMenuCall = '<div id="appMenuCall"><img src="img/settings/appmenucall.png" /></div>';
				$('#mainWrapper').append(appMenuCall);
				$('#appMenuCall').fadeIn(1000);
				$('#appMenuCall').hover(function() {
					if ($('#objEditor').length > 0) {
						$('#appMenuCall').animate({opacity:1},200);
						$('#objEditor').animate({opacity:0.5},200);
						$('#objEditorCall').animate({opacity:0.5},200);
					} else if ($('#appMenu').length > 0) {
						$('#appMenu').animate({opacity:0.5},200);
					} else {
						$('#appMenuCall').css({'border-color':'#f8f8f8','background-color':'#f8f8f8'});
					}
				}, function() {
					if ($('#objEditor').length > 0) {
						$('#objEditor').animate({opacity:1},200);
						$('#objEditorCall').animate({opacity:1},200);
						$('#appMenuCall').animate({opacity:0.5},200);
					} else if ($('#appMenu').length > 0) {
						$('#appMenu').animate({opacity:1},200);
						$('#appMenuCall').css({'opacity':'01','border-color':'#fff','background-color':'#fff'});
					} else {
						$('#appMenuCall').css({'border-color':'#fff','background-color':'#fff'});
					}
				});
				$('#appMenuCall').click(function() {
					if ($('#appMenu').length > 0) {
						$('#appMenu').fadeOut(200,function() {
							$('#appMenu').remove();
						});
						$('#objEditorCall').animate({opacity:1},200);
					} else if ($('#objEditor').length > 0) {
						$('#objEditor').fadeOut(200,function() {
							$('#objEditor').remove();
						});
						appMenuDisplay();
						$('#appMenuCall').css({'opacity':'01','border-color':'#fff','background-color':'#fff'});
						$('#objEditorCall').animate({opacity:0.5},200);
					} else {
						$('#objEditorCall').animate({opacity:0.5},200);
						appMenuDisplay();
						$('#appMenuCall').css({'opacity':'01','border-color':'#fff','background-color':'#fff'});
					}
				});
			}
			// -------------------------------------------------------
			// APP MENU DISPLAY 
			function appMenuDisplay() {
				var appMenu = '<article id="appMenu"><h1>Modo de Visualização</h1><ul> 					<li>Rastros Longos</li><li>Rastros Intermediários</li><li>Rastros Curtos</li><li>Círculos</li></ul><h1>Volume do Audio</h1><img id="soundVolumeOn" src="img/settings/volume_16_black.png" /><div id="soundVolume-slider"></div></article>';
				$('#mainWrapper').append(appMenu);
				$('#appMenu').fadeIn(200);
				// -------------------------------------------------------
				// VIS MODE
				$('#appMenu li:nth-child('+(visMode+1)+')').addClass('active');
				$('#appMenu li').click(function() {
					if ($(this).index != visMode) {
						$('#appMenu li:nth-child('+(visMode+1)+')').removeClass('active');
						visMode = $(this).index();
						$('#appMenu li:nth-child('+(visMode+1)+')').addClass('active');
					}
				});
				// -------------------------------------------------------
				// SOUND VOLUME
				if (soundOn) {
					$('#soundVolumeOn').addClass('active');
					$('#soundVolume-slider').addClass('active');
				}
				$('#soundVolumeOn').click(function() {
					if (soundOn) {
						soundManager.stopAll();
						for (var i=0;i<creaturesTypeArr;i++) {
							creaturesTypeArr[i].soundPlaying = [0,1];
							creaturesTypeArr[i].firstSound = false;
						}
						soundOn = false;
						$(this).removeClass('active');
						$('#soundVolume-slider').removeClass('active');
					} else {
						soundOn = true;
						$(this).addClass('active');
						$('#soundVolume-slider').addClass('active');
					}
				});
				$('#soundVolume-slider').slider({
							min: 0,
							max: 100,
							value: soundVol,
							change: function(event, ui) {
								soundVol = $('#soundVolume-slider').slider('option','value');
								console.log('Sound volume is now: '+soundVol);
							},
							slide : function(event, ui) {
								soundVol = $('#soundVolume-slider').slider('option','value');
							}
						});
				// -------------------------------------------------------
			}
			// END OF APP MENU DISPLAY
			// -------------------------------------------------------
			// SET UP SOUNDMANAGER
			soundManager.setup({
				url: 'soundmanager/swf/',
				onready: function() {
					console.log('Soundmanager is set.');
					preloadSounds();
				}
			});
			// -------------------------------------------------------
			// RELOAD
			function reloadCallDisplay() {
				var reloadCall = "<div id='reloadCall'><img src='img/reload_white_28.png' width='28px' height='28px' /></div>";
				$('#mainWrapper').append(reloadCall);
				$('#reloadCall').fadeIn(1000)
				.hover(function() {
					$('#reloadCall img').attr('src','img/reload_gray_28.png');
				}, function() {
					$('#reloadCall img').attr('src','img/reload_white_28.png');
				})
				.click(function() {
					soundManager.stopAll();
					for (var i=0;i<creaturesTypeArr;i++) {
						creaturesTypeArr[i].soundPlaying = [0,1];
						creaturesTypeArr[i].firstSound = false;
					}
					reloadCreatures();
					if ($('#objEditor').length > 0) {
						objectEditorUpdate();
					}
				});
			}
			
			// -------------------------------------------------------
			// PRELOAD SOUND AND IMAGES
			var resourcesLoaded = 0;
			
			var images = ['reload_grey_28.png','reload_white_28.png','editor/int_atr.png','editor/int_nul.png','editor/int_rep.png','editor/traj_01.png','editor/traj_02.png','editor/traj_03.png','editor/traj_04.png','editor/traj_05.png','editor/traj_06.png','editor/traj_07.png','editor/traj_08.png','settings/appmenucall.png','settings/set_edit.png','settings/set_plus.png','settings/set_switch.png','settings/volume_16_black.png'];
			
			var sounds = ['mid','1mid','2mid','high','perc','bass'];
			
			for (var i=0;i<images.length;i++) {
				var image = $('<img />').attr('src', 'img/'+images[i]);
				resourcesLoaded++;
			}
			
			function preloadSounds() {
			
				for (var i=0;i<creaturesTypeArrMax;i++) {
					for (var j=0;j<sounds.length;j++) {
						for (var k=0;k<2;k++) {
							for (var l=0;l<10;l++) {
								var soundId = i+'_'+j+'_'+k+'_'+l;
								var soundUrl = 'snd/'+l+sounds[j];
								soundManager.createSound({
									id: soundId,
									url: soundUrl
								});
								resourcesLoaded++;
								if (resourcesLoaded == 738) {
									initApp();
									//console.log('Number of resources loaded: '+resourcesLoaded);
								}
							}
						}
					}
				}
			}
			
			// LOADING ANIMATION
			loadingTime = 0;
			loadingAnimation = setInterval(function() {
				ctx.beginPath();
				ctx.rect(0,0,width,height);
				ctx.fillStyle = "rgba(240,240,240,0.1)";
				ctx.fill();
				ctx.lineWidth = 4;
				ctx.strokeStyle = 'white';
				ctx.beginPath();
				ctx.arc(width/2,height/2, 12, loadingTime, loadingTime+1, false);
				ctx.stroke();
				loadingTime += 0.25;
			},33);
			// -------------------------------------------------------
			// INIT APP
			function initApp() {
				clearInterval(loadingAnimation);
				ctx.beginPath();
				ctx.rect(0,0,width,height);
				ctx.fillStyle = "rgba(240,240,240,0.8)";
				ctx.fill();
				
				objEditorCallDisplay();
				appMenuCallDisplay();
				reloadCallDisplay();
				appRunning = true;
				console.log('App is running.');
			}
		}
	} else {
		// DISPLAY NO CANVAS ERROR
	}
	// -------------------------------------------------------
});