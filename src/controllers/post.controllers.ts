import { Request, Response } from 'express';

import Post from '../models/post.models.js';
import Sequelize from 'sequelize';

export const getAllPosts = async (_req: Request, res: Response): Promise<Response> => {
    try {
        
        const result = await Post.findAll(); // Get all posts

        return res.status(200).json({ result });

    } catch (error) {

        console.error('Unable to connect to the database:', error);
        return res.status(500).json({ error: 'Internal Server Error' });

    }
}

export const getPostById = async (req: Request, res: Response): Promise<Response> => {
    
    const post_id = req.params.post_id;
    
    try {

        const result = await Post.findByPk(post_id); // Find a post by primary key

        if (!result) {

            return res.status(404).json({ error: `Post ${post_id} not found.`});

        } else {

            return res.status(200).json({ result });

        }


    } catch (error) {

        console.error('Unable to connect to the database:', error)
        return res.status(500).json({ error: 'Internal Server Error' })

    }
}

export const createPost = async (req: Request, res: Response): Promise<Response> => {
    
    const { post_title, post_text, post_media, user_id } = req.body;
    
    try {
        
        const post = await Post.create({
            post_title: post_title,
            post_text: post_text,
            post_media: post_media,
            user_id: user_id
        });

        // console.log(post.toJSON());
        return res.status(201).json({ post });

    } catch (error) {

        console.error('Unable to connect to the database:', error);
        return res.status(500).json({ error: 'Internal Server Error' });

    }
}

export const updatePost = async (req: Request, res: Response): Promise<Response> => {
    
    const post_id = req.params.post_id;
    const { post_title, post_text, post_media } = req.body;
    
    try {
        
        const result = await Post.findByPk(post_id);

        if (!result) {
            return res.status(404).json({ error: 'Post not found.' });
        }
        
        const post = await Post.update({
            post_title: post_title,
            post_text: post_text,
            post_media: post_media,
        }, {
            where: { 
                [Sequelize.Op.and]:
                    [{ post_id: post_id }, { user_id: result.user_id }],
            }
        });

        // console.log(post)
        return res.status(204).json({ post });
        // return res.status(200).json(post[0])

    } catch (error) {

        console.error('Unable to connect to the database:', error);
        return res.status(500).json({ error: 'Internal Server Error' });

    }
}

export const deletePost = async (req: Request, res: Response): Promise<Response> => {
    
    const post_id = req.params.post_id;
    
    try {
        
        const result = await Post.findByPk(post_id);

        if (!result) {
            return res.status(404).json({ error: 'Post not found.' });
        }
        
        const post_status = await Post.findOne({ where: { post_id: post_id }});

        const post = await Post.update({
            post_status: post_status?.post_status ? false : true
        }, {
            where: { post_id: post_id }
        });

        // console.log(post);
        return res.status(200).json({ post });

    } catch (error) {

        console.error('Unable to connect to the database:', error);
        return res.status(500).json({ error: 'Internal Server Error' });

    }
}