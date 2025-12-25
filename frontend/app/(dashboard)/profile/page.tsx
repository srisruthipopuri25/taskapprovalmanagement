"use client";

export default function ProfilePage() {
  const email = "user@email.com"; // optional decode JWT

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">Profile</h1>
      <p>Email: {email}</p>
    </>
  );
}
