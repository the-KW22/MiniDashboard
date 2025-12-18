"use client";

import { useState, useEffect } from "react";
import { useNoteStore } from "@/lib/noteStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import NoteCard from "@/components/NoteCard";

export default function NotesPage(){
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const notes = useNoteStore((state) => state.notes);
    const addNote = useNoteStore((state) => state.addNote);
    const updateNote = useNoteStore((state) => state.updateNote);
    const deleteNote = useNoteStore((state) => state.deleteNote);
    const loadNotes = useNoteStore((state) => state.loadNotes);
    const clearAllNotes = useNoteStore((state) => state.clearAllNotes);
    const [showClearDialog, setShowClearDialog] = useState(false);

    useEffect(() => {
        loadNotes();
    }, []);

    const handleSave = () => {
        if(!title.trim() && !content.trim()){
            return;
        }

        if(editingId){
            updateNote(editingId, title, content);
            setEditingId(null);
        } else {
            addNote(title, content);
        }

        setTitle("");
        setContent("");
        setIsAdding(false);
    };

    const handleEdit = (id: string) => {
        const note = notes.find((n) => n.id === id);
        if(note){
            setTitle(note.title);
            setContent(note.content);
            setEditingId(id);
            setIsAdding(true);
        }
    };

    const handleCancel = () => {
        setTitle("");
        setContent("");
        setEditingId(null);
        setIsAdding(false);
    };

    const handleConfirmClear = () => {
        clearAllNotes();
        setShowClearDialog(false);
    };

    return(
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">
                    Notes
                </h1>

                <div className="flex gap-2">
                    {notes.length > 0 && (
                        <Button variant="destructive" size="sm" onClick={() => setShowClearDialog(true)}>
                            Clear All
                        </Button>
                    )}{!isAdding && (
                        <Button onClick={() => setIsAdding(true)}>
                            New Note
                        </Button>
                    )}
                </div>
            </div>

            {/* Add/Edit Note Form */}
            {isAdding && (
                <Card className="mb-6">
                    <CardContent className="pt-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="title">Title</label>

                                <Input
                                    id="title"
                                    placeholder="Note title..."
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="content">Content</Label>
                                <Textarea
                                    id="content"
                                    placeholder="Write your note here..."
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="min-h-32"
                                />
                            </div>

                            <div className="flex gap-2 justify-end">
                                <Button variant="outline" onClick={handleCancel}>
                                    Cancel
                                </Button>
                                <Button onClick={handleSave}>
                                    {editingId ? "Update" : "Save"}
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Notes List */}
            {notes.length === 0 ? (
                <Card>
                    <CardContent className="py-8">
                        <p className="text-muted-foreground text-center">
                        No notes yet. Click &quot;New Note&quot; to create one!
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {notes.map((note) => (
                        <NoteCard
                            key={note.id}
                            note={note}
                            onEdit={() => handleEdit(note.id)}
                            onDelete={() => deleteNote(note.id)}
                        />
                    ))}
                </div>
            )}

            <Dialog open={showClearDialog} onOpenChange={setShowClearDialog}>
                <DialogContent>
                <DialogHeader>
                    <DialogTitle>Clear all notes?</DialogTitle>
                    <DialogDescription>
                    This will permanently delete all {notes.length} notes. This action cannot be undone.
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