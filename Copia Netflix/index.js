

let idPeliculaTrending

function generarEventosABotones(){
    const btnScrollDerechos = document.querySelectorAll(".btnScroll-derecho")
    const btnScrollIzquierdos = document.querySelectorAll(".btnScroll-izquierdo")

    for (boton of btnScrollDerechos){
        const contenedorConScroll = boton.parentNode.querySelector(".movieSlideshowCont-imgCont")

        boton.addEventListener("click", () =>{
            contenedorConScroll.scrollLeft = contenedorConScroll.scrollLeft + contenedorConScroll.clientWidth
        })
    }   

    for (boton of btnScrollIzquierdos){
        const contenedorConScroll = boton.parentNode.querySelector(".movieSlideshowCont-imgCont")

        boton.addEventListener("click", () =>{
            contenedorConScroll.scrollLeft = contenedorConScroll.scrollLeft - contenedorConScroll.clientWidth 
        })
    }   

}

async function obtenerImagenes(){

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOTgyZjU0NzQwZDU4YjRkZDg1MjllOWRlMzM5ZGEwZSIsInN1YiI6IjY1ZGQwNjJlZGNiNmEzMDE4NTg0ZjgxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.60sWa7BiVmb4kTkfxUSR5_yNWka6cf0kHZwTX6DLET4'
        }
    };

    try{
        const respuestaPeliPopulares = await fetch('https://api.themoviedb.org/3/movie/popular?language=es-AR&page=1', options);
        const respuestaSeriPopulares = await fetch('https://api.themoviedb.org/3/trending/tv/day?language=es-AR', options);
        const respuestaPeliRomance = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=es-AR&page=1&sort_by=popularity.desc&with_genres=10749', options);
        const respuestaPeliDocumental = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=es_AR&page=1&sort_by=popularity.desc&with_genres=99', options);

        if (respuestaPeliPopulares.status === 200){
            const datosPeliPopulares = await respuestaPeliPopulares.json();
            const datosSeriPopulares = await respuestaSeriPopulares.json();
            const datosPeliRomance = await respuestaPeliRomance.json();
            const datosPeliDocumental = await respuestaPeliDocumental.json();

            const arrayJsons = [datosPeliPopulares, datosSeriPopulares, datosPeliRomance, datosPeliDocumental]
            const arrayMovieSlideshows = [document.querySelector(".peliPopulares"), document.querySelector(".seriPopulares"), document.querySelector(".peliRomance"),document.querySelector(".peliDocumental")]

            console.log(datosSeriPopulares)
            for (index in arrayJsons){
                for (let i = 0; i < 20; i++){
                    let posterActual = arrayJsons[index].results[i].poster_path
    
                    var nuevoPoster = document.createElement('img');
                    nuevoPoster.className = 'movieSlideshowCont-img';
                    nuevoPoster.setAttribute("draggable", false)
                    nuevoPoster.src = `https://image.tmdb.org/t/p/w500/${posterActual}`;
    
                    arrayMovieSlideshows[index].appendChild(nuevoPoster);
                }
            }
            

            //obtengo el imagen, titulo y resumen del banner

            const imagenDeBanner = document.querySelector(".initialBanner")
            imagenDeBanner.style.backgroundImage = `url("https://image.tmdb.org/t/p/original/${datosPeliPopulares.results[0].backdrop_path}")`
            document.querySelector(".initialBannerTitle").textContent = datosPeliPopulares.results[0].title
            document.querySelector(".initialBannerText").textContent = datosPeliPopulares.results[0].overview
        }
    }catch (error){
        console.log(error)
    }

}




generarEventosABotones()
obtenerImagenes()

