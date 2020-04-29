class Comentario {
    constructor(fecha, texto) {
        this.fecha = fecha;
        this.texto = texto;
    }

    getFecha() {
        return this.fecha
    }

    setFecha(fecha) {
        this.fecha = fecha
    }

    getAutor() {
        return this.autor
    }

    setAutor(persona) {
        this.autor = persona
    }

    getTexto() {
        return this.texto
    }

    setTexto(texto) {
        this.texto = texto
    }

    getFormattedDate() {
        let commentDate = '';
        if (this.fecha != null) {
            commentDate = this.fecha.getDate() + '/' +
                (this.fecha.getMonth() + 1) + '/' +
                this.fecha.getFullYear() + ' ' +
                this.fecha.getHours() + ':' +
                ((this.fecha.getMinutes() < 10 ? '0' : '') + this.fecha.getMinutes()) +
                ':' + this.fecha.getSeconds()
        }
        return commentDate
    }

    toString() {
        console.log('Comentario:');
        console.log('-Autor: ' + this.autor.getWebId());
        console.log('-Texto: ' + this.texto);
    }
}

export default Comentario