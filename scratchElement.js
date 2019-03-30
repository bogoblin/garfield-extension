console.log("pls");

var hours = document.getElementById("hours");
scratchElement(hours);

function scratchElement(element){
  // await moveTo(element);
  console.log("scratching");
  // place scratch image over element
  var rect = element.getBoundingClientRect();
  // var scratchImg = document.createElement("img");
  // scratchImg.setAttribute("src", "scratchImg.jpg");
  // scratchImg.setAttribute("src", "images/garfield.png");
  // scratchImg.style.width = element.offsetWidth + "px";
  // scratchImg.style.height = element.offsetHeight + "px";
  // scratchImg.style.position = "absolute";
  // scratchImg.style.top = (rect.top + window.scrollY) + "px";
  // scratchImg.style.left = (rect.left + window.scrollX) + "px";

  console.log(scratchImg);
  document.body.appendChild(scratchImg);

}



//disgusting plagiarized helper functions
document.addEventListener('click', function(e) {
    e = e || window.event;
    var target = e.target || e.srcElement,
        text = target.textContent || target.innerText;
        console.log( target);
        scratchElement(target);
}, false);
