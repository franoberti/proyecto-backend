
function deleteUser(id) {

    axios.delete(`/api/users/${id}`, {})
        .then(response => {
            alert('Usuario eliminado');
        })
        .catch(error => {
            console.log(error)
            alert('ERROR: Ocurrio un problema')
        });


}

function deleteInvalidUsers() {

    let invalidUsers
    axios.get(`/api/users/inactivos`)
        .then(response => {
            invalidUsers = response.data.data

            for (let i = 0; i < invalidUsers.length; i++) {
                const userId = invalidUsers[i]._id
                axios.delete(`/api/users/${userId}`)
                    .then(response => {
                        const to = invalidUsers[i].email
                        const subject = 'Usuario Eliminado'
                        const html = `  <div>
                                            <h1> HOLA ${invalidUsers[i].firstName} </h1>
                                            <p> Se ha eliminado su usuario del sistema "Proyecto Final CoderHouse - Backend" ya que ha estado inactivo por mas de dos dias.</p>
                                        </div>`
                        axios.post(`/mail`, {to: to, subject: subject, html: html})
                            .then(response => {
                                console.log('Mail Enviado');
                            })
                        console.log('Usuario Eliminado');
                    })
                    .catch(error => {
                        console.log(error)
                        alert('ERROR: Ocurrio un problema')
                    });
            }
            alert('Usuarios eliminados con exito!')
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

function modificarRol(userId, newRole) {

    axios.put(`/api/users/${userId}`, { role: newRole })
        .then(response => {
            alert('Usuario actualizado');
        })
        .catch(error => {
            console.log(error)
            alert('ERROR: Ocurrio un problema')
        });

}
