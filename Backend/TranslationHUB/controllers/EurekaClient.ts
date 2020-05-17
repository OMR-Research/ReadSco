
export class EurekaClient
{
    private client: any;

    constructor()
    {
        const Eureka = require('eureka-js-client').Eureka;
        const ip = require('ip');
        this.client = new Eureka({
            instance: {
                app: 'translationhub',
                hostName: 'entrypoint',
                ipAddr: ip.address(),
                status: 'UP',
                port: {
                    '$': 3000,
                    '@enabled': true,
                  },
                vipAddress: 'translationhub',
                dataCenterInfo: {
                    '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
                    name: 'MyOwn',
                  },
            },
            eureka:
            {
                host: 'discoveryservice',
                port: 8010,
                servicePath: '/eureka/apps'
            }
        })
    }

    register_eureka()
    {
        this.client.start();
    }

    stop_eureka()
    {
        this.client.stop();
    }
}
