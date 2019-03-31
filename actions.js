function hasChildImg(element) {
  if (!element) return false;
  if (element.tagName == "IMG") return true;
  else if (element.children.length != 0) {
    for (let i = 0; i < element.children.length; i++) {
      if (hasChildImg(element.children[i])) return true;
    }
    return false;
  } else return false;
}

function elementToKick(x,y,threshold=20) {
  x += 40; // move to roughly centre
  y += 70;

  // account for scroll
  y -= window.scrollY;

  let elements = document.elementsFromPoint(x,y);
  let viable = null;
  for (let i=0; i<elements.length; i++) {
    let element = elements[i];

    if(element.classList.contains('scratch')) continue;
    if(element.classList.contains('garfield')) continue;

    let rect = element.getBoundingClientRect()
    let area = rect.width * rect.height;
    if (area > threshold && area < 200000 && element != document.body) {
      viable = element;
      break;
    }
  }
  return viable;
}

function slideOff(element,orientation=1) {
  let i = 0;
  let initial = element.getBoundingClientRect().left;
  let done = false;
  if (orientation== 1) {
    return setInterval(()=>{
      if (initial + i < window.innerWidth) {
        element.style.transform = "translateX("+i+"px)";
        i += 16;
      } else if (!done) {
        done = true;
        element.parentNode.removeChild(element);
      }
    }, 2);
  } else if (orientation == -1) {
    initial = element.getBoundingClientRect().right;
    return setInterval(()=>{
      if (initial - i > 0) {
        element.style.transform = "translateX(-"+i+"px)";
        i += 16;
      } else if (!done) {
        done = true;
        element.parentNode.removeChild(element);
      }
    }, 2);
  }
}

function rotateSmall(element) {
  element.style.transform = "rotate(10deg)";
}

function fallDown(element) {
  element.style.position = "fixed";
  element.style.zIndex = "2000";
  let rect = element.getBoundingClientRect();
  let done = false;
  let i = 0;
  function fall() {
    if (rect.top + i < innerHeight) {
      element.style.transform = "translateY("+i+"px)";
      i += 10;
    } else {
      done = true;
      element.parentNode.removeChild(element);
    }
    if (!done) requestAnimationFrame(fall);
  }
  requestAnimationFrame(fall);
}