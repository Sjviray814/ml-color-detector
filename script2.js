const options = {
    task: 'classification'
}

const nn = ml5.neuralNetwork(options);

nn.load('./model.json', classify);

function classify(){
    // console.log(nn.classify({
    //     r: 234/256, 
    //     g: 190/256,
    //     b: 46/256
    // }))
}

$("#redInput").on("change keyup paste", function(){
    changeColor();
})

$("#greenInput").on("change keyup paste", function(){
    changeColor();
})

$("#blueInput").on("change keyup paste", function(){
    changeColor();
})


const redInput = document.getElementById('redInput');
const greenInput = document.getElementById('greenInput');
const blueInput = document.getElementById('blueInput');
const colorInput = document.getElementById('colorInput');

  
  function rgbToHex(r, g, b) {
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
  }
  function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });
  
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }


function changeColor(){ 
    document.body.style.backgroundColor = 'rgb(' + redInput.value + ', ' + greenInput.value + ', ' + blueInput.value + ')'; 
    $("#colorInput").val(rgbToHex(redInput.value, greenInput.value, blueInput.value));
    //rgbToHex(redInput.value, greenInput.value, blueInput.value)
}

function changeColor2(){
    document.body.style.backgroundColor = colorInput.value;
    let rgb = hexToRgb(colorInput.value)
    redInput.value = rgb.r;
    greenInput.value = rgb.g;
    blueInput.value = rgb.b;
}