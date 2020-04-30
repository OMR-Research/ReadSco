
class ServiceStorage
{
    private registeredServices:string[];

    constructor()
    {
        this.registeredServices = [];
    }

    CheckIfServiceExists(desiredService:string)
    {
        for(let i = 0; i < this.registeredServices.length; i++)
        {
            if(this.registeredServices[i] == desiredService)
                return true;
        }

        return false;
    }

    StoreService(service:string)
    {
        if(service != "GATEWAY" && !this.CheckIfServiceExists(service))
        {
            this.registeredServices.push(service.toLowerCase())
            console.log(service.toLowerCase() + " has been registered correctly")
        }
    }

    String()
    {
        return ``; //TODO - Parse to string in order to be in a file (Plain txt or JSON?)
    }

    GetServices()
    {
        return this.registeredServices;
    }
}

export default ServiceStorage;