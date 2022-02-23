// TO INITIALIZE THE CANVAS
const initCanvas = (id) => {
  return new fabric.Canvas(id, {
    width: 500,
    height: 500,
    backgroundColor: "#808080",
  });
};
//comment
const canvas = initCanvas("canvas");
var image;
// TASK 1 TO UPLOAD THE IMAGE ON THE CANVAS
document.getElementById("imgloader").onchange = function handleImage(e) {
  // TO READ THE FILE FROM USER COMPUTER
  var reader = new FileReader();
  reader.readAsDataURL(e.target.files[0]);
  reader.onload = function (event) {
    var imgObj = new Image();
    imgObj.src = event.target.result;
    imgObj.onload = function () {
      image = new fabric.Image(imgObj);
      canvas.add(image);
      canvas.centerObject(image);
      canvas.setActiveObject(image);
      image.setCoords();
    };
  };
};
// TASK 2 TO ZOOM AND ZOOM OUT IN IMAGE WHILE ZOOMING OUT KEEPING THE IMAGE CENTERED

canvas.on({
  "mouse:wheel": (opt) => {
    let delta = 0;
    let wheelDelta = opt.e.wheelDelta;
    let deltaY = opt.e.deltaY;
    if (wheelDelta) {
      delta = -wheelDelta / 120;
    }
    if (deltaY) {
      deltaY > 0 ? (delta = 1) : (delta = -1);
    }
    let pointer = canvas.getPointer(opt.e);
    let zoom = canvas.getZoom() - delta / 10;
    console.log("POINTER", pointer, "ZOOM", zoom);
    if (zoom > 20) zoom = 20;
    if (zoom < 1) {
      zoom = 1;
    }
    canvas.zoomToPoint(
      {
        x: opt.e.offsetX,
        y: opt.e.offsetY,
      },
      zoom
    );
    opt.e.preventDefault();
    opt.e.stopPropagation();
    var vpt = canvas.viewportTransform;
    if (zoom < 400 / 500) {
      vpt[4] = 200 - (500 * zoom) / 2;
      vpt[5] = 200 - (500 * zoom) / 2;
    } else {
      if (vpt[4] >= 0) {
        vpt[4] = 0;
      } else if (vpt[4] < canvas.getWidth() - 500 * zoom) {
        vpt[4] = canvas.getWidth() - 500 * zoom;
      }
      if (vpt[5] >= 0) {
        vpt[5] = 0;
      } else if (vpt[5] < canvas.getHeight() - 500 * zoom) {
        vpt[5] = canvas.getHeight() - 500 * zoom;
      }
    }

    canvas.renderAll();
    canvas.calcOffset();
  },
});
