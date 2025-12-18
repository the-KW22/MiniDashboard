import { Task } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-card border rounded-lg hover:shadow-sm transition-shadow">
      <div className="flex items-center gap-3 flex-1">
        <Checkbox
          checked={task.completed}
          onCheckedChange={onToggle}
        />
        
        <span
          className={`flex-1 ${
            task.completed
              ? "line-through text-muted-foreground"
              : "text-foreground"
          }`}
        >
          {task.title}
        </span>
      </div>
      
      <Button
        variant="destructive"
        size="sm"
        onClick={onDelete}
      >
        Delete
      </Button>
    </div>
  );
}