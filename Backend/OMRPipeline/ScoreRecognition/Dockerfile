FROM python:3.7.0

COPY . .

RUN pip install --upgrade pip

RUN pip install flask
RUN pip install flask-socketio
RUN pip install socketIO-client
RUN pip install numpy
RUN pip install opencv-python
RUN pip install tensorflow==1.13.1
RUN pip install keras==2.2.4
RUN pip install imageio

EXPOSE 5006

CMD [ "python3", "-u", "./main.py" ]