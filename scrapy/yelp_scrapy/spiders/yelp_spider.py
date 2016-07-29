import scrapy
from yelp_scrapy.items import Reviews
from yelp_scrapy.items import Business


class ReviewsSpider(scrapy.Spider):
    name = "reviews"
    custom_settings = {
        'BOT_NAME': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
    }
    allowed_domains = ["yelp.com"]


    def parse(self, response):
        for sel in response.xpath('.//ul[contains(@class, "reviews")]/li'):
            item = Reviews()
            item['text'] = sel.xpath('div/div[contains(@class, "review-wrapper")]/div/p/text()').extract()
            item['date'] = sel.xpath('div//span[contains(@class, "rating-qualifier")]/text()').extract()
            item['rating'] = sel.xpath('div//meta[contains(@itemprop, "ratingValue")]/@content').extract()
            yield item

        next_page = response.css("div.pagination-links > div > div > a.next::attr('href')")
        if next_page:
            url = response.urljoin(next_page[0].extract())
            yield scrapy.Request(url, self.parse)


class BusinessSpider(scrapy.Spider):
    name = "business"
    custom_settings = {
        'BOT_NAME': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
    }
    allowed_domains = ["yelp.com"]


    def parse(self, response):
        item = Business()
        item['name'] = response.xpath('//*[@id="wrap"]/div[3]/div/div[1]/div/div[2]/div[1]/div[1]/h1/text()').extract()
        item['url'] = response.url
        item['icon'] = response.xpath('//*[@id="wrap"]/div[3]/div/div[1]/div/div[3]/div[2]/div/div[3]/div/div[2]/div[1]/a/img/@src').extract()
        yield item

