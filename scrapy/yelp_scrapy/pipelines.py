# -*- coding: utf-8 -*-

import pymongo
from scrapy.exceptions import DropItem
from scrapy.conf import settings


class MongoPipeline(object):
    def __init__(self):
        connection = pymongo.MongoClient(
            settings['MONGODB_SERVER'],
            settings['MONGODB_PORT']
        )
        db = connection[settings['MONGODB_DATABASE']]
        self.collection = db[settings['MONGODB_COLLECTION']]


    def process_item(self, item, spider):
        self.collection.insert(dict(item))
        return item


class CleanUpPipeline(object):
    def process_item(self, item, spider):
        if item['review_date']:
            item['review_date'] = ''.join(item['review_date']).strip()
        else:
            raise DropItem("Found empty item: {0}".format(item))
        if item['review_text']:
            item['review_text'] = ' '.join(item['review_text'])

        return item

