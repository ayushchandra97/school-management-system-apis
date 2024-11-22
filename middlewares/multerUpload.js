const multer = require("multer")

const storage = multer.memoryStorage({
  filename: (req, file, cb) => {
    const newFileName = `file_${Date.now()}${extname(file.originalname)}`
    cb(null, newFileName)
  },
})

const upload = multer({ storage })

module.exports = upload
