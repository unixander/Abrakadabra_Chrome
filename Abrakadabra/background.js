//setInterval("abrakadabra();",1000);


var time=1000;
var run=true;
var inputs=new Array("ad3","fc_tab_txt text","uiTextareaAutogrow input","convinput-text-container");
var input_check=true;
var storage = {
 set: function(key, value) {
   localStorage[key] = value;
 },
 get: function(key) {
   return localStorage[key];
 }
};
function abra_get_storage(){
  chrome.extension.sendRequest({method: "getLocalStorage", key: "abra_check"}, function(response) {
	storage.set("abra_check",response.data);
  });
  chrome.extension.sendRequest({method: "getLocalStorage", key: "abra_check_input"}, function(response) {
	  storage.set("abra_check_input",response.data);
	});
}

function checkstorage() {
	abra_get_storage();
   if(storage.get('abra_check_input') == undefined)
     storage.set('abra_check_input', false);
   if(storage.get('abra_check') == undefined)
     storage.set('abra_check', true);
}

function checktext(){
	abra_get_storage();
	input_check=storage.get("abra_check_input");
	run=storage.get("abra_check");
	if(input_check=="true")checkinputload();
	if(run=="true") abrakadabra();
	setTimeout("checktext();",time);
}

function changeabracheck(){
	var ch=document.getElementById("abracheck");
	var ch2=document.getElementById("abracheck_ru");
	if(!ch) return;
	if(storage.get("abra_check")=="true"){
		storage.set("abra_check",false);
		ch.checked=false;
		ch2.checked=false;
	}
	else {
		storage.set("abra_check",true);
		ch.checked=true;
		ch2.checked=true;
	}
}
function changeabracheckinput(){
	var ch=document.getElementById("abracheckinput");
	var ch2=document.getElementById("abracheckinput_ru");
	if(!ch) return;
	if(storage.get("abra_check_input")=="true"){
		storage.set("abra_check_input","false");
		ch.checked=false;
		ch2.checked=false;
	}
	else {
		storage.set("abra_check_input","true");
		ch.checked=true;
		ch2.checked=true;
	}
}

function checkinputload(){
				var array=document.getElementsByTagName("textarea");
				if(array.length==0) return;
				for(var i=0;i<array.length;i++){
						checkinput(array[i]);
				}
}

function checkinput(elem){
if(!elem) return;
 var t=elem.value;
 if(t.length==0) return;
  var ch=t.charAt(t.length-1);
  if(stop_symbols.indexOf(ch)==-1||ch==".") return;
  var res=enru(t);
  elem.value=res;
}
checkstorage();
checktext();