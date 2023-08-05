const fs = require('node:fs/promises')
const path = require('node:path')

// Ejercicio 2
async function writeFile (filePath, data, callback) {
  const dir = path.dirname(filePath)

  // Comprobar que el directorio existe, en caso contrario, crearlo
  try {
    await fs.mkdir(dir, { recursive: true })
  } catch (err) {
    console.log('Error al comprobar/crear el directorio')
    return callback(err)
  }

  try {
    await fs.writeFile(filePath, data)
    callback()
  } catch (err) {
    console.log('Error al crear el archivo')
    return callback(err)
  }
}

// Ejercicio 3
async function readFileAndCount (word, callback) {
  const filePath = process.argv[2]

  // Comprobar que se ha especificado la palabra, el path del archivo y que exista
  if (!word) { return callback(new Error('No se ha especificado la palabra a buscar')) }
  if (!filePath) { return callback(new Error('No se ha especificado el path del archivo')) }

  try {
    await fs.access(filePath)
  } catch (err) {
    return callback(null, 0)
  }

  try {
    const content = await fs.readFile(filePath, 'utf8')
    const count = content.split(word).length - 1
    return callback(null, count)
  } catch (err) {
    return callback(err)
  }
}

module.exports = {
  writeFile,
  readFileAndCount
}
