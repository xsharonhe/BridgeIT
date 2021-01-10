import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Helmet } from 'react-helmet';
import axios from "axios";
import Geocode from "react-geocode";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from "@react-google-maps/api";
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

const center = {
  lat: 43.651070, 
  lng: -79.347015
}

const DashboardDonar = () => {
    const [userData, setUserData] = useState({
      itemName: "",
      itemQuant: ""
    })
    const [donations, setDonations] = useState([{}]);
    const [selectedDonation, setSelectedDonation] = useState(null);
    const [points, setPoints] = useState([])
    const [noError, setNoError] = useState(false);

    useEffect(() => {
      Geocode.setApiKey(`${process.env.REACT_APP_API_KEY}`)
      Geocode.setLanguage("en");
      Geocode.setRegion("us");
      Geocode.enableDebug();
      axios
        .get('http://localhost:8000/api/v1/items/requests')
        .then(res => {
          const don = res.data;
          for(let i=0; i < don.length; i++) {
            Geocode.fromAddress(don[i].location).then(
              response => {
                const { lat, lng } = response.results[0].geometry.location;
                setPoints(points => [...points, { lat: lat, lng: lng }])
              },
              error => {
                console.error(error);
              }
            )
          }
          setDonations(don);
        })
        .catch(err => {
          console.log(err)
        })
      let timer = setTimeout(() => {
        setNoError(true);
      }, 2000);
      return () => clearTimeout(timer);
    }, [userData]);

  const handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (this.state.username === "" || this.state.password === "") {
      console.log("one of the input fields is empty");
      alert("Please recheck your credentials.");
    } else {
      console.log(this.state.username, this.state.password);
      console.log("sign in button clicked");
    }
  };

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
    const { isLoaded } = useLoadScript({
      googleMapsApiKey: 'AIzaSyC0eUPfjjKFyx_uosHpQyWIBoP-Uo1fDmg'
    })

    return (
      <DashboardPage>
        <Helmet><title>BridgeIT | Dashboard</title></Helmet>
        <SContainer>
          <div style={{ marginRight: '30px' }}>
          {!!isLoaded && noError && (
            <GoogleMap
              mapContainerStyle={{ width: '600px', height: '400px' }}
              center={center}
              zoom={5.5}
            > 
            {donations.map((donation, i) => (
              <Marker 
                key={donation.location}
                position={{ lat: parseFloat(points[i].lat), lng: parseFloat(points[i].lng) }}
                onClick={() => setSelectedDonation(donation)}
              />
            ))}
            </GoogleMap>
          )}
        </div>
          <SFormWrapper>
            <FormText>Donate Item</FormText>
            <SForm>
              <Input
                name="itemName"
                type="text"
                align="center"
                placeholder="Name"
                value={userData.itemName}
                onChange={handleChange}
                style={{ width: "85%", marginBottom: "8%" }}
                required
              />
              <Input
                name="itemQuant"
                type="number"
                align="center"
                placeholder="Quantity"
                min="0"
                value={userData.itemQuant}
                onChange={handleChange}
                style={{ width: "85%", marginBottom: "8%" }}
                required
              />
              <FormButton onClick={handleClick}>Add Item</FormButton>
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

export default DashboardDonar;
