import React,{useState,useEffect} from 'react';
import {useParams,Link} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import ProgramsViewer from './components/ProgramsViewer';
import Button from '../../components/Button';

const Channel = ()=>{
    const {id} = useParams();
    const [live, setLive] = useState(null);//TODO loading 
    
    const [date,setDate] = useState(new Date().toISOString().substr(0,10));//TODO get correct day - local
    useEffect(()=>{
        if(!live) return;
        const diff = live.endTimeUTC - Date.now()+5000;
        const timerId = setTimeout(() => {
            axios.get('https://rest-api.elisaviihde.fi/rest/epg/schedule/live?channelId=' + id)
            .then(res => {
                const live = res.data.schedule[0].programs[0];
                if(live) setLive(live);
            })
        }, diff);
        return ()=>{
            clearTimeout(timerId);
        }
    },[live])
    useEffect(()=>{
        axios.get('https://rest-api.elisaviihde.fi/rest/epg/schedule/live?channelId=' + id)
        .then(res => {
            const live = res.data.schedule[0].programs[0];
            if(live) setLive(live);
        })
    },[]);
    return <div>
        {live && <FlexContainer>
            <span>live program : </span> 
            <LiveTitle>{live.name}</LiveTitle>
        </FlexContainer>
        }
        <FlexContainer>
            <span>choose a date </span> <input type="date"  defaultValue={date} onChange={e=>{ setDate(e.target.value) }}/>
            <Link to="/"><Button>Back</Button></Link>
        </FlexContainer>
        <ProgramsViewer id={id} date={date} />
    </div>
}

export default Channel;

const FlexContainer = styled.div`
    width:100%;
    display:flex;
    justify-content: center;
    align-items:center;
`

const LiveTitle = styled.h3`
    font-size:1.3rem;
`
