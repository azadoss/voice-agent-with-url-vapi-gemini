import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { AgentType } from "@/services/Constants";

function QuestionList({ formData }) {
  const [loading, setLoading] = useState(true);
  const [questionList, setQuestionList] = useState([]);

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
      // console.log("Generated QuestionList response", response.data.content);
      // const questionList = response.data.content.split("\n").map(question => question.trim());
      const Content = response.data.content;
      const FormatedContent=Content.replace(/```json/g, "").replace(/```/g, "");

      setQuestionList(JSON.parse(FormatedContent));
      setLoading(false);
    } catch (error) {
      toast.error("Error generating question list");
      setLoading(false);
    }
  };
  return (
    <div>
      {loading && (
        <div className="p-5 bg-muted-foreground/10 rounded-lg flex border border-primary/20 shadow-sm items-center gap-5 mt-8">
          <Loader2Icon className="animate-spin" />
          <div>
            <h2 className="text-lg font-medium">Generating...</h2>
            <p className="text-muted-foreground">AI is generating questions list for you based on your description</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuestionList;
