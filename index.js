const config = require('./config.json');
const bigquery = require('@google-cloud/bigquery')();

exports.logGA = function logGA (req, res) {
  console.log(req.query);
  return res.status(200).send('Success: ' + req.query);
};

exports.ingestGA = function ingestGA (req, res) {
  var dataset = bigquery.dataset(config.DATASET);
  var table = dataset.table(config.TABLE);
  var params = req.query;
  var now = new Date();

  var row = {
    json: {
      version: params.v,
      tracking_id: params.tid,
      document_location: params.dl,
      hit_type: params.t,
      user_id: params.uid,
      client_id: params.cid,
      user_langage: params.ul,
      event_category: params.ec,
      event_action: params.ea,
      event_label: params.el,
      event_value: params.ev,
      timestamp: now.toJSON()
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
