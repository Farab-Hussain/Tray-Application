// import ProfileForm from "@/components/ui/ProfileForm";
import ServiceCard from "@/components/ui/serviceCard";
import Image from "next/image";
import React from "react";


const services = [
  { name: "Service 1", desc: "We are looking for figma designers who can help designing ", tag: "Tag1", image: "/images/service.png" },
  { name: "Service 2", desc: "We are looking for figma designers who can help designing ", tag: "Tag2", image: "/images/service.png" },
  { name: "Service 3", desc: "We are looking for figma designers who can help designing ", tag: "Tag2", image: "/images/service.png" },
  { name: "Service 4", desc: "We are looking for figma designers who can help designing ", tag: "Tag2", image: "/images/service.png" },
  { name: "Service 5", desc: "We are looking for figma designers who can help designing ", tag: "Tag2", image: "/images/service.png" },
  { name: "Service 6", desc: "We are looking for figma designers who can help designing ", tag: "Tag2", image: "/images/service.png" },
  // ...add more services as needed
];

const page = () => {
  return (
    <main className="layout">
      <div className="md:h-[168px] h-fit p-5 md:p-5 w-full bg-[#ADEBB3] rounded-sm flex flex-col  md:flex-row justify-between items-center">
        <div className="flex flex-col justify-center gap-3 ">
          <h1 className="font-semibold text-[31px]">Welcome John Doe</h1>
          <h3 className="text-2xl text-black/40 ">
            Hello lets apply for new job
          </h3>
        </div>
        <Image src="/banner.png" alt="banner" width={250} height={100} />
      </div>
      <h1>Apply for Job</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            name={service.name}
            desc={service.desc}
            tag={service.tag}
            image={service.image}
          />
        ))}
      </div>
      {/* <ProfileForm/> */}
    </main>
  );
};
export default page;
