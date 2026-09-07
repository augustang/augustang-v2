#!/usr/bin/env python3
"""Local dev server with clean URL support matching .htaccess."""

import http.server
import os
import socketserver
from urllib.parse import urlparse, urlunparse

PORT = 8000
ROOT = os.path.dirname(os.path.abspath(__file__))


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path

        if path in ("/index.html", "/index.html/"):
            return self._redirect(self._clean_path("/"), parsed)

        if path.endswith(".html") and path != "/index.html":
            return self._redirect(self._clean_path(path[:-5]), parsed)

        if path != "/" and not os.path.splitext(path)[1]:
            html_path = os.path.join(ROOT, path.lstrip("/") + ".html")
            if os.path.isfile(html_path):
                self.path = urlunparse(parsed._replace(path=path + ".html"))
                return super().do_GET()

        return super().do_GET()

    def _clean_path(self, path):
        if path != "/" and path.endswith("/"):
            path = path.rstrip("/")
        return path or "/"

    def _redirect(self, path, parsed):
        self.send_response(301)
        self.send_header("Location", urlunparse(parsed._replace(path=path)))
        self.end_headers()


if __name__ == "__main__":
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Serving at http://localhost:{PORT} (clean URLs enabled)")
        httpd.serve_forever()
