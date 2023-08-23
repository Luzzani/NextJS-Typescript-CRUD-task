import { PrismaClient } from '@prisma/client'

declare global {
    var prisma: PrismaClient | undefined
}

export const prisma = global.prisma || new PrismaClient()


//para evitar llamados innecesarios
if (process.env.NODE !== 'production') {
    global.prisma = prisma

}