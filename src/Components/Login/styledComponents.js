import styled, { createGlobalStyle } from "styled-components"

export const GlobalStyles = createGlobalStyle`

body , html{
    padding:0;
    margin:0;
    box-sizing:border-box;
    height:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    
}

`


export const LoginContainer = styled.form`
    
    height:380px;
    height:${(props)=>props.height};
    width:400px;
    border:1px solid dodgerblue;
    border-radius:16px;
    display:flex;
    flex-direction:column;
    /* justify-content:center; */
    align-items:center;
    padding-top:40px;



`

export const Input = styled.input`

    margin-top:20px;
    border-radius:8px;
    width:100%;
    height:36px;
    border:2px solid dodgerblue;
    text-align:center;
    font-size:16px;
    color:dodgerblue;

    &:focus{
        border:2px solid dodgerblue;
        outline:none;
    }
    
    &::placeholder{
        color:dodgerblue;
        font-size:20px;
        
    }
    

`
export const InputContainer = styled.div`
      position: relative;
    width: 80%;
    margin-top: 10px;


`



export const Button = styled.button`
    width:80%;
    height:36px;
    border-radius:8px;
    border:none;
    color:white;
    background-color:dodgerblue;
    margin-top:20px;
    font-size:20px;
    cursor: pointer;
    

`
export const Buttonspan = styled.span`
    cursor :pointer;
    font-size:16px;
    font-weight:700;
    padding-top:10px;
    color:dodgerblue;

`
