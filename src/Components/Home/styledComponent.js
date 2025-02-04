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
    height:380px;
    border:1px solid black ;
    padding: 20px 5px;
    margin:10px;
    font-size:14px;
    position:relative;
    top:100px;
    overflow-y:auto;
    z-index:1;
    cursor: pointer;
    border-radius:16px;

    &::-webkit-scrollbar{
        display:none
    };

    
    
    
    

`


export const HeadingContainer = styled.div`
background-color:lightblue;
padding:6px;
display:flex;
justify-content:center;
align-items:center;
color:white;
margin-top:5px;




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
    display:flex;
    justify-content:space-between;
    
    /* align-items:center; */

`
export const CustomerHeading = styled.h2`
    font-size:18px;
    color:#222;
    font-weight:700;
    /* max-width:180px; */
    /* overflow:hidden; */
`

export const StatusHeading= styled.h3`
    color:black;
    font-size:18px;
    
`
export const Status = styled.span`
    color: ${(props)=>(props.status ==="Paid" ? '#00c853':"red")}
` 
