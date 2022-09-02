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
    
    const post1 = await prisma.post.create({
        data: {
            title: 'This is the title',
            content: 'content area',
            imageUrl: 'somerandomimage.url',
            publishedAt: new Date(),
            userId: 1,
            categories: {
                create: {
                    name: 'Informative'
                }
            }
        },
        include: {
            comments: true,
            categories: true
        }
    })

    const user1Comment = await prisma.comment.create({
        data: {
            content: 'hello wold',
            userId: user1.id,
            postId: 1
        },
        include: {
            replies: true
        }
    })
    
    const user1Reply = await prisma.comment.create({
        data: {
            content: 'hello world*',
            userId: user1.id,
            originId: user1Comment.id,
            postId: 1
        },
        include: {
            origin: true
        }
    })

    console.log({ user1, post1, user1Comment, user1Reply })
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