import React,{useState,useEffect} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Grid,{Item} from '../../../components/Grid';
import ImgPlaceholder from '../../../assets/images/image-placeholder.png'

const ProgramsViewer = ({id,date})=>{
    const [programs, setPrograms] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState("");
    useEffect(()=>{
        setError("");
        setLoading(true);
        axios.get(`https://rest-api.elisaviihde.fi/rest/epg/schedule?channelId=${id}&date=${date}`).then(res => {
            setPrograms(res.data.schedule[0].programs);
        }).catch(()=>{
            setError("problem loading channel programs");
        }).finally(()=>{
            setLoading(false);
        })
    },[date])
    return <Grid>
    {error? <div>{error}</div> : loading ? <div>loading...</div> : programs.map(program => (
      <Item>
          <p className="name">{program.name}</p>
          {program && <img src={program.thumbnailUrl||ImgPlaceholder}/>}
      </Item>
    ))}
    </Grid>
}

export default ProgramsViewer;

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