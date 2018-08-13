#!/bin/bash
gcloud beta functions deploy ingest_ga --runtime python37 --trigger-http --stage-bucket=gs://djr_cloud_functions/
