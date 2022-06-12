import admin from "firebase-admin";
import fs from "fs";

const asObj = doc => ({ id: doc.id, ...doc.data() })

class ContainerFirebase{
    constructor(url, collection){
        const serviceAccount = JSON.parse(fs.readFileSync(url, 'utf8'))
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        const db = admin.firestore();
        this.collection = db.collection(collection)
    }
    async save(elem){
        const added = await this.collection.add(elem);
        return added;
    }
    async getById(id){
        const doc = await this.collection.doc(id).get();
        return asObj(doc);
    }
    async getAll(){
        const result = []
        const snapshot = await this.collection.get();
        snapshot.forEach(doc => {
            result.push(asObj(doc))
        })
        return result;
    }
    async updateById(id, elem){
        await this.collection.doc(id).set(elem);
        return asObj(await this.collection.doc(id).get());
    }
    async deleteById(id){
        await this.collection.doc(id).delete();
    }
    async deleteAll(){
        this.collection.onSnapshot((snapshot) => {
            snapshot.docs.forEach((doc) => {
                this.collection.doc(doc.id).delete()
            })
        })
    }
}

export default ContainerFirebase;