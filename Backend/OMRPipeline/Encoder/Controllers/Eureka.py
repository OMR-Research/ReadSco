import requests
import socket
import threading

def register_eurekaservice():
    host_name = socket.gethostname() 
    host_ip = socket.gethostbyname(host_name) 
    print("Registering encoder")
    body = {
    "instance": {
        "hostName": "0.0.0.0:5007",
        "app": "ENCODER",
        "vipAddress": "encoder",
        "instanceId": "encoder-5007",
        "ipAddr": host_ip,
        "status": "UP",
        "port": {
            "$": 5007,
            "@enabled": True
        },
        "dataCenterInfo": {
            "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
            "name": "MyOwn"
        }
    }}
    requests.post('http://discoveryservice:8010/eureka/apps/encoder', json=body)
    print("Register request sent")
    set_interval(send_heartbeat, 5.0)

def send_heartbeat():
    requests.put("http://discoveryservice:8010/eureka/apps/encoder/encoder-5007")

def set_interval(func, sec):
    def func_wrapper():
        set_interval(func, sec)
        func()
    t = threading.Timer(sec, func_wrapper)
    t.start()
    return t