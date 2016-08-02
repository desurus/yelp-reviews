# -*- coding: utf-8 -*-

import pymongo
import time

from datetime import datetime
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
                # lets get most recent review date and clean up empty strings
                doc_date = ' '.join(item['date']).split()
                # now converting it to unix timestamp
                date_object = datetime.strptime(doc_date[-1], '%m/%d/%Y')
                item['date'] = int(float(time.mktime(date_object.timetuple())))
            else:
                raise DropItem("Found empty item: {0}".format(item))

            if item['text']:
                item['text'] = ' '.join(item['text'])
            if item['rating']:
                # lets get most recent rating and convert it to Int
                rating_list = ' '.join(item['rating']).split()
                item['rating'] = int(float(rating_list[-1]))

        else:
            if item['name']:
                item['name'] = item['name'][0]
            if item['icon']:
                item['icon'] = item['icon'][0]
            item['status'] = 'scraped'

        return item

