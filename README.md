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

## 1. Test cloud functions with local emulator (optional)
```
functions --help
functions start
functions deploy logGA --trigger-http
functions call logGA --data='{"message":"Hello World!"}'
functions logs read
functions stop
```

## 2. Deploy cloud function for ingesting BQ events
```
bq mk google_analytics
<command for making table + schema>
gsutil mb BUCKET-NAME
gcloud beta functions deploy ingestGA --stage-bucket BUCKET-NAME --trigger-http
gcloud beta functions delete ingestGA
```

## 3. Add client-side JS to route GA events to newly-created cloud function

Make sure to update region and project id in cloud function path.
