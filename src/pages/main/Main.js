import React, { useState,useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import Grid,{Item} from '../../components/Grid';

export default () => {
    const [channels, setChannels] = useState([]);
    useEffect(()=>{
        axios.get('https://rest-api.elisaviihde.fi/rest/epg/channels').then((res) => {
            setChannels(res.data.channels);
        })
    },[])
    return <Grid>
        {channels.map(ch => (
            <Link to={`/channel/${ch.id}`}>
                <Item>
                    <img src={ch.logos[6].url} />
                    <p className="name">{ch.name}</p>
                </Item>
            </Link>
        ))}
    </Grid>
}

