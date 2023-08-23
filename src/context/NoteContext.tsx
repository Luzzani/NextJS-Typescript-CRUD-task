"use client";
import { CreateNote, UpdateNote } from "@/interfaces/Note";
import { createContext, useState, useContext } from "react";
import { Note } from "@prisma/client";

interface Context {
  notes: Note[];
  loadNotes: () => Promise<void>;
  createNote: (note: CreateNote) => Promise<void>;
  deleteNote: (id: number) => Promise<void>;
  selectedNote: Note | null;
  setSelectedNote: (note: Note | null) => void;
  updateNote: (id: number, nota: UpdateNote) => Promise<void>;
}

export const NoteContext = createContext<Context>({
  notes: [],
  loadNotes: async () => {},
  createNote: async (note: CreateNote) => {},
  deleteNote: async (id: number) => {},
  selectedNote: null,
  setSelectedNote: (note: Note | null) => {},
  updateNote: async (id: number, nota: UpdateNote) => {},
});

export const useNotes = () => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
};

export const NoteProvider = ({ children }: { children: React.ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const loadNotes = async () => {
    const res = await fetch("/api/notes");
    const data = await res.json();
    setNotes(data);
  };

  const createNote = async (note: CreateNote) => {
    const res = await fetch("/api/notes", {
      method: "POST",
      body: JSON.stringify(note),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newNote = await res.json();
    setNotes([...notes, newNote]);
  };

  const deleteNote = async (id: number) => {
    const res = await fetch("http://localhost:3000/api/notes/" + id, {
      method: "DELETE",
    });
    const data = await res.json();
    setNotes(notes.filter((note) => note.id !== id));
  };

  const updateNote = async (id: number, note: UpdateNote) => {
    const res = await fetch("/api/notes/" + id, {
      method: "PUT",
      body: JSON.stringify(note),
    });
    const data = await res.json();
    setNotes(notes.map((note) => (note.id === id ? data : note)));
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        loadNotes,
        createNote,
        deleteNote,
        selectedNote,
        setSelectedNote,
        updateNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
