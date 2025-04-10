"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";
import FormContainer from "./_components/FormContainer";

function CreateAgent() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState();

  const handleInputChange = (field, value) => {
    setFormData(prev=>({ ...prev, [field]: value }));

    console.log("formData", formData);

  };

  return (
    <div className="mt-10 px-10 md:px-24 lg:px-44 xl:px-56">
      <div className="flex gap-5 items-center">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeftIcon />
          Back
        </Button>
        <h2 className="text-2xl font-bold">Create Agent</h2>
      </div>
      <Progress value={step * 33.33} className="mt-5" />
      <FormContainer handleInputChange={handleInputChange}/>
    </div>
  );
}

export default CreateAgent;
