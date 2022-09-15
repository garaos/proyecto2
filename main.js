// Formulario
// visualizacion del boton editar que remplaza al boton agregar
document.getElementById("btnEditar").style.display = "none";

// ---------------------------------------------------
let filas = null;
let alumnos = [];
let alumnosOld = cargarPag();

const btn_reg = document.querySelector("#btnAgregar");
btn_reg.addEventListener("click", event => create(event));

const btn_ed = document.querySelector("#btnEditar");
btn_ed.addEventListener("click", event => create(event));


function create(event) {
    event.preventDefault();
    btn_reg.blur();
    let dataReg = readData();
    let a = Object.values(dataReg);
    let b = a.some(e => e == '');

    if (this.alumnos && this.alumnos.length == 0) {
            this.alumnos = alumnosOld;
    } else {
        this.alumnos = [];
    }

    if (b == true) {
        alert("Favor complete toda la información");
    } else {
        if (a[1] >=1 && a[2] <= 7 && a[1]<=7 && a[2] >= 1) {
            if (filas === null) {
                alumnos.push(dataReg);
                localStorage.setItem("alumno", JSON.stringify(alumnos));
                writeData(dataReg);
            } else {
                actualize(dataReg);
                filas = null;
            }
            resetAll();
        }else {
            alert("Ingreso un valor entre 1 y 7")
        }
    }
}

// obtener datos
function readData() {
    let dataReg = {};

    dataReg["nombreAlumno"] = document.getElementById("nombreAlumno").value;

    dataReg["notaUno"] = document.getElementById("notaUno").value;

    dataReg["notaDos"] = document.getElementById("notaDos").value;

    return dataReg;

}

// insertar datos
function writeData(datos) {
    let tableList = document.getElementById("lista").getElementsByTagName('tbody')[0];
    let writeList = tableList.insertRow(tableList.length);

    let regZero = writeList.insertCell(0);
    regZero.innerHTML = `<i class="fa-solid fa-otter"></i> `;

    let regUno = writeList.insertCell(1);
    regUno.innerHTML = datos.nombreAlumno.toUpperCase();


    let regDos = writeList.insertCell(2);
    regDos.innerHTML = datos.notaUno;

    let regTres = writeList.insertCell(3);
    regTres.innerHTML = datos.notaDos;

    let regCuatro = writeList.insertCell(4);
    regCuatro.innerHTML = (parseFloat(datos.notaUno) + parseFloat(datos.notaDos)) / 2;

    let btnEdEl = writeList.insertCell(5);
    btnEdEl.innerHTML = `<button onClick='editData(this)' class="btn-ed"><i class="fa-solid fa-user-pen"></i></button> <button onClick='erase(this)' class="btn-del"><i class="fa-solid fa-trash-can"></i></button>`;


}

// editar 
function editData(edi) {
    filas = edi.parentElement.parentElement;

    document.getElementById("nombreAlumno").value = filas.cells[1].innerHTML;

    document.getElementById("notaUno").value = filas.cells[2].innerHTML;

    document.getElementById("notaDos").value = filas.cells[3].innerHTML;

    document.getElementById("btnAgregar").style.display = "none";
    document.getElementById("btnEditar").style.display = "block";

}

function actualize(dataReg) {
    filas.cells[0].innerHTML = `<i class="fa-solid fa-otter"></i> `;
    filas.cells[1].innerHTML = dataReg.nombreAlumno.toUpperCase();
    filas.cells[2].innerHTML = dataReg.notaUno;
    filas.cells[3].innerHTML = dataReg.notaDos;
    filas.cells[4].innerHTML = (parseFloat(dataReg.notaUno) + parseFloat(dataReg.notaDos)) / 2;

    alumnos[filas.rowIndex - 1].nombreAlumno = dataReg.nombreAlumno;
    alumnos[filas.rowIndex - 1].notaUno = dataReg.notaUno;
    alumnos[filas.rowIndex - 1].notaDos = dataReg.notaDos;
    localStorage.setItem("alumno", JSON.stringify(alumnos));
    document.getElementById("btnAgregar").style.display = "block";
    document.getElementById("btnEditar").style.display = "none";
}

// borrar
function erase(edi) {

    if (confirm('Confirme que desea eliminar')) {
        borrar = edi.parentElement.parentElement;

        alumnos.splice(borrar.rowIndex - 1, 1);
        document.getElementById("lista").deleteRow(borrar.rowIndex);
        localStorage.setItem("alumno", JSON.stringify(alumnos));
    }
}

function resetAll() {
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

    cargaDatosLS(c);
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
            regUnoLS.innerHTML = nombreFor.toUpperCase();

            let regDosLS = escLS.insertCell(2);
            regDosLS.innerHTML = nota1For;

            let regTresLS = escLS.insertCell(3);
            regTresLS.innerHTML = nota2For;

            let regCuatroLS = escLS.insertCell(4);
            regCuatroLS.innerHTML = (parseFloat(nota1For) + parseFloat(nota2For)) / 2;

            let btnEdElLS = escLS.insertCell(5);
            btnEdElLS.innerHTML = `<button onClick='editData(this)' class="btn-ed"><i class="fa-solid fa-user-pen"></i></button> <button onClick='erase(this)' class="btn-del"><i class="fa-solid fa-trash-can"></i></button>`;
        }
    }
}

