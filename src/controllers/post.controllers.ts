import { Request, Response } from 'express';

import Post from '../models/user.models.js';
// import { v4 as uuidv4 } from 'uuid';
// import { UUIDV4 } from 'sequelize';

export const getAllPosts = async (_req: Request, res: Response): Promise<Response> => {
    try {
        
        const result = await Post.findAll() // Create a user

        return res.status(200).json({ result })

    } catch (error) {

        console.error('Unable to connect to the database:', error)
        return res.status(500).json({ error: 'Internal Server Error' })

    }
}

export const getPostById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const post_id = req.params.post_id

        const result = await Post.findByPk(post_id) // Find a user by primary key

        return res.status(200).json({ result })

    } catch (error) {

        console.error('Unable to connect to the database:', error)
        return res.status(500).json({ error: 'Internal Server Error' })

    }
}

export const postPost = async (req: Request, res: Response): Promise<Response> => {
    try {

        const { post_title, post_content, post_media, user_id } = req.body
        
        const post = await Post.create({
            post_title: post_title,
            post_content: post_content,
            post_media: post_media,
            user_id: user_id,
        })

        console.log(post.toJSON())
        return res.status(200).json({ post })

    } catch (error) {

        console.error('Unable to connect to the database:', error)
        return res.status(500).json({ error: 'Internal Server Error' })

    }
}

export const putPost = async (req: Request, res: Response): Promise<Response> => {
    try {

        // const { id } = req.params.id
        const { post_title, post_content, post_media } = req.body
        
        const result = await Post.findByPk(req.params.post_id)

        if (result) {

            return res.status(400).json({ error: 'Post not found.' })

        }
        
        const post = await Post.update({
            post_title: post_title,
            post_content: post_content,
            post_media: post_media,
        }, {
            where: { user_id: req.params.post_id }
        })

        console.log(post)
        return res.status(200).json({ post })

    } catch (error) {

        console.error('Unable to connect to the database:', error)
        return res.status(500).json({ error: 'Internal Server Error' })

    }
}

export const deletePost = async (req: Request, res: Response): Promise<Response> => {
    try {

        const post_id = req.params.post_id
        const { post_status } = req.body
        
        const result = await Post.findByPk(post_id)

        if (result) {

            return res.status(400).json({ error: 'Post not found.' })

        }
        
        const post = await Post.update({
            post_status: post_status,
        }, {
            where: { post_id: post_id }
        })

        console.log(post)
        return res.status(200).json({ post })

    } catch (error) {

        console.error('Unable to connect to the database:', error)
        return res.status(500).json({ error: 'Internal Server Error' })

    }
}