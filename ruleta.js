
  const scriptURL = 'https://script.google.com/macros/s/AKfycbymybtR0avStjmo4otleY5lxm6Y5se5CIvD-tF_WhBCOJDoLkM6_l8enA5-3hHGyGxdhA/exec'
  const form = document.forms['google-sheet']
 
  form.addEventListener('submit', e => {
        e.preventDefault()
        fetch(scriptURL, { method: 'POST', body: new FormData(form)})
          theWheel.startAnimation();
          
      });

// Validación de boton segun eventos
/*$("#wheel-submit").on("click", function (e) {
    e.stopPropagation();
    e.preventDefault();
    
    // verificación de número de teléfono
    var val = $(".wheel-text__phone").val();
    val = val.replace(/_/g, "");
  
    // alert(val);&& $('#rules').is(':checked')
    if (val.length >= 15) {
      theWheel.startAnimation();
      // alert(val);
      // console.log(val.length);
    }
 } );*/

 // tamaño y altura del CANVAS
 var canvas = document.getElementsByTagName('canvas')[0];
 canvas.width  = 550;
 canvas.height = 550;
// estilos
  var theWheel = new Winwheel({
    drawMode: "image", //le permite insertar su rueda
    drawText: true, // le permite mostrar texto encima de la imagen
    canvasId: "wheel-canvas",
    numSegments: 8,
    textFontSize: 20,
    textAlignment: "center", // posición del texto
    textMargin: 25,
    textFontFamily: "Libre Franklin",
    // posición de la rueda debajo del texto
    centerX: 262,
    centerY: 263,
    lineWidth: "1", // eliminar lineas
    // Defina segmentos que incluyan color y texto.
    segments: [
      { text: '1 vale de\n 100% dscto' },
      { text: "1 vale de\n 50% dscto" },
      { text: "1 torta\n gratis" },
      { text: "1\n Cupcake " },
      { text: "1 vale de\n 25% dscto" },
      { text: "1 vale de\n 15% dscto" },
      { text: "1 tajada\n de torta" },
      { text: '1 paquete \n "de bocadito"' }
    ],
    // Comenzando la animación gsap
    animation: {
      type: "spinToStop",
      duration: 5, // Duration in seconds.
      spins: 8, // Número de rotaciones completas.
      callbackFinished: "alertPrize()" // retirar el premio POPUP
    },
    pointerAngle: 90 //marcador de premio (condicional)
    // puntos alrededor
    // 'pins' : {
    //                 'number' : parseInt(4)*2,
    //                 'margin' : 0
    //               }
  });
  
  // los estilos de segmento funcionarán si los hay .draw
  theWheel.segments[1].textFillStyle = "#704241";
  theWheel.segments[2].textFillStyle = "#704241";
  theWheel.segments[3].textFillStyle = "#704241";
  theWheel.segments[4].textFillStyle = "#704241";
  theWheel.segments[5].textFillStyle = "#704241";
  theWheel.segments[6].textFillStyle = "#704241";
  theWheel.segments[7].textFillStyle = "#704241";
  theWheel.segments[8].textFillStyle = "#704241";
  theWheel.draw();
  
  // Inserta tu ruleta
  
  var wheelImg = new Image();
  wheelImg.src =
    "./img/wheel.png";
  // wheelImg.src = "/assets/img/wheel.png";
  wheelImg.onload = function () {
    theWheel.wheelImage = wheelImg;
    theWheel.draw();
  };
  
  // mostrar premio y enviar datos
  function alertPrize(indicatedSegment) {
    var winningSegment = theWheel.getIndicatedSegment();
    $(".prize__text").text(winningSegment.text);
    $(".wheel-text>*").hide();
    $(".prize").show();
    var phone = $(".wheel-text__phone").val();
    var name = $(".wheel-text__name").val();
    console.log("phone: " + phone);
    console.log("name: " + name);
    sendDataWheel(phone, indicatedSegment, name);
    
    // alert("Ваш приз: " + winningSegment.text + "!");
  }
  
  // Llamar ajax
  function sendDataWheel(phone, prize_seg, name) {
    var err = true;
    var txt = "";
    //alert(site + ' ' + ref);
    //alert(phone + " " + prize);
    $.ajax({
      url: "https://xn----7sbba0cdggx4gg2ah.xn--p1ai/mail-wheel.php", // ESPECIFICAR URL
      dataType: "json", // tipo de datos cargados
      type: "POST",
      data: {
        task: "send_data_wheel",
        type: "Wheel",
        phone: phone,
        name: name,
        prize: prize_seg.text
      },
      timeout: 10000,
  
      success: function (data) {
        // colgamos nuestro controlador en la función success
        err = false;
        if (data && data.is_err == 0 && data.alr == 0) {
          $(".prize__text").html(prize_seg.desc_text);
        } else if (data && data.alr == 1) {
          if (!data.alr_text) {
            data.alr_text = "";
          }
          $(".prize__text").html(
            "Номер уже участвовал ранее.<br>" + data.alr_text
          );
        }
      }
    });
  }
  
  // valid mask phone
  $(document).ready(function () {
    $(".wheel-text__phone").inputmask({ mask: "+51 999-999-999" }); //specifying options
  });
  

