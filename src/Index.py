import tornado.web

class Handler(tornado.web.RequestHandler):
    def get(self):
        self.write('<a href="/roulette">Roulette</a>')