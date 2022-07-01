class Usuario {
    constructor(nombre,apellido,mascota,libros){
        this.nombre=nombre
        this.apellido=apellido
        /* this.mascota=mascota */
        this.mascota=[mascota]
        this.libros=libros
    }
    getFullName = function (){
        console.log(`Hola mi nombre es ${this.nombre} ${this.apellido}`)
    }
    addMascotas (mascota) {
        this.mascota.push(mascota)
        console.log(this.mascota)
    }
    countMascotas= function () {
        console.log(this.mascota.length)
    }
    addBooks(libros){
        this.libros.push(libros)
        console.log(this.libros)
    }
    getBooksName(){
        this.libros.find(libro =>{
            console.log(libro.name)
        })
    }
}



const usuario1= new Usuario ("María","Lovero","Aitana",[{name:"Bestiario",autor:"Cortazar" }])
usuario1.getFullName()
usuario1.addMascotas("Boris")  
usuario1.countMascotas()
usuario1.addBooks({name:"Cuentos Completos",autor:"Lispector" }) 
usuario1.getBooksName() 
