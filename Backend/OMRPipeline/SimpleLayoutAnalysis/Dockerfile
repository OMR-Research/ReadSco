FROM python:3.7.0

COPY . .

RUN pip install --upgrade pip

RUN pip install -r requirements.txt

RUN pip install imageio

EXPOSE 5005

CMD [ "python3", "-u" , "./main.py" ]