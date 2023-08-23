"use client";
import { useState, FormEvent, useRef, useEffect } from "react";
import { useNotes } from "@/context/NoteContext";

const NoteForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);

  const { createNote, selectedNote, setSelectedNote, updateNote } = useNotes();

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content || "");
    }
  }, [selectedNote]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedNote) {
      await updateNote(selectedNote.id, { title, content });
      setSelectedNote(null);
    } else {
      await createNote({ title, content });
    }

    setTitle("");
    setContent("");
    titleRef.current?.focus();
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <input
        type="text"
        name="title"
        autoFocus
        placeholder="Title"
        className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        ref={titleRef}
      />
      <textarea
        name="content"
        placeholder="Content"
        className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2"
        onChange={(e) => setContent(e.target.value)}
        value={content}
      />
      <div className="flex justify-end mr-4 gap-x-2">
        <button
          className="px-5 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={title.trim() === "" || content.trim() === ""}
        >
          {selectedNote ? "Update" : "Create"}
        </button>
        {selectedNote && (
          <button
            className="px-5 py-2 text-white bg-slate-600 rounded-md hover:bg-slate-700"
            type="button"
            onClick={() => {
              setTitle("");
              setContent("");
              setSelectedNote(null);
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default NoteForm;
