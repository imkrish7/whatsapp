import styled from 'styled-components';
export default function Loading() {
	return (
		<Center>
			<Container>
				<img
				src="/assets/logo.png"
				alt="logo"
				style={{
					marginBottom: 10
				}}
				height={200}
				/>
				<span>Loading...</span>
			</Container>
		</Center>
	)
}

const Center = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
`
