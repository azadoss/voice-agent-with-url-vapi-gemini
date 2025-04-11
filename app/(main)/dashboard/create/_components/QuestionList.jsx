import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { AgentType } from "@/services/Constants";
import { Button } from "@/components/ui/button";
import QuestionListContainer from "./QuestionListContainer";
import { supabase } from "@/services/supabaseClient";
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@/app/provider'

function QuestionList({ formData, onCreateLink }) {
  const [loading, setLoading] = useState(true);
  const [questionList, setQuestionList] = useState([]);
  const user = useUser();
  const [saveLoading, setSaveLoading] = useState(false);

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
      console.log("Generated QuestionList response", response.data.content);
      // const questionList = response.data.content.split("\n").map(question => question.trim());
      const Content = response.data.content;
      const FormatedContent = Content.replace(/```json/g, "").replace(
        /```/g,
        ""
      );

      setQuestionList(JSON.parse(FormatedContent)?.interviewQuestions);
      setLoading(false);
    } catch (error) {
      toast.error("Error generating question list");
      setLoading(false);
    }
  };

  const onFinish = async () => {
    setSaveLoading(true);
    const agent_id = uuidv4();
    const { data, error } = await supabase
      .from("Agents")
      .insert([
        {
          ...formData,
          questionList: questionList,
          userEmail: user?.email,
          agent_id: agent_id,
        }
      ])
      .select()

      setSaveLoading(false);

      // Passing Agent link to parent component
      onCreateLink(agent_id);
      
  };

  return (
    <div>
      {loading && (
        <div className="p-5 bg-muted-foreground/10 rounded-lg flex border border-primary/20 shadow-sm items-center gap-5 mt-8">
          <Loader2Icon className="animate-spin" />
          <div>
            <h2 className="text-lg font-medium">Generating...</h2>
            <p className="text-muted-foreground">
              AI is generating questions list for you based on your description
            </p>
          </div>
        </div>
      )}
      {questionList?.length > 0 && (
        <QuestionListContainer questionList={questionList} />
      )}

      <div className="flex justify-end mt-8">
        <Button onClick={() => onFinish()} disabled={saveLoading}>
        {saveLoading&&<Loader2Icon className="animate-spin mr-2"/>}
        Create Agent Link</Button>
      </div>
    </div>
  );
}

export default QuestionList;
