import {styled,createGlobalStyle} from "styled-components";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


export const GlobalStyles =createGlobalStyle`

    body,html{
        height:100%;
        padding:0;
        margin:0;
        box-sizing:border-box;
        font-family:"Roboto";
        
        
       
        
        

    }

`
export const Form =styled.form`
position:relative;
top:120px;
/* bottom:100px; */
    max-width: 800px;
    width:600px;
    max-height:700px;
    height:680px;
  padding: 10px 10px 10px 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #f9f9f9;
  margin-left:auto;
  margin-right:auto;
  overflow-y:scroll;
  scrollbar-width:none;
  -ms-overflow-style:none;
  z-index :1;
  /* margin-bottom:200px; */
  
  

  
    

`
export const Heading = styled.h1`
    font-size:24px;
    font-weight:700;
    text-align:center;

`
export const CustomerHeading = styled.h2`
font-size:20px;
`
export const CustomerContainer = styled.div`
    

`

export const Label = styled.label`
        
        display: inline-block;
        font-size:14px;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
  min-width:150px;
    
    
    


`
export const Input = styled.input`

width: 100%; /* Set a uniform width */
  max-width: 400px; /* Optional maximum width */
  padding: 5px;
  margin-bottom: 8px;
  border: 1px solid #222;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 14px;

`
export const ButtonContainer = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    

`
export const Button = styled.button`
    border:1px solid white;
    display:block;
    height:20px;
    width:80px;
    
    margin-left:5px;
    background-color:cornflowerblue;
    border-radius:8px;
    color:white;
    font-size:12px;
    
`