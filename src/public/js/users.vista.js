function deleteUser(id){

    axios.delete(`/api/users/${id}`, {})
    .then(response => {
        alert('Usuario eliminado');
    })
    .catch(error => {
        console.log(error)
        alert('ERROR: Ocurrio un problema')
    });


}

function obtenerRolYModificar(userId, index) {

    idSelect = "roleSelector" + index
    
    var selectElement = document.getElementById(idSelect);
    var selectedRole = selectElement.value;

    // Llama a la función modificarRol() con el userId y el selectedRole como parámetros
    modificarRol(userId, selectedRole);
}

function modificarRol(userId, newRole){

    axios.put(`/api/users/${userId}`, {role: newRole})
    .then(response => {
        alert('Usuario actualizado');
    })
    .catch(error => {
        console.log(error)
        alert('ERROR: Ocurrio un problema')
    });

}