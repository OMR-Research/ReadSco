import requests
import socket
import threading

def register_eurekaservice():
    host_name = socket.gethostname() 
    host_ip = socket.gethostbyname(host_name) 
    print("Registering lanalysis")
    body = {
    "instance": {
        "hostName": "layoutanalysis",
        "app": "LAYOUTANALYSIS",
        "vipAddress": "layoutanalysis",
        "instanceId": "layoutanalysis-5005",
        "ipAddr": host_ip,
        "status": "UP",
        "port": {
            "$": 5005,
            "@enabled": True
        },
        "dataCenterInfo": {
            "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
            "name": "MyOwn"
        }
    }}
    requests.post('http://discoveryservice:8010/eureka/apps/layoutanalysis', json=body)
    print("Register request sent")
    set_interval(send_heartbeat, 5.0)

def send_heartbeat():
    requests.put("http://discoveryservice:8010/eureka/apps/layoutanalysis/layoutanalysis-5005")

def set_interval(func, sec):
    def func_wrapper():
        set_interval(func, sec)
        func()
    t = threading.Timer(sec, func_wrapper)
    t.start()
    return t