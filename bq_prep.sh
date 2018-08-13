#!/bin/bash
bq mk google_analytics
bq mk -t google_analytics.events schema.json

