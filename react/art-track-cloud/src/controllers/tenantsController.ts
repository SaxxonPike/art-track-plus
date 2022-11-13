import {Express} from "express";
import dataService from "../services/dataService";
import sessionService from "../services/sessionService";
import responseService from "../services/responseService";

class TenantsController {
    install(app: Express) {

        // Get all records for a tenant. Usually for the initial state of an app.
        app.get("/tenants/:tenantId", async (req, res, next) => {
            try {
                const session = await sessionService.retrieve(req);
                const records = await dataService.getAllRecords(req.params.tenantId);
                await responseService.respondSuccess(res, records);
            } catch (e) {
                next(e);
            }
        });

        // Get all records for a tenant + table.
        app.get("/tenants/:tenantId/tables/:tableId", async (req, res) => {

        });

        // Get all records for a tenant + table with the specified id.
        app.get("/tenants/:tenantId/tables/:tableId/records/:recordId", async (req, res) => {

        });

        // Create a new record.
        app.post("/tenants/:tenantId/tables/:tableId/records", async (req, res) => {

        });

        // Update an existing record.
        app.post("/tenants/:tenantId/tables/:tableId/records/:recordId", async (req, res) => {

        });

        // Delete a record.
        app.post("/tenants/:tenantId/tables/:tableId/records/:recordId/delete", async (req, res) => {

        });
    }
}

const service = new TenantsController();
export default service;
