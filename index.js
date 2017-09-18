const config = require('./config.json');
const bigquery = require('@google-cloud/bigquery')();

exports.logGA = function logGA (req, res) {
  console.log(req.body);
  return res.status(200).send('Success: ' + req.body);
};

exports.ingestGA = function ingestGA (req, res) {
  var dataset = bigquery.dataset(config.DATASET);
  var table = dataset.table(config.TABLE);

  var row = {
    json: {
      from: req.body.from,
      to: req.body.to,
      message: req.body.message
    }
  };
  var options = {
    raw: true
  };

  function insertHandler(err, apiResponse){
    if (err){
      res.status(500).send(err);
    }
    else {
      res.status(200).send(apiResponse);
    }
  }

  table.insert(row, options, insertHandler);
};
