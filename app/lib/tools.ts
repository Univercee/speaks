export const isObjectEmpty = (objectName: Object | undefined) => {
    if(typeof objectName == 'undefined') return true;
    return Object.keys(objectName).length === 0;
}