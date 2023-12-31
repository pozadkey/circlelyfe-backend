import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all users from collection
export const getUser = async () => {
  const allUsers = await prisma.user.findMany();
  return allUsers;
};

// Get single user by id
export const getUserById = async (data: { id: number }) => {
  const { id } = data; // Get id of user 
  // Find id in database
  const user = await prisma.user.findUnique({
    where: { id : Number(id), },
    include: { posts : true }
  });
  return user;
}

// Create user
export const createUser = async (data: {
  email: string;
  name: string;
  username: string;
  bio?: string; 
}) => {
  const { email, name, username, bio} = data;
  try {
    // Create user in database
    const result = await prisma.user.create({
      data: {
        email,
        name,
        username,
        bio: 'Hey there',
      },
    });

   return result;
  } catch (e: any) {
     throw e.message;
  } 
}

// Update User 
export const editUser = async (
  userId: {
    id: number 
  },
  data: {
    bio: string,
    name: string,
    image: string
  }
) => {
  const { id } = userId; // Get user id
  const { bio, name, image } = data; // Get user data
  try {
    // Update user in database
    const result = await prisma.user.update({
      where: { id: Number(id) },
      data: { bio, name, image },
    });
   return result;
  } catch (e: any ) {
    throw e.message;
  }
}

// Delete user
export const deleteUser = async (data: {id: number})=>{
  try {
    const { id } = data;
    await prisma.user.delete({ where: { id: Number(id) } });
  } catch (e: any ){
    throw e.message;
  }
}
