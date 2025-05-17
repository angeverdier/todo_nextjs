import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI n'est pas défini dans les variables d'environnement");
}

let connection: mongoose.Connection | null = null;

export async function connectDB() {
  try {
    if (connection) {
      console.log("Utilisation de la connexion MongoDB existante");
      return connection;
    }

    const mongoDBInstance = await mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4
    });

    connection = mongoDBInstance.connection;
    console.log("Nouvelle connexion MongoDB établie");
    
    // Gestion des événements de connexion
    connection.on("error", (err) => {
      console.error("Erreur de connexion MongoDB:", err);
    });

    connection.on("disconnected", () => {
      console.warn("Déconnecté de MongoDB");
      connection = null;
    });

    return connection;
  } catch (error) {
    console.error("Erreur lors de la connexion à MongoDB:", error);
    throw error;
  }
}
