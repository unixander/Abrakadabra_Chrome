/**
 * @author unixander
 */
			var fb_class="fbChatMessage fsm direction_ltr";
			var vk_class="fc_msg wrapped";
			var gm_class="kl";
			var imo_class="ms";
			function abrakadabra(){
				var classname="kl";
				var url=document.URL;
				if(url.indexOf("vk.com")!=-1) classname=vk_class; else
				if(url.indexOf("google.mail.com")!=-1) classname=gm_class; else
				if(url.indexOf("imo.im")!=-1) classname=imo_class; else
				if(url.indexOf("facebook")!=-1||url.indexOf("fb.com")!=-1) classname=fb_class; 
				
				var array=getElementsByClassName(classname);
				for(var i=0;i<array.length;i++){
					if(array[i].innerHTML!=""){
						res=enru(array[i].innerHTML);
						array[i].innerHTML=res;
					}
				}
			}
			function getElementsByClassName(classname)  {
			    var array = [];
			    var re = new RegExp('\\b' + classname + '\\b');
			    var els = document.getElementsByTagName("div");
			    for(var i=0,j=els.length; i<j; i++)
			        if(re.test(els[i].className))array.push(els[i]);
			    return array;
			}
			function enru(text){
				var result="";
				var direction=0;
				var current_word=new String();
				var ch;
				for(var i=0;i<text.length;i++){
					ch=text.charAt(i);
					if(stop_symbols.indexOf(ch)>-1){
						if(en_letters.indexOf(current_word.charAt(0))>-1) direction=0; else direction=1;
						result+=replace(current_word,direction)+ch;
						current_word="";
					} else current_word+=ch;
				}
				if(en_letters.indexOf(current_word.charAt(0))>-1) direction=0; else direction=1;
				result+=replace(current_word,direction);
				return result;
			}
			function replace(text,direction){
				//0-english to russian
				//1-russian to english
				var result="";
				var ch='';
				var pos=0;
				if(direction==0){
					for(var i=0;i<text.length;i++){
						ch=text.charAt(i);
						pos=en_letters.indexOf(ch);
						if(pos!=-1)result+=ru_letters[pos];
					}
				}else{
					for(var i=0;i<text.length;i++){
						ch=text.charAt(i);
						pos=ru_letters.indexOf(ch);
						if(pos!=-1)result+=en_letters[pos];
					}
				}
				return result;
			}
			
