"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Button, message } from "antd";
import api from "@/services/api";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (values: any) => {
    setLoading(true);
    try {
      await api.post("/auth/register", {
        full_name: values.name,
        email: values.email,
        password: values.password,
      });
      console.log("Registration successful! Please log in.");
      router.push("/login");
    } catch (err: any) {
      console.error(err);
      message.error(err.response?.data?.detail || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

        <Form layout="vertical" onFinish={handleRegister}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="John Doe" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="you@example.com" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter a password" }]}
          >
            <Input.Password placeholder="********" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="********" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full"
            >
              Register
            </Button>
          </Form.Item>
        </Form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => router.push("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
