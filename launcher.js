const fs = require('fs');

console.log("🚀 Launcher starting...");

try {
    // Catch synchronous errors during require
    process.on('uncaughtException', (err) => {
        fs.writeFileSync('crash_report.txt', `UNCAUGHT EXCEPTION:\n${err.stack}`);
        console.error("CRASH DETECTED. WRITTEN TO crash_report.txt");
        process.exit(1);
    });

    // Try to load the server
    require('./backend/server.js');

} catch (err) {
    fs.writeFileSync('crash_report.txt', `REQUIRE ERROR:\n${err.stack}`);
    console.error("Require failed. Written to crash_report.txt");
}
