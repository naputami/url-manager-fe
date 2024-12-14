'use client';
import { useProfileContext } from "@/context/profile";

export const WelcomeDashboard = () => {
  const { user } = useProfileContext();
  return (
    <div className="space-y-1">
      <p className="text-lg font-light">Welcome back!</p>
      <p className="text-3xl font-semibold tracking-tight">{user?.name}</p>
    </div>
  )
}

