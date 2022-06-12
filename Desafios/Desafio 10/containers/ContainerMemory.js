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
            throw new Error(`No existe el ID buscado`)
        } else {
            return elem
        }
    }
    getAll(){
        return [ ...this.objectArray ];
    }
    updateById(elem){
        const index = this.objectArray.findIndex(p => p.id == elem.id)
        if (index == -1) {
            throw new Error(`Error al actualizar: elemento no encontrado`)
        } else {
            this.objectArray[ index ] = elem
            return elem
        }
    }
    deleteById(id){
        const index = this.objectArray.findIndex(elem => elem.id == id)
        if (index == -1) {
            throw new Error(`Error al borrar: elemento no encontrado`)
        } else {
            return this.elementos.splice(index, 1)[ 0 ]
        }
    }
    deleteAll(){
        this.objectArray = [];
    }
}
export default ContainerMemory;