import React from "react";

const ProfileForm = () => {
  return (
    <main className="layout">
      <h1 className="text-[16px] font-semibold font-[Poppins] sm:text-[18px] md:text-[20px] pb-10">
        Create Your Profile By Filling Out Following Details
      </h1>
      <div className="h-fit w-full p-5 bg-[#ECECEC] rounded-lg">
        <h3 className="text-[16px] font-semibold font-[Poppins] sm:text-[18px] md:text-[20px]] pb-5">
          <span className="text-[#E64646]">*</span>Information
        </h3>
        <div className="h-fit w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <input
            type="text"
            placeholder="Name"
            className="w-full h-[47px] p-3 rounded-sm bg-[#D2D2D2]"
          />
          <input
            type="text"
            placeholder="Surname"
            className="w-full h-[47px] p-3 rounded-sm bg-[#D2D2D2]"
          />
          <input
            type="text"
            placeholder="Education"
            className="w-full h-[47px] p-3 rounded-sm bg-[#D2D2D2]"
          />
          <input
            type="text"
            placeholder="Gender"
            className="w-full h-[47px] p-3 rounded-sm bg-[#D2D2D2]"
          />
        </div>
        <h3 className="text-[16px] font-semibold font-[Poppins] sm:text-[18px] md:text-[20px]] py-5">
          <span className="text-[#E64646]">*</span>Location & Contact
        </h3>
        <div className="h-fit w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <input
            type="text"
            placeholder="Location"
            className="w-full h-[47px] p-3 rounded-sm bg-[#D2D2D2]"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full h-[47px] p-3 rounded-sm bg-[#D2D2D2]"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full h-[47px] p-3 rounded-sm bg-[#D2D2D2]"
          />
        </div>
        <h3 className="text-[16px] font-semibold font-[Poppins] sm:text-[18px] md:text-[20px]] py-5">
          <span className="text-[#E64646]">*</span>Fair Chance Hiring Commitment
        </h3>
        <div className="flex justify-start items-start gap-1 text-black/40">
          <input
            type="checkbox"
            placeholder="Location"
            className=" rounded-sm bg-[#D2D2D2] mt-1.5"
          />
          <label>Do you follow Ban-the-Box or similar policies?</label>
        </div>
        <div className="flex justify-start items-start gap-1 text-black/40">
          <input
            type="checkbox"
            placeholder="Location"
            className=" rounded-sm bg-[#D2D2D2] mt-1.5"
          />
          <label>
            We believe everyone deserves a second chance to succeed. We are
            committed to fair hiring practices that consider the whole person,
            not just their past. By supporting initiatives like Ban-the-Box, we
            strive to create opportunities that promote inclusion, dignity, and
            growth for all individuals.
          </label>
        </div>
        <div className="flex justify-center items-center py-5">
          <button className="h-[56px] w-[300px] bg-[#FFCB4B] rounded-sm text-[16px] font-bold text-black">
            Create My Profile
          </button>
        </div>
      </div>
    </main>
  );
};

export default ProfileForm;
