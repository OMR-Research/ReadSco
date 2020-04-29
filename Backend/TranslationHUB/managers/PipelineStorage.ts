import ServiceStorage from "./ServicesStorage"
import YAML from 'yaml'
import fs from 'fs'

class PipelineStorage
{
    constructor()
    {

    }

    RegisterPipeline(pipelineName:string, pipelineFlow:string[], storageService: ServiceStorage)
    {
        console.log(pipelineName)
        console.log(pipelineFlow)
        pipelineFlow.forEach(element=>{
            if(!storageService.CheckIfServiceExists(element))
                throw new Error('One of the requested services to include into the pipeline does not exist or it is not registered')
        })

        //If we are at this point, the exception has not been thrown:)
        const parsedString = YAML.stringify({instructions: pipelineFlow});

        fs.writeFileSync("../pipelines/" + pipelineName + ".yml", parsedString);
    }

    GetPipelineInstructions(pipelineName:string)
    {
        
    }

    GetAllPipelineNames()
    {

    }
}

export default PipelineStorage;