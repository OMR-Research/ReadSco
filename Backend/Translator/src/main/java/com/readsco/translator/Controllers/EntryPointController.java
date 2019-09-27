package com.readsco.translator.Controllers;

import com.readsco.translator.EntryData.EntryTranslationModel;
import com.readsco.translator.Payload.TranslationResponse;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/translator")
public class EntryPointController
{
    @PostMapping(value = "/encode", produces = MediaType.APPLICATION_JSON_VALUE)
    public TranslationResponse makeEncoding(@RequestBody EntryTranslationModel c_entryData)
    {
        System.out.println(c_entryData.getM_id());
        System.out.println(c_entryData.getM_rawMessage());
        return new TranslationResponse(c_entryData.getM_id(), c_entryData.getM_rawMessage());
    }

    @GetMapping(value = "/ping", produces = "application/json")
    public String ping()
    {
        return "pong";
    }
}
