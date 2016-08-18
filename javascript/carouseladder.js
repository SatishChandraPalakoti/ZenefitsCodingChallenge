function add_to_carousel(count,foundplace){
  if(p===0){
    directchild= "<li data-target='#myCarousel' data-slide-to='"+i+"' class='active'></li>";
  }
  else{
    directchild= "<li data-target='#myCarousel' data-slide-to='"+i+"'></li>";
  }


  holderchild= "<div class='item'><div  class='col-md-4 col-md-offset-2'><img src='"+foundplace.icon+"'><h2>"+ foundplace.name +"</h2><h2>"+foundplace.formatted_address+"</h2></div><div id='pic"+count+"' class='col-md-6'></div></div>";

  document.getElementById("carcontent").innerHTML+=holderchild ;
  document.getElementById("carpoint").innerHTML+=directchild ;

}
