// Throws an error with the given message if the given condition is false.
export function assert(condition, message) {
    if (!message || typeof message !== 'string') {
        throw new Error("Assertion must include message.");
    }

    if (!condition) {
        throw new Error("Assertion failed: " + message);
    }
}
