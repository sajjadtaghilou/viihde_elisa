import React,{useState,useEffect} from 'react';
import {useParams,Link} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Channel = ()=>{
    const {id} = useParams();
    const [live, setLive] = useState(null);//TODO loading 
    const [futurePrograms, setFuture] = useState([]);
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
    useEffect(()=>{
        axios.get(`https://rest-api.elisaviihde.fi/rest/epg/schedule?channelId=${id}&date=${date}`).then(res => {
            setFuture(res.data.schedule[0].programs);
        })
    },[date])
    return <div>
        <input type="date"  defaultValue={date} onChange={e=>{ setDate(e.target.value) }}/>
        <Link to="/"><button>Back</button></Link>
        {live && `live program : ${live.name}`}
        <p>--------------------</p>
        <Container>
        {futurePrograms.map(program => (
          <Card>
              <p>{program.name}</p>
              {program.thumbnailUrl && <img src={program.thumbnailUrl}/>}
          </Card>
        ))}
        </Container>
    </div>
}

export default Channel;

const Container = styled.div`
    display:grid;
    grid-template-columns:1fr 1fr 1fr 1fr 1fr;
    grid-gap:10px;
`


const Card = styled.div`
    border-radius:5px;
    background:gold;
    padding:10px;
    & img {
        width:70%;
        border-radius:10px;
    }
`