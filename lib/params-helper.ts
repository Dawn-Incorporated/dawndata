/**
 * Check if a value is set. A value is set if it is not undefined, or null.
 * Because Next.js doesn't return booleans for URL parameters, we also check if the value is an empty string.
 * @param value - The value to check
 * @returns True if the value is set, false otherwise
 */
function isSet(value: any): boolean {
    return value === "" && value !== undefined && value !== null;
}

export default isSet;