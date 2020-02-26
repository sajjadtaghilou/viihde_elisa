import styled from 'styled-components';

export default styled.div`
    display:grid;
    grid-template-columns:1fr 1fr 1fr 1fr 1fr;
    grid-gap:5px;
`

export const Item = styled.div`
height:100%;
    background:whitesmoke;
    overflow:hidden;
    cursor:pointer;
    position:relative;
    &:hover img {
        filter:opacity(0.4);
    }
    &:hover .name{
        bottom: 0;
    }
    & .name {
        position: absolute;
        color: #090909;
        width: 100%;
        bottom: -70%;
        text-align: center;
        background-image: linear-gradient(0deg,#adadad,transparent);
        padding: 1rem;
        font-weight: 700;
        transition:all 0.2s linear;
        font-size:1.3rem;
    }
    & img {
        width:100%;
        height:100%;
        object-fit:cover;
        transition:all 0.2s linear;
        filter:opacity(1);
    }
`