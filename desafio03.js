const fs = require("fs")

class Contenedor {
    constructor(fileName) {
        this.fileName = fileName
        async function createFile() {
            try {
                await fs.promises.writeFile(`${fileName}`, "")
                console.log("archivo Creado ")
            } catch (err) {
                console.log(`hubo un error : ${err}`)
            }
        }
        createFile()
    }
    //id asignado 
    async save(obj) {
        try {
            let inventary = await fs.promises.readFile(`${this.fileName}`, 'utf-8')
            
            if (!inventary) {
                obj.id = 1
                const arrObjs = [obj]
                await fs.promises.writeFile(`${this.fileName}`, JSON.stringify(arrObjs))
                return obj.id
            } else {
                inventary = JSON.parse(inventary);
                obj.id = inventary[inventary.length - 1].id + 1
                inventary.push(obj)
                await fs.promises.writeFile(`${this.fileName}`, JSON.stringify(inventary))
                return obj.id
            }
        } catch (err) {
            console.log(`error por : ${err}`)
        }
    }
    // recibe un id y devuelve el objeto con ese id si no existe devolver null

    async getbyId(id) {
        try {
            const inventary = await fs.promises.readFile(`${this.fileName}`, "utf-8")
            let dataParse = JSON.parse(inventary)
            let objFind = dataParse.find(item => item.id == id)
            if (objFind) {
                return objFind
            } else {
                return null
            }

        } catch (err) {
            console.log(`hubo un error  : ${err}`)
        }
    }
    // devolver un array de objetos con todos los objetos que esten el archivo 
    async getAll() {
        try {
            const inventary = await fs.promises.readFile(`${this.fileName}`, "utf-8")
            let inventaryParse = JSON.parse(inventary)
            return inventaryParse
        } catch (err) {
            console.log(`hubo un error 1: ${err}`)
        }
    }

    // borrar el elemento segun el id que le pasemos en el archivo 
    async deleteById(id) {
        try {
            const data = await fs.promises.readFile(`${this.fileName}`, "utf-8")
            let dataParse = JSON.parse(data)
            let objsFind = dataParse.filter((item) => item.id != id)
            fs.promises.writeFile(`${this.fileName}`, JSON.stringify(objsFind))
            console.log(`objeto con id : ${id} borrado`)
        } catch (err) {
            console.log(`hubo un error en recuperar el objeto por id : ${err}`)
        }

    }
    // elimina todos 
    async deleteAll() {
        try {
            await fs.promises.writeFile(`./${this.fileName}`, " ")
            console.log("contenido Borrado")
        } catch (err) {
            console.log(`hubo un error : ${err}`)
        }
    }
}

const newFile = new Contenedor("./productos.txt")

async function cargarProductos (){
    await newFile.save({ title: "cortinas", price: 5000, thumbnail: "https://www.hiloargentina.com.ar/productos/cortina-de-bano-en-gasa-de-algodon/" })
    await newFile.save({ title: "mesa", price: 12000, thumbnail: "https://www.dxxi.com.ar/producto/mesa-comedor-verma/" })
    await newFile.save({ title: "silla", price: 5000, thumbnail: "https://misterwils.com/historia-silla-chandigarh/" })
}
 cargarProductos()   

 let readFile = async function (){
    let inventario= JSON.stringify(await newFile.getAll())
    return inventario
 }
 readFile()


 let getById = async function (){
    let inventario= await JSON.parse(newFile.getAll())
    console.log(inventario)
    return inventario

}
 getById() 

 const express=require ('express')
const app=express()
const port=8080