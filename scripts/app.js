/* globals lang */
require("i18n/i18n.js"); // Generates global lang object

const Application = require("sf-core/application");

// Set uncaught exception handler, all exceptions that are not caught will
// trigger onUnhandledError callback.
Application.onUnhandledError = function(e) {
    alert({
        title: lang.applicationError,
        message: e.stack || (e.message + "\n\n*" + e.sourceURL + "\n*" + e.line)
    });
};

require("sf-extension-utils");
require("./theme");
const Network = require("sf-core/device/network");
var notifier = new Network.createNotifier();

notifier.subscribe((connectionType) => {
    if (connectionType === Network.ConnectionType.NONE) {
        alert("No Network Connection");
    }
});

const {
    NativeRouter: Router,
    NativeStackRouter: StackRouter,
    Route
} = require("@smartface/router");

const router = Router.of({
    path: "/",
    isRoot: true,
    routes: [
        StackRouter.of({
            path: "/dates",
            routes: [
                Route.of({
                    path: "/dates/1",
                    build: (router, route) => {
                        const { routeData, view } = route.getState();
                        let PgDates = require("pages/pgDates");
                        return new PgDates(routeData, router);
                    }
                })
            ]
        })
    ]
});

router.push('/dates/1');
