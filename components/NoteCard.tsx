import { Note } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface NoteCardProps {
    note: Note;
    onEdit: () => void;
    onDelete: () => void;
}

function formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}

export default function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
    return(
        <Card>
            <CardHeader>
                <CardTitle>{note.title || "Untitled Note"}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground whitespace-pre-wrap">
                {note.content || "No content"}
                </p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                Updated: {formatDate(note.updatedAt)}
                </span>
                <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={onEdit}>
                    Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={onDelete}>
                    Delete
                </Button>
                </div>
            </CardFooter>
        </Card>
    );
}