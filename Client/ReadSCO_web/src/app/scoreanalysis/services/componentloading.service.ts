import { Injectable } from '@angular/core';
import { ScoreanalysisPage } from '../scoreanalysis.page';

@Injectable({
    providedIn: "root"
})
export class ComponentLoading
{
    private m_componentHook : ScoreanalysisPage;
    constructor(){}

    public SetHook(c_hook : ScoreanalysisPage)
    {
        this.m_componentHook = c_hook;    
    }

    public ChangeComponent(indexToRender)
    {
        this.m_componentHook.LoadComponent(indexToRender);
        //this.m_componentHook.LoadComponent(indexToRender);
    }
}