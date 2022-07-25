import { fork } from 'child_process'
import os from 'os'

const apiControllers = {
    getName: async (req, res) => {
        const user = await req.user;
        res.status(200).json({name: user?.username});
    },
    productosTest: (req, res) => {
        res.sendFile('indexTest.html', { root: './public/views' })
    },
    getInfo: (req, res) => {
        res.json({
            argvs: process.argv.slice(2),
            nodeVersion: process.version,
            platform: process.platform,
            memory: process.memoryUsage().rss,
            pathEject: process.execPath,
            id: process.pid,
            pathProject: process.cwd(),
            processors: os.cpus().length
        })
    },
    getNumbers: (req, res) => {
        let cant = req.params.cant;
        if(!cant) { cant = 1000000000 }
        const getNumbers = fork(`${process.cwd()}/process/getNumbers.js`)
        getNumbers.on('message', msg => {
            if (msg === 'listo') {
                getNumbers.send(cant)
            } else {
                res.json(msg);
            }
        })
    }
}

export default apiControllers;