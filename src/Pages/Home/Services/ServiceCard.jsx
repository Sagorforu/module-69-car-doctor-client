import { FaArrowRight } from "react-icons/fa";

const ServiceCard = ({ service }) => {
  const { title, img, price } = service;

  return (
    <div className="card w-96 bg-base-100 shadow-xl mt-8">
      <figure className="px-10 pt-10">
        <img src={img} className="rounded-xl" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <div className="flex text-[#FF3811] font-semibold">
          <p>Price: ${price}</p>
          <FaArrowRight />
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
