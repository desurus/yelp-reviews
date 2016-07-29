# -*- coding: utf-8 -*-

import scrapy


class Reviews(scrapy.Item):
    text = scrapy.Field()
    date = scrapy.Field()
    rating = scrapy.Field()
    business_id = scrapy.Field()


class Business(scrapy.Item):
    name = scrapy.Field()
    url = scrapy.Field()
    icon = scrapy.Field()
    status = scrapy.Field()

