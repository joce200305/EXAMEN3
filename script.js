class Catalogo {
  #peliculas = [];

  agregarPelicula(titulo, director, peliculaAnito, imagen) {
    const nuevaPelicula = { id: Date.now(), titulo, director, peliculaAnito, imagen };
    this.#peliculas.push(nuevaPelicula);
    this.mostrarPeliculas();
  }

  editarPelicula(id, titulo, director, peliculaAnito, imagen) {
    this.#peliculas = this.#peliculas.map(pelicula =>
      pelicula.id === id ? { ...pelicula, titulo, director, peliculaAnito, imagen } : pelicula
    );
    this.mostrarPeliculas();
  }

  eliminarPelicula(id) {
    this.#peliculas = this.#peliculas.filter(pelicula => pelicula.id !== id);
    this.mostrarPeliculas();
  }

  mostrarPeliculas() {
    const movieList = document.getElementById('movieList');
    movieList.innerHTML = '';

    for (let i = 0; i < this.#peliculas.length; i++) {
      const { id, titulo, director, peliculaAnito, imagen } = this.#peliculas[i];
      const article = document.createElement('article');
      article.className = 'postcard dark blue';
      article.innerHTML = `
        <a class="postcard__img_link" href="#">
          <img class="postcard__img" src="${imagen}" alt="Imagen de ${titulo}" />
        </a>
        <div class="postcard__text text-center">
          <h1 class="postcard__title blue"><a href="#">${titulo}</a></h1>
          <div class="postcard__subtitle small">
            <time datetime="${peliculaAnito}">
              <i class="fas fa-calendar-alt mr-2"></i>${new Date(peliculaAnito).toDateString()}
            </time>
          </div>
          <div class="postcard__bar"></div>
          <div class="postcard__preview-txt text-center">Dirigida por ${director}</div>
          <ul class="postcard__tagbox text-center">
            <li class="tag__item play blue"><a href="#" onclick="editarPelicula(${id})"><i class="fas fa-edit mr-2"></i>Editar</a></li>
            <li class="tag__item play red"><a href="#" onclick="eliminarPelicula(${id})"><i class="fas fa-trash-alt mr-2"></i>Eliminar</a></li>
          </ul>
        </div>
      `;
      movieList.appendChild(article);
    }
  }

  obtenerPeliculaPorId(id) {
    return this.#peliculas.find(pelicula => pelicula.id === id);
  }
}

const catalogo = new Catalogo();

function guardarPelicula() {
  const titulo = document.getElementById('titulo').value.trim();
  const director = document.getElementById('director').value.trim();
  const peliculaAnito = document.getElementById('peliculaAnito').value.trim();
  const imagen = document.getElementById('imagen').value.trim();

  if (titulo && director && peliculaAnito && imagen) {
    catalogo.agregarPelicula(titulo, director, peliculaAnito, imagen);
    document.getElementById('titulo').value = '';
    document.getElementById('director').value = '';
    document.getElementById('peliculaAnito').value = '';
    document.getElementById('imagen').value = '';
  } else {
    alert('Por favor, llene todos los campos.');
  }
}

function editarPelicula(id) {
  const pelicula = catalogo.obtenerPeliculaPorId(id);
  if (pelicula) {
    const nuevoTitulo = prompt('Nuevo título de la película:', pelicula.titulo);
    const nuevoDirector = prompt('Nuevo director de la película:', pelicula.director);
    const nuevoAnito = prompt('Nuevo año de la película:', pelicula.peliculaAnito);
    const nuevaImagen = prompt('Nueva imagen de la película:', pelicula.imagen);

    if (nuevoTitulo && nuevoDirector && nuevoAnito && nuevaImagen) {
      catalogo.editarPelicula(id, nuevoTitulo, nuevoDirector, nuevoAnito, nuevaImagen);
    } else {
      alert('Todos los campos deben ser llenados para editar la película.');
    }
  } else {
    alert('Película no encontrada.');
  }
}

function eliminarPelicula(id) {
  if (confirm('¿Estás seguro de que quieres eliminar esta película?')) {
    catalogo.eliminarPelicula(id);
  }
}
