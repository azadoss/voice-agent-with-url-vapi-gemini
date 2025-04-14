import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AgentType } from "@/services/Constants";
import { useState, useEffect } from "react";

function FormContainer({ handleInputChange, GoToNext }) {
  const [selectedType, setSelectedType] = useState([]);

  useEffect(() => {
    if (selectedType) {
      handleInputChange("type", selectedType);
    }
  }, [selectedType]);

  const AddSelectedType = (type) => {
    const data = selectedType.includes(type);
    if (!data) {
      setSelectedType((prev) => [...prev, type]);
    } else {
      const result = selectedType.filter((item) => item != type);
      setSelectedType(result);
    }
    console.log("selectedType", selectedType);
  };

  return (
    <div className="mt-5 p-6 bg-muted rounded-sm space-y-8">
      <div>
        <h2 className="text-sm font-medium">Title</h2>
        <Input
          type="text"
          placeholder="Enter Agent title"
          className="mt-2"
          onChange={(event) => handleInputChange("title", event.target.value)}
        />
      </div>
      <div>
        <h2 className="text-sm font-medium">Description</h2>
        <Textarea
          placeholder="Enter Agent Description"
          className="mt-2 h-40"
          onChange={(event) =>
            handleInputChange("description", event.target.value)
          }
        />
      </div>
      <div>
        <h2 className="text-sm font-medium">Interview Duration</h2>
        <Select onValueChange={(value) => handleInputChange("duration", value)}>
          <SelectTrigger className="w-[180px] mt-2">
            <SelectValue placeholder="Select Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5 Minutes">5 Minutes</SelectItem>
            <SelectItem value="15 Minutes">15 Minutes</SelectItem>
            <SelectItem value="30 Minutes">30 Minutes</SelectItem>
            {/* <SelectItem value="45">45 Minutes</SelectItem>
            <SelectItem value="60">60 Minutes</SelectItem> */}
          </SelectContent>
        </Select>
      </div>
      <div>
        <h2 className="text-sm font-medium">Select Agent Type</h2>
        <div className="flex flex-wrap gap-3 mt-2">
          {AgentType.map((type, index) => (
            <div
              key={index}
              className={`flex cursor-pointer items-center gap-2 p-1 px-2 rounded-sm border border-border bg-muted-foreground/10 hover:bg-muted-foreground/30 transition-all duration-200 ${
                selectedType.includes(type.label)
                  ? "bg-muted-foreground/50"
                  : ""
              }`}
              onClick={() => AddSelectedType(type.label)}
            >
              <type.icon className="w-4 h-4" />
              <span className="text-sm">{type.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-10" onClick={() => GoToNext()}>
        <Button className="w-1/3">Create Agent</Button>
      </div>
    </div>
  );
}

export default FormContainer;
