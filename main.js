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
    event.preventDefault();
    btn_reg.blur();
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

    let regZero = esclista.insertCell(0);
    regZero.innerHTML = `<i class="fa-solid fa-otter"></i> `;

    let regUno = esclista.insertCell(1);
    regUno.innerHTML = datos.nombreAlumno;

    let regDos = esclista.insertCell(2);
    regDos.innerHTML = datos.notaUno;

    let regTres = esclista.insertCell(3);
    regTres.innerHTML = datos.notaDos;

    let regCuatro = esclista.insertCell(4);
    regCuatro.innerHTML = (parseFloat(datos.notaUno) + parseFloat(datos.notaDos)) / 2;

    let btnEdEl = esclista.insertCell(5);
    btnEdEl.innerHTML = `<button onClick='editando(this)' class="btn-ed"><i class="fa-solid fa-user-pen"></i></button> <button onClick='borrando(this)' class="btn-del"><i class="fa-solid fa-trash-can"></i></button>`;


}

// editar 
function editando(edi) {
    filas = edi.parentElement.parentElement;

    document.getElementById("nombreAlumno").value = filas.cells[1].innerHTML;

    document.getElementById("notaUno").value = filas.cells[2].innerHTML;

    document.getElementById("notaDos").value = filas.cells[3].innerHTML;

    document.getElementById("btnAgregar").style.display = "none";
    document.getElementById("btnEditar").style.display = "block";

}

function actualizando(datosRegistro) {
    filas.cells[0].innerHTML = `<i class="fa-solid fa-otter"></i> `;
    filas.cells[1].innerHTML = datosRegistro.nombreAlumno;
    filas.cells[2].innerHTML = datosRegistro.notaUno;
    filas.cells[3].innerHTML = datosRegistro.notaDos;
    filas.cells[4].innerHTML = (parseFloat(datosRegistro.notaUno) + parseFloat(datosRegistro.notaDos)) / 2;

    alumnos[filas.rowIndex - 1].nombreAlumno = datosRegistro.nombreAlumno;
    alumnos[filas.rowIndex - 1].notaUno = datosRegistro.notaUno;
    alumnos[filas.rowIndex - 1].notaDos = datosRegistro.notaDos;
    localStorage.setItem("alumno", JSON.stringify(alumnos));
    document.getElementById("btnAgregar").style.display = "block";
    document.getElementById("btnEditar").style.display = "none";
}

// borrar
function borrando(edi) {

    if (confirm('Confirme que desea eliminar')) {
        borrar = edi.parentElement.parentElement;

        alumnos.splice(borrar.rowIndex - 1, 1);
        document.getElementById("lista").deleteRow(borrar.rowIndex);
        console.log(borrar.rowIndex);
        console.table(alumnos);
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

    // let nomb = c.sort((f, g) => {
    //     return f.nombreAlumno > g.nombreAlumno;
    // })
    cargaDatosLS(c);
    // console.table(nomb);
    return c;
}

function cargaDatosLS(c) {
    if (c !== null) {
        for (let index = 0; index < c.length; index++) {
            let nombreFor = c[index].nombreAlumno;
            let nota1For = c[index].notaUno;
            let nota2For = c[index].notaDos;

            let tablaLS = document.getElementById("lista").getElementsByTagName('tbody')[0];
            let escLS = tablaLS.insertRow(tablaLS.length);

            let regZeroLS = escLS.insertCell(0);
            regZeroLS.innerHTML = `<i class="fa-solid fa-otter"></i> `;

            let regUnoLS = escLS.insertCell(1);
            regUnoLS.innerHTML = nombreFor;
            
            let regDosLS = escLS.insertCell(2);
            regDosLS.innerHTML = nota1For;

            let regTresLS = escLS.insertCell(3);
            regTresLS.innerHTML = nota2For;

            let regCuatroLS = escLS.insertCell(4);
            regCuatroLS.innerHTML = (parseFloat(nota1For) + parseFloat(nota2For)) / 2;

            let btnEdElLS = escLS.insertCell(5);
            btnEdElLS.innerHTML = `<button onClick='editando(this)' class="btn-ed"><i class="fa-solid fa-user-pen"></i></button> <button onClick='borrando(this)' class="btn-del"><i class="fa-solid fa-trash-can"></i></button>`;

           
        }
    }
}

