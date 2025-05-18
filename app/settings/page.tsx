"use client";
import React from "react";
import { useRouter } from "next/navigation";
import AppHeader from "../../components/AppHeader";
import { ArrowLeft } from 'lucide-react';
import SettingsForm from "../../components/SettingsForm";

export default function SettingsPage() {
  const router = useRouter();
  return (
    <>
      <AppHeader
        title="Settings"
        leftIcon={<ArrowLeft size="28" color="#222" />}
        leftAction={() => router.back()}
        rightIcon={undefined}
        rightHref={undefined}
      />
      <div style={{paddingTop: 64, background: "#fafbfc", minHeight: "100vh"}}>
        <SettingsForm />
      </div>
    </>
  );
}
