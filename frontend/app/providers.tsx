"use client";

import { ConfigProvider, App as AntdApp } from "antd";
import type { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        cssVar: {},
        hashed: false,
      }}
    >
      <AntdApp>{children}</AntdApp>
    </ConfigProvider>
  );
}
