import AppDatabase from "./app-database";
import AppSchema from "./app-schema";

export default interface AppDataSource {

    // Back up the entire database. Returns the backup.
    backup: () => Promise<AppDatabase>

    // Restore database from backup. Returns the new database.
    restore: (backup: AppSchema) => Promise<AppDatabase>

    // Erase the database. Returns the empty database.
    erase: () => Promise<AppDatabase>

    // Request a refresh of records since a specific date+time.
    // Returns the updated records.
    refresh: (lastUpdate?: Date) => Promise<AppDatabase>

    // Save records to a database. Returns the updated records.
    save: (records: AppSchema) => Promise<AppDatabase>
}