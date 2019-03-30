function elementToKick(x,y,threshold=4000) {
  let elements = document.elementsFromPoint(x,y);
  let viable = null;
  elements.forEach((element) => {
    let rect = element.getBoundingClientRect()
    let area = rect.width * rect.height;
    if (area > threshold) return viable;
    else viable = element;
  });
}