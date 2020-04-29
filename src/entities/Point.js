class Point {
    constructor(latitud, longitud, order, elevacion = "") {
        this.latitud = latitud;
        this.longitud = longitud;
        this.order = order;
        this.elevacion = elevacion;
    }

    getPoint() {
        return {lat: this.latitud, long: this.longitud};
    }

    getLat() {
        return this.latitud;
    }

    getLng() {
        return this.longitud;
    }

}

export default Point;
