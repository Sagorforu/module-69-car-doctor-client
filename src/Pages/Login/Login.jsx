import { Link, useNavigate } from "react-router-dom";
import login from "../../assets/images/login/login.svg";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";

const Login = () => {
    const { signIn } = useContext(AuthContext)
    const navigate = useNavigate();

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log( email, password)
        signIn(email, password)
        .then(result => {
            const signedUser = result.user;
            console.log(signedUser);
            navigate('/');
        })
        .catch(error => {
            console.log(error)
        })
    }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:text-left w-1/2">
          <img src={login} alt="" />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <h1 className="text-3xl text-center font-bold">Login</h1>
            <form onSubmit={handleLogin}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn bg-[#FF3811] text-white hover:bg-[#e02702]"
                  type="submit"
                  value="Sign in"
                />
              </div>
            </form>
            <p>New to Car doctors? <Link className="text-[#FF3811] font-bold" to='/signup'>Sign up</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
