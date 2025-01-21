import styled, { createGlobalStyle } from 'styled-components'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


export const GlobalStyles = createGlobalStyle`

    body,html{
        margin:0;
        padding:0;
        
        
        
    }

`



export const InvoiceContainer = styled.div`
    width:450px;
    height:400px;
    border:1px solid black ;
    /* border-radius:4px; */
    
    margin:20px;
    font-size:14px;
    position:relative;
    top:100px;
    z-index:-1;
    
    

`

export const HeadingContainer = styled.div`
background-color:lightblue;
padding:8px;
text-align:center;
color:white;

`
export const InvoiceDateContainer = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:0px 10px;
    color:#222;

`

export const CustomerContainer = styled.div`

    padding:0px 10px;
    line-height:16px;
    font-size:20px;

`
export const CustomerHeading = styled.h2`
    font-size:18px;
    color:#222;
    font-weight:700;
`
