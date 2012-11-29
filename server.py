import sys
import BaseHTTPServer
from SimpleHTTPServer import SimpleHTTPRequestHandler

HandlerClass = SimpleHTTPRequestHandler
ServerClass  = BaseHTTPServer.HTTPServer
server_address = ('10.0.1.13', 8000)

HandlerClass.protocol_version = "HTTP/1.0"
httpd = ServerClass(server_address, HandlerClass)
sa = httpd.socket.getsockname()

print "Running on ", sa[0], " port", sa[1]

httpd.serve_forever()