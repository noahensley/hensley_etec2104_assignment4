import tornado.websocket
import json

activeClients=[]

class Handler(tornado.websocket.WebSocketHandler):
    def open(self):
        print("CONNECTION OPEN")
        # for c in activeClients:
        #    c.write_message("Someone has joined the casino.");
        activeClients.append(self)

    def on_message(self,result):
        print("SERVER GOT:",json.dumps(result))
        for c in activeClients:
            c.write_message(result)
    def on_close(self):
        print("CONNECTION CLOSED")
        activeClients.remove(self)
        # for c in activeClients:
        #     c.write_message("Someone has left the casino.");

    def check_origin(self,*args):
        return True   # trust everyone!
    # the access details (what server is making the request to access a url)
    # can allow us to confirm or deny an access request.

