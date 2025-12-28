import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useMsal } from '@azure/msal-react';
const LandingPage = () => {
    const { accounts } = useMsal();
    const user = accounts[0];
    return (_jsxs("main", { style: { padding: '2rem' }, children: [_jsxs("h1", { children: ["Welcome, ", (user === null || user === void 0 ? void 0 : user.name) || (user === null || user === void 0 ? void 0 : user.username) || 'User', "!"] }), _jsx("p", { children: "This is your personalized learning dashboard." })] }));
};
export default LandingPage;
