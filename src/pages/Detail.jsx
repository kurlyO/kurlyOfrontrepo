import React from 'react';
import styled from 'styled-components';
import { StInput } from '../elements/Input';
import { StPuppleButton, StWhiteButton } from '../elements/Button';
import { useParams } from 'react-router-dom';


function Detail(){
 const pam = useParams()

    return(<>
    <h3>
        {pam.id}
    </h3>
    </>)   
}

export default Detail