import styled from 'styled-components';
import Head from 'next/head';
import { Button } from '@material-ui/core';
import { auth, provider } from "../firebase";

export default function Login() {

	const signIn = ()=>{
		auth.signInWithPopup(provider).catch(alert);
	}
	return (
		<Container>
			<Head>
				<title>Login</title>
			</Head>
			<LoginContainer>
				<Logo src="/assets/logo.png" alt="logo" />
				<Button onClick={signIn} variant="outlined" >
					Sign in With Google
				</Button>
			</LoginContainer>
		</Container>
	)
}

const Container = styled.div`
	display: grid;
	place-items: center;
	height: 100vh;
	background-color: whitesmoke;
`;
const LoginContainer = styled.div`
	padding: 100px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: white;
	box-shadow: 0px 0px 20px #ccc;
	border-radius: 10px;
`;
const Logo = styled.img`
	height: 150px;
	width: 150px;
	margin-bottom: 50px;
`;


const GoogleButton = styled(Button)`
	text-transform: capitalize;
`;