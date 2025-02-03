import { styled, createGlobalStyle } from "styled-components";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export const GlobalStyles = createGlobalStyle`

    body,html{
        
        padding-bottom:100px;
        margin:0;
        box-sizing:border-box;
        font-family:"Roboto";
        
        
       
        
        

    }

<<<<<<< HEAD
`;
export const Form = styled.form`
  position: relative;
  top: 120px;
  left: 0px;
  right: 0px;
  /* display:block; */
  margin-bottom: 50px;
  background-color: orange;
=======
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
  
  
>>>>>>> 9f0336bb9c6ce90fcd81fdafec3fab2b7aabb48e

  /* bottom:100px; */
  /* bottom:100px; */
  max-width: 990px;
  width: 680px;
  min-height: 720px;
  padding: 20px 40px;
  border: 2px solid lightgrey;
  border-radius: 14px;
  background-color: #f9f9f9;
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  z-index: 1;

  box-shadow: 4px 6px 10px 4px lightgrey;
`;
export const Heading = styled.h1`
  font-size: 24px;
  font-weight: 700;
  text-align: center;
`;
export const CustomerHeading = styled.h2`
  font-size: 20px;
`;
export const CustomerContainer = styled.div``;

export const Label = styled.label`
  display: inline-block;
  font-size: 14px;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
  min-width: 150px;
`;
export const Input = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 5px;
  margin-bottom: 8px;
  border: 1px solid #222;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 14px;
`;
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Button = styled.button`
  border: 1px solid white;
  display: block;
  padding: 10px 25px;
  margin-left: 5px;
  background-color: cornflowerblue;
  border-radius: 8px;
  color: white;
  font-size: 12px;
`;
