#!/usr/bin/python
# -*- coding: utf-8 -*-

import pymongo
import ConfigParser
import os
import json

from bson.json_util import dumps
from bson.objectid import ObjectId
from flask import Flask, jsonify, g, request
from flask import render_template

app = Flask(__name__)


@app.route('/api/v1.0/businesses/', methods=['GET'])
def get_businesses():
    try:
        db = setup_mongo()
        cursor = db.business.find()
        result = []
        for document in cursor:
            result.append({
                "id": str(document['_id']),
                "name": document['name'].strip(),
                "url": document['url'],
                "status": document['status'],
                "icon_url": document['icon'],
            })

        return jsonify(result)
    except:
        response = json.dumps({"status": 404, "details": "no records found for the businesses"})
        return response, 404


@app.route('/api/v1.0/reviews/<business_id>/', methods=['GET'])
def get_reviews(business_id):
    try:
        db = setup_mongo()
        business_bson_id = ObjectId(business_id)
        cursor = db.reviews_avarage.find({'business_id': business_bson_id})
        result = []

        for document in cursor:
            result.append({
                "business_id": str(document['business_id']),
                "rating": document['rating'],
                "score": document['score'],
                "date": document['date'],
                "num_reviews": document['num_reviews'],
            })

        return jsonify(result)
    except:
        response = json.dumps({"status": 404, "details": "document id not found"})
        return response, 404


@app.route('/api/v1.0/businesses/<business_id>/', methods=['GET'])
def get_business(business_id):
    try:
        db = setup_mongo()
        business_bson_id = ObjectId(business_id)
        cursor = db.business.find({'_id': business_bson_id})
        result = []

        for document in cursor:
            result.append({
                "id": str(document['_id']),
                "name": document['name'].strip(),
                "icon_url": document['icon'],
            })

        return jsonify(result)
    except:
        response = json.dumps({"status": 404, "details": "no business with id {0} found".format(business_id)})
        return response, 404


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


def setup_mongo():
    """
    Setup mongodb instance and return it
    """
    if not hasattr(g, 'mongo'):
        config = ConfigParser.ConfigParser()
        config.read(os.path.join(app.root_path, 'site_config.cfg'))
        connection = pymongo.MongoClient(
            config.get('mongodb', 'SERVER'),
            config.getint('mongodb', 'PORT'),
        )
        g.mongo = connection[config.get('mongodb', 'DATABASE')]

    return g.mongo


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int("8080"))

