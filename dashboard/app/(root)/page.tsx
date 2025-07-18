'use client'
import { useEffect, useState } from "react";
import ProfileForm from "@/components/ui/profileForm";
import ServiceCard from "@/components/ui/serviceCard";
import Image from "next/image";

const services = [
  { name: "Service 1", desc: "We are looking for figma designers who can help designing ", tag: "Tag1", image: "/images/service.png" },
  { name: "Service 2", desc: "We are looking for figma designers who can help designing ", tag: "Tag2", image: "/images/service.png" },
  { name: "Service 3", desc: "We are looking for figma designers who can help designing ", tag: "Tag2", image: "/images/service.png" },
  { name: "Service 4", desc: "We are looking for figma designers who can help designing ", tag: "Tag2", image: "/images/service.png" },
  { name: "Service 5", desc: "We are looking for figma designers who can help designing ", tag: "Tag2", image: "/images/service.png" },
  { name: "Service 6", desc: "We are looking for figma designers who can help designing ", tag: "Tag2", image: "/images/service.png" },
  // ...add more services as needed
];

const mockConsultantServices = [
  { id: 1, name: "Business Strategy", status: "Approved" },
  { id: 2, name: "Marketing Advice", status: "Pending" },
];
const mockEarnings = { total: 1200, month: 300 };
const mockBookings = [
  { id: 1, client: "Alice", date: "2024-06-10", status: "Upcoming" },
  { id: 2, client: "Bob", date: "2024-06-05", status: "Completed" },
];

const consultantBackendSummary = (
  <div className="mb-8">
    <h2 className="text-xl font-bold mb-2">Consultant Features - Backend</h2>
    <table className="w-full text-left border border-gray-300 mb-4">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border">Feature</th>
          <th className="p-2 border">Status</th>
          <th className="p-2 border">Endpoint / Model</th>
        </tr>
      </thead>
      <tbody>
        <tr><td className="p-2 border">Consultant Registration</td><td className="p-2 border">✅</td><td className="p-2 border">role: 'consultant'</td></tr>
        <tr><td className="p-2 border">Complete Profile</td><td className="p-2 border">✅</td><td className="p-2 border">PUT /api/consultant/complete-profile</td></tr>
        <tr><td className="p-2 border">Profile Update</td><td className="p-2 border">✅</td><td className="p-2 border">PUT /api/profile/me</td></tr>
        <tr><td className="p-2 border">Admin Approval / Reject / Toggle Active</td><td className="p-2 border">✅</td><td className="p-2 border">/api/admin/consultant/:consultantId/&#123;'approve'|'reject'|'toggle-active'&#125;</td></tr>
        <tr><td className="p-2 border">Service CRUD (Consultant)</td><td className="p-2 border">✅</td><td className="p-2 border">POST /api/services etc.</td></tr>
        <tr><td className="p-2 border">Consultant Services Update</td><td className="p-2 border">✅</td><td className="p-2 border">PUT /api/profile/services</td></tr>
        <tr><td className="p-2 border">Consultant Slots Management</td><td className="p-2 border">✅</td><td className="p-2 border">/api/slots endpoints</td></tr>
        <tr><td className="p-2 border">Booking (Student)</td><td className="p-2 border">✅</td><td className="p-2 border">POST /api/slots/book</td></tr>
        <tr><td className="p-2 border">Chat / Messaging</td><td className="p-2 border">✅</td><td className="p-2 border">Multiple /api/chat/ endpoints + socket.io</td></tr>
        <tr><td className="p-2 border">Notifications</td><td className="p-2 border">✅</td><td className="p-2 border">/api/notifications + socket.io</td></tr>
        <tr><td className="p-2 border">Consultant Directory</td><td className="p-2 border">✅</td><td className="p-2 border">GET /api/users/consultants</td></tr>
      </tbody>
    </table>
    <h3 className="text-lg font-semibold mt-4 mb-2">Missing / To Implement (Optional Enhancements)</h3>
    <table className="w-full text-left border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border">Feature</th>
          <th className="p-2 border">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr><td className="p-2 border">Earnings/Payouts</td><td className="p-2 border">❌</td></tr>
        <tr><td className="p-2 border">Ratings/Reviews</td><td className="p-2 border">❌</td></tr>
        <tr><td className="p-2 border">Analytics (Consultant Performance)</td><td className="p-2 border">❌</td></tr>
      </tbody>
    </table>
  </div>
);

const Page = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [profileReload, setProfileReload] = useState(false);
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [applying, setApplying] = useState(false);
  const [applicationSent, setApplicationSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [servicesList, setServicesList] = useState<any[]>([]);
  const [newService, setNewService] = useState({ name: '', description: '' });
  const [editingService, setEditingService] = useState<any>(null);
  const [editValues, setEditValues] = useState({ name: '', description: '' });
  const [slots, setSlots] = useState<any[]>([]);
  const [newSlot, setNewSlot] = useState({ date: '', startTime: '', endTime: '', serviceId: '' });

  // Fetch all services
  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => setServicesList(data));
  }, []);

  // Add new service
  const handleAddService = async (e: any) => {
    e.preventDefault();
    const res = await fetch('/api/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newService),
    });
    if (res.ok) {
      const created = await res.json();
      setServicesList(prev => [...prev, created]);
      setNewService({ name: '', description: '' });
    }
  };

  // Delete service
  const handleDeleteService = async (id: string) => {
    const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setServicesList(prev => prev.filter(s => s._id !== id));
    }
  };

  // Start editing
  const startEditService = (service: any) => {
    setEditingService(service);
    setEditValues({ name: service.name, description: service.description });
  };

  // Save edit
  const handleEditService = async (e: any) => {
    e.preventDefault();
    const res = await fetch(`/api/services/${editingService._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editValues),
    });
    if (res.ok) {
      const updated = await res.json();
      setServicesList(prev => prev.map(s => s._id === updated._id ? updated : s));
      setEditingService(null);
    }
  };

  // Fetch consultant's slots
  useEffect(() => {
    if (user && user._id) {
      fetch(`/api/slots/consultant/${user._id}`)
        .then(res => res.json())
        .then(data => setSlots(data));
    }
  }, [user]);

  // Add new slot
  const handleAddSlot = async (e: any) => {
    e.preventDefault();
    const res = await fetch('/api/slots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        consultantId: user._id,
        serviceId: newSlot.serviceId,
        date: newSlot.date,
        slots: [{ startTime: newSlot.startTime, endTime: newSlot.endTime, status: 'unoccupied' }]
      }),
    });
    if (res.ok) {
      const created = await res.json();
      setSlots(prev => [...prev, created]);
      setNewSlot({ date: '', startTime: '', endTime: '', serviceId: '' });
    }
  };

  useEffect(() => {
    setLoading(true);
    fetch("/api/profile")
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [profileReload]);

  if (loading) return <div>Loading...</div>;

  // Show ProfileForm only if user is a new consultant
  if (user?.role === "consultant" && !user.isProfileCompleted) {
    return <ProfileForm onProfileComplete={() => setProfileReload(r => !r)} />;
  }

  // Verification pending UI
  if (user?.role === "consultant" && applicationSent && !isVerified) {
    return (
      <main className="layout flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-2xl font-bold mb-4">Application Sent</h1>
        <p className="mb-4">Your application has been sent to the admin for verification. Please wait for approval.</p>
        <button
          className="bg-[#FFCB4B] px-6 py-2 rounded font-bold text-black mt-4"
          onClick={() => {
            // Simulate admin verification (in real app, poll or use websocket)
            setTimeout(() => setIsVerified(true), 2000);
          }}
        >
          Simulate Admin Verification
        </button>
      </main>
    );
  }

  // After verification, return to dashboard
  if (user?.role === "consultant" && isVerified && applicationSent) {
    setTimeout(() => {
      setApplicationSent(false);
      setSelectedService(null);
    }, 1000);
  }

  // Service application form/modal
  if (selectedService && applying) {
    return (
      <main className="layout flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-2xl font-bold mb-4">Apply for {selectedService.name}</h1>
        <form
          className="flex flex-col gap-4 w-full max-w-md bg-white p-6 rounded shadow"
          onSubmit={e => {
            e.preventDefault();
            setApplying(false);
            setApplicationSent(true);
            // Try to open the app, fallback to store
            window.location.href = 'myapp://consultantHome';
            setTimeout(() => {
              // iOS App Store fallback
              window.location.href = 'https://apps.apple.com/app/idYOUR_APP_STORE_ID';
              // For Android, use:
              // window.location.href = 'https://play.google.com/store/apps/details?id=com.yourcompany.yourapp';
            }, 2000);
          }}
        >
          <label className="font-semibold">Why are you a good fit for this service?</label>
          <textarea className="border rounded p-2" rows={4} required placeholder="Describe your experience, skills, etc." />
          <button type="submit" className="bg-[#FFCB4B] px-6 py-2 rounded font-bold text-black mt-2">Submit Application</button>
          <button type="button" className="text-gray-500 mt-2" onClick={() => { setApplying(false); setSelectedService(null); }}>Cancel</button>
        </form>
      </main>
    );
  }

  // --- Consultant Dashboard ---
  if (user?.role === "consultant" && isVerified) {
    return (
      <main className="layout">
        {consultantBackendSummary}
        <div className="md:h-[168px] h-fit p-5 md:p-5 w-full bg-[#ADEBB3] rounded-sm flex flex-col  md:flex-row justify-between items-center">
          <div className="flex flex-col justify-center gap-3 ">
            <h1 className="font-semibold text-[31px]">Welcome {user?.name || "John Doe"}</h1>
            <h3 className="text-2xl text-black/40 ">Consultant Dashboard</h3>
          </div>
          <Image src="/banner.png" alt="banner" width={250} height={100} />
        </div>
        <div className="flex flex-col md:flex-row gap-8 mt-8">
          {/* Profile Section */}
          <div className="flex-1 bg-white rounded shadow p-6">
            <h2 className="text-xl font-bold mb-2">Profile</h2>
            <p><b>Name:</b> {user?.name}</p>
            <button
              className="bg-[#ADEBB3] px-4 py-2 rounded font-bold text-black mt-4"
              onClick={() => setShowProfile(true)}
            >
              View/Edit Profile
            </button>
            {showProfile && (
              <ProfileForm onProfileComplete={() => setShowProfile(false)} />
            )}
          </div>
          {/* My Services Section */}
          <div className="flex-1 bg-white rounded shadow p-6">
            <h2 className="text-xl font-bold mb-2">My Services</h2>
            <ul>
              {mockConsultantServices.map(service => (
                <li key={service.id} className="mb-2">
                  <b>{service.name}</b> - <span className="text-sm text-gray-500">{service.status}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Earnings, Bookings, Ratings, Analytics */}
        <div className="flex flex-col md:flex-row gap-8 mt-8">
          <div className="flex-1 bg-white rounded shadow p-6">
            <h2 className="text-xl font-bold mb-2">Earnings & Payouts <span className='text-xs'>(Demo Data)</span></h2>
            <p><b>Total:</b> $1200</p>
            <p><b>This Month:</b> $300</p>
            <p><b>Last Payout:</b> $500 on 2024-06-01</p>
            <button className="mt-2 px-4 py-2 bg-[#FFCB4B] rounded font-bold text-black">Request Payout</button>
          </div>
          <div className="flex-1 bg-white rounded shadow p-6">
            <h2 className="text-xl font-bold mb-2">Ratings & Reviews <span className='text-xs'>(Demo Data)</span></h2>
            <p><b>Average Rating:</b> 4.8 ★</p>
            <ul className="mt-2">
              <li className="mb-2"><b>Student A:</b> "Great consultant!" (5★)</li>
              <li className="mb-2"><b>Student B:</b> "Very helpful." (4★)</li>
            </ul>
          </div>
          <div className="flex-1 bg-white rounded shadow p-6">
            <h2 className="text-xl font-bold mb-2">Analytics <span className='text-xs'>(Demo Data)</span></h2>
            <p><b>Bookings this month:</b> 12</p>
            <p><b>Services offered:</b> 3</p>
            <p><b>Response rate:</b> 98%</p>
            <p><b>Profile views:</b> 150</p>
          </div>
        </div>
        {/* Bookings Section (existing) */}
        <div className="flex flex-col md:flex-row gap-8 mt-8">
          <div className="flex-1 bg-white rounded shadow p-6">
            <h2 className="text-xl font-bold mb-2">Bookings</h2>
            <ul>
              {mockBookings.map(booking => (
                <li key={booking.id} className="mb-2">
                  <b>{booking.client}</b> - {booking.date} (<span className="text-sm text-gray-500">{booking.status}</span>)
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="bg-white rounded shadow p-6 mt-8">
          <h2 className="text-xl font-bold mb-2">Consultant Services Management (Live API)</h2>
          <form onSubmit={handleAddService} className="flex gap-2 mb-4">
            <input type="text" placeholder="Service Name" value={newService.name} onChange={e => setNewService(s => ({ ...s, name: e.target.value }))} className="border rounded p-2" required />
            <input type="text" placeholder="Description" value={newService.description} onChange={e => setNewService(s => ({ ...s, description: e.target.value }))} className="border rounded p-2" required />
            <button type="submit" className="bg-[#FFCB4B] px-4 py-2 rounded font-bold text-black">Add Service</button>
          </form>
          <ul>
            {servicesList.map(service => (
              <li key={service._id} className="mb-2 flex items-center gap-2">
                {editingService && editingService._id === service._id ? (
                  <form onSubmit={handleEditService} className="flex gap-2">
                    <input type="text" value={editValues.name} onChange={e => setEditValues(v => ({ ...v, name: e.target.value }))} className="border rounded p-2" required />
                    <input type="text" value={editValues.description} onChange={e => setEditValues(v => ({ ...v, description: e.target.value }))} className="border rounded p-2" required />
                    <button type="submit" className="bg-green-500 text-white px-2 py-1 rounded">Save</button>
                    <button type="button" className="bg-gray-300 px-2 py-1 rounded" onClick={() => setEditingService(null)}>Cancel</button>
                  </form>
                ) : (
                  <>
                    <span className="font-semibold">{service.name}</span> - <span>{service.description}</span>
                    <button className="bg-blue-500 text-white px-2 py-1 rounded ml-2" onClick={() => startEditService(service)}>Edit</button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded ml-2" onClick={() => handleDeleteService(service._id)}>Delete</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded shadow p-6 mt-8">
          <h2 className="text-xl font-bold mb-2">Consultant Slot Management (Live API)</h2>
          <form onSubmit={handleAddSlot} className="flex gap-2 mb-4 flex-wrap">
            <input type="date" value={newSlot.date} onChange={e => setNewSlot(s => ({ ...s, date: e.target.value }))} className="border rounded p-2" required />
            <input type="time" value={newSlot.startTime} onChange={e => setNewSlot(s => ({ ...s, startTime: e.target.value }))} className="border rounded p-2" required />
            <input type="time" value={newSlot.endTime} onChange={e => setNewSlot(s => ({ ...s, endTime: e.target.value }))} className="border rounded p-2" required />
            <select value={newSlot.serviceId} onChange={e => setNewSlot(s => ({ ...s, serviceId: e.target.value }))} className="border rounded p-2" required>
              <option value="">Select Service</option>
              {servicesList.map(service => (
                <option key={service._id} value={service._id}>{service.name}</option>
              ))}
            </select>
            <button type="submit" className="bg-[#FFCB4B] px-4 py-2 rounded font-bold text-black">Add Slot</button>
          </form>
          <ul>
            {slots.map(slot => (
              <li key={slot._id} className="mb-2">
                <b>Date:</b> {slot.date?.slice(0,10)} | <b>Service:</b> {slot.serviceId?.name || slot.serviceId} | <b>Slots:</b> {slot.slots.map((s: any, idx: number) => `${s.startTime}-${s.endTime} (${s.status})`).join(', ')}
              </li>
            ))}
          </ul>
        </div>
      </main>
    );
  }

  // --- Default Dashboard for other users ---
  return (
    <main className="layout">
      <div className="md:h-[168px] h-fit p-5 md:p-5 w-full bg-[#ADEBB3] rounded-sm flex flex-col  md:flex-row justify-between items-center">
        <div className="flex flex-col justify-center gap-3 ">
          <h1 className="font-semibold text-[31px]">Welcome {user?.name || "John Doe"}</h1>
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
            onClick={() => {
              setSelectedService(service);
              setApplying(true);
            }}
          />
        ))}
      </div>
    </main>
  );
};
export default Page;
