"use client";

import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";

export default function DashboardPage() {
  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <TaskForm />
      <TaskList />
    </>
  );
}
