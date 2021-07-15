const path = require('path')

function isFileImage(fileName) {
    const AVIABLE_EXTENSIONS = ['.jpg', '.jpeg', '.gif', '.png']; //Declaro todas las extensiones admitidas.
    const extension = path.extname(fileName) //Extraigo la extension del Filename

    if (AVIABLE_EXTENSIONS.includes(extension)) {
        return true
    }

    return false
}

module.exports = isFileImage;