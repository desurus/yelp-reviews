#!/usr/bin/python
# -*- coding: utf-8 -*-

import operator
import pymongo

from scrapy.conf import settings
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from nltk import tokenize


def init():
    connection = pymongo.MongoClient(
        settings['MONGODB_SERVER'],
        settings['MONGODB_PORT']
    )
    db = connection[settings['MONGODB_DATABASE']]

    for review in db.reviews.find():
        sid = SentimentIntensityAnalyzer()
        ss = sid.polarity_scores(review['text'])
        score = get_score(ss)
        print "---------"
        print "Record id: {0}".format(review['_id'])
        print('User given rating: {0}'.format(review['rating']))
        print('Calculated score: {0}'.format(score))
        db.reviews.update_one(
            {'_id': review['_id']},
            { "$set": {
                "score": score
                }
            }
        )


def get_score(pol_score):
    """
    Gets polarity score dict and returns a 0-5 score number.
    """
    # lets drop 'compound' value first
    if pol_score['compound']:
        pol_score.pop("compound", None)

    pol_sorted = sorted(pol_score.items(), key=operator.itemgetter(1), reverse=True)

    # Neutral has high score
    if pol_sorted[0][0] == 'neu':
        # case neg=pos
        if pol_sorted[1][1] == pol_sorted[2][1]:
            return 3
        elif pol_sorted[1][0] == 'neg':
            return 2
        elif pol_sorted[1][0] == 'pos':
            return 4
    # Negative has high score
    elif pol_sorted[0][0] == 'neg':
        return 1
    # Positive has high score
    elif pol_sorted[0][0] == 'pos':
        return 5


if __name__ == "__main__":
    init()

