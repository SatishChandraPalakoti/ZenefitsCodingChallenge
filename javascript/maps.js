
var mybutton=document.getElementById('giveme');
var mapdiv=document.getElementById('map-canvas');
var _lookingfor=document.getElementById('lookinput');
var _moveto;
var check=0;
var markers=[];
var infowindow;
var _totalpointers;

function showmymap(){
  var _location=document.getElementById('myinput');
  var sanjose={
    lat:37.3382082,
    lng:-121.88632860000001
  };
  var default_options={
    center: sanjose,
    zoom: 15,
    scrollwheel: false,
  };
  map=new google.maps.Map(mapdiv,default_options);
  autocomplete=new google.maps.places.Autocomplete(_location,{types:['(cities)']});

  autocomplete.addListener('place_changed',_navigate);

}

function _navigate(){
  _moveto={
    lat: autocomplete.getPlace().geometry.location.lat(),
    lng: autocomplete.getPlace().geometry.location.lng()
  };


  mybutton.onclick=function() {
    $('html, body').animate({
      scrollTop: $("#map-canvas").offset().top
    }, 2000);

    // console.clear();
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    if(_lookingfor.value.trim()!=='')
    {
      console.log("looking for "+_lookingfor.value.trim()+" in the co-ordinates "+ _moveto.lat+","+_moveto.lng);
      //insert the spinner
      initialize(_moveto,_lookingfor.value.trim());

    }

    else {
      alert("What are you looking for ?");
      return;
    }
  };
}

function initialize(_destination,_placetype){
  map.setCenter(_destination);
  infowindow = new google.maps.InfoWindow();
  var service=new google.maps.places.PlacesService(map);
  service.textSearch({
    location: _destination,
    radius: 500,
    query: _placetype,
    zoom: 15,
    scrollwheel: false,
  }, callback);
}

function callback(results,status) {
  //remove the spinner here
  if(status===google.maps.places.PlacesServiceStatus.OK) {
    document.getElementById("carcontent").innerHTML="";
    var rating_aggreg_param=[];
    var pricing_aggreg_param=[];
    _totalpointers=results.length;
    // for(var i=0;i<results.length;i++)
    for(var i=0;i<results.length;i++)
    {
       add_to_carousel(i,results[i]);
      createMarker(i,results[i]);
      // console.log(results[i].types)
      console.log("Index of "+ results[i].name+" is "+ i);
      if(typeof(results[i].rating) !== "undefined" && results[i].rating >= 0)
      {
        rating_aggreg_param[i]=[results[i].name,results[i].rating];
      }
      else {
        rating_aggreg_param[i] = [results[i].name,0];
      }
    }

    rating_aggreg_param.forEach(function(element){
      if(element[1]===0)
      rating_aggreg_param.splice(rating_aggreg_param.indexOf(element),1);
    });

    aggregate(rating_aggreg_param);
  }

}

function createMarker(count,place) {

  var placeloc=place.geometry.location;
  var marker=new google.maps.Marker({
    name: place.name,
    map: map,
    position: place.geometry.location,
    animation: google.maps.Animation.DROP,
    locindex:count,
    icon:"/pages/img/zicon.png"
  });

  if(count===0)
    marker.setAnimation(google.maps.Animation.BOUNCE);


  markers[count]=marker;

  var p=typeof(place.rating)=="number"?  place.rating :0;
  var q=typeof(place.minPriceLevel)=="number"?  place.minPriceLevel :0;
  drawcharts(p,q,count);

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
   markers.forEach(function(marker){
     marker.setAnimation(null);
   });
      this.setAnimation(google.maps.Animation.BOUNCE);
      $('.carousel').carousel(marker.locindex);
  });
}


function add_to_carousel(count,foundplace){
  var phone=typeof(foundplace.formatted_phone_number)=="undefined"?"(N/A)":foundplace.formatted_phone_number;
  if(count===0){
    holderchild= "<div class='item active' style='width:100%;'><table><tr> <td colspan='3'> <h4>"+ foundplace.name.toUpperCase() +"</h4></td></tr><tr><td><img class='logos' src='"+foundplace.icon+"'></td><td colspan='2'><div id='pic"+count+"'></div></td></tr><tr> <td><span class='fa fa-map-marker fa-2x'></span></td><td colspan='2'> <h5>"+foundplace.formatted_address+"</h5></td></tr><tr> <td><span class='fa fa-phone-square fa-2x'></span></td><td colspan='2'> <h5>"+phone+"</h5></td></tr></table></div>";


  }
  else{
    holderchild= "<div class='item'><table class=style='width:100%; '><tr> <td colspan='3'> <h4>"+ foundplace.name.toUpperCase() +"</h4></td></tr><tr><td><img class='logos' src='"+foundplace.icon+"'></td><td colspan='2'><div id='pic"+count+"'></div></td></tr><tr> <td><span class='fa fa-map-marker fa-2x'></span></td><td colspan='2'> <h5>"+foundplace.formatted_address+"</h5></td></tr><tr> <td><span class='fa fa-phone-square fa-2x'></span></td><td colspan='2'> <h5>"+phone+"</h5></td></tr></table></div>";

  }

  $( "#carcontent" ).append(holderchild);

}


$('#myCarousel').bind('slide.bs.carousel', function (e) {
  setTimeout(function(){
    currentIndex = $('div.active').index();
     console.log(currentIndex+" is the index of the slide now.");
     markers.forEach(function(marker){
       if(marker.animating)
       {marker.setAnimation(null);
       infowindow.close(map,this);}
     });
          markers[currentIndex].setAnimation(google.maps.Animation.BOUNCE);
  },1000);

});
