import yargsParser from "yargs/yargs";

const yargs = yargsParser(process.argv.slice(2));

let { port, fork, dev, storage } = yargs
    .alias({
        p: "port",
        f: "fork",
        d: "dev",
        s: "storage",
    })
    .boolean(["d", "f"])
    .default({
        port: 8080,
        fork: false,
        dev: false,
        storage: "mongo",
    }).argv;

if (!dev) {
    port = process.env.PORT;
}

export { port, fork, dev, storage };
