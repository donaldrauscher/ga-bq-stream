#!/bin/bash
bq mk google_analytics
bq mk -t google_analytics.events version:STRING,tracking_id:STRING,document_location:STRING,hit_type:STRING,user_id:STRING,client_id:STRING,user_language:STRING,event_category:STRING,event_action:STRING,event_label:STRING,event_value:STRING,timestamp:DATETIME

