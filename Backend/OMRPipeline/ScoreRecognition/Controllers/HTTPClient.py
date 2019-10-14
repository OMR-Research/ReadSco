import http.client as client
import json

def SendEncodingRequest(id, rawMessage):
    connection = client.HTTPConnection('localhost', 8080, timeout=10)
    headers = {'Content-type': 'application/json'}
    body = {'m_id': id, 'm_rawMessage': rawMessage}
    connection.request('POST', '/translator/encode', json.dumps(body), headers)
    response = connection.getresponse()
    print(response.read().decode())
    connection.close()

