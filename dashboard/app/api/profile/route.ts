import { NextResponse } from "next/server";

let mockUser = {
  role: "consultant",
  isProfileCompleted: false,
  name: "John Doe",
  surname: "",
  education: "",
  gender: "",
  location: "",
  email: "",
  phoneNumber: ""
};

export async function GET(request: Request) {
  return NextResponse.json(mockUser);
}

export async function POST(request: Request) {
  const data = await request.json();
  mockUser = {
    ...mockUser,
    ...data,
    isProfileCompleted: true // Ensure this is set
  };
  return NextResponse.json({ success: true });
} 