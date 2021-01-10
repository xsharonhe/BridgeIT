import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

import { UserFriends } from "@styled-icons/fa-solid/UserFriends";
import { HandHoldingMedical } from "@styled-icons/fa-solid/HandHoldingMedical";
import { Truck } from "@styled-icons/fa-solid/Truck";
import HomeLogoG from "./homeLogo.gif";

import { Container, IconWrapper, Text } from "../components";
import Brand from "../components/Texts/Brand";
import Carousel from "../components/Containers/Carousel";

const Home = () => {
  const notesList = [
    {
      caption: "Restart",
      text:
        "Bringing new hope to remote communities in need of depleting medical supplies",
      icon: <HandHoldingMedical />,
    },
    {
      caption: "Repurpose",
      text: "Redirect unused necessities towards areas in need",
      icon: <Truck />,
    },
    {
      caption: "Reunite",
      text:
        "Build connections between donor and donee to ease the matching and delivery process",

      icon: <UserFriends />,
    },
  ];

  const quickNotes = notesList.map((note) => {
    return (
      <QNDiv key={note.caption}>
        <IconWrapper>{note.icon}</IconWrapper>
        <SText size="h3" color="secondary" align="center" bold>
          {note.caption}
        </SText>
        <SText size="h3" color="text" align="center">
          {note.text}
        </SText>
      </QNDiv>
    );
  });

  const faqs = [
    {
      ques: "How does it work?",
      ans:
        "BridgeIT connects donors with remote communities based on specific item requests and and availability. Through machine learning and Google Maps API integration, BridgeIT predicts the optimal route with distance and environmental considerations to ensure supplies are efficiectly delievered to those who need it most.  ",
    },
    {
      ques: "Why will this help?",
      ans:
        "In addition to provudubg a platform for remote communities, BridgeIT can repurpose medical products that otherwise would have been left unused. Additionally, it provides members in remote communities a more convenient access to available resources.     ",
    },
    {
      ques: "Do we have to deliver the products ourselves?",
      ans:
        "Yes, BridgeIT provides donating organizations a suggested route and date of arrival, however, it is up to the organization to decide the delivery details. Our suggested route is calculated based on Geotab databases and provides an efficient travel route that minimizes time and reduces carbon emission.",
    },
  ];

  const faqsList = faqs.map((faq) => {
    return (
      <div key={faq.ques}>
        <QDiv>
          <Text
            color="background"
            size="defaultLarger"
            font="header"
            bold
            style={{ padding: "2%" }}
          >
            Q: {faq.ques}
          </Text>
        </QDiv>
        <ADiv>
          <Text size="default" style={{ padding: "2%" }}>
            {faq.ans}
          </Text>
        </ADiv>
      </div>
    );
  });

  return (
    <HomePage>
      <Helmet>
        <title>BridgeIT</title>
      </Helmet>
      <S2Container bgColor="background" color="background">
        <img src={HomeLogoG} />
      </S2Container>

      <DivLinks>{quickNotes}</DivLinks>

      <SContainer bgColor="primary" color="background">
        <Brand style={{ color: "#efefef", marginBottom: "3%" }}>
          Introducing Bridge<Sspan>IT</Sspan>!
        </Brand>
        <Text color="background" size="h3" style={{ marginTop: "1%" }}>
          Did you know that many First Nations communities in Canada are living
          in 2021 with <Sspan>minimal access to medical supplies</Sspan>? Admist
          a global pandemic, remote communities are in dire need of various
          supplies, but obscure locations bring few donations.
        </Text>

        <Text color="background" size="h3" style={{ marginTop: "1%" }}>
          BridgeIT is a user-friendly platform that allows medical organizations
          to easily view and support the specific medical needs of{" "}
          <Sspan>local remote communities</Sspan>.
        </Text>

        <Text color="background" size="h3" style={{ marginTop: "1%" }}>
          Through BridgeIT, we strive to provide a voice for people in small
          communities so that donors and suppliers who have the desired products
          can hear them and{" "}
          <Sspan>provide support to those who need it most</Sspan>. In addition,
          our ‘Group Order’ feature allows a more efficient way for communities
          within a common area to receive the most supplies in the least amount
          of time possible.{" "}
        </Text>
      </SContainer>
      <Container>{faqsList}</Container>
      <Carousel />
    </HomePage>
  );
};

const S2Container = styled(Container)`
  text-align: center;
  backgroundimage: url(${HomeLogoG});
`;

const SContainer = styled(Container)`
  text-align: center;
  font-size: 25px;
`;

const HomePage = styled.div`
  margin: 2% 0;
  ${({ theme }) => `
      font-family: ${theme.font.body};
  `};
`;

const DivLinks = styled.div`
  margin: 5% 0;
  padding: 5% 10%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const SText = styled(Text)`
  margin-top: 4%;
`;

const QDiv = styled.div`
  ${({ theme }) => `
    width: 100%;
    background-color: ${theme.colors.secondary};
    `}
`;

const QNDiv = styled.div`
  padding: 0 15%;
`;

const ADiv = styled.div``;

const Sspan = styled.span`
  ${({ theme }) => `
  color: ${theme.colors.accent};
  font-weight: bold;
  `}
`;

export default Home;
