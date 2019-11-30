const router = require('express').Router()
const projectId = 'rutabaga-938e1'
const computeRegion = 'us-central1'
const modelId = 'ICN4814264438775349248'
const scoreThreshold = '0.50'
const path = require('path')
const {PredictionServiceClient} = require('@google-cloud/automl')
const predictionServiceClient = new PredictionServiceClient({
  keyFilename: './credentials.json'
})
const fs = require('fs')
const multer = require('multer')
const upload = multer({
  dest: './server/uploads/',
  limits: {fieldSize: 25 * 1024 * 1024}
})

async function predict(filePath) {
  // Get the full path of the model.
  const modelFullId = predictionServiceClient.modelPath(
    projectId,
    computeRegion,
    modelId
  )
  // Read the file content for prediction.
  const content = fs.readFileSync(filePath, `base64`)
  const params = {
    score_threshold: scoreThreshold
  }
  // Set the payload by giving the content and type of the file.
  const payload = {
    image: {
      imageBytes: content
    }
  }
  // params is additional domain-specific parameters.
  // currently there is no additional parameters supported.
  const [response] = await predictionServiceClient.predict({
    name: modelFullId,
    payload,
    params
  })

  let returnedPayload = response.payload[0]
  return returnedPayload
}

router.post('/', upload.single('formKeyName'), async (req, res, next) => {
  if (req.file) {
    try {
      const response = {}
      const filePath = path.join(__dirname, '../..', req.file.path)
      let prediction = await predict(filePath)
      response.commonName = prediction.displayName
        .split(' ')
        .map(el => {
          return el[0].toUpperCase() + el.slice(1)
        })
        .join(' ')
      response.score = prediction.classification.score
      fs.unlink(filePath, err => {
        if (err) {
          console.err(err)
          throw new Error('Could not delete file')
        }
      })
      res.json(response)
    } catch (e) {
      next(e)
    }
  }
})

module.exports = router
