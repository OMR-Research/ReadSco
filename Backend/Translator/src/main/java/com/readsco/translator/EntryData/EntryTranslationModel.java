package com.readsco.translator.EntryData;

public class EntryTranslationModel
{
    private String m_id;
    private String m_rawMessage;

    public EntryTranslationModel(){}
    public EntryTranslationModel(String c_id, String c_rawMessage)
    {
        m_id = c_id;
        m_rawMessage = c_rawMessage;
    }

    public String getM_id() {
        return m_id;
    }

    public String getM_rawMessage() {
        return m_rawMessage;
    }

    public void setM_id(String m_id) {
        this.m_id = m_id;
    }

    public void setM_rawMessage(String m_rawMessage) {
        this.m_rawMessage = m_rawMessage;
    }

}
