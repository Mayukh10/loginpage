import { PrismaClient } from '../generated/prisma';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const prisma = new PrismaClient();

// Test database connection
async function testConnection() {
  try {
    // Attempt to connect to the database
    await prisma.$connect();
    console.log('✅ Successfully connected to the database');

    // Create a test user (if it doesn't exist)
    const testEmail = 'test@example.com';
    
    const existingUser = await prisma.user.findUnique({
      where: { email: testEmail }
    });

    if (!existingUser) {
      await prisma.user.create({
        data: {
          email: testEmail,
          password: 'hashed_password_would_go_here',
        }
      });
      console.log('✅ Created test user');
    } else {
      console.log('ℹ️ Test user already exists');
    }

    // Count users in the database
    const userCount = await prisma.user.count();
    console.log(`ℹ️ Total users in database: ${userCount}`);

    console.log('🎉 Database connection test completed successfully');
  } catch (error) {
    console.error('❌ Database connection test failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the test
testConnection()
  .catch(console.error)
  .finally(() => process.exit()); 