import styled from 'styled-components';
import { db, auth } from '../../firebase';
import Sidebar from '../../components/Sidebar'
import Head from 'next/head';
import ChatScreen from '../../components/ChatScreen';
import { useAuthState } from "react-firebase-hooks/auth";
import getRecipientEmail from '../../utils/getRecipientEmail'

export default function Chat({chat, messages}) {
	const [user] = useAuthState(auth);
	return (
		<Container>
			<Head>
				<title>Chat with {getRecipientEmail(chat.users, user)}</title>
			</Head>
			<Sidebar></Sidebar>
			<ChatContainer>
				<ChatScreen chat={chat} messages={messages} />
			</ChatContainer>
		</Container>
	)
}

export async function getServerSideProps(context:any){
	const ref = db.collection('chats').doc(context.query.id);

	const messagesRes = await ref.collection('messages').orderBy('timestamp', 'asc').get();

	const messages = messagesRes.docs.map((doc)=>({
		id: doc.id,
		...doc.data()
	})).map(messages=>({
		...messages,
		timestamp: messages.timestamp.toDate().getTime()
	}));

	// Prep the chats
	const chatRes = await ref.get();
	const chat = {
		id: chatRes.id,
		...chatRes.data()
	}

	return {
		props: {
			  chat,
				messages: JSON.stringify(messages)
		}
	}

}


const Container = styled.div`
	display: flex;
`;
const ChatContainer = styled.div`
	flex: 1;
	overflow: scroll;
	height: 100vh;
	::-webkit-scrollbar{
		display: none;
	}
`;
