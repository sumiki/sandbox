# Copyright 2016 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import webapp2
import json
import base64
import logging
import io
import os, uuid, StringIO

from google.cloud import vision

from PIL import Image, ImageDraw


class ImageUploadHandler(webapp2.RequestHandler):
    def post(self):
        imgstring = self.request.get("image_data")
        #logging.info(imgstring)
        dec_data = base64.b64decode(imgstring.split(',')[1] )
        tyte_data = io.BytesIO(dec_data)
        dec_img = Image.open(io.BytesIO(dec_data))
        #logging.info(dec_img)
        #logging.info(dec_img.size)
        #logging.info(dec_img.getdata())

        #client = vision.ImageAnnotatorClient()
        #image = types.Image(content=dec_img)

        #logging.info( client.face_detection(image=image).face_annotations )

        buffer = StringIO.StringIO()
        dec_img.save(buffer, "PNG")

        content = buffer.getvalue()

        vision_client = vision.Client()
        image = vision_client.image(content=content)

        labels = image.detect_labels(limit=3)
        tags = []
        for label in labels:
            tags.append(label.description)

        self.response.headers['Content-Type'] = 'text/json'
        self.response.out.write(json.dumps(tags,ensure_ascii=False))



app = webapp2.WSGIApplication([
    ('/api/image_upload', ImageUploadHandler)
], debug=True)
