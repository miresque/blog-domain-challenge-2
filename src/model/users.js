const { Prisma } = require("@prisma/client")
const prisma = require('../utils/prisma')
const { addCreateOrConnectQuery } = require('../utils/utils')

const createUser = async (req, res) => {
    const { username, email, password, firstName, lastName, age, pictureURL } = req.body

    try {
        if (!username || !email || !password || 
            !firstName || !lastName || !age || !pictureURL) {
                res.status(400).json({ error: 'Missing fields in the request body' })
        }
        const createdUser = await prisma.user.create({
            data: {
                username, 
                email, 
                password, 
                profile: {
                    create: {
                        firstName, 
                        lastName, 
                        age, 
                        pictureURL
                    }
                }
            },
            include: { profile: true }
        })

        res.status(201).json({ user: createdUser })
    } catch (e) {
        console.log(e.message)
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === "P2002") {
                return res.status(409).json({ error: "A user with the provided username/email already exists" })
            }
        }
        res.status(500).json({ error: e.message })
    }
}

const updateUser = async (req, res) => {
    const paramId = Number(req.params.id)
    const { username, email, password, firstName, lastName, age, pictureURL } = req.body

    try {
        const updatedUser = await prisma.user.update({
            where: {
                id: paramId
            },
            data: {
                username, 
                email, 
                password, 
                profile: {
                    update: {
                        firstName, 
                        lastName, 
                        age, 
                        pictureURL
                    }
                }
            },
            include: { profile: true }
        })

        res.status(201).json({ user: updatedUser })
    } catch (e) {
        console.log(e.message, e.code)
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === "P2002") {
                return res.status(409).json({ error: "A user with the provided username/email already exists" })
            }
        }
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === "P2016") {
                return res.status(404).json({ error: "A user with that id does not exist" })
            }
        }
        res.status(500).json({ error: e.message })
    }
}

const deleteUser = async (req, res) => {
    const paramId = Number(req.params.id)

    try {
        const updatedUser = await prisma.user.delete({
            where: {
                id: paramId
            },
            include: { profile: true, posts: true, comments: true }
        })

        res.status(201).json({ user: updatedUser })
    } catch (e) {
        console.log(e.message, e.code)
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === "P2016") {
                return res.status(404).json({ error: "A user with that id does not exist" })
            }
        }
        res.status(500).json({ error: e.message })
    }
}

const createPost = async (req, res) => {
    const paramId = Number(req.params.id)
    const { title, content, imageUrl, publishedAt, categories } = req.body

    try {
        if (!title || !content || !imageUrl || 
            !publishedAt) {
                res.status(400).json({ error: 'Missing fields in the request body' })
        }
        const createdPost = await prisma.post.create({
            data: {
                title, 
                content, 
                imageUrl,
                publishedAt: new Date(publishedAt),
                user: {
                    connect: { id: paramId }
                },
                categories: {
                    connectOrCreate: addCreateOrConnectQuery(categories)
                }
            },
            include: { user: true, comments: true, categories: true }
        })

        res.status(201).json({ post: createdPost })
    } catch (e) {
        console.log(e.message)
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === "P2002") {
                return res.status(409).json({ error: "A post with the provided title already exists" })
            }
            if (e.code === "P2016") {
                return res.status(404).json({ error: "A user with that id does not exist" })
            }
        }
        res.status(500).json({ error: e.message })
    }
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    createPost
}