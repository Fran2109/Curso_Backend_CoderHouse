export default class imagesController {
    constructor () { }
    getFile = async (req, res) => {
        try {
            res.send("uploads/" + req.file.filename)
        } catch (error) {
            res.send(error);
        }
    }
}
