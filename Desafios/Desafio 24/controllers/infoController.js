import os from "os";

export default class infoController {
    constructor() { }
    info(req, res) {
        const info = {
            argvs: process.argv.slice(2),
            nodeVersion: process.version,
            platform: process.platform,
            memory: process.memoryUsage().rss,
            pathEject: process.execPath,
            id: process.pid,
            pathProject: process.cwd(),
            processors: os.cpus().length,
        };
        res.render("info", info);
    }
}