"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";
import FormContainer from "./_components/FormContainer";
import QuestionList from "./_components/QuestionList";
import { toast } from "sonner";
import AgentLink from "./_components/AgentLink";

function CreateAgent() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState();
  const [agentId, setAgentId] = useState();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // console.log("formData", formData)
  };

  const onGoToNext = () => {
    if (
      !formData?.title ||
      !formData?.description ||
      !formData?.duration ||
      !formData.type
    ) {
      toast.error("Input Validation", {
        variant: "destructive",
        description: "Please enter all details",
        duration: 3000,
        position: "bottom-right",
      });
      return;
    }
    setStep(step + 1);
  };

  const onCreateLink = (agent_id) => {
    setAgentId(agent_id);
    setStep(step + 1);
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
      {step === 1 ? (
        <FormContainer
          handleInputChange={handleInputChange}
          GoToNext={() => onGoToNext()}
        />
      ) : step === 2 ? (
        <QuestionList formData={formData} onCreateLink={(agent_id)=>onCreateLink(agent_id)} />
      ) : step == 3 ? (
        <AgentLink agent_id={agentId}
          formData={formData}
        />
      ) : null}
    </div>
  );
}

export default CreateAgent;
