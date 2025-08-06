import mongoose from "mongoose";

const connectToMongoDB = async () => {
	try {
		const mongoURI = process.env.MONGODB_URI;
		if (!mongoURI) {
			throw new Error("MONGODB_URI environment variable is not defined");
		}
		
		await mongoose.connect(mongoURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("Connected to MongoDB successfully");
	} catch (error) {
		console.error("Error connecting to MongoDB:", error.message);
		process.exit(1);
	}
};

export default connectToMongoDB;
