import styled from "styled-components"
import * as M from "@material-ui/core"


export const Head = styled.div`
    display: flex;
    width: 100vw;
    justify-content: space-between;
    padding: 10px 20px;
    font-size: 24px;
    background-color: #850264;
`;

export const LeftItem = styled(M.Grid)`
    background-image: url("https://images.unsplash.com/photo-1603993097397-89c963e325c7");
    background-position: center;
    background-size: cover;
    height: 100vh;
`;

export const RightItem = styled(M.Grid)`
    padding: 200px 0;
`;

export const Card = styled(M.Card)`
    width: 500px;
    margin: auto;
    padding: 50px 10px;
`;

export const AccentText = styled.div`
    color: #9b3f6c;
    font-size: 20px;
    font-weight: 300;
`;
