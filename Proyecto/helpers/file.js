const path = require('path')

function isFileImage(fileName) {
    const extensionesvalidas = ['.jpg', '.jpeg', '.gif', '.png']
    const extension = path.extname(fileName)

    if (extensionesvalidas.includes(extension)) {
        return true
    }

    return false
}

module.exports = {
    isFileImage,
}