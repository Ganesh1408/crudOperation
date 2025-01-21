import { useEffect, useState } from "react";
import {
  CustomerContainer,
  CustomerHeading,
  GlobalStyles,
  HeadingContainer,
  InvoiceContainer,
  InvoiceDateContainer,
} from "./styledComponent";
import Header from "../Header";

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Url = "http://localhost:3000/invoices";
        const response = await fetch(Url, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        // console.log(Array.isArray(data));
        console.log(data[0].id);
        setData(data);
      } catch (err) {
        console.log(`Fetch error : `, err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <GlobalStyles />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "flex-start",
          alignItems: "center",
          marginBottom: "100px",
        }}
      >
        {data.map((eachItem) => {
          // console.log(eachItem)
          return (
            <InvoiceContainer key={eachItem.id}>
              <HeadingContainer>
                <h1>Sales Invoice </h1>
              </HeadingContainer>
              <InvoiceDateContainer>
                <h3>Invoice Id : {eachItem.id}</h3>
                <h3>Date : {eachItem.date} </h3>
              </InvoiceDateContainer>
              <CustomerContainer>
                <CustomerHeading>
                  name : {eachItem.customer.name}{" "}
                </CustomerHeading>
                <CustomerHeading>
                  E-mail :{eachItem.customer.email}{" "}
                </CustomerHeading>
                <CustomerHeading>
                  address : {eachItem.customer.address}{" "}
                </CustomerHeading>
              </CustomerContainer>
              <table
                align="center"
                border="2"
                cellPadding="5"
                cellSpacing="0"
                style={{
                  textAlign: "center",
                  backgroundColor: "lightblue",
                  borderRadius: "8px",
                  marginTop: "20px",
                }}
              >
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>ProductId</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total Price</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {eachItem.items.map((product) => (
                    <tr key={product.productId}>
                      <td>{product.title}</td>
                      <td>{product.productId}</td>
                      <td>{product.quantity}</td>
                      <td>{product.price}</td>
                      <td>{product.quantity * product.price}</td>
                    </tr>
                  ))}
                  <tr>
                    <td
                      colSpan="5"
                      style={{ textAlign: "right", fontWeight: "bold" }}
                    >
                      {eachItem.totalAmount}
                    </td>
                    <td>{eachItem.status}</td>
                  </tr>
                </tbody>
              </table>
            </InvoiceContainer>
          );
        })}
      </div>
    </>
  );
}

export default Home;
