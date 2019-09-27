package es.readsco.translator.Controllers;

import es.ua.dlsi.grfia.im3ws.IM3WSException;
import es.ua.dlsi.grfia.im3ws.controller.StringResponse;
import es.ua.dlsi.grfia.im3ws.muret.controller.payload.AgnosticEncodingJSON;
import es.ua.dlsi.grfia.im3ws.muret.controller.payload.AgnosticSymbolTypeAndPosition;
import es.ua.dlsi.grfia.im3ws.muret.model.NotationModel;
import es.ua.dlsi.grfia.im3ws.muret.model.TranslationModel;
import es.ua.dlsi.grfia.im3ws.muret.model.transducers.automaton.SemanticTransduction;
import es.ua.dlsi.im3.core.IM3Exception;
import es.ua.dlsi.im3.core.score.NotationType;
import es.ua.dlsi.im3.core.score.PositionInStaff;
import es.ua.dlsi.im3.omr.encoding.agnostic.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.FileNotFoundException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@RequestMapping("translation")
@RestController
public class TranslatorController
{
    private final NotationModel m_notationModel;

    @Autowired
    public TranslatorController()
    {
        m_notationModel = new NotationModel();
    }

    @PostMapping(path = "agnostic2semantic", consumes = "application/json", produces = "application/json")
    public StringResponse agnostic2MEI(@RequestBody AgnosticEncodingJSON c_bodyRequest) throws IM3WSException, IM3Exception, FileNotFoundException
    {
        Logger.getLogger(this.getClass().getName()).log(Level.INFO, "Converting semantic staff from agnostic {0}", c_bodyRequest);
        NotationType l_notationType = c_bodyRequest.getNotationType();
        List<AgnosticSymbolTypeAndPosition> l_symbols = c_bodyRequest.getAgnosticSymbols();

        AgnosticEncoding l_agnosticEncoding = new AgnosticEncoding();

        for(AgnosticSymbolTypeAndPosition symbol : l_symbols)
        {
            AgnosticSymbolType l_type = AgnosticSymbolTypeFactory.parseString(symbol.getShape());
            PositionInStaff l_position = PositionInStaff.parseString(symbol.getPosition());
            AgnosticSymbol l_agnosticSymbol = new AgnosticSymbol(AgnosticVersion.v2, l_type, l_position);
            l_agnosticEncoding.add(l_agnosticSymbol);
        }

        TranslationModel l_translationmodel = new TranslationModel();
        SemanticTransduction l_semantictransduction = l_translationmodel.computeSemanticFromAgnostic(l_agnosticEncoding, l_notationType);
        String l_MEIResponse = m_notationModel.getMEINotation(l_semantictransduction.getSemanticEncoding(), l_notationType);

        return new StringResponse(l_MEIResponse);
    }

}
