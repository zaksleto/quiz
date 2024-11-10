"use client";

import { useState } from "react";
import Header from "./header";
import StepsColumn from "./steps-column";
import ModulesColumn from "./modules-column";
import PreviewColumn from "./preview-column";
import EditorColumn from "./editor-column";

export interface Module {
  id: string;
  type: string;
  content: any;
}

export interface Step {
  id: number;
  title: string;
  modules: Module[];
}

export default function QuizBuilder() {
  const [steps, setSteps] = useState<Step[]>([
    { id: 1, title: "Passo 1", modules: [] },
  ]);
  const [selectedStep, setSelectedStep] = useState<number>(1);
  const [activeModule, setActiveModule] = useState<string | null>(null);

  const deleteStep = (id: number) => {
    if (steps.length === 1) return;
    const newSteps = steps.filter((step) => step.id !== id);
    setSteps(newSteps);
    if (selectedStep === id) {
      setSelectedStep(newSteps[0].id);
    }
  };

  const duplicateStep = (id: number) => {
    const stepToDuplicate = steps.find((step) => step.id === id);
    if (!stepToDuplicate) return;

    const newStep = {
      ...stepToDuplicate,
      id: Math.max(...steps.map((s) => s.id)) + 1,
      title: `${stepToDuplicate.title} (cópia)`,
    };

    const stepIndex = steps.findIndex((step) => step.id === id);
    const newSteps = [...steps];
    newSteps.splice(stepIndex + 1, 0, newStep);
    setSteps(newSteps);
  };

  const handleModuleSelect = (moduleType: string) => {
    const currentStep = steps.find((step) => step.id === selectedStep);
    if (!currentStep) return;

    const newModule: Module = {
      id: `${moduleType}-${Date.now()}`,
      type: moduleType,
      content: moduleType === 'text' ? {
        headline: "Headline",
        description: "Description",
        alignment: "center",
        defaultAlignment: true,
        fontSize: "huge",
        fontFamily: "sans-serif",
        textStyle: [],
      } : {},
    };

    const updatedSteps = steps.map((step) =>
      step.id === selectedStep
        ? { ...step, modules: [...step.modules, newModule] }
        : step
    );

    setSteps(updatedSteps);
    setActiveModule(newModule.id);
  };

  const updateModule = (moduleId: string, content: any) => {
    const updatedSteps = steps.map((step) => ({
      ...step,
      modules: step.modules.map((module) =>
        module.id === moduleId ? { ...module, content } : module
      ),
    }));
    setSteps(updatedSteps);
  };

  const deleteModule = (moduleId: string) => {
    const updatedSteps = steps.map((step) => ({
      ...step,
      modules: step.modules.filter((module) => module.id !== moduleId),
    }));
    setSteps(updatedSteps);
    setActiveModule(null);
  };

  const currentStep = steps.find((step) => step.id === selectedStep);
  const activeModuleData = currentStep?.modules.find(
    (module) => module.id === activeModule
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-6 grid grid-cols-16 gap-6">
        <StepsColumn
          steps={steps}
          selectedStep={selectedStep}
          onStepSelect={setSelectedStep}
          onAddStep={() => {
            const newStep = {
              id: steps.length + 1,
              title: `Passo ${steps.length + 1}`,
              modules: [],
            };
            setSteps([...steps, newStep]);
          }}
          onDeleteStep={deleteStep}
          onDuplicateStep={duplicateStep}
        />
        <ModulesColumn onModuleSelect={handleModuleSelect} />
        <PreviewColumn
          modules={currentStep?.modules || []}
          activeModule={activeModuleData}
          onModuleSelect={setActiveModule}
        />
        {activeModuleData && (
          <EditorColumn
            module={activeModuleData}
            onUpdate={updateModule}
            onClose={() => setActiveModule(null)}
            onDelete={deleteModule}
          />
        )}
      </div>
    </div>
  );
}