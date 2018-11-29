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

import os
import webapp2
import jinja2
import datetime
import json
import logging
import secrets
from google.oauth2 import service_account
import googleapiclient.discovery
jinja_environment = jinja2.Environment(loader=jinja2.FileSystemLoader(os.path.dirname(__file__)))

SCOPES = ['https://www.googleapis.com/auth/calendar']

class MainPage(webapp2.RequestHandler):
    def get(self):
        template_values = {}
        template = jinja_environment.get_template('frontend/build/index.html')
        htmltext = template.render(template_values)
        self.response.headers['Content-Type'] = 'text/html;charset=UTF-8'
        self.response.out.write(htmltext)

class UpdateCalendarPage(webapp2.RequestHandler):
    def post(self):

        logging.info(self.request.get("summary"))
        logging.info(self.request.get("description"))

        summary = self.request.get("summary")
        description = self.request.get("description")

        dt_start = datetime.datetime.now() + datetime.timedelta(hours=9)
        dt_end = datetime.datetime.now() + datetime.timedelta(hours=10)

        if summary != '' and description != '':

            credentials = service_account.Credentials.from_service_account_file(
                secrets.SERVICE_ACCOUNT_FILE, scopes=SCOPES)
            service = googleapiclient.discovery.build('calendar', 'v3', credentials=credentials)

            event = {
                'summary': summary,
                'description': description ,
                'start': {
                    'dateTime': dt_start.strftime( '%Y-%m-%dT%H:%M:00+09:00' ),
                    'timeZone': 'Asia/Tokyo',
                },
                'end': {
                    'dateTime': dt_end.strftime( '%Y-%m-%dT%H:%M:00+09:00' ),
                    'timeZone': 'Asia/Tokyo',
                },
            }


            # Call the Calendar API
            request = service.events().insert(calendarId=secrets.GOOGLE_CALENDAR_ID, body=event)
            response = request.execute()

        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps({'errors': []}, sort_keys=True, indent=4))

app = webapp2.WSGIApplication([
    ('/', MainPage),
    ('/api/update', UpdateCalendarPage),
], debug=True)
