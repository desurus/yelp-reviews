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
        self.db = connection[settings['MONGODB_DATABASE']]


    def process_item(self, item, spider):
        if spider.name == "reviews":
            self.collection = self.db['reviews']
            business_id = self.get_business_id(spider)
            if business_id:
                item['business_id'] = business_id
            else:
                item['business_id'] = None
            self.collection.insert(dict(item))

        else:
            self.collection = self.db['business']
            # we want to make sure business record is unique
            self.collection.insert(dict(item))

        return item


    def get_business_id(self, spider):
        """
        Returns id of the business document found by the url.
        """
        document = self.db.business.find_one({'url': spider.start_urls[0]})
        return document['_id']


class CleanUpPipeline(object):
    def process_item(self, item, spider):
        if spider.name == "reviews":
            if item['date']:
                item['date'] = ''.join(item['date']).strip()
            else:
                raise DropItem("Found empty item: {0}".format(item))

            if item['text']:
                item['text'] = ' '.join(item['text'])
            if item['rating']:
                item['rating'] = item['rating'][0]

        else:
            if item['name']:
                item['name'] = item['name'][0]
            if item['icon']:
                item['icon'] = item['icon'][0]
            item['status'] = 'scraped'

        return item

