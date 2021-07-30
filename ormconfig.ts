import "./src/setup";

module.exports = {
    type: "postgres",
    url: process.env.DATABASE_URL,
    migrationsTableName: "migrations",
    entities: ["dist/src/entities/*.js"],
    migrations: ["dist/src/migrations/*.js"],
    cli: {
        migrationsDir: "src/migrations",
        entitiesDir: "dist/src/entities/*.js",
    },
};
