import GoogleLogin from "react-google-login";
import {CLIENT_ID} from "./config";

const onSuccessGoogle = (res) => {
	console.log(res.tokenObj, res.googleId);
	console.dir(res.tokenObj);
	console.log('success');
}
const onFailureGoogle = () => {
	console.log('failure');
}

function Home() {
	
	return (
		<GoogleLogin
			clientId={CLIENT_ID}
			onSuccess={onSuccessGoogle}
			onFailure={onFailureGoogle}
		/>
	);
}

export default Home;