/**
 * Check if a value is set. A value is set if it is not undefined, or null.
 * Because Next.js doesn't return booleans for URL parameters, we also check if the value is an empty string.
 * @param value - The value to check
 * @returns True if the value is set, false otherwise
 */
function isSet(value: any): boolean {
    return value === "" || (value !== undefined && value !== null);
}

function addParametersToQuery(prefix: string, value: any, surround: string | null = null): string {
    if (!isSet(value)) {
        return ''
    }
    return `${ prefix } ${ surround ? surround : '' }${ value }${ surround ? surround : '' }`
}

export { isSet, addParametersToQuery };