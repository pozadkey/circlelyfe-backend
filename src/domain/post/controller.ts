import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all post from collection
export const getPost = async () => {
  const allPosts = await prisma.post.findMany();
  return allPosts;
};

// Create a post
export const createPost  = async (data: {
    content : string,
    image: string,
    userId: number
}) => {
    const { content, image, userId} = data;

    const allPosts  = await prisma.post.create({
        data: {
            content,
            image,
            userId,
          },
    });
    return allPosts;
}

// Get single post by id
export const getPostById = async (data: { id: number }) => {
  const { id } = data; // Get id of post 
  // Find id in database
  const post = await prisma.post.findUnique({
    where: { id : Number(id) },
  });
  return post;
}

