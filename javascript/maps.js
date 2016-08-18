// selection for button
var mybutton=document.getElementById('giveme');
// div selection for map
var mapdiv=document.getElementById('map-canvas');
// input field selection
var _lookingfor=document.getElementById('lookinput');
var _moveto;
var check=0;
// declaring the markers
var markers=[];
var infowindow;
var _totalpointers;

// The main callback function for the google maps api

function showmymap(){
  // selecting the user's location input field
  var _location=document.getElementById('myinput');
  // Setting the default location
  var sanjose={
    lat:37.3382082,
    lng:-121.88632860000001
  };

  var default_options={
    center: sanjose,
    zoom: 15,
    scrollwheel: false,
  };
  // Allocation of the map responded by google api to the div selected
  map=new google.maps.Map(mapdiv,default_options);
  autocomplete=new google.maps.places.Autocomplete(_location,{types:['(cities)']});

  autocomplete.addListener('place_changed',_navigate);

}
// This method parameter to center the map to the current location selected by the user
function _navigate(){
  _moveto={
    lat: autocomplete.getPlace().geometry.location.lat(),
    lng: autocomplete.getPlace().geometry.location.lng()
  };

  // Adding the button click event
  mybutton.onclick=function() {


    // Clearing the markers before retrieving the new ones
    markers.forEach(function(marker) {
      marker.setMap(null);
    });

    markers = [];

    // Validation for empty string in the input fields
    if(_lookingfor.value.trim()!=='')
    {
      console.log("looking for "+_lookingfor.value.trim()+" in the co-ordinates "+ _moveto.lat+","+_moveto.lng);
      //insert the spinner

      // Main method which start it all ! ;)
      initialize(_moveto,_lookingfor.value.trim());

    }

    else {
      alert("Oops! Looks like you haven't keyed in the place/Location you are searching for/in");
      return;
    }
  };
}

function initialize(_destination,_placetype){

  // Center the map to the location selected by the user
  map.setCenter(_destination);
  infowindow = new google.maps.InfoWindow();
  var service=new google.maps.places.PlacesService(map);
  // Search for the place using text search method
  service.textSearch({
    location: _destination,
    radius: 500,
    query: _placetype,
    zoom: 15,
    scrollwheel: false,
  }, callback);
}

// Call back function for the text search method, which means what to do after grabbing the results
function callback(results,status) {
  //remove the spinner here

  // Auto scrolling the page to the top with map above all
  $('html, body').animate({
    scrollTop: $("#map-canvas").offset().top
  }, 2000);

  // Validating the results if OK or not
  if(status===google.maps.places.PlacesServiceStatus.OK) {
    document.getElementById("carcontent").innerHTML="";
    var rating_aggreg_param=[];
    var pricing_aggreg_param=[];
    // Calculating the results count
    _totalpointers=results.length;

    // Now splitting the data to supply relevant attributes to visulize using highcharts

    for(var i=0;i<results.length;i++)
    {

      // First add divs to the Carousel
      add_to_carousel(i,results[i]);

      // Create marker to the palces the user is looking for
      createMarker(i,results[i]);

      if(typeof(results[i].rating) !== "undefined" && results[i].rating >= 0)
      {
        rating_aggreg_param[i]=[results[i].name,results[i].rating];
      }
      else {
        rating_aggreg_param[i] = [results[i].name,0];
      }
    }
    // For those which have the undefined values for rating, remove them as they are of no use to comparision
    rating_aggreg_param.forEach(function(element){
      if(element[1]===0)
      rating_aggreg_param.splice(rating_aggreg_param.indexOf(element),1);
    });
// Now submit the data to the column chart generatoe method of highcharts
    aggregate(rating_aggreg_param);
  }

}

function createMarker(count,place) {
// The createMarker method which takes in the index of the place and the place object
  var placeloc=place.geometry.location;
  var marker=new google.maps.Marker({
    name: place.name,
    map: map,
    position: place.geometry.location,
    // Default animation to the pointers that appear on the map
    animation: google.maps.Animation.DROP,
    locindex:count,
    // Created a custom icon to point in the map ;)
    icon:"/pages/img/zicon.png"
  });

  if(count===0)
  // By default the first location's pointer has to be intimated, right ?
  marker.setAnimation(google.maps.Animation.BOUNCE);


  markers[count]=marker;
  // Validation/ filtering the rating and the price level before pushing it to the drawcharts method
  var p=typeof(place.rating)=="number"?  place.rating :0;
  var q=typeof(place.minPriceLevel)=="number"?  place.minPriceLevel :0;
  // Pushing the data to the draw charts method
  drawcharts(p,q,count);


// Adding listeners to the markers as mentinoed in the documentation, the carousel moves displaying respective information
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

// Carousel adder function which adds the divs to the Carousel slides
function add_to_carousel(count,foundplace){
  var phone=typeof(foundplace.formatted_phone_number)=="undefined"?"(N/A)":foundplace.formatted_phone_number;
  var types=foundplace.types;
  var typeres=" ";
  types.forEach(function(type){
    typeres+="<li>"+type.toUpperCase()+"</li>";
  });
  var mobile_rating=typeof(foundplace.rating)!=="undefined"?foundplace.rating:"Not Available";
  var mobile_price=typeof(foundplace.min_price_level)==="undefined"?"Not Available":foundplace.min_price_level;

  if(count===0){
    holderchild= "<div class='item active' style='width:100%;'><table><tr> <td colspan='3'> <h2>"+ foundplace.name.toUpperCase() +"</h2></td></tr><tr><td class='logos'><img src='"+foundplace.icon+"'> <div>"+typeres+" </div></td><td colspan='2'><div class='picd' id='pic"+count+"'></div><div class='picm'><li> <h3>Rated : "+mobile_rating+"</h3></li><li> <h3> Min. Price: "+mobile_price+" </h3></li></div></td></tr><tr> <td><span class='fa fa-map-marker fa-2x'></span></td><td colspan='2'> <h3>"+foundplace.formatted_address+"</h3></td></tr><tr> <td><span class='fa fa-phone-square fa-2x'></span></td><td colspan='2'> <h3>"+phone+"</h3></td></tr></table></div>";


  }
  else{
    holderchild= "<div class='item' style='width:100%;'><table><tr> <td colspan='3'> <h2>"+ foundplace.name.toUpperCase() +"</h2></td></tr><tr><td class='logos'><img src='"+foundplace.icon+"'> <div>"+typeres+" </div></td><td colspan='2'><div class='picd' id='pic"+count+"'></div><div class='picm'><li> <h3>Rated : "+mobile_rating+"</h3></li><li> <h3> Min. Price: "+mobile_price+" </h3></li></div></td></tr><tr> <td><span class='fa fa-map-marker fa-2x'></span></td><td colspan='2'> <h3>"+foundplace.formatted_address+"</h3></td></tr><tr> <td><span class='fa fa-phone-square fa-2x'></span></td><td colspan='2'> <h3>"+phone+"</h3></td></tr></table></div>";

  }

  $( "#carcontent" ).append(holderchild);

}

// Carousel event to animate the pointer whose information is being displayed in the Carousel currently
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
