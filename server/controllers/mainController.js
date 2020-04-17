const axios = require('axios')

class MainController {
  static getAPI(req, res, next) {
    axios({
      method: 'GET',
      url: 'https://random-word-api.herokuapp.com/word?number=100'
    })
      .then(result => {
        res.status(200).json({ words: result.data })
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = MainController