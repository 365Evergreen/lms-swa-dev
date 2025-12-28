"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var msal_react_1 = require("@azure/msal-react");
var LandingPage = function () {
    var accounts = (0, msal_react_1.useMsal)().accounts;
    var user = accounts[0];
    return ((0, jsx_runtime_1.jsxs)("main", { style: { padding: '2rem' }, children: [(0, jsx_runtime_1.jsxs)("h1", { children: ["Welcome, ", (user === null || user === void 0 ? void 0 : user.name) || (user === null || user === void 0 ? void 0 : user.username) || 'User', "!"] }), (0, jsx_runtime_1.jsx)("p", { children: "This is your personalized learning dashboard." })] }));
};
exports.default = LandingPage;
