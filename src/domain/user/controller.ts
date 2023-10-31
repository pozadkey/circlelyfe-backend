import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all users from collection
export const getUser = async () => {
  const allUser = await prisma.user.findMany();
  return allUser;
};

// Get single user by id
export const getUserById = async (data: { id: number }) => {
  // Get id of user
  const { id } = data; 

  // Find id in database
  const user = await prisma.user.findUnique({
    where: { id : Number(id) },
  });
  return user;
}
