class User {
    constructor(nombre, webId, foto) {
        this.nombre = nombre
        this.webId = webId
        this.foto = foto
    }

    getNombre() {
        return this.nombre
    }

    getWebId() {
        return this.webId
    }

    getFoto() {
        return this.foto
    }

    toString() {
        console.log('-Nombre: ' + this.nombre)
        console.log('-WebID: ' + this.webId)
        console.log('-Foto: ' + this.foto)
    }
}

export default User