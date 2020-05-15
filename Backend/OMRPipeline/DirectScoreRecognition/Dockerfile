FROM python:3.7.0

COPY . .

RUN pip install --upgrade pip

RUN pip install -r requirements.txt

RUN pip install flask
RUN pip install requests
RUN pip install imageio

EXPOSE 5006

CMD [ "python3", "-u", "./main.py" ]