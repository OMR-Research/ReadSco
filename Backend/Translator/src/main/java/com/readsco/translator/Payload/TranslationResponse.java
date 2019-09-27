package com.readsco.translator.Payload;

public class TranslationResponse
{
    private String m_id;
    private String m_translation;

    public TranslationResponse(){}
    public TranslationResponse(String c_id, String c_translation)
    {
        m_id = c_id;
        m_translation = c_translation;
    }

    public String getM_id() {
        return m_id;
    }

    public void setM_id(String m_id) {
        this.m_id = m_id;
    }

    public String getM_translation() {
        return m_translation;
    }

    public void setM_translation(String m_translation) {
        this.m_translation = m_translation;
    }
}
