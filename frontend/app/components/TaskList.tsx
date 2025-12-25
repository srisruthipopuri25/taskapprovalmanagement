"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import { Card, Select, Pagination } from "antd";
import _ from "lodash";

const PAGE_SIZE = 5;

export default function TaskList() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [status, setStatus] = useState<string>();
  const [page, setPage] = useState(1);

  useEffect(() => {
    api.get("/tasks").then((res) => setTasks(res.data));
  }, []);

  const filteredTasks = status ? _.filter(tasks, { status }) : tasks;

  const paginatedTasks = _.slice(
    filteredTasks,
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
    <div>
      <Select
        allowClear
        placeholder="Filter by status"
        className="mb-4 w-52"
        onChange={(value) => {
          setStatus(value);
          setPage(1); // reset page on filter
        }}
        options={[
          { value: "Pending", label: "Pending" },
          { value: "In Progress", label: "In Progress" },
          { value: "Completed", label: "Completed" },
        ]}
      />

      {paginatedTasks.map((task) => (
        <Card key={task.id} className="mb-3 rounded-xl shadow-sm">
          <h3 className="font-semibold">{task.title}</h3>
          <p>Status: {task.status}</p>
          <p>Priority: {task.priority}</p>
        </Card>
      ))}

      <div className="flex justify-center mt-6">
        <Pagination
          current={page}
          pageSize={PAGE_SIZE}
          total={filteredTasks.length}
          onChange={(p) => setPage(p)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
}
