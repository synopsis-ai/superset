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


from flask import Flask, request

class CustomHeadersMiddleware:
    def __init__(self, app: Flask):
        self.app = app

    def __call__(self, environ, start_response):
        def custom_start_response(status, headers, exc_info=None):
            # Add headers to allow iframe embedding and cross-origin requests
            headers.append(("Access-Control-Allow-Origin", "http://localhost:3000"))
            headers.append(("Access-Control-Allow-Credentials", "true"))
            headers.append(("Access-Control-Allow-Methods", "GET, POST, OPTIONS"))
            headers.append(("Content-Security-Policy", "frame-ancestors 'self' http://localhost:3000"))
            headers.append(("X-Frame-Options", "ALLOW-FROM http://localhost:3000"))  # Allow iframe embedding
            return start_response(status, headers, exc_info)

        return self.app(environ, custom_start_response)

# Initialize the middleware in Superset
APP_INITIALIZER = lambda app: app.wsgi_app = CustomHeadersMiddleware(app.wsgi_app)
