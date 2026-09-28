from __future__ import annotations

import os
import tempfile
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse


PROJECT_ROOT = Path(__file__).resolve().parent
USER_PROFILE = Path(os.environ.get("USERPROFILE", Path.home()))
TEMP_ROOT = Path(os.environ.get("TEMP", tempfile.gettempdir()))

EXTERNAL_ASSETS = {
    "/assets/images/loft-47-hero.png": USER_PROFILE
    / ".codex"
    / "generated_images"
    / "01a0e6fd-f8c8-7952-8cae-a500f39742f4"
    / "exec-92acaaa3-06b1-4c80-b821-217ab22738c6.png",
    "/assets/images/loft-47-food-v1.png": USER_PROFILE
    / ".codex"
    / "generated_images"
    / "01a0e6fd-f8c8-7952-8cae-a500f39742f4"
    / "exec-c61305a1-15e8-4e82-9a27-15829161ea81.png",
    "/assets/images/loft-47-banquet-v1.png": USER_PROFILE
    / ".codex"
    / "generated_images"
    / "01a0e6fd-f8c8-7952-8cae-a500f39742f4"
    / "exec-723ab4c6-c9fd-4847-93ea-e2ff160f075c.png",
    "/assets/images/loft-47-decor-v1.png": USER_PROFILE
    / ".codex"
    / "generated_images"
    / "01a0e6fd-f8c8-7952-8cae-a500f39742f4"
    / "exec-05a80883-b4bb-44cd-9ac4-f55d51988e87.png",
    "/assets/images/loft-47-interior-v1.png": USER_PROFILE
    / ".codex"
    / "generated_images"
    / "01a0e6fd-f8c8-7952-8cae-a500f39742f4"
    / "exec-b4d91a74-99e7-4496-bae7-72078938678f.png",
    "/assets/images/loft-47-av-v1.png": USER_PROFILE
    / ".codex"
    / "generated_images"
    / "01a0e6fd-f8c8-7952-8cae-a500f39742f4"
    / "exec-fa8df2a8-7d07-485c-8d51-90fe5b33ab8a.png",
    "/assets/fonts/Unbounded-Variable.ttf": TEMP_ROOT
    / "codex-loft47-fonts"
    / "Unbounded-Variable.ttf",
    "/assets/fonts/Manrope-Variable.ttf": TEMP_ROOT
    / "codex-loft47-fonts"
    / "Manrope-Variable.ttf",
}

CONTENT_TYPES = {
    ".png": "image/png",
    ".ttf": "font/ttf",
}


class LoftHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(PROJECT_ROOT), **kwargs)

    def do_GET(self):
        request_path = urlparse(self.path).path
        local_path = PROJECT_ROOT / request_path.lstrip("/")
        if local_path.is_file():
            return super().do_GET()

        external_path = EXTERNAL_ASSETS.get(request_path)
        if external_path is None:
            return super().do_GET()

        if not external_path.is_file():
            self.send_error(404, "Local prototype asset is unavailable")
            return

        payload = external_path.read_bytes()
        self.send_response(200)
        self.send_header("Content-Type", CONTENT_TYPES[external_path.suffix.lower()])
        self.send_header("Content-Length", str(len(payload)))
        self.send_header("Cache-Control", "no-store")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(payload)


if __name__ == "__main__":
    server = ThreadingHTTPServer(("127.0.0.1", 4173), LoftHandler)
    print("LOFT 47 preview: http://127.0.0.1:4173/")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
