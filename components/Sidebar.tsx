import styled from "styled-components"
import { Avatar, IconButton, Button } from '@material-ui/core'
import { MoreVert } from "@material-ui/icons"
import { Chat } from "@material-ui/icons";
import { Search } from '@material-ui/icons'
import * as EmailValidator from 'email-validator';
import { auth, db } from '../firebase';
import { useCollection } from 'react-firebase-hooks/firestore'
import { useAuthState } from "react-firebase-hooks/auth";
import ChatContainer from './Chat';

export default function Sidebar() {
	const [user] = useAuthState(auth);
	const useChatRef = db.collection('chats').where("users", "array-contains", user.email)
	const [chatSnapshot] = useCollection(useChatRef)
	const createChat = ()=>{
		const input = prompt("Please enter an email address for the user you wish to chat with");
		if (!input){
			return null;
		}
		if (EmailValidator.validate(input) && !chatAlreadyExist(input) && input !== user.email){
			db.collection('chats').add({
				users: [user?.email, input]
			})
		}
	}


	const chatAlreadyExist = (recipientEmail:any)=>{
		return !!chatSnapshot?.docs.find(chat => chat.data().users.find((user:any) => user===recipientEmail)?.length > 0)
	}

	return (
		<Container>
			<Header>
				<UserAvatar src={user?.photoURL} onClick={()=> auth.signOut()} />
				<IconsContainer>
					<IconButton>
						<Chat />
					</IconButton>
					<IconButton>
						<MoreVert />
					</IconButton>
				</IconsContainer>
			</Header>
			<SearchBar>
				<Search />
				<SearcInput placeholder="Search in chats" />
			</SearchBar>
			<SidebarButton variant={"outlined"} onClick={createChat}>
				Start a new chat
			</SidebarButton>
			{
				chatSnapshot?.docs.map(chat=>{
					return <ChatContainer key={chat.id} id={chat.id} users={chat.data().users}/>
				})
			}
		</Container>
	)
}


const SearchBar = styled.div`
	display: flex;
	align-items: center;
	padding: 20px;
	border-radius: 2px;
`;
const SearcInput = styled.input`
	outline-width: 0;
	border: none;
	flex: 1;
`;

const SidebarButton = styled(Button)`
	width: 100%;
	color: #858585 !important;
	font-weight: 500;
	border: 1px solid whitesmoke !important;
	&:hover{
		background-color: whitesmoke !important;
		border-top: 1px solid whitesmoke !important;
		border-bottom: 1px solid whitesmoke !important;
	}
`;

const Container = styled.div`
	flex: 0.45;
	height: 100vh;
	border-right: 1px solid whitesmoke;
	min-width: 300px;
	max-width: 350px;
	overflow-y: scroll;
	::-webkit-scrollbar{
		display: none;
	}
`;

const Header = styled.div`
	display: flex;
	position: sticky;
	background-color: #fff;
	top: 0;
	z-index: 1;
	justify-content: space-between;
	height: 80px;
	align-items: center;
	padding: 15px;
	border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
	cursor: pointer;
	:hover{
		opacity: 0.8;
	}
`;

const IconsContainer = styled.div``;
