import express from "express";
import Config from "../config/config";

const router = express.Router();

// with gzip 543 bytes, without gzip 567 bytes
router.get('', (req, res) => {
    res.json({
        argv: Config.argv,
        numCpus: Config.NUM_CPUS,
        platform: process.platform,
        version: process.version,
        rssMemoryUsage: process.memoryUsage().rss,
        execPath: process.execPath,
        pid: process.pid,
        cwd: process.cwd(),
    });
});


export default router