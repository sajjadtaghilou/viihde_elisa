import React, { useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

export default () => {
    const [channels, setChannels] = useState([]);
    axios.get('https://rest-api.elisaviihde.fi/rest/epg/channels').then((res) => {
        setChannels(res.data.channels);
    })
    return <Container>
        {channels.map(ch => (
            <Link to={`/channel/${ch.id}`}>
                <Card>
                    <img src={ch.logos[6].url} />
                </Card>
            </Link>
        ))}
    </Container>
}

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
        width:30%;
        border-radius:10px;
    }
`