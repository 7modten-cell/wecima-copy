import http.server
import socketserver
import os

PORT = 8080

class UTF8HTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # إجبار المتصفح على قراءة ملفات HTML بترميز UTF-8 لحل مشكلة اللغة العربية
        if self.path.endswith(".html") or self.path == "/" or self.path.endswith("/"):
            self.send_header("Content-Type", "text/html; charset=utf-8")
        super().end_headers()

# التأكد من إغلاق أي خادم سابق على نفس المنفذ
socketserver.TCPServer.allow_reuse_address = True

with socketserver.TCPServer(("", PORT), UTF8HTTPRequestHandler) as httpd:
    print("========================================")
    print(f"الخادم يعمل الآن بنجاح.")
    print(f"افتح المتصفح على الرابط: http://127.0.0.1:{PORT}")
    print("لإيقاف الخادم، اضغط على CTRL + C في Termux")
    print("========================================")
    httpd.serve_forever()
