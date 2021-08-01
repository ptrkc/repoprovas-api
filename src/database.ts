import "./setup";
import { getConnectionManager } from "typeorm";

if (
    process.env.NODE_ENV === "production" &&
    process.env.DATABASE_URL.indexOf("sslmode=require") === -1
) {
    process.env.DATABASE_URL += "?sslmode=require";
}
export default async function connect() {
    try {
        const connectionManager = getConnectionManager();
        const connection = connectionManager.create({
            name: "default",
            type: "postgres",
            url: process.env.DATABASE_URL,
            entities: [
                `${
                    process.env.NODE_ENV === "production" ? "dist/src" : "src"
                }/entities/*.*`,
            ],
            ssl: process.env.NODE_ENV === "production",
        });
        await connection.connect();
        await connection.runMigrations();
        return connection;
    } catch (e) {
        console.log(e);
    }
}
