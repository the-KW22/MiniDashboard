"use client";

import { useState, useEffect } from "react";
import { useTaskStore } from "@/lib/taskStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TaskItem from "@/components/TaskItem";

export default function TasksPage() {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [showClearDialog, setShowClearDialog] = useState(false);
  
  const tasks = useTaskStore((state) => state.tasks);
  const addTask = useTaskStore((state) => state.addTask);
  const toggleTask = useTaskStore((state) => state.toggleTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const loadTasks = useTaskStore((state) => state.loadTasks);
  const clearAllTasks = useTaskStore((state) => state.clearAllTasks);

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      addTask(newTaskTitle);
      setNewTaskTitle("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  const handleConfirmClear = () => {
    clearAllTasks();
    setShowClearDialog(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
        
        {/* Clear All Button - only show if tasks exist */}
        {tasks.length > 0 && (
          <Button 
            variant="destructive" 
            size="sm"
            onClick={() => setShowClearDialog(true)}
          >
            Clear All
          </Button>
        )}
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-2">
            <Input
              placeholder="What needs to be done?"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button onClick={handleAddTask}>Add Task</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tasks ({tasks.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {tasks.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No tasks yet. Add one above!
            </p>
          ) : (
            <div className="space-y-2">
              {tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={() => toggleTask(task.id)}
                  onDelete={() => deleteTask(task.id)}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={showClearDialog} onOpenChange={setShowClearDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Clear all task?
              </DialogTitle>

              <DialogDescription>
                This will permenantly delete all {tasks.length} tasks. This action cannot be undone.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowClearDialog(false)}>
                Cancel
              </Button>

              <Button variant="destructive" onClick={handleConfirmClear}>
                Clear All
              </Button>
            </DialogFooter>
          </DialogContent>
      </Dialog>
    </div>
  );
}