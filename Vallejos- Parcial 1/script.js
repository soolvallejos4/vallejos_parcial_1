addEventListener('DOMContentLoaded', (event) => {

const APIKEY = `db6daefe32c31f2f74f61ccba6c041ba`;

window.addEventListener('load' , () => {
    const datoLocal = localStorage.getItem('datos');
    if(datoLocal) {
        clima(JSON.parse(datoLocal).name)
    }
})

const clima = (localizacion) => {
    let body = document.querySelector('body');
    let icono = document.getElementById('icono');
    let tempActual = document.getElementById('temp-actual');
    let textoCiudad = document.getElementById('texto-ciudad');
    let tipoClima = document.getElementById('tipo-clima');
    
    
    let tempMax = document.getElementById('temp-max');
    let tempMin = document.getElementById('temp-min');
    let humedad = document.getElementById('humedad');
    let presion = document.getElementById('presion');
    let viento = document.getElementById('viento');
    let ciudadInvalida = document.getElementById('ciudad-invalida');
    
    let contenedorClima = document.getElementById('contenedor-clima');
    
    let pedirCiudad = document.querySelector('.pedir-ciudad');
    
    let botonVolverCiudad = document.getElementById('volver-ciudad');

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localizacion}&units=metric&appid=${APIKEY}&lang=es`) /*POR QUE USO UNITS= METRIC: SEGUN LA DOCUMENTACION :For temperature in Celsius use units=metric*/
    /*todo me lo devuelve en ingles, entonces tengo que pasarlo al espaniol :You can use the lang parameter to get the output in your language.

Translation is applied for the city name and description fields.*/

    .then(resp => resp.json())
    .then(data => {
        //con los resultados que obtengo en el data, meto cada uno de ellos en el campo html correspondiente
        console.log(data); //veo en consola que estoy recibiendo y si funciona
        
        if(data.cod == '400' ||data.cod == '404' ) {
            ciudadInvalida.style.display = 'block';
        } else {
            pedirCiudad.style.display='none'
            contenedorClima.style.display = 'block'
            ciudadInvalida.style.display = 'none'
            textoCiudad.innerHTML = data.name;
            tempActual.innerHTML= Math.ceil(data.main.temp) + '°C';
            tipoClima.innerHTML = (data.weather[0].description).toUpperCase();
            tipoClima.style.fontWeight = '700';
            tipoClima.style.fontSize = '2.5em'
            tempMax.innerHTML = Math.ceil(data.main.temp_max) + '°C';
            tempMin.innerHTML = Math.ceil(data.main.temp_min) + '°C';
            humedad.innerHTML = `${data.main.humidity} %`;
            presion.innerHTML = `${data.main.pressure} hPa`;
        
            // Metric: Celsius, , el viento denominado en metric me da Metric: meter/sec,
            viento.innerHTML = Math.floor (data.wind.speed * 3.6 ) + 'Km/h'
            
         

            function estilosbackground(){
                body.style.backgroundPosition = 'center';
                body.style.backgroundSize = 'cover';
                body.style.backgroundRepeat = 'none'
            }


            let guardarData = data.weather[0].id

            
            switch (true) {
                    case guardarData>=200 && guardarData<=232 :
                        icono.src='img/tormenta.png'
                    break;
                    case guardarData>=300 && guardarData<=321 :
                        icono.src = 'img/llovizna.png'
                    break; 
                    case guardarData>=500 && guardarData<=531 :
                        icono.src='img/lluvia.png' 
                        body.style.backgroundImage="url('./img/fondo-lluvia.jpg')"
                    break;
                    case guardarData>=600 && guardarData<=622 :
                        icono.src='img/nieve.png'
                    break;
                    case guardarData>=701 && guardarData<=781 :
                        icono.src='img/nieve.png'
                    break;
                    case guardarData === 800 :
                        icono.src='img/cielo-limpio.png' 
                        body.style.backgroundImage="url('./img/cielo-limpio.jpeg')"
                    break;
                    case guardarData === 801 :
                        icono.src='img/nubes-dispersas.png' 
                        body.style.backgroundImage="url('./img/pocas-nubes.jpg')"
                    break;
                    case guardarData === 802:
                         icono.src='img/nubes-dispersas.png' 
                         body.style.backgroundImage="url('./img/nubes-dispersas.jpg')"
                    break;
                      case guardarData === 803 ||guardarData === 804 :
                        icono.src='img/nublado.png' 
                        body.style.backgroundImage="url('./img/cielo-nublado.jpg')"
                    break;
                    default:
                        body.style.backgroundColor = 'red'
                            break;
                        } 
                        estilosbackground() 


            let miArrayJson = JSON.stringify(data);
            localStorage.setItem('datos', miArrayJson);
           let dataJSON  =  localStorage.getItem('datos')

                
        }
     

    })
    function volverCiudad () {
        botonVolverCiudad.addEventListener('click', () => {
            contenedorClima.style.display = 'none'
            pedirCiudad.style.display='block'
            body.style.backgroundImage = "none"
        })
    }
    volverCiudad()
    .catch(err => console.log(err))
    inputCiudad.value = "";
    

}

const pedirClima = () => {
    let inputCiudad = document.querySelector('input');
    let boton = document.querySelector('button');
boton.addEventListener('click' , () => {
    clima(inputCiudad.value)
})
}
pedirClima()






















});