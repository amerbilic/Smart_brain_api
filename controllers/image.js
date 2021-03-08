const Clarifai = require('clarifai');
const { restart } = require('nodemon');

const app = new Clarifai.App({
    apiKey: "7e135e2a65f14c3993149fb7d45b8cf0",
  });

  const handleApiCall = (req,res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err=> restart.status(400).json('unable to work with API'))
  }

const handleImage= (req,res,db) => {
    const { id } = req.body;
    db('users').where('id',id)
    .increment('entries',1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get count'));
}

module.exports = {
  handleImage: handleImage,
  handleApiCall
};