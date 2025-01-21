import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Heading, Form, GlobalStyles, Label, Input, CustomerContainer, CustomerHeading, Button, ButtonContainer } from "./styledComponents";
import Header from "../Header";

function InvoiceForm() {
  const [date, setDate] = useState('');
  const [lastUsedId, setLastUsedId] = useState(15);
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

  const onSubmit = async (e) => {
    e.preventDefault();

    const invoiceData = {
      date,
      customer,
      items,
      totalAmount,
      status,
    };
    console.log(invoiceData);

    try {
      const response = await fetch("http://localhost:3000/invoices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(invoiceData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Invoice submitted:", data);
        // Reset form after successful submission
        setCustomer({ name: "", email: "", address: "" });
        setItems([
          { productId: uuidv4(), title: "", quantity: 0, price: 0, total: 0 },
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
      <Header />
      <GlobalStyles />
      <Form onSubmit={onSubmit}>
        <Heading>Invoice Form</Heading>
        <Label htmlFor="date">Date :</Label>
        <Input
          type="date"
          name="date"
          value={date}
          id="date"
          required
          onChange={(e) => setDate(e.target.value)}
        />
        <CustomerContainer>
          <CustomerHeading>Customer Details</CustomerHeading>
          <Label htmlFor="name">Customer Name :</Label>
          <Input
            type="text"
            name="name"
            value={customer.name}
            id="name"
            required
            onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
          />
          <Label htmlFor="email">Customer Email :</Label>
          <Input
            type="email"
            name="email"
            value={customer.email}
            id="email"
            required
            onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
          />
          <Label htmlFor="address">Customer Address :</Label>
          <textarea
            style={{ width: "400px", marginTop: "10px" }}
            name="address"
            id="address"
            rows="2"
            cols="30"
            value={customer.address}
            required
            onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
          ></textarea>
        </CustomerContainer>
        <CustomerHeading>Items</CustomerHeading>
        {items.map((item, index) => (
          <CustomerContainer key={index} style={{ marginBottom: "15px" }}>
            <Label htmlFor={`productId-${index}`}>Product ID :</Label>
            <Input
              type="text"
              id={`productId-${index}`}
              value={item.productId}
              
            />
            <Label htmlFor={`title-${index}`}>Title :</Label>
            <Input
              type="text"
              id={`title-${index}`}
              value={item.title}
              required
              onChange={(e) => handleItemChange(index, "title", e.target.value)}
            />
            <Label htmlFor={`quantity-${index}`}>Quantity :</Label>
            <Input
              type="number"
              id={`quantity-${index}`}
              value={item.quantity}
              required
              onChange={(e) => handleItemChange(index, "quantity", parseFloat(e.target.value) || 0)}
            />
            <Label htmlFor={`price-${index}`}>Price :</Label>
            <Input
              type="number"
              id={`price-${index}`}
              value={item.price}
              required
              onChange={(e) => handleItemChange(index, "price", parseFloat(e.target.value) || 0)}
            />
            <Label htmlFor={`total-${index}`}>Total :</Label>
            <Input type="number" id={`total-${index}`} value={item.total} readOnly />
          </CustomerContainer>
        ))}
        <ButtonContainer>
          <Button type="button" onClick={addItem}>Add Item</Button>
        </ButtonContainer>
        <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
        <Label htmlFor="status">Status :</Label>
        <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
        </select>
        <ButtonContainer>
          <Button type="submit">Submit</Button>
        </ButtonContainer>
      </Form>
    </>
  );
}

export default InvoiceForm;
