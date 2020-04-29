import jwt from "jsonwebtoken";

class ConnectionStorage
{
    private m_connectionMap = new Map();

    constructor()
    {

    }

    Store(c_index : string , c_value : Express.Response)
    {
        this.m_connectionMap.set(c_index, c_value);
    }

    Fetch(c_index : string)
    {
        let responseHandler = this.m_connectionMap.get(c_index);
        if(responseHandler != undefined  && jwt.verify(c_index, 'abc123'))
        {
            this.m_connectionMap.delete(c_index);
            return responseHandler;
        }
        return undefined;
    }
}

export default ConnectionStorage;