# ga-bq-stream

Setting up a Google Cloud Function to stream Google Analytics events into BigQuery

### 1. Create BigQuery Dataset/Table and Cloud Function

```
./bq_prep.sh
./deploy.sh
```

### 2. Add Client-Side Javascript

Add contents of `ga_route.js` to client-side Javascript.  This will call the Cloud Function when uploading events to Google Analytics (e.g. piggybacking the ['sendHitTask' task](https://developers.google.com/analytics/devguides/collection/analyticsjs/tasks)).
