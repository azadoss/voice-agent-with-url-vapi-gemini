import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { AgentType } from "@/services/Constants";

function QuestionList({ formData }) {
  const [loading, setLoading] = useState(true);
  console.log("QuestionList formData", formData);

  useEffect(() => {
    if (formData) {
      generateQuestionList();
    }
  }, [formData]);

  const generateQuestionList = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/llm", {
        ...formData,
      });
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Error generating question list");
      setLoading(false);
    }
  };
  return (
    <div>
      {loading && (
        <div className="p-5 bg-muted-foreground/10 rounded-lg flex border shadow-sm items-center gap-5">
          <Loader2Icon className="animate-spin" />
          <div>
            <h2>Generating...</h2>
            <p>AI is generating questions list for you based on your description</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuestionList;
