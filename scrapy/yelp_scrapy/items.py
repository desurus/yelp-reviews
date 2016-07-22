# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class YelpRestourantReviews(scrapy.Item):
    review_text = scrapy.Field()
    review_date = scrapy.Field()
    review_rating = scrapy.Field()

