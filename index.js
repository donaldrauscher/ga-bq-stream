const config = require('./config.json');
const bigquery = require('@google-cloud/bigquery')();

function timestamp(){
  var now = new Date();
  now = now.toJSON();
  var regex = /([0-9]{4}-[0-9]{2}-[0-9]{2})T([0-9]{2}:[0-9]{2}:[0-9]{2})/g;
  var match = regex.exec(now);
  return match[1] + ' ' + match[2];
}

exports.ingestGA = function ingestGA (req, res) {
  origin = req.get("origin");
  if (origin != config.URL){
    res.header('Access-Control-Allow-Origin', '*');
    res.status(403).send(`Requests from ${origin} are not allowed!`);
  }
  else {
    res.header('Access-Control-Allow-Origin', config.URL);

    var dataset = bigquery.dataset(config.DATASET);
    var table = dataset.table(config.TABLE);
    var params = req.query;

    var row = {
      json: {
        version: params.v,
        tracking_id: params.tid,
        document_location: params.dl,
        hit_type: params.t,
        user_id: params.uid,
        client_id: params.cid,
        user_language: params.ul,
        event_category: params.ec,
        event_action: params.ea,
        event_label: params.el,
        event_value: params.ev,
        timestamp: timestamp()
      }
    };
    var options = {
      raw: true
    };

    function insertHandler(err, apiResponse){
      if (err){
        res.status(400).send(err);
      }
      else {
        res.status(200).send(apiResponse);
      }
    }

    table.insert(row, options, insertHandler);
  }
};
