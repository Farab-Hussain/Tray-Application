import React, { useState } from 'react';

export default function ApplyConsultancyForm() {
  const [applied, setApplied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: send application data to backend
    setApplied(true);
    setTimeout(() => {
      window.location.href = 'myapp://consultantHome';
    }, 1000);
  };

  if (applied) {
    return <div className="p-8 text-center">Application submitted! Redirecting to the app...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 max-w-md m-auto bg-white rounded shadow flex flex-col gap-4">
      <h1 className="text-2xl font-bold mb-4">Apply for Consultancy</h1>
      <label className="font-semibold">Why are you a good fit?</label>
      <textarea className="border rounded p-2" rows={4} required placeholder="Describe your experience, skills, etc." />
      <button type="submit" className="bg-[#FFCB4B] px-6 py-2 rounded font-bold text-black mt-2">Submit Application</button>
    </form>
  );
} 