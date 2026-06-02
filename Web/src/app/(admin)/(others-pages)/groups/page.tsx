import GroupList from "./components/GroupList";
import { Metadata } from "next";
import Toolbar from "./components/Toolbar";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

export const metadata: Metadata = {
  title: "Next.js Calender | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
};

export default function page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Grupos " />
        <Toolbar/>
        <GroupList />
    </div>
  );
}