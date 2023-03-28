import express from "express";
import Config from "../config/config";

const router = express.Router();

router.get('', (req, res) => {
    res.render('info',{
        sessionMaxAge: Config.SESSION_MAX_AGE,
        numCpus: Config.NUM_CPUS,
        platform: process.platform,
        version: process.version,
        rssMemoryUsage: process.memoryUsage().rss,
        execPath: process.execPath,
        pid: process.pid,
    });
});


export default router;