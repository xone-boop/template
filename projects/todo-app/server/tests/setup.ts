import { beforeAll, afterAll } from 'vitest';
import { prisma } from '../src/config/database';

beforeAll(async () => {
  await prisma.$executeRawUnsafe('DELETE FROM Todo');
  await prisma.$executeRawUnsafe('DELETE FROM User');
});

afterAll(async () => {
  await prisma.$disconnect();
});
