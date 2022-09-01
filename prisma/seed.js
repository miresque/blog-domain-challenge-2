const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const user1 = await prisma.user.create({
        data: {
            username: 'hello',
            email: 'hello@world',
            password: 'secret',
            profile: {
                create: {
                    firstName: 'good',
                    lastName: 'morning',
                    age: 100,
                    pictureURL: 'some.url'
                }
            }
        }
    })
    
    const user1Comment = await prisma.comment.create({
        data: {
            content: 'hello wold'
        },
        include: {
            replies: true
        }
    })
    
    const user1Reply = await prisma.comment.create({
        data: {
            content: 'hello world*',
            originId: user1Comment.id
        },
        include: {
            origin: true
        }
    })
    console.log({ user1, user1Comment, user1Reply })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })