"use client";
import { Button, DatePicker, Input, Select } from "antd";
import api from "@/services/api";
import { useState } from "react";

export default function TaskForm() {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("low");

  const createTask = async () => {
    await api.post("/tasks", {
      title,
      priority,
      status: "Pending",
    });
    window.location.reload();
  };

  return (
    <div className="flex gap-2 mb-4">
      <Input
        placeholder="Task title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <Select
        defaultValue="low"
        onChange={(value) => setPriority(value)}
        options={[
          { value: "low", label: "Low" },
          { value: "medium", label: "Medium" },
          { value: "high", label: "High" },
        ]}
      />
      <Button type="primary" onClick={createTask}>
        Add
      </Button>
    </div>
  );
}
