import styled from "styled-components";
import { useState, useRef } from 'react';
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import { Avatar, IconButton } from "@material-ui/core";
import MoreVert from "@material-ui/icons/MoreVert";
import AttachFile from "@material-ui/icons/AttachFile";
import Message from "./Message";
import InsertEmoticon from "@material-ui/icons/InsertEmoticon";
import Mic from '@material-ui/icons/Mic';
import firebase from "firebase";
import getRecipientEmail from '../utils/getRecipientEmail';
import moment from 'moment';
export default function ChatScreen({ chat, messages }) {
	// console.log(chat, messages);
  const [user] = useAuthState(auth);
  const router = useRouter();
  const endOfMessageRef = useRef(null);
	const [chatMessage, setChatMessage] = useState('');
  const [recipientSnapshot]= useCollection(db.collection('users').where('email', '==', getRecipientEmail(chat.users, user)));
  const [messagesSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );
  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => {
        return (
          <Message
            key={message.id}
            user={message.data().user}
            message={{
              ...message.data(),
              timestamp: message.data().timestamp?.toDate().getTime(),
            }}
          />
        );
      });
    }else{
			console.log(messages);
			return JSON.parse(messages).map((message)=>{
					return <Message
            key={message.id}
            user={message.user}
            message={message}
          />
			})
		}
  };

	const sendMessage = (e)=>{
		e.preventDefault();
		db.collection('users').doc(user.uid).set({
			lastSeen: firebase.firestore.FieldValue.serverTimestamp()
		}, {merge: true});
		db.collection('chats').doc(router.query.id).collection('messages').add({
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			message: chatMessage,
			user: user.email,
			photoURL: user.photoURL
		})
		setChatMessage('');
    ScrollToBottom();
	}
	const recipient = recipientSnapshot?.docs?.[0].data();
	const recipientEmail = getRecipientEmail(chat.users, user);

  const ScrollToBottom = ()=>{
    endOfMessageRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  return (
    <Container>
      <Header>
        <Avatar />
        <HeaderInformation>
          <h3>{recipientEmail}</h3>
          {recipientSnapshot ? <p>Last Active: {moment(recipient?.lastSeen?.toDate()).format("dd, MMMM yyy")} </p> : "Unavailable" }
        </HeaderInformation>
        <HeaderIcons>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </HeaderIcons>
      </Header>
      <MessageContainer>
        {showMessages()}
        <EndOfMessage ref={endOfMessageRef} />
      </MessageContainer>
      <InputContainer onSubmit={sendMessage}>
				<InsertEmoticon />
				<Input
					value={chatMessage}
					onChange={e=> setChatMessage(e.target.value)}
				/>
				<button hidden type="submit" disabled={!chatMessage} onClick={sendMessage}>Send Message</button>
				<Mic />
			</InputContainer>
    </Container>
  );
}

const Container = styled.div``;
const Header = styled.div`
	height: 80px;
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 11px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;

const Input = styled.input`
	border: none;
	flex: 1;
	background-color: whitesmoke;
	outline: 0;
	padding: 20px;
	margin-left: 15px;
	margin-right: 15px;
	border-radius: 10px;
`;


const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;
  > h3 {
    margin-bottom: 3px;
  }
  > p {
    font-size: 14px;
    color: grey;
  }
`;
const InputContainer = styled.form`
	position: sticky;
	bottom: 0;
	z-index: 100;
	display: flex;
	background-color: white;
	align-items: center;
	padding: 10px;
`;

const HeaderIcons = styled.div``;

const MessageContainer = styled.div`
	padding: 30px;
	background-color: #e5ded8;
	min-height: 90vh;
`;

const EndOfMessage = styled.div``;
