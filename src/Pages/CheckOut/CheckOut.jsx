import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProviders";

const CheckOut = () => {
  const service = useLoaderData();
  const { user } = useContext(AuthContext);
  const { title, price, _id, img } = service;

  const handleCheckOut = event => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const date = form.date.value;
    const email = form.email.value;
    const message = form.message.value;
    const checkOut = {
        customerName: name,
        email,
        date,
        due: price,
        service: title,
        service_id: _id,
        message: message,
        img
    }
    console.log(checkOut)

    fetch('http://localhost:5000/checkOut', {
        method: 'POST',
        headers: {
            'content-type':'application/json'
        },
        body: JSON.stringify(checkOut)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        form.reset();
    })


  }

  return (
    <div>
      <h2 className="text-4xl text-center">Check Out: {title}</h2>
      <form onSubmit={handleCheckOut} className="bg-[#F3F3F3] p-24 my-32 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <div className="form-control">
          <label className="label">
            <span className="label-text">Your Name</span>
          </label>
            <input
              type="text"
              name="name"
              defaultValue={user?.displayName}
              placeholder="Your Name"
              className="py-3 px-3 rounded-lg"
            />
          </div>
          <div className="form-control">
          <label className="label">
            <span className="label-text">Date</span>
          </label>
            <input
              type="date"
              name="date"
              className="py-3 px-3 rounded-lg"
            />
          </div>
          <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
            <input
              type="email"
              name="email"
              defaultValue={user?.email}
              placeholder="Your Email"
              className="py-3 px-3 rounded-lg"
            />
          </div>
          <div className="form-control">
          <label className="label">
            <span className="label-text">Due Amount</span>
          </label>
            <input
              type="text"
              name="due"
              defaultValue={'$ '+ price}
              placeholder="Due Amount"
              className="py-3 px-3 rounded-lg"
            />
          </div>
        </div>
        <div>
            <input type="text" name="message" placeholder="Your Message" className="w-full h-60 mt-4 rounded-lg px-3" />
        </div>
        <div className="form-control mt-6">
          <input className="btn py-3 rounded-lg font-bold bg-[#FF3811] text-white hover:text-[#f7f7f7] hover:bg-[#db2501]" type="submit" value="Order Confirm" />
        </div>
      </form>
    </div>
  );
};

export default CheckOut;
