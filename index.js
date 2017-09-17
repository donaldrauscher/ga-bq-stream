const config = require('./config.json');
const bigquery = require('@google-cloud/bigquery')();

function getTable () {
  const dataset = bigquery.dataset(config.DATASET);

  return dataset.get({ autoCreate: true })
    .then(([dataset]) => dataset.table(config.TABLE).get({ autoCreate: true }));
}

exports.logGA = function logGA (req, res) {
  console.log(req.body);
  return res.status(200).send('Success: ' + req.body);
};

exports.ingestGA = function ingestGA (event) {
  const event_data = event.data;
  return Promise.resolve()
    .then(() => {
      return getTable();
    })
    .then(([table]) => {
      console.log(`Inserting ${ Array.isArray(event_data) ? event_data.length : 1 } records into BigQuery`);
      return table.insert(event_data, {raw: true})
        .then(function(data) {
          var apiResponse = data[0];
        })
        .catch(function(err){
          console.error(err);
        });
    });
};
