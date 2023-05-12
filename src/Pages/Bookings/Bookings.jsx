import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import BookingRow from "./BookingRow";

const Bookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  const url = `http://localhost:5000/checkOut?email=${user?.email}`;
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, []);

  
  const handleDelete = id => {
    const proceed = confirm('Are you sure to delete it?')
    if (proceed) {
        fetch(`http://localhost:5000/checkOut/${id}`, {
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.deletedCount > 0) {
                alert('Deleted Successfully');
                const remaining = bookings.filter(booking=>booking._id !== id);
                setBookings(remaining);
            }
        })
    }
  }

  return (
    <div>
      <h2 className="text-4xl my-5 text-center ">
        Your bookings: {bookings.length}
      </h2>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>
                Delete
              </th>
              <th>Image</th>
              <th>Service Name</th>
              <th>Price</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* rows */}
            {
                bookings.map(booking => <BookingRow
                key={booking._id}
                booking={booking}
                handleDelete={handleDelete}
                ></BookingRow>)
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
