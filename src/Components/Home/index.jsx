import { useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import {
  CustomerContainer,
  CustomerHeading,
  GlobalStyles,
  HeadingContainer,
  InvoiceContainer,
  InvoiceDateContainer,
  Status,
  StatusHeading,
} from "./styledComponent";
import Header from "../Header";
import {
  useDeleteInvoiceMutation,
  useGetInvoicesQuery,
  useUpdateInvoiceMutation,
} from "../../store/api";

function Home() {
  const { data, isLoading } = useGetInvoicesQuery();
  // console.log(data)

  const [DeleteInvoice] = useDeleteInvoiceMutation();
  const [UpdateInvoice] = useUpdateInvoiceMutation();

  // handleUpdateStatus(eachItem.id, e.target.value)

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
        {isLoading ? (
          <div style={{ textAlign: "center" }}>Loading</div>
        ) : Array.isArray(data) && data.length > 0 ? (
          data.map((eachItem) => {
            // console.log(eachItem)
            return (
              <InvoiceContainer key={eachItem.id}>
                <span
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "0px",
                    cursor: "pointer",
                  }}
                  onClick={async (e) => {
                    e.stopPropagation();
                    try {
                      await DeleteInvoice(eachItem.id);
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                >
                  <ClearIcon sx={{ color: "red" }} />
                </span>

                <HeadingContainer>
                  <h1 style={{ textAlign: "center" }}>Sales Invoice </h1>
                </HeadingContainer>
                <InvoiceDateContainer>
                  <h3>Invoice Id : {eachItem.id}</h3>
                  <h3>Date : {eachItem.date} </h3>
                </InvoiceDateContainer>
                <CustomerContainer>
                  <div>
                    <CustomerHeading>
                      name : {eachItem.customer.name}
                    </CustomerHeading>
                    <CustomerHeading>
                      E-mail :{eachItem.customer.email}
                    </CustomerHeading>
                    <CustomerHeading>
                      address : {eachItem.customer.address}
                    </CustomerHeading>
                  </div>
                  <div>
                    <StatusHeading>
                      Status:{" "}
                      <Status status={eachItem.status}>
                        {" "}
                        {String(eachItem.status)}
                      </Status>
                    </StatusHeading>

                    <select
                      style={{ width: "100px" }}
                      value={eachItem.status}
                      onChange={async (e) => {
                        try {
                          await UpdateInvoice({
                            id: eachItem.id,
                            status: e.target.value,
                          });
                        } catch (e) {
                          console.log(e);
                        }
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Paid">Paid</option>
                    </select>
                  </div>
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
                      {/* <th>Grand Total</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    <></>
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
                      <td colSpan="4">Grand Total </td>

                      <td>{eachItem.totalAmount}</td>
                    </tr>
                  </tbody>
                </table>
              </InvoiceContainer>
            );
          })
        ) : (
          <div
            style={{
              position: "relative",
              top: "350px",
              left: "650px",
              fontSize: "24px",
            }}
          >
            No Invoices Available
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
