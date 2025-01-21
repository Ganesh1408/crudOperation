import {  useState } from "react";
import {v4 as uuidv4} from 'uuid'
import { Heading, Form, GlobalStyles,Label,Input, CustomerContainer, CustomerHeading, Button, ButtonContainer } from "./styledComponents";
import Header from "../Header";

function InvoiceForm() {
  const [date, setDate] = useState("");
  const [lastUsedId,setLastUsedId]=useState(15)
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    address: "",
  });
  

  const [items, setItems] = useState([
    { productId: uuidv4(), title: "", quantity: 0, price: 0, total: 0 },
  ]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [status, setStatus] = useState("Pending");

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;

    if (field === "quantity" || field === "price") {
      updatedItems[index].total = updatedItems[index].quantity * updatedItems[index].price;
    }

    setItems(updatedItems);
    calculateTotalAmount(updatedItems);
  };

  const addItem = () => {
    setLastUsedId(lastUsedId + 1); // Increment the ID

    setItems([...items, { productId: uuidv4(), title: "", quantity: 0, price: 0, total: 0 }]);
  };

  const calculateTotalAmount = (items) => {
    const total = items.reduce((acc, item) => acc + item.total, 0);
    setTotalAmount(total);
  };


  const onSubmit = async(e) => {
    e.preventDefault();


    const invoiceData = {
      date,
      customer,
      items,
      totalAmount,
      status,
    };
    console.log(invoiceData)
    // setCustomer({name:'',email:"",address:""})
    try {
      // Send the invoice data to the backend using fetch
      const response = await fetch("http://localhost:3000/invoices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Send JSON data
        },
        body: JSON.stringify(invoiceData), // Convert the data to JSON format
      });

      // Check if the response was successful
      if (response.ok) {
        const data = await response.json();
        console.log("Invoice submitted:", data);
        // Reset form after successful submission
        setCustomer({ name: "", email: "", address: "" });
        setItems([
          { productId: "1", title: "", quantity: 0, price: 0, total: 0 },
        ]);
        setTotalAmount(0);
        setStatus("Pending");
      } else {
        console.error("Error submitting invoice:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting invoice:", error);
    }



  };

  return (
    <>
    <Header/>
      <GlobalStyles />
      <Form type="submit" onSubmit={onSubmit}>
        <Heading>Invoice Form</Heading>
        <Label htmlFor="date">Date : </Label>
        <Input
          type="date"
          name="date"
          value={date}
          id="date"
          required
          onChange={(e) => setDate(e.target.value)}
        />
        <CustomerContainer>
        <CustomerHeading>Customer Details </CustomerHeading>
        <Label htmlFor="name"> Customer Name : </Label>
        <Input
          type="text"
          name="name"
          value={customer.name}
          id="name"
          required
          onChange={(e) => {
            // const { name, value } = e.target;
            setCustomer({ ...customer, name: e.target.value });
          }}
        />
        <br />
        <Label htmlFor="email"> Customer Email : </Label>
        <Input
        required
          type="email"
          name="email"
          value={customer.email}
          id="email"
          onChange={(e) => {
            
            setCustomer({ ...customer, email: e.target.value });
          }}
        />
        <br />
        <Label htmlFor="address"> Customer Address : </Label>
        <textarea style={{width:'400px', marginTop:'10px'}}
          name="address"
          id="address"
          rows="2"
          cols="30"
          value={customer.address}
          onChange={(e) => {
            
            setCustomer({ ...customer, address:e.target.value });
          }}
        ></textarea >
        </CustomerContainer>
        <br />
        <CustomerHeading>Items</CustomerHeading>
        {items.map((item, index) => (
          <CustomerContainer key={index} style={{ marginBottom: "15px" }}>
            <Label htmlFor={`productId-${index}`}>Product ID : </Label>
            <Input
            // required
              type="number"
              id={`productId-${index}`}
              value={item.productId}
              readOnly
              
              onChange={(e) => handleItemChange(index, "productId", e.target.value)}
            />
            <br/>

            <Label htmlFor={`title-${index}`}>Title : </Label>
            <Input
            required
              type="text"
              id={`title-${index}`}
              value={item.title}
              onChange={(e) => handleItemChange(index, "title", e.target.value)}
            />
            <br/>

            <Label htmlFor={`quantity-${index}`}>Quantity : </Label>
            <Input
            required
              type="number"
              id={`quantity-${index}`}
              value={item.quantity}
              onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
            />
            <br/>

            <Label htmlFor={`price-${index}`}>Price : </Label>
            <Input
            required="true"
              type="number"
              id={`price-${index}`}
              value={item.price}
              onChange={(e) => handleItemChange(index, "price", e.target.value)}
            />
            <br/>

            <Label htmlFor={`total-${index}`}>Total : </Label>
            <Input
            
              type="number"
              id={`total-${index}`}
              value={item.total}
              readOnly
            />

          </CustomerContainer>
        ))}
        <ButtonContainer><Button type="button" onClick={addItem}>Add Item</Button></ButtonContainer>

        <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>

        <Label htmlFor="status">Status</Label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
        </select>
        <ButtonContainer><Button type="submit">Submit</Button></ButtonContainer>
        
      </Form>
    </>
  );
}

export default InvoiceForm;
