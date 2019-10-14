FROM python:alpine3.10

COPY . .

RUN pip install flask
RUN pip install flask-socketio
RUN pip install socketIO-client

EXPOSE 5000

CMD [ "python3", "./main.py" ]