FROM python:3.7.0

COPY . .

RUN pip install --upgrade pip

RUN pip install flask
RUN pip install numpy
RUN pip install tensorflow==1.13.1
RUN pip install keras==2.2.5
RUN pip install requests

EXPOSE 5007

CMD [ "python3", "-u" , "./main.py" ]