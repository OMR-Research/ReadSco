import requests
import socket
import threading

def register_eurekaservice():
    host_name = socket.gethostname() 
    host_ip = socket.gethostbyname(host_name) 
    print("Registering scorerecognition")
    body = {
    "instance": {
        "hostName": "scorerecognition",
        "app": "SCORERECOGNITION",
        "vipAddress": "scorerecognition",
        "instanceId": "scorerecognition-5006",
        "ipAddr": host_ip,
        "status": "UP",
        "port": {
            "$": 5006,
            "@enabled": True
        },
        "dataCenterInfo": {
            "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
            "name": "MyOwn"
        }
    }}
    requests.post('http://discoveryservice:8010/eureka/apps/scorerecognition', json=body)
    print("Register request sent")
    set_interval(send_heartbeat, 5.0)

def send_heartbeat():
    requests.put("http://discoveryservice:8010/eureka/apps/scorerecognition/scorerecognition-5006")

def set_interval(func, sec):
    def func_wrapper():
        set_interval(func, sec)
        func()
    t = threading.Timer(sec, func_wrapper)
    t.start()
    return t