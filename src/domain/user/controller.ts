import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all users from collection
export const getUser = async () => {
  const allUser = await prisma.user.findMany();
  return allUser;
};

// Get single user by id
export const getUserById = async (data: { id: number }) => {
  const { id } = data; // Get id of user 
  // Find id in database
  const user = await prisma.user.findUnique({
    where: { id : Number(id) },
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
  } catch (e) {
     throw e;
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
  } catch (e) {
    throw e;
  }
}
