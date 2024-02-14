import expressService from "./services/expressService";
import authMiddleware from "./middlewares/authMiddleware";
import authController from "./controllers/authController";
import rootController from "./controllers/rootController";
import tenantsController from "./controllers/tenantsController";
import errorMiddleware from "./middlewares/errorMiddleware";

// Configure middleware.
const app = expressService.getApp();
authMiddleware.install(app);

// Attach controllers.
authController.install(app);
rootController.install(app);
tenantsController.install(app);
rootController.installDefaultRoute(app);

// Install error handler.
errorMiddleware.install(app);

// Start serving.
expressService.serve();
