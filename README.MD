# BXtoES

Deminstration how to use NodeJS to send Cryptocurrency data to ElasticSearch & Vitualize it on Grafanaa

# Prerequisite

- ElasticSearch : https://www.elastic.co/downloads/elasticsearch
- Grafana 	: http://grafana.org/download/
- docker

# Run ElasticSearch

# Run Grafana

# Checkout code from GitHub

# Running NodeJS
- npm install
- node app.js/index.js

# Running with docker 

docker run -d -e es_host=kantz.space -e es_port=9200 -e es_index=bx -e es_type=currency xezor/bx_currency_api
