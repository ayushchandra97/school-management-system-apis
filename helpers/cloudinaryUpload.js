const cloudinary = require("../config/cloudinary")

async function uploadAndGetImageUrl(filePath, folder) {
  try {
    const results = await cloudinary.uploader.upload(filePath, {
      folder,
      transformation: [
        {
          width: 1200,
          height: 1200,
          crop: "fill",
          gravity: "auto",
        },
        {
          quality: "auto",
          fetch_format: "auto",
        },
      ],
    })

    const url = cloudinary.url(results.public_id)
    console.log("File uploaded successfully:", url)
    return url
  } catch (error) {
    console.error("Error uploading or creating url")
    return { message: "Error uploading file or getting URL", status: 500 }
  }
}

module.exports = uploadAndGetImageUrl
