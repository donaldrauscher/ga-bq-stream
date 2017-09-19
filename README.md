## 0. Install Node.js
```
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g n
sudo n 6.11.1
sudo npm install -g @google-cloud/functions-emulator
npm init
sudo npm install --save @google-cloud/bigquery
```

## 1. Setup BigQuery dataset
```
source bigquery_prep.sh
```
This will create a dataset called 'google_analytics' and a tabled called 'events' where the raw GA events will be stored.


## 2. Deploy cloud function for ingesting BQ events
```
gsutil mb BUCKET-NAME
gcloud beta functions deploy ingestGA --stage-bucket BUCKET-NAME --trigger-http
gcloud beta functions delete ingestGA
```

Replace BUCKET-NAME with a name of your choosing.  This bucket will contain a .zip of your deployed cloud function.


## 3. Add client-side JS to route GA events to newly-created cloud function

Make sure to update region and project id in cloud function path.
