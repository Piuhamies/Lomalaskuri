function createInnerButton(
  X,
  Y,
  Height,
  Width,
  Msg,
  Style,
  PositionPoint,
  Action
) {
  var charString;
  switch (PositionPoint) {
    case undefined:
    case "topLeft": //jos keskitykseksi on asettettu vasen yläkulma
    case "default": //tai default joka on vasen yläkulma
      switch (Style) {
        case undefined:
        case "rect":
        case "default":
          var fontWidth = (12 / textWidth(Msg)) * Width;
          var fontHeight = (12 / (textDescent() + textAscent())) * Height;
          rect(X, Y, Height, Width);
          textSize(fontWidth, fontHeight);
          text(
            Msg,
            X + Width / 2,
            Y + Height / 2 - (textDescent() + textAscent()) / 2
          );
          break;
      }
      break;
  }
}
function createImageButton(
  X,
  Y,
  Height,
  Width,
  Msg,
  Img,
  PositionPoint,
  Action
) {
  var currentBtn;
  currentBtn = image(Img, X, Y, Width, Height);
  textSize(20);
  textAlign(CENTER, CENTER);
  text(Msg, (X + Width) / 2, (Y + Height) / 2);
  currentBtn.mouseOver(hovering());
}
