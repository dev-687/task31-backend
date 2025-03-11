const mongoose = require('mongoose');

const uri = "mongodb+srv://devsoft687:dev_ABC@cluster1.lfl6u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";

const mongoDBConn = async () => {
  try {
    await mongoose.connect(uri, {
      serverApi: { version: '1', strict: true, deprecationErrors: true }
    });

    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

module.exports = mongoDBConn;
