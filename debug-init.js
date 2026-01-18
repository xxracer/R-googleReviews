const { initializeDatabase } = require('./backend/db-init');

console.log("Running extensive debug of DB Init...");

(async () => {
    try {
        await initializeDatabase();
        console.log("DB Init SUCCESS");
    } catch (error) {
        console.error("DB Init FAILED with error:");
        console.error(error);
    }
})();
