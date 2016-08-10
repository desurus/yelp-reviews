#!/usr/bin/python

import pymongo
import datetime

from scrapy.conf import settings
from bson.json_util import dumps
from bson.objectid import ObjectId


def init():
    connection = pymongo.MongoClient(
        settings['MONGODB_SERVER'],
        settings['MONGODB_PORT']
    )
    db = connection[settings['MONGODB_DATABASE']]

    business_id = "57990946e1382319e54024c7"
    business_bson_id = ObjectId(business_id)
    cursor = db.reviews.find({'business_id': business_bson_id}).sort([('date', pymongo.ASCENDING)])
    month_year = ""
    batch = []
    for document in cursor:
        date = datetime.datetime.fromtimestamp(document['date'])
        doc_date = date.strftime('%b %Y')

        if not month_year:
            month_year = doc_date
            batch.append(document)

        elif month_year == doc_date:
            batch.append(document)

        else:
            month_year = doc_date
            if len(batch) is 0:
                continue
            calculateAvarage(batch, doc_date, db)
            batch = []


def calculateAvarage(batch, doc_date, db):
    sum_rating = 0
    sum_score = 0
    document = {}
    for doc in batch:
        sum_rating += doc['rating']
        sum_score += doc['score']

    document['date'] = doc_date
    document['rating'] = sum_rating/len(batch)
    document['score'] = sum_score/len(batch)
    document['num_reviews'] = len(batch)
    document['business_id'] = batch[0]['business_id']
    # write new documents to the db
    db.reviews_avarage.insert(dict(document))


if __name__ == "__main__":
    init()

