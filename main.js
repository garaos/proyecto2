// Formulario
// visualizacion del boton editar que remplaza al boton agregar
document.getElementById("btnEditar").style.display = "none";

// ---------------------------------------------------
let filas = null;
let alumnos = [];
let alumnosOld = cargarPag();

const btn_reg = document.querySelector("#btnAgregar");
btn_reg.addEventListener("click", event => crear(event));

const btn_ed = document.querySelector("#btnEditar");
btn_ed.addEventListener("click", event => crear(event));


function crear(event) {
    let datosRegistro = leerDatos();
    let a = Object.values(datosRegistro);
    let b = a.some(e => e == '');

    if (this.alumnos) {
        if (this.alumnos.length == 0) {
            this.alumnos = alumnosOld;
        }
    } else {
        this.alumnos = [];
    }

    if (b == true) {
        alert("Favor complete toda la información");
    } else {
        if (filas === null) {
            alumnos.push(datosRegistro);
            localStorage.setItem("alumno", JSON.stringify(alumnos));
            escDatos(datosRegistro);
        } else {
            actualizando(datosRegistro);
        }
        resetTodo();
    }
}

// obtener datos
function leerDatos() {
    let datosRegistro = {};

    datosRegistro["nombreAlumno"] = document.getElementById("nombreAlumno").value;

    datosRegistro["notaUno"] = document.getElementById("notaUno").value;

    datosRegistro["notaDos"] = document.getElementById("notaDos").value;

    return datosRegistro;

}

// insertar datos
function escDatos(datos) {
    let tablaLista = document.getElementById("lista").getElementsByTagName('tbody')[0];
    let esclista = tablaLista.insertRow(tablaLista.length);

    let regUno = esclista.insertCell(0);
    regUno.innerHTML = datos.nombreAlumno;

    let regDos = esclista.insertCell(1);
    regDos.innerHTML = datos.notaUno;

    let regTres = esclista.insertCell(2);
    regTres.innerHTML = datos.notaDos;

    let regCuatro = esclista.insertCell(3);
    regCuatro.innerHTML = (parseFloat(datos.notaUno) + parseFloat(datos.notaDos)) / 2;

    let btnEdEl = esclista.insertCell(4);
    btnEdEl.innerHTML = `<button onClick='editando(this)'>Editar</button> <button onClick='borrando(this)'>Eliminar</button>`;


}

// editar 
function editando(edi) {
    filas = edi.parentElement.parentElement;

    document.getElementById("nombreAlumno").value = filas.cells[0].innerHTML;

    document.getElementById("notaUno").value = filas.cells[1].innerHTML;

    document.getElementById("notaDos").value = filas.cells[2].innerHTML;

    document.getElementById("btnAgregar").style.display = "none";
    document.getElementById("btnEditar").style.display = "";

}

function actualizando(datosRegistro) {
    filas.cells[0].innerHTML = datosRegistro.nombreAlumno;
    filas.cells[1].innerHTML = datosRegistro.notaUno;
    filas.cells[2].innerHTML = datosRegistro.notaDos;
    filas.cells[3].innerHTML = (parseFloat(datosRegistro.notaUno) + parseFloat(datosRegistro.notaDos)) / 2;

    alumnos[filas.rowIndex - 1].nombreAlumno = datosRegistro.nombreAlumno;
    alumnos[filas.rowIndex - 1].notaUno = datosRegistro.notaUno;
    alumnos[filas.rowIndex - 1].notaDos = datosRegistro.notaDos;
    localStorage.setItem("alumno", JSON.stringify(alumnos));
}

// borrar
function borrando(edi) {
    if (confirm('Tay Seguro')) {
        borrar = edi.parentElement.parentElement;
        document.getElementById("lista").deleteRow(borrar.rowIndex);
        alumnos.splice(borrar.rowIndex - 1, 1);
        localStorage.setItem("alumno", JSON.stringify(alumnos));
    }
    resetTodo();
}

function resetTodo() {
    document.getElementById("nombreAlumno").value = '';
    document.getElementById("notaUno").value = '';
    document.getElementById("notaDos").value = '';
}

// Volver a cargar los datos luego de un reload a la pagina
function cargarPag() {
    c = JSON.parse(localStorage.getItem("alumno"));

    if (c !== null) {
        alumnos = c;
    }

    let nomb = c.sort((f, g) => {
        return f.nombreAlumno > g.nombreAlumno;
    })
    cargaDatosLS(nomb);
    console.table(nomb);
    return c;
}

function cargaDatosLS(c) {
    if (c !== null) {
        console.log("si vamos");
        console.log(filas);

        for (let index = 0; index < c.length; index++) {
            let nombreFor = c[index].nombreAlumno;
            let nota1For = c[index].notaUno;
            let nota2For = c[index].notaDos;

            console.log("esta entrando" + " posicion" + " " + index);
            console.log(nombreFor);
            console.log(nota1For);
            console.log(nota2For);

            let tablaLS = document.getElementById("lista").getElementsByTagName('tbody')[0];
            let escLS = tablaLS.insertRow(tablaLS.length);
            let regUnoLS = escLS.insertCell(0);
            regUnoLS.innerHTML = nombreFor;

            let regDosLS = escLS.insertCell(1);
            regDosLS.innerHTML = nota1For;

            let regTresLS = escLS.insertCell(2);
            regTresLS.innerHTML = nota2For;

            let regCuatroLS = escLS.insertCell(3);
            regCuatroLS.innerHTML = (parseFloat(nota1For) + parseFloat(nota2For)) / 2;

            let btnEdElLS = escLS.insertCell(4);
            btnEdElLS.innerHTML = `<button onClick='editando(this)'>Editar</button> <button onClick='borrando(this)'>Eliminar</button>`;
        }
    }
}

