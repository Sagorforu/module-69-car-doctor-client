import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("services.json")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  return (
    <div className="mt-3">
      <div className="text-center space-y-5">
        <p className="text-lg font-bold text-[#FF3811]">Service</p>
        <h1 className="text-5xl font-bold">Our Service Area</h1>
        <p className="mb-4 text-base font-normal">
          The majority have suffered alteration in some form, by injected
          humour, or randomised words <br /> which do not look even slightly
          believable.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceCard key={service._id} service={service}></ServiceCard>
        ))}
      </div>
      <div className="my-8 text-center">
        <button className="btn btn-outline text-[#FF3811] hover:bg-[#FF3811]">More Services</button>
      </div>
    </div>
  );
};

export default Services;
