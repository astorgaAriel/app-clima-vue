
class Region {
  constructor(id, nombre, ciudades = []) {
    this.id = id;
    this.nombre = nombre;
    this.ciudades = ciudades;
  }


  agregarCiudad(ciudad) {
    this.ciudades.push(ciudad);
  }


}
