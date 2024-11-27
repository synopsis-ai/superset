from flask import Flask

class DisableXFrameOptionsMiddleware:
    def __init__(self, app: Flask):
        self.app = app

    def __call__(self, environ, start_response):
        def custom_start_response(status, headers, exc_info=None):
            headers = [
                (key, value) for key, value in headers if key.lower() != "x-frame-options"
            ]
            return start_response(status, headers, exc_info)

        return self.app(environ, custom_start_response)
