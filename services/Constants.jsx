import {
  LayoutDashboard,
  Calendar,
  Settings,
  CreditCard,
  Logs,
  Briefcase,
  BriefcaseBusiness,
  Star,
  Bot,
  Handshake,
  Component,
  Ratio,
  Code2Icon,
  User2Icon,
} from "lucide-react";

export const SideBarOptions = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    label: "Scheduled",
    icon: Calendar,
    path: "/scheduled",
  },
  {
    label: "Library",
    icon: Logs,
    path: "/library",
  },
  {
    label: "Billing",
    icon: CreditCard,
    path: "/billing",
  },
  {
    label: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export const AgentType = [
  {
    label: "Technical   ",
    value: "technical",
    icon: Code2Icon,
  },
  {
    label: "Behavioral",
    value: "behavioral",
    icon: User2Icon,
  },
  {
    label: "Experience",
    value: "experience",
    icon: Briefcase,
  },
  {
    label: "Problem Solving",
    value: "problem-solving",
    icon: Ratio,
  },
  {
    label: "Leadership",
    value: "leadership",
    icon: BriefcaseBusiness,
  },
  {
    label: "Product",
    value: "product",
    icon: Component,
  },
  {
    label: "Sales",
    value: "sales",
    icon: Handshake,
  },
  {
    label: "Marketing",
    value: "marketing",
    icon: BriefcaseBusiness,
  },
  {
    label: "Customer Support",
    value: "customer-support",
    icon: Star,
  },
  {
    label: "HR",
    value: "hr",
    icon: BriefcaseBusiness,
  },
  {
    label: "Other",
    value: "other",
    icon: Bot,
  },
];
