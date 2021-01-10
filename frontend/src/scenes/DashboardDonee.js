import React, { useState, useEffect } from "react";
import styled from "styled-components";
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
import { set } from "js-cookie";

const center = {
  lat: 43.651070, 
  lng: -79.347015
}

const DashboardDonee = () => {
    const [userData, setUserData] = useState({
      itemName: "",
      itemQuant: ""
    })
    const [donations, setDonations] = useState([{}]);
    const [selectedDonation, setSelectedDonation] = useState(null);
    const [points, setPoints] = useState([
      {
        lat: 43.657230, lng: -79.387733
      },
      {
        lat: 43.257931, lng: -79.917068
      },
      {
        lat: 45.429610, lng: -75.640430
      },
      {
        lat: 45.326310, lng: -80.059970
      },
      {
        lat: 45.326310, lng: -80.059970
      },
      {
        lat: 45.298353, lng: -79.904513
      }
    ])
    const [noError, setNoError] = useState(false);

    useEffect(() => {
      Geocode.setApiKey('AIzaSyCeeQ34bwux-4A9-xEJuTvX59ALojo7HmE')
      Geocode.setLanguage("en");
      Geocode.setRegion("us");
      Geocode.enableDebug();
      axios
        .get('http://localhost:8000/api/v1/items/donations')
        .then(res => {
          // const don = res.data;
          // console.log()
          // console.log(don)
          // for(let i=0; i < don.length; i++) {
          //     const loc = don.location[i]
          //     console.log(loc)
          //     // let obj = {
          //       // lat: location[i],
          //       // lng: lng
          //     // }
          //     // setPoints(points => [...points, obj])
          // }
          // // const q = don.split(",");
          // // console.log(q)
          // // for(let i=0; i < don.length; i++) {
          //   // Geocode.fromAddress(don[i].location).then(
          //   //   response => {
          //   //     const { lat, lng } = response.results[0].geometry.location;
          //   //     setPoints(points => [...points, { lat: lat, lng: lng }])
          //   //   },
          //   //   error => {
          //   //     console.error(error);
          //   //   }
          //   // )
          // // }
          // console.log(don);
          // setDonations(don);
        })
        .catch(err => {
          console.log(err)
        })
      let timer = setTimeout(() => {
        setNoError(true);
      }, 1000);
      return () => clearTimeout(timer);
    }, [userData]);

  const handleChange = (e) => {
    e.preventDefault();
    // this.setState({
    //   [e.target.name]: e.target.value,
    // });
  };

  console.log(points)

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
      googleMapsApiKey: 'AIzaSyCeeQ34bwux-4A9-xEJuTvX59ALojo7HmE'
    })

    return (
      <DashboardPage>
        <SContainer>
          <div style={{ marginRight: '30px' }}>
          {!!isLoaded && noError && (
            <GoogleMap
              mapContainerStyle={{ width: '600px', height: '400px' }}
              center={center}
              zoom={5.5}
            > 
            {points.map((point, i) => (
              <Marker 
                key={`${point.lat}`}
                position={{ lat: parseFloat(point.lat), lng: parseFloat(point.lng) }}
              />
            ))}
        
            </GoogleMap>
          )}
        </div>
          <SFormWrapper>
            <FormText>Request Item</FormText>
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

export default DashboardDonee;
