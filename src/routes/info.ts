import express from "express";
import Config from "../config/config";

const router = express.Router();

router.get('', (req, res) => {
    res.json({
        argv: Config.argv,
        platform: process.platform,
        version: process.version,
        rssMemoryUsage: process.memoryUsage().rss,
        execPath: process.execPath,
        pid: process.pid,
        cwd: process.cwd(),
    });
});


export default router