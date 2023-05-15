import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import BookingRow from "./BookingRow";
import { useNavigate } from "react-router-dom";

const Bookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  const url = `http://localhost:5000/checkOut?email=${user?.email}`;
  useEffect(() => {
    fetch(url, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('car-doctor-access-token')}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setBookings(data)  
        } else {
          // logout and navigate to home
          navigate('/');
        }
        
      });
  }, [url, navigate]);

  
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

  const handleConfirm = id => {
    fetch(`http://localhost:5000/checkOut/${id}`, {
        method: 'PATCH',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({status: 'Confirm'})
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if (data.modifiedCount > 0) {
            const remaining = bookings.filter(booking => booking._id !== id);
            const updated = bookings.find(booking => booking._id === id);
            updated.status = 'confirm';
            const newBookings = [updated, ...remaining];
            setBookings(newBookings);
        }
    })
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
                handleConfirm={handleConfirm}
                ></BookingRow>)
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
