## Instructions for installing Node.js

```
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g n
sudo n 6.11.1
sudo npm install -g @google-cloud/functions-emulator
npm init
sudo npm install --save @google-cloud/bigquery
```

## Instructions for testing cloud function with emulator
functions --help
functions start
functions deploy helloWord --trigger-http
functions call helloWorld --data='{"message":"Hello World!"}'
functions logs read
functions stop

## Instructions for deploying cloud function
```
gsutil mb BUCKET-NAME
gcloud beta functions deploy ingestGA --stage-bucket BUCKET-NAME --trigger-http
gcloud beta functions delete ingestGA
```
