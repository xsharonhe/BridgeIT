import React from "react";
import styled from "styled-components";
import Table from "../components/Containers/Table";
import { Container, Text, Input } from "../components";
import { Link } from "react-router-dom";
import {
  FormWrapper,
  SForm,
  FormSpan,
  FormText,
  FormButton,
} from "../components/Containers/FormStyles";

class Dashboard extends React.Component {
  state = {
    itemName: "",
    itemQuant: "",
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleClick = (e) => {
    e.preventDefault();

    if (this.state.username === "" || this.state.password === "") {
      console.log("one of the input fields is empty");
      alert("Please recheck your credentials.");
    } else {
      console.log(this.state.username, this.state.password);
      console.log("sign in button clicked");
    }
  };

  render() {
    const items = [
      {
        name: "ITEM 1",
        quantity: "QUANTITY 1",
        status: "STATUS 1",
        arrival: "ARRIVAL 1",
        route: "ROUTE 1",
      },
      {
        name: "ITEM 2",
        quantity: "QUANTITY 2",
        status: "STATUS 2",
        arrival: "ARRIVAL 2",
        route: "ROUTE 2",
      },
      {
        name: "ITEM 3",
        quantity: "QUANTITY 3",
        status: "STATUS 3",
        arrival: "ARRIVAL 3",
        route: "ROUTE 3",
      },
      {
        name: "ITEM 4",
        quantity: "QUANTITY 4",
        status: "STATUS 4",
        arrival: "ARRIVAL 4",
        route: "ROUTE 4",
      },
    ];

    return (
      <DashboardPage>
        <SContainer>
          <div>
            TODO: Insert data about item if clicked in table below (ie. route,
            directions, etc.)
          </div>
          <SFormWrapper>
            <FormText>Donate Item</FormText>
            <SForm>
              <Input
                name="itemName"
                type="text"
                align="center"
                placeholder="Name"
                value={this.state.itemName}
                onChange={this.handleChange}
                style={{ width: "85%", marginBottom: "8%" }}
                required
              />
              <Input
                name="itemQuant"
                type="number"
                align="center"
                placeholder="Quantity"
                min="0"
                value={this.state.itemQuant}
                onChange={this.handleChange}
                style={{ width: "85%", marginBottom: "8%" }}
                required
              />
              <FormButton onClick={this.handleClick}>Add Item</FormButton>
            </SForm>
          </SFormWrapper>
        </SContainer>
        <Container>
          <Text
            font="header"
            size="defaultLarger"
            bold
            style={{ marginBottom: "2%" }}
          >
            Table Title?
          </Text>
          <TableWrapper V H>
            <Table data={items} />
          </TableWrapper>
        </Container>
      </DashboardPage>
    );
  }
}

const DashboardPage = styled.div`
  margin: 2% 0;
  ${({ theme }) => `
      font-family: ${theme.font.body};
  `};
`;

const SFormWrapper = styled(FormWrapper)`
  margin: 0;
`;

const SContainer = styled(Container)`
  display: grid;
  grid-template-columns: 3fr 1fr;
`;

const TableWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Dashboard;
