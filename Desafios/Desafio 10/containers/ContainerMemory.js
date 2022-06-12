class ContainerMemory {
    constructor(){
        this.objectArray = [];
    }
    save(elem){
        let newId
        if (this.objectArray.length == 0) {
            newId = 1
        } else {
            newId = this.objectArray[ this.objectArray.length - 1 ].id + 1
        }

        const newElem = { ...elem, id: newId }
        this.objectArray.push(newElem)
        return newElem
    }
    getById(id){
        const elem = this.objectArray.find(elem => elem.id == id)
        if (!elem) {
            throw new Error(`Error al Leer: Elemento no encontrado`)
        } else {
            return elem
        }
    }
    getAll(){
        return [ ...this.objectArray ];
    }
    updateById(id, elem){
        const index = this.objectArray.findIndex(p => p.id == id)
        if (index == -1) {
            throw new Error(`Error al Actualizar: Elemento no encontrado`)
        } else {
            this.objectArray[ index ] = { ...elem, id: parseInt(id, 10) }
            return elem
        }
    }
    deleteById(id){
        const index = this.objectArray.findIndex(elem => elem.id == id)
        if (index == -1) {
            throw new Error(`Error al Borrar: Elemento no encontrado`)
        } else {
            console.log(index);
            return this.objectArray.splice(index, 1)
        }
    }
    deleteAll(){
        this.objectArray = [];
    }
}
export default ContainerMemory;