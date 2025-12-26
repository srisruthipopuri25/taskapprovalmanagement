"use client";
import { Button, DatePicker, Input, Select } from "antd";
import api from "@/services/api";
import { useState } from "react";
import type { Dayjs } from "dayjs";

export default function TaskForm() {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState<Dayjs | null>(null);

  const createTask = async () => {
    await api.post("/tasks", {
      title,
      priority,
      status: "Pending",
      due_date: dueDate ? dueDate.format("YYYY-MM-DD") : null,
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
        defaultValue="Low"
        onChange={(value) => setPriority(value)}
        options={[
          { value: "Low", label: "Low" },
          { value: "Medium", label: "Medium" },
          { value: "High", label: "High" },
        ]}
      />
      <DatePicker
        placeholder="Due date"
        onChange={(date) => setDueDate(date)}
      />

      <Button type="primary" onClick={createTask}>
        Add
      </Button>
    </div>
  );
}
