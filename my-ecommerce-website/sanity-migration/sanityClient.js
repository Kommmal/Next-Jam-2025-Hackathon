"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
// sanityClient.ts
var client_1 = require("@sanity/client");
exports.client = (0, client_1.createClient)({
    projectId: 'to5tioje', 
    dataset: 'production', 
    apiVersion: '2024-01-04', 
    useCdn: false, 
});
