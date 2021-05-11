//variables
const resultado = document.querySelector('#resultado');

const year = document.querySelector('#year');
const marca = document.querySelector('#marca');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

const max = new Date().getFullYear();
const min = max - 10;

//Generar un objeto

const datosBusqueda = {
	marca: '',
	year: '',
	minimo: '',
	maximo: '',
	puertas: '',
	transmision: '',
	color: '',
}


//eventos
document.addEventListener('DOMContentLoaded', () => {
	mostrarAutos(autos); //muestra los automoviles al cargar

	//llena las ociones de años
	llenarSelect();
})

//evento para los selectores
marca.addEventListener('change', e => {
	datosBusqueda.marca = e.target.value;
	filtrarAuto();
});
year.addEventListener('change', e => {
	datosBusqueda.year = e.target.value;
	filtrarAuto();
});
minimo.addEventListener('change', e => {
	datosBusqueda.minimo = e.target.value;
	filtrarAuto();
});
maximo.addEventListener('change', e => {
	datosBusqueda.maximo = e.target.value;
	filtrarAuto();
});
puertas.addEventListener('change', e => {
	datosBusqueda.puertas = parseInt(e.target.value);
	filtrarAuto();
});
transmision.addEventListener('change', e => {
	datosBusqueda.transmision = e.target.value;
	filtrarAuto();
});
color.addEventListener('change', e => {
	datosBusqueda.color = e.target.value;
	filtrarAuto();
});
//funcion de alto nivel: funcion que toma otra funcion

//funciones

function mostrarAutos(autos){

	limpiarHTML();//Elimina el html previo

	autos.forEach( auto => {
		const autoHTML = document.createElement('p');

		autoHTML.textContent = `
			${auto.marca} - 
			${auto.modelo} - 
			${auto.year} - 
			${auto.puertas} - 
			${auto.transmision} - 
			${auto.precio} - 
			${auto.color}

		`;

		//insertar en el html
		
		resultado.appendChild(autoHTML);
	})
}

//limpiar el html
function limpiarHTML(){
	while(resultado.firstChild){
		resultado.removeChild(resultado.firstChild);
	}
}


//Genera los años del select

function llenarSelect(){
	for (let i = max; i >= min; i--){
		const opcion = document.createElement('option');
		opcion.value = i;
		opcion.textContent = i;
		year.appendChild(opcion); //Agrega las opciones de año al seleccionar
	}
}

//funcion que filtra en base a la busqueda

function filtrarAuto(){
	const resultado = autos.filter( filtrarMarca ).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);

	// console.log(resultado);
	mostrarAutos(resultado);
	if (resultado.length){
		mostrarAutos(resultado);
	}else{
		noResultado();
	}
}

function noResultado(){
	limpiarHTML();

	const noResultado = document.createElement('div');
	noResultado.classList.add('alerta','error');
	noResultado.textContent = "No hay Resultados, intenta con otros terminos de busquedas";
	resultado.appendChild(noResultado);
}



function filtrarMarca(auto){
	const{marca} = datosBusqueda;
	if(marca){
		return auto.marca === marca;
	}
	return auto;
}
function filtrarYear(auto){
	const{year} = datosBusqueda;
	if(year){
		return auto.year === parseInt(year);
	}
	return auto;
} //Esto seria la programacion funcional, escribir funciones pequeñas que van realizando operaciones
function filtrarMinimo(auto){
	const{minimo} = datosBusqueda;
	if(minimo){
		return auto.precio >= minimo;
	}
	return auto;
}
function filtrarMaximo(auto){
	const{maximo} = datosBusqueda;
	if(maximo){
		return auto.precio <= maximo;
	}
	return auto;
}
function filtrarPuertas(auto){
	const{puertas} = datosBusqueda;
	if(puertas){
		return auto.puertas === puertas;//el parse se agrego mas arriba en la linea 54
	}
	return auto;
}
function filtrarTransmision(auto){
	const{transmision} = datosBusqueda;
	if(transmision){
		return auto.transmision === transmision;
	}
	return auto;
}
function filtrarColor(auto){
	const{color} = datosBusqueda;
	if(color){
		return auto.color === color;
	}
	return auto;
}

