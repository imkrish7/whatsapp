import styled from "styled-components";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import moment from 'moment';

function Message ({user, message}: any){
  const [userLoggedIn] = useAuthState(auth);
  const TypeOfMessage = user === userLoggedIn.email ? Sender : Reciever;
  return <Container>
      <TypeOfMessage>
      {message.message}
      <Timestamp> { message.timestamp ?moment(message.timestamp).format('LT') : "..." }</Timestamp>
      </TypeOfMessage>
  </Container>
}

export default Message;

const Container = styled.div``;

const MessageElement = styled.p`
  width: fit-content;
  padding: 15px;
  border-radius: 8px;
  background-color: #fff;
  padding-bottom: 25px;
  text-aligh: right;
  margin: 10px;
  position: relative;
`;

const Reciever = styled(MessageElement)`
  background-color: whitesmoke;
  text-align: left;
`;

const Sender = styled(MessageElement)`
  margin-left: auto;
  background-color: #dcf8c6;
`;

const Timestamp = styled.span`
  color: grey;
  padding: 10px;
  font-size: 9px;
  position: absolute;
  text-align: center;
  right: 0;
  margin-top: 10px;
  bottom: 0;
`;
