import { useNotes } from "@/context/NoteContext";
import { Note } from "@prisma/client";

const NoteCard = ({ note }: { note: Note }) => {
  const { deleteNote, setSelectedNote } = useNotes();

  return (
    <div className="bg-slate-400 p-4 my-2 rounded-md flex justify-between">
      <div>
        <h2 className="text-2xl font-bold">{note.title}</h2>
        <p>{note.content}</p>
        <p>{new Date(note.createAt).toLocaleDateString()}</p>
      </div>
      <div className="flex gap-x-2">
        <button
          className="px-5 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
          onClick={async () => {
            if (confirm("Are you sure you want to delete this note ?")) {
              await deleteNote(Number(note.id));
            }
          }}
        >
          Delete
        </button>
        <button
          className="px-5 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
          onClick={() => setSelectedNote(note)}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
