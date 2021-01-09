import React from "react";
import styled from "styled-components";

import { UserFriends } from "@styled-icons/fa-solid/UserFriends";
import { HandHoldingMedical } from "@styled-icons/fa-solid/HandHoldingMedical";
import { Truck } from "@styled-icons/fa-solid/Truck";

import { Container, IconWrapper, Text } from "../components";
import Carousel from "../components/Containers/Carousel";

const Home = () => {
  const notesList = [
    {
      caption: "Reason 1",
      text: "And here are a few words!",
      icon: <UserFriends />,
    },
    {
      caption: "Reason 2",
      text: "And here are a few words!",
      icon: <HandHoldingMedical />,
    },
    { caption: "Reason 3", text: "And here are a few words!", icon: <Truck /> },
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
    { ques: "Question 1", ans: "Ans 1" },
    { ques: "Question 2", ans: "Ans 2" },
    { ques: "Question 3", ans: "Ans 3" },
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
    <HomePage>
      <DivHead>TODO: Main Motto</DivHead>
      <DivLinks>{quickNotes}</DivLinks>
      <Container bgColor="primary" color="background">
      At BridgeIT, we strive to provide a user-friendly platform for donors to reach their donees efficiently 
      and with ease, getting vital supplies to those who need it in the quickest time possible. BridgeIT aims 
      to simplify the process of getting important supplies to communities in remote locations. 
      </Container>
      <Container>{faqsList}</Container>
      <Carousel />
    </HomePage>
  );
};

const HomePage = styled.div`
  margin: 2% 0;
  ${({ theme }) => `
      font-family: ${theme.font.body};
  `};
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
