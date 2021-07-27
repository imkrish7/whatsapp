import styled from 'styled-components';
import type { AppProps } from 'next/app';
import { Avatar } from '@material-ui/core';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebase';
import getRecipientEmail from '../utils/getRecipientEmail';
import { useCollection } from 'react-firebase-hooks/firestore';
import router from 'next/router';

export default function Chat({id, users}: any) {
	// console.log(props.users
	const [user] = useAuthState(auth);
	const [recipientSnapshot] = useCollection(db.collection('users').where("email", "==", getRecipientEmail(users, user)))
	const recipient = recipientSnapshot?.docs?.[0]?.data();
	const recipientEmail = getRecipientEmail(users, user);


	const enterChat = ()=>{
		router.push(`/chat/${id}`)
	}
	return (
		<Container onClick={enterChat}>
			{recipient ? <UserAvatar src={recipient?.photoURL} />: <UserAvatar src={recipientEmail[0]} />} 
			<p>{recipientEmail}</p>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	align-items: center;
	padding: 15px;
	word-break: break-word;
	cursor: pointer;
	:hover{
		background-color: #e9eaeb;
	}
`;
const UserAvatar = styled(Avatar)`
	margin: 5px 15px 0px 0px;
`;