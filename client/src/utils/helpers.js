export const openHiddenTab = (type) => {
    if (document.querySelector('.add' + type)) {
        document.querySelector('.add' + type).click();
    }
} 

export const reopenTab = (type) => {
    if (document.querySelector('.' + type + 'list')) {
        document.querySelector('.' + type + 'list').click();
    }
} 

export const checkPermission = (permissions, permission) => {
    return permissions.map(p => p.toLowerCase()).includes(permission.toLowerCase());
}