import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import axios from "axios";
import Geocode from "react-geocode";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
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
  lat: 43.65107,
  lng: -79.347015,
};

// Get Table Data
const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
};


const items = [
    {
        name: "Masks",
        quantity: "100",
        expiry: "2021-01-19",
        is_matched: "Yes",
        receiver: "Wasauksing First Nation Community",
        route: "Route 1"
      },
      {
        name: "Water bottles",
        quantity: "800",
        expiry: "2021-01-19",
        is_matched: "Yes",
        receiver: "Wasauksing First Nation Community",
        route: "Route 1",
      },
      {
        name: "IV Drips",
        quantity: "300",
        expiry: "2021-01-22",
        is_matched: "Yes",
        receiver: "Oastler Lake Provincial Park",
        route: "Route 1",
      },
  ];

  const afterItems = [
    {
      name: "Masks",
      quantity: "100",
      expiry: "2021-01-19",
      is_matched: "Yes",
      receiver: "Wasauksing First Nation Community",
      route: "Route 1"
    },
    {
      name: "Water bottles",
      quantity: "800",
      expiry: "2021-01-19",
      is_matched: "Yes",
      receiver: "Wasauksing First Nation Community",
      route: "Route 1",
    },
    {
      name: "IV Drips",
      quantity: "300",
      expiry: "2021-01-22",
      is_matched: "Yes",
      receiver: "Oastler Lake Provincial Park",
      route: "Route 1",
    },
    {
        name: "Bandages",
        quantity: "320",
        expiry: "2021-01-22",
        is_matched: "No",
        receiver: "Seguine Pioneer United Church",
        route: "",
      },
  ];

  const afterMatch = [
    {
      name: "Masks",
      quantity: "100",
      expiry: "2021-01-19",
      is_matched: "Yes",
      receiver: "Wasauksing First Nation Community",
      route: "Route 1"
    },
    {
      name: "Water bottles",
      quantity: "800",
      expiry: "2021-01-19",
      is_matched: "Yes",
      receiver: "Wasauksing First Nation Community",
      route: "Route 1",
    },
    {
      name: "IV Drips",
      quantity: "300",
      expiry: "2021-01-22",
      is_matched: "Yes",
      receiver: "Oastler Lake Provincial Park",
      route: "Route 1",
    },
    {
        name: "Bandages",
        quantity: "320",
        expiry: "2021-01-22",
        is_matched: "Yes",
        receiver: "Seguine Pioneer United Church",
        route: "Route 1",
      },
  ];

const DashboardDonar = () => {
  const [itemData, setItemData] = useState({
    name: "",
    quantity: "",
    is_donation: true,
    expiry: null,
    location: "",
  });
  const [donations, setDonations] = useState([{}]);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [points, setPoints] = useState([]);
  const [noError, setNoError] = useState(false);
  const [fetchedItems, setFetchedItems] = useState(items);
  const [gone, setGone] = useState(true);

  useEffect(() => {
    Geocode.setApiKey(`${process.env.REACT_APP_API_KEY}`);
    Geocode.setLanguage("en");
    Geocode.setRegion("us");
    Geocode.enableDebug();
    axios
      .get("http://localhost:8000/api/v1/items/requests")
      .then((res) => {
        const don = res.data;
        for (let i = 0; i < don.length; i++) {
          Geocode.fromAddress(don[i].location).then(
            (response) => {
              const { lat, lng } = response.results[0].geometry.location;
              setPoints((points) => [...points, { lat: lat, lng: lng }]);
            },
            (error) => {
              console.error(error);
            }
          );
        }
        setDonations(don);
      })
      .catch((err) => {
        console.log(err);
      });

    //   axios
    //     .get("http://localhost:8000/api/v1/items/donorname")
    //     .then(res => {
    //         setFetchedItems(res.data);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })

    //     console.log(fetchedItems)
    let timer = setTimeout(() => {
      setNoError(true);
    }, 6000);
    timer = setTimeout(() => {
        setFetchedItems(afterItems)
      }, 20000);
    timer = setTimeout(() => {
        setFetchedItems(afterMatch)
        setGone(false);
    }, 23000);
    return () => clearTimeout(timer);
  }, [itemData]);

  useEffect(() => {
  }, [])

  const handleChange = (e) => {
    e.preventDefault();

    setItemData({
        name: "",
        quantity: "",
        expiry: "",
        address: ""
    })
  };

  const handleClick = (e) => {
    e.preventDefault();

    setItemData({ ...itemData, [e.target.name]: e.target.value });

    // if (this.state.username === "" || this.state.password === "") {
    //   console.log("one of the input fields is empty");
    //   alert("Please recheck your credentials.");
    // } else {
    //   console.log(this.state.username, this.state.password);
    //   console.log("sign in button clicked");
    // }
    
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: `${process.env.REACT_APP_API_KEY}`,
  });

  return (
    <DashboardPage>
      <Helmet>
        <title>BridgeIT | Dashboard</title>
      </Helmet>
      <SContainer>
        <div style={{ marginRight: "30px" }}>
          {!!isLoaded && noError && (
            <GoogleMap
              mapContainerStyle={{ width: "700px", height: "600px" }}
              center={center}
              zoom={5.5}
            >
              {donations.map((donation, i) => (
                <Marker
                  key={donation.location}
                  position={{
                    lat: parseFloat(points[i].lat),
                    lng: parseFloat(points[i].lng),
                  }}
                  onClick={() => setSelectedDonation(donation)}
                />
              ))}
              {!!gone && (
                  <Marker 
                    key='45.298353'
                    position={{ lat: 45.2983533, lng: -79.904513 }}
                />
              )}
            </GoogleMap>
          )}
        </div> 
        <SFormWrapper>
          <FormText>Donate Item</FormText>
          <SForm>
            <Input
              name="name"
              type="text"
              align="center"
              placeholder="Name"
              defaultValue={itemData.name}
              onChange={handleChange}
              style={{ width: "85%", marginBottom: "8%" }}
            />
            <Input
              name="quantity"
              type="number"
              align="center"
              placeholder="Quantity"
              min="0"
              defaultValue={itemData.quantity}
              onChange={handleChange}
              style={{ width: "85%", marginBottom: "8%" }}
            />
            <Input
              name="expiry"
              type="number"
              align="center"
              placeholder="Product Expiry Date"
              min="0"
              defaultValue={itemData.expiry}
              onChange={handleChange}
              style={{ width: "85%", marginBottom: "8%" }}
            />
            <Input
              name="location"
              type="text"
              align="center"
              placeholder="Your Address"
              defaultValue={itemData.location}
              onChange={handleChange}
              style={{ width: "85%", marginBottom: "8%" }}
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
          Your Items:
        </Text>
        <TableContainer>
        {!!noError ? (<TableWrapper V H>
            <Table data={fetchedItems} />
        </TableWrapper>) : null}
        </TableContainer>
      </Container>
    </DashboardPage>
  );
};

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
const TableContainer = styled.div`
    padding: 0 100px;
`;

export default DashboardDonar;
