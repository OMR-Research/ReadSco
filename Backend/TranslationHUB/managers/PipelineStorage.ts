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
        pipelineFlow.push('<end>');
        //If we are at this point, the exception has not been thrown:)
        const parsedString = YAML.stringify({instructions: pipelineFlow});

        fs.writeFileSync("data_pipelines/" + pipelineName + ".yml", parsedString);
    }

    GetPipelineInstructions(pipelineName:string)
    {
        const instructions = fs.readFileSync("data_pipelines/"+ pipelineName + ".yml", 'utf8')
        const instructionsParsed = YAML.parse(instructions);
        return instructionsParsed.instructions;
    }

    GetAllPipelineNames()
    {
        const fileNames: string[] = [];
        fs.readdirSync("data_pipelines/").forEach(file => {
            fileNames.push(file);
        });

        return fileNames;
    }
}

export default PipelineStorage;