const API_URL = "https://retoolapi.dev/mC6TM2/integrantes";

async function ObtenerIntegrantes() {
    const respuesta = await fetch(API_URL);
    const data = await respuesta.json();
    MostrarDatos(data);
}

function MostrarDatos(datos){
    const tabla = document.querySelector("#tabla tbody")
     tabla.innerHTML = " ";
     datos.forEach(integrante => {
        tabla.innerHTML += `
            <tr>
                <td>${integrante.id}</td>
                <td>${integrante.nombre}</td>
                <td>${integrante.apellido}</td>
                <td>${integrante.correo}</td>
                <td>
                    <button>Editar</button>
                    <button onclick="EliminarPersona(${integrante.id})">Eliminar</button>
                </td>
            </tr>
        `;
     });    
}


ObtenerIntegrantes();


//agregar nuevo integrante
const modal = document.getElementById("mdAgregar");
const btnAgregar = document.getElementById("btnAgregar");
const btnCerrar = document.getElementById("btnCerrar");

btnAgregar.addEventListener("click", ()=>{
    modal.showModal();
});
btnCerrar.addEventListener("click", ()=>{
    modal.close();
});

//agregar nuevo integrante desde el formulario
document.getElementById("frmAgregar").addEventListener("submit", async e => {
    e.preventDefault();//e representa a submit
    //capturar valores
    const nombre = document.getElementById("txtNombre").value.trim();
    const apellido = document.getElementById("txtApellido").value.trim();
    const correo = document.getElementById("txtEmail").value.trim();
    //validacion
    if(!nombre || !apellido || !correo){
        alert("Ingrese los valores correctamente");
        return;
    }

    //llamar a la Api para enviar el registro
    const respuesta = await fetch(API_URL, {
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({nombre, apellido, correo})
    });//fetch para llamar a la api

    //verificar si la API responde que los datos fueron enviados
    if(respuesta.ok){
        alert("El registro fue agregado correctamente");

        //limpiar formulario
        document.getElementById("frmAgregar").reset();

        //cerrar el modal
        modal.close();
        
        //recargar la tabla
        ObtenerIntegrantes();
    }else{
        //En caso de que la API devuelva un codigo diferente a 200-299
        alert("El registro no pudo ser agregado")
    }

});

//funcion para borrar registros
async function EliminarPersona(id){
    const confirmacion = confirm("¿Realmente deseas eliminar el registo?");

    //Validamos si el usuario si escogio borrar
    if(confirmacion){
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });
        ObtenerIntegrantes();
    }
}