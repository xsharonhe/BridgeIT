import React from "react";
import styled from "styled-components";

import { UserFriends } from "@styled-icons/fa-solid/UserFriends";
import { HandHoldingMedical } from "@styled-icons/fa-solid/HandHoldingMedical";
import { Truck } from "@styled-icons/fa-solid/Truck";
import Puppy from "./puppy image.jpg";
import HomeLogo from "./homeLogo.jpg";
import HomeLogoG from "./homeLogo.gif";


import { Container, IconWrapper, Text } from "../components";
import Carousel from "../components/Containers/Carousel";



const Home = () => {

  // <S2Container><img src={HomeLogoG}/></S2Container>

  const notesList = [
    
    
    {
      caption: "Restart",
      text: "Bringing new hope to remote communities in need of depleting medical supplies",
      icon: <HandHoldingMedical />,
    },
    {
      caption: "Repurpose",
      text: "Redirect unused necessities towards areas in need",
      icon: <Truck />
      ,
    },
    { caption: "Reunite", text: "Build connections between donor and donee to ease the matching and delivery process", 
      
      icon: <UserFriends />
    },
  ];

  const quickNotes = notesList.map((note) => {
    return (
      <div key={note.caption}>
        
        <IconWrapper>{note.icon}</IconWrapper>
        <SText size="h3" color="primary" align="center" bold>
          {note.caption}
        </SText>
        <SText size="h3" color="text" align="center">
          {note.text}
        </SText>
      </div>
    );
  });

  const faqs = [
    { ques: "How does it work?", 
    ans: "BridgeIT connects donors with remote communities based off of their specific needs and what the donors have available. With the integration of Google Maps, it then provides the best pairing results by comparing distances between communities nearby and providing the fastest route to get supplies to those who need it most.  " },
    { ques: "Why will this help?", ans: "Ans 2" },
    { ques: "Do we have to deliver the products ourselves?", ans: "Ans 3" },
  ];

  const faqsList = faqs.map((faq) => {
    return (
      <div key={faq.ques}>
        <QDiv>
          <Text color="background" size="defaultLarger" font="header" bold style={{'padding': '2%'}}>
            Q: {faq.ques}
          </Text>
        </QDiv>
        <ADiv>
          <Text style={{'padding': '2%'}}>{faq.ans}</Text>
        </ADiv>
      </div>
    );
  });

  return (
    <HomePage >
      
      <S2Container   bgColor="background" color="background">
          <img src={HomeLogoG}/>
      </S2Container>
      
      <DivLinks>{quickNotes}</DivLinks>
      
      <SContainer bgColor="primary" color="background" font-size="20px" >
       

      <p>Amidst the global pandemic, many remote communities are being neglected and are in dire need of 
      various medical supplies. At BridgeIT, we strive to provide a user-friendly platform that allows 
      medical organizations to easily view and support the specific medical needs of remote communities nearby. </p>

      <p>Medical organizations often have a surplus of products that are not used and left until expiration. Instead 
      of leaving these products unused, they can be redirected to people in nearby remote communities. </p>

      <p>Through BridgeIT, we are able to provide a voice for people in these areas so that donors and suppliers 
      who have the desired products can hear them and provide support to those who need it most. In addition, our ‘Group Order’ 
      feature allows a more efficient way for communities within a common area to receive the most supplies in the least amount 
      of time possible. </p>

      </SContainer>
      <Container>{faqsList}</Container>
      <Carousel />
    </HomePage>
  );
};



const S2Container = styled(Container)`
  text-align: center;
  backgroundImage: url(${HomeLogoG});
  
`;

const SContainer = styled(Container)`
  text-align: center;
  font-size: 25px;
`;

const HomePage = styled.div`
  margin: 2% 0;
`;

const DivHead = styled.div`
  height: 200px;
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

const ADiv = styled.div``;

export default Home;
