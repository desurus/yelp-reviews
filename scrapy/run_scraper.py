#!/usr/bin/python

from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings


def init():
    process = CrawlerProcess(get_project_settings())
    # 'followall' is the name of one of the spiders of the project.
    process.crawl('yelp', domain='yelp.com')
    process.start() # the script will block here until the crawling is finished


if __name__ == '__main__':
    init()

