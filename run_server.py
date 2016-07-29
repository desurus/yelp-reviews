#!/usr/bin/python
# -*- coding: utf-8 -*-

import pymongo

from scrapy.conf import settings
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/v1.0/businesses', methods=['GET'])
def get_businesses():
    return "Hello World!"


if __name__ == "__main__":
    app.run(debug=True)

