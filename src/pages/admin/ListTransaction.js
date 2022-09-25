import React, { useState } from "react";
import { Table, Card, Dropdown } from "react-bootstrap";
import { useQuery } from "react-query";

import { API } from "../../config/api";

const styles = {
  cardd: {
    backgroundColor: "black",
    marginTop: "10vh",
  },
};

function ListTransaction() {
  const title = "List Transactions";
  document.title = "Dumbflix | " + title;

  let { data: transactions } = useQuery("cacheTransactions", async () => {
    const response = await API.get("/transactions");
    return response.data.data;
  });
  console.log(transactions);

  function Duration(dueDate, startDate) {
    const due = new Date(dueDate);
    startDate = new Date();

    let duration;

    if (startDate < due) {
      duration = new Date(due - startDate);
    }

    let years = duration.getFullYear() - 1970;
    let months = duration.getMonth();
    let days = duration.getDate();

    let yearTxt = "year";
    let monthTxt = "month";
    let dayTxt = "day";

    if (years > 1) yearTxt += "s";
    if (months > 1) monthTxt += "s";
    if (days > 1) dayTxt += "s";

    if (years >= 1) {
      duration = `${years} ${yearTxt} ${months} ${monthTxt} ${days} ${dayTxt}`;
    } else if (months >= 1) {
      duration = `${months} ${monthTxt} ${days} ${dayTxt}`;
    } else {
      duration = `${days} ${dayTxt}`;
    }
    return duration;
  }

  return (
    <div>
      <Card style={styles.cardd}>
        <Card.Body className="text-light m-3">
          <Card.Title className="mb-4">Incoming Transaction</Card.Title>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr className="text-danger">
                <th>No</th>
                <th>Users</th>
                <th>Remaining Active</th>
                <th>Status User</th>
                <th>Status Payment</th>
              </tr>
            </thead>
            <tbody>
              {transactions?.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.user.fullName}</td>
                  <td>{Duration(item.dueDate, item.startDate)}</td>
                  <td
                    className={
                      item.status == "success" ? "text-success" : "text-danger"
                    }
                  >
                    {item.status == "success" ? "Active" : "Not Active"}
                  </td>
                  <td
                    className={
                      item.status == "success"
                        ? "text-success"
                        : item.status == "pending"
                        ? "text-warning"
                        : "text-danger"
                    }
                  >
                    {item.status == "success"
                      ? "Success"
                      : item.status == "pending"
                      ? "Pending"
                      : "Failed"}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ListTransaction;
