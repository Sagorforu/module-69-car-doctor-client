import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";

const SocialLogin = () => {
    const { googleSignIn } = useContext(AuthContext);

    const handleGoogleSignIn = () => {
        googleSignIn()
        .then(result => {
            console.log(result.user)
        })
        .catch(error => {
            console.log(error)
        })
    }

  return (
    <div>
       <div className="divider">OR</div>
      <div className="text-center">
        <button onClick={handleGoogleSignIn} className="btn btn-circle btn-outline">
          G
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
