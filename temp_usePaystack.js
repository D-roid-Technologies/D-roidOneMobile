"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePaystack = void 0;
const react_1 = require("react");
const PaystackProvider_1 = require("./PaystackProvider");
const usePaystack = () => {
    const context = (0, react_1.useContext)(PaystackProvider_1.PaystackContext);
    if (!context)
        throw new Error('usePaystack must be used within a PaystackProvider');
    return context;
};
exports.usePaystack = usePaystack;
//# sourceMappingURL=usePaystack.js.map