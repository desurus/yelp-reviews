#!/usr/bin/python

from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings
from yelp_scrapy.spiders.yelp_spider import ReviewsSpider
from yelp_scrapy.spiders.yelp_spider import BusinessSpider


class MyReviewsSpider(ReviewsSpider):
    start_urls = [
        # "http://www.yelp.com/biz/wurstk%C3%BCche-los-angeles-2"
        "http://www.yelp.com/biz/titos-tacos-culver-city"
    ]


class MyBusinessSpider(BusinessSpider):
    start_urls = [
        # "http://www.yelp.com/biz/wurstk%C3%BCche-los-angeles-2"
        "http://www.yelp.com/biz/titos-tacos-culver-city"
    ]


def init():
    process = CrawlerProcess(get_project_settings())
    process.crawl(MyBusinessSpider)
    process.crawl(MyReviewsSpider)
    process.start() # the script will block here until the crawling is finished


if __name__ == '__main__':
    init()

