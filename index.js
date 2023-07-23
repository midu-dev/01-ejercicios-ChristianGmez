const fs = require('node:fs')
const path = require('node:path')

// Ejercicio 2
async function writeFile (filePath, data, callback) {
  const dir = path.dirname(filePath)

  // Comprobar que el directorio existe, en caso contrario, crearlo
  try {
    fs.existsSync(dir) || fs.mkdirSync(dir, { recursive: true })
  } catch (err) {
    console.log('Error al comprobar/crear el directorio')
    return callback(err)
  }

  // Crear el archivo y escribir el texto
  fs.writeFile(filePath, data, (err) => {
    if (err) {
      console.log('Error al crear el archivo')
      return callback(err)
    }
    return callback(null, data)
  })
}

// Ejercicio 3
async function readFileAndCount (word, callback) {
  const filePath = process.argv[2]

  // Comprobar que se ha especificado la palabra, el path del archivo y que exista
  if (!word) { return callback(new Error('No se ha especificado la palabra a buscar')) }
  if (!filePath) { return callback(new Error('No se ha especificado el path del archivo')) }
  if (!fs.existsSync(filePath)) { return callback(null, 0) }

  const content = fs.readFileSync(filePath, 'utf8', err => {
    if (err) { return callback(err) }
  })

  callback(null, content.split(word).length - 1)
}

module.exports = {
  writeFile,
  readFileAndCount
}
