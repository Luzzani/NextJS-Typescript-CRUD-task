
import { Note } from '@prisma/client'

export type CreateNote = Omit<Note, 'id' | 'createAt' | 'updateAt'>

export type UpdateNote = Partial<CreateNote>