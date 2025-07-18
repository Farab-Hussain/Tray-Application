import React, { useState } from "react";
import { useRouter } from 'next/navigation';

type ProfileFormProps = {
  onProfileComplete?: () => void;
};

const ProfileForm: React.FC<ProfileFormProps> = ({ onProfileComplete }) => {
  const router = useRouter();
  // Add state for each field
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [education, setEducation] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name, surname, education, gender, location, email, phoneNumber,
        isProfileCompleted: true
      }),
    });
    if (onProfileComplete) onProfileComplete();
    router.push('/');
  };

  return (
    <main className="layout">
      <h1 className="text-[16px] font-semibold font-[Poppins] sm:text-[18px] md:text-[20px] pb-10">
        Create Your Profile By Filling Out Following Details
      </h1>
      <div className="h-fit w-full p-5 bg-[#ECECEC] rounded-lg">
        <h3 className="text-[16px] font-semibold font-[Poppins] sm:text-[18px] md:text-[20px]] pb-5">
          <span className="text-[#E64646]">*</span>Information
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="h-fit w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <input
              type="text"
              placeholder="Name"
              className="w-full h-[47px] p-3 rounded-sm bg-[#D2D2D2]"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Surname"
              className="w-full h-[47px] p-3 rounded-sm bg-[#D2D2D2]"
              value={surname}
              onChange={e => setSurname(e.target.value)}
            />
            <input
              type="text"
              placeholder="Education"
              className="w-full h-[47px] p-3 rounded-sm bg-[#D2D2D2]"
              value={education}
              onChange={e => setEducation(e.target.value)}
            />
            <input
              type="text"
              placeholder="Gender"
              className="w-full h-[47px] p-3 rounded-sm bg-[#D2D2D2]"
              value={gender}
              onChange={e => setGender(e.target.value)}
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
              value={location}
              onChange={e => setLocation(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full h-[47px] p-3 rounded-sm bg-[#D2D2D2]"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full h-[47px] p-3 rounded-sm bg-[#D2D2D2]"
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
            />
          </div>
          <h3 className="text-[16px] font-semibold font-[Poppins] sm:text-[18px] md:text-[20px]] py-5">
            <span className="text-[#E64646]">*</span>Fair Chance Hiring
            Commitment
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
              not just their past. By supporting initiatives like Ban-the-Box,
              we strive to create opportunities that promote inclusion, dignity,
              and growth for all individuals.
            </label>
          </div>
          <div className="flex justify-center items-center py-5">
            <button
              type="submit"
              className="h-[56px] w-[300px] bg-[#FFCB4B] rounded-sm text-[16px] font-bold text-black"
            >
              Create My Profile
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ProfileForm;
