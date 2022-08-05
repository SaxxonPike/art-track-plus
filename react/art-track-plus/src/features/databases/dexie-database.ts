import AppDataSource from "./app-data-source";
import Dexie, {IndexableType, Table} from "dexie";
import Artist from "../../models/artist";
import AppDatabase from "./app-database";
import AppSchema from "./app-schema";
import AppRecord from "./app-record";

// Configuration for DexieDatabase.
export interface DexieConfiguration {
    databaseName: string
}

// Database adapter for Dexie.
export default class DexieDatabase implements AppDataSource {
    private db: DexieImpl;

    constructor(config: DexieConfiguration) {
        this.db = new DexieImpl(config);
    }

    private async saveInternal(table: Table, rows): Promise<IndexableType> {
        // This makes all imported records have a version
        // of the time they were imported so that internal
        // lists are forcibly refreshed.
        const fixedRows = rows
            .filter(row => !!row)
            .map(row => ({
                ...row,
                version: new Date()
            }));

        // This populates IDs in the returned records.
        const keys = await table.bulkPut(fixedRows, {allKeys: true});
        for (let i = 0; i < keys.length; i++) {
            fixedRows[i].id = keys[i];
        }

        return fixedRows;
    }

    async save(records: AppSchema): Promise<AppDatabase> {
        const tables = this.db.tables;
        const result = {};

        const tasks = tables.map(table => {
            const rows = records[table.name];
            if (!rows)
                return Promise.resolve();

            return this.saveInternal(table, rows)
                .then(r => {
                    result[table.name] = r;
                    return Promise.resolve();
                })
        });

        await Promise.all(tasks);
        return <AppDatabase>result;
    }

    async backup(): Promise<AppDatabase> {
        const tables = this.db.tables;

        // Grab all tables' rows and stuff them into a single
        // result object.
        const result = {};

        const queries = tables
            .map(table => table.toArray()
                .then((rows) => {
                    result[table.name] = rows;
                }));

        await Promise.all(queries);
        return <AppDatabase>result;
    }

    async erase() {
        await this.db.delete();

        const tables = this.db.tables;
        const result = {};

        tables.forEach(table => {
            result[table.name] = [];
        });

        return <AppDatabase>result;
    }

    async restore(backup: AppSchema) {
        const tables = this.db.tables;
        const result = {};

        const tasks = tables.map(table => {
            const rows = backup[table.name];
            if (!rows)
                return Promise.resolve();

            return table.clear()
                .then(() => {
                    result[table.name] = this.saveInternal(table, rows);
                });
        });

        await Promise.all(tasks);
        return <AppDatabase>result;
    }

    async refresh(lastUpdate?: Date) {
        const result = {};

        const filter = lastUpdate ?
            (x => !x.deleted && x.version > lastUpdate) :
            (x => !x.deleted);

        const tasks = this.db.tables.map(async table => {
            result[table.name] = await table
                .filter(filter)
                .toArray();
        });

        await Promise.all(tasks);
        return <AppDatabase>result;
    }

    async updateMany(updates: AppSchema) {
        const tables = this.db.tables;
        const result = {};

        const tasks = tables.map(async table => {
            const changes = updates[table.name];
            if (!changes) {
                return;
            }

            const folded = changes
                .reduce((prev, curr) => ({...prev, ...curr}));

            const tableResult = [];
            const rows = await table.toArray();
            const ops = rows.map(async row => {
                if (await table.update((<AppRecord>row).id, folded)) {
                    tableResult.push(({...row, ...folded}));
                }
            });

            await Promise.all(ops);
            result[table.name] = tableResult;
        });

        await Promise.all(tasks);
        return <AppDatabase>result;
    }
}

class DexieImpl extends Dexie {
    artists!: Table<Artist>

    constructor(config: DexieConfiguration) {
        super(config.databaseName);
        this.version(2)
            .stores({
                artists: [
                    '++id',
                    'name',
                    'badgeNumber',
                    'tableNumber',
                    'roomNumber',
                    'phone',
                    'remarks',
                    'lotteryEligible',
                    'lotteryGuaranteed',
                    'lotteryOrder',
                    'seatedLast',
                    'seatedDays',
                    'standbyDays',
                    'standbyOrder',
                    'version',
                    'deleted'
                ].join()
            });
    }
}
