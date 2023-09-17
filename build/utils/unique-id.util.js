"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMFAId = exports.generateUniqueId = void 0;
var generateRandomAlphaNumeric = function (length, characters) {
    if (characters === void 0) { characters = "abcdefghijklmnopqrstuvwxyz0123456789"; }
    var result = "";
    for (var i = 0; i < length; i++) {
        var randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
};
var generateUniqueId = function () {
    return generateRandomAlphaNumeric(16, "abcde0123456789");
};
exports.generateUniqueId = generateUniqueId;
var generateMFAId = function () {
    return generateRandomAlphaNumeric(32, "abcde0123456789") + '-MFAGOJEK';
};
exports.generateMFAId = generateMFAId;
//# sourceMappingURL=unique-id.util.js.map