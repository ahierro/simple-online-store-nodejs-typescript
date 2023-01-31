import express from "express";
import Config from "../config/config";
import log4js from "log4js";
const logger = log4js.getLogger();
const router = express.Router();

// with gzip 543 bytes, without gzip 567 bytes
router.get('', (req, res) => {
    const response = {
        argv: Config.argv,
        numCpus: Config.NUM_CPUS,
        platform: process.platform,
        version: process.version,
        rssMemoryUsage: process.memoryUsage().rss,
        execPath: process.execPath,
        pid: process.pid,
        cwd: process.cwd(),
    };
    // @ts-ignore
    if(req.query.log){
        logger.info("response", response);
    }
    res.json(response);
});


export default router