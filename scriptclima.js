// Tu clave API de OpenWeatherMap
const apiKey = '3598132&appid=1d8dc8323ad1e77e020b54e6bed1a95f';
// Ciudad para la que quieres obtener el clima
const ciudad = 'Guatemala,GT';

// URL de la API con los parámetros necesarios (sin units=metric para obtener Kelvin)
const url = `https://api.openweathermap.org/data/2.5/weather?id=3598132&appid=1d8dc8323ad1e77e020b54e6bed1a95f&lang=es`;

// Función para obtener el clima actual
async function obtenerClimaActual() {
    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();

        if (respuesta.ok) {
            // Manejo de la respuesta exitosa
            mostrarClima(datos);
        } else {
            // Manejo de errores en la respuesta
            document.getElementById('clima-info').innerText = `Error al obtener el clima: ${datos.message}`;
        }
    } catch (error) {
        // Manejo de errores de red u otros errores
        document.getElementById('clima-info').innerText = `Error al realizar la solicitud: ${error}`;
    }
}

// Función para mostrar el clima en la página
function mostrarClima(datos) {
    const climaInfo = document.getElementById('clima-info');
    
    // Conversión de Kelvin a Celsius y redondeo
    const tempCelsius = Math.round(datos.main.temp - 273.15);
    
    // URL del icono del clima
    const iconCode = datos.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
    
    climaInfo.innerHTML = `
        <p>Temperatura: ${tempCelsius} °C</p>
        <p>Humedad: ${datos.main.humidity} %</p>
        <p>Condición: ${datos.weather[0].description}</p>
        <img src="${iconUrl}" alt="Icono del clima">
    `;
}

// Llamada a la función para obtener el clima
obtenerClimaActual();
