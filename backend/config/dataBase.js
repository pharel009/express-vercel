import mongoose from "mongoose";

const DbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log('✅ Connected to database...');
  } catch (error) {
    console.log('❌ Error connecting to database', error.message);
    process.exit(1);
  }
};

export default DbConnect;