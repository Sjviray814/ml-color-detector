let answer = document.getElementById('answer');

const options = {
    task: 'classification'
}

const nn = ml5.neuralNetwork(options);

nn.load('./model.json');

async function classify(){
    nn.classify({
        r: redInput.value/256, 
        g: greenInput.value/256,
        b: blueInput.value/256
    }).then((arr) => {
        let choice1 =  arr[0]
        let choice2 = arr[1]

        console.log(choice1)
        console.log(choice2)

        if(choice1.confidence > 0.85){
          answer.innerHTML = `I think your color is ${choice1.label}, I am ${Math.floor(choice1.confidence*1000)/10}% sure`
        }
        else{
          answer.innerHTML = `I think your color is ${choice1.label}, I am ${Math.floor(choice1.confidence*1000)/10}% sure,<br> I think your color could also be ${choice2.label}`
        }
    })
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
    convertTexts();
}

function changeColor2(){
    document.body.style.backgroundColor = colorInput.value;
    let rgb = hexToRgb(colorInput.value)
    redInput.value = rgb.r;
    greenInput.value = rgb.g;
    blueInput.value = rgb.b;
    convertTexts();
}


function convertTexts(){
    let textColor = redInput.value * .299 + greenInput.value * .587 + blueInput.value * .114 <= 120 ? "#FFFFFF" : "#000000";
    document.body.style.color = textColor;
}


