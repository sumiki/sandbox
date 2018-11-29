
# Google Calendar API using Service Account Sample



## Setup

1. Clone repository
2. pip install -r requirements.txt -t lib
3. cd frontend && yarn install
4. yarn build
5. Enable Google Calendar API on Gcloud console
6. Create Service Account and Create Key
7. Save Craeted key in service_account dir and set the json path to secrets.py.
8. Craete a calendar to google calendar where you have an access to and get calendar_id and set it to secrets.py.
9. Share the calendar with service account email XXX@gcalservice.iam.gserviceaccount.com.
10. dev_appserver.py app.yaml for development
11. gcloud app deploy for production