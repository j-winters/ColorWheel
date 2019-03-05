function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

function removeDuplicates(arr){
    let unique_array = []
    for(let i = 0;i < arr.length; i++){
        if(unique_array.indexOf(arr[i]) == -1){
            unique_array.push(arr[i])
        }
    }
    return unique_array
};

function task(_callback) {
	arr = shuffle(myArray);
	colors = colors.map(function (c) {
		c.hsl = converter.rgbToHsl(c.rgb);
		return c;
	}).sort(function (a,b) {
		return a.hsl[0] < b.hsl[0] ? -1 : 1;
	});

	$.each(colors, function (i, color) {
	var hue = color.hsl[0];
	var rotation = 360 / n * (i + ran_n);

	var container = $("<div>").addClass('color-container').css({ transform: "rotate(" + rotation + "deg)" });

	var spoke = $("<div>").addClass('color').css({
	backgroundColor: "hsl(" + color.hsl.join(",") + ")"
	});

	container.append(spoke);
	html.append(container);
	});

	$("body").append(html);

	$.each($('.color-container'), function(ind) {
	$(this).attr('id', 'colour-' + parseInt(ind+1));
	});

	$.each($('.grid-item'), function(ind) {
	$(this).attr('id', 'square-' + parseInt(ind+1));
	});

	var colist = []

	$('.color').click(function(){
	  var x = $(this).css('backgroundColor');
	  colist.push(x);
	  colist = removeDuplicates(colist);

	   for(var i=0; i < 32; i++) {
          if (i < colist.length) {
              $('#square-'+String(i+1)).css('backgroundColor',colist[i]);
          }
          else {
              $('#square-'+String(i+1)).css('backgroundColor','rgb(255,255,255)');
          }
      }

	});

	$('.grid-item').click(function(){
      //set.remove($(this).css('backgroundColor'))
      //YOU NEED TO ADD A FUNCTION THAT DOES NOTHING IF RECORDS A CLICK INSIDE WHITESPACE
      //alert($(this).css('backgroundColor'))
      if ($(this).css('backgroundColor') != 'rgb(255, 255, 255)'){
          var del = colist.indexOf($(this).css('backgroundColor'));
          colist.splice(del,1);
          $(this).css('backgroundColor','rgb(255,255,255)')
      }
      //var del = colist.indexOf($(this).css('backgroundColor'));
      //colist.splice(del,1);
      //$(this).css('backgroundColor','rgb(255,255,255)')
      //alert($(this).attr('id'))
      //alert($(this).css('backgroundColor'))
      //$(this).css('backgroundColor','#555')
    });

    $('#Lexical').html(arr.pop());

	var output = {}

	$('#submission').click(function() {
		if(reloadCount < 1){
		if(colist.length!=0){
		output[$('#Lexical').text()] = colist
		if (arr.length == 0){
		  //alert('finish')
		  var usage = {"name":String(user)}
		  var obj3 = Object.assign(usage,output)
		  //alert(JSON.stringify(obj3))
		  var out = JSON.stringify(obj3, null, 4)
		  //var out2 = JSON.stringify(user, null, 4)
		  //alert(out2)
		  //alert(out)
		  $.post("/postmethod", {javascript_data:out})
		  //$.post("/postmethod", {user_data:out2})
		  _callback();
		}
		//This is where you must change the function for reload
		$.each($('.grid-item'), function(){
		colist = []
		$(this).css('backgroundColor','rgb(255,255,255)')
		});

		$('#Lexical').html(arr.pop());
		}
		}
		if(reloadCount >= 1){
		output[$('#Lexical').text()] = colist
		if (arr.length == 0){
		  //alert('finish')
		  var usage = {"name":String(user)}
		  var obj3 = Object.assign(usage,output)
		  //alert(JSON.stringify(obj3))
		  var out = JSON.stringify(obj3, null, 4)
		  //var out2 = JSON.stringify(user, null, 4)
		  //alert(out2)
		  //alert(out)
		  $.post("/postmethod", {javascript_data:out})
		  //$.post("/postmethod", {user_data:out2})
		  _callback();
		}
		//This is where you must change the function for reload
		$.each($('.grid-item'), function(){
		colist = []
		$(this).css('backgroundColor','rgb(255,255,255)')
		});

		$('#Lexical').html(arr.pop());
		}
	});

	$.each($('.grid-item'), function(ind) {
	$(this).attr('id', 'square-' + parseInt(ind+1));
	});

};

var state = history.state || {};
var reloadCount = state.reloadCount || 0;
if (performance.navigation.type === 1) { // Reload
    state.reloadCount = ++reloadCount;
    history.replaceState(state, null, document.URL);
} else if (reloadCount) {
    delete state.reloadCount;
    reloadCount = 0;
    history.replaceState(state, null, document.URL);
}
var $ = jQuery;
var html = $("<div>");
//var colors = JSON.parse($("#colors").text());
if (reloadCount < 1){
	var colors = JSON.parse($("#colors").text());
	//generate user_id and store in localStorage
	var textorg = String(window.location.search);
	var randText = textorg.replace(/[?]\b(prolific=)\b/g, '');
	//alert(testing.replace(/?/g,""));
	//var randText = Math.floor(Math.random() * 100) + 2 + "" + new Date().getTime() +  Math.floor(Math.random() * 100) + 2 + (Math.random().toString(36).replace(/[^a-zA-Z]+/g, '').substr(0, 8));
	//alert(randText)
	var users = window.localStorage.setItem('user_id',randText);
	var user = window.localStorage.getItem('user_id');
} else if (reloadCount >= 1) {
	var colors = $.parseJSON(localStorage.dataSetting);
	var user = window.localStorage.getItem('user_id');
	//if (colors["terminate"] === "terminate"){
	//	alert('FINISH')
	//};
	//alert(users);
	//alert(JSON.stringify(colors))
	if (colors["finish"]==="terminate"){
		//alert('You have finished the experiment.')
		//window.location.replace("https://www.bbc.com")
		var url = "/finish.html";
        setTimeout(function() {
        window.location.assign(url);
        }, 1);
	}
	//{"finish":"terminate"}
	//get user_id from local storage

}
var n = colors.length;
var converter = new ColorConverter();
var ran_n = Math.floor(Math.random() * 31);
//conditioned on language. If statement for language.
var myArray = ['yellow', 'green', 'red', 'purple', 'orange', 'blue' ];
//var myArray = ['testing'];

//var xx=document.getElementById("tmp");
//var users=jQuery.parseJSON( xx.textContent );
//var user = users.name;
//alert(user);


//alert(JSON.parse($'{{ user | tojson }}').text())
// $.get("/",function(usering){
// 	alert($.parseJSON(usering))
// })
//alert(JSON.parse('{{ user | tojson }}'))
//alert(user)
//alert(parseJSON(user))

async function reloading(_callback){
	setTimeout(await $.get("/getpythondata", function(data) {
		//alert('Data: ' + $.parseJSON(JSON.stringify(data)))
		//alert(JSON.stringify(users+','+data))
		localStorage.dataSetting = JSON.stringify(data)

		//alert($.parseJSON(localStorage.dataSetting))
		//sessionStorage.setItem('d', JSON.stringify(data))
		//alert(JSON.parse(sessionStorage.getItem('d')))
		//alert('Data:'+$.parseJSON(data))
		_callback();
 	}),5000)
};

function secondFunction(){
	task(() => reloading(() => location.reload()))

};

secondFunction()
