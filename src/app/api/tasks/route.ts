// import { NextResponse } from "next/server";
// import mongoose from "mongoose";
// import { connectDB } from "@/lib/mongodb";
// import { Task } from "@/models/Task";

// export async function GET() {
//   try {
//     await connectDB();
//     const tasks = await Task.find().sort({ createdAt: -1 });
//     return NextResponse.json(tasks);
//   } catch (error) {
//     console.error('Error fetching tasks:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch tasks' },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(request: Request) {
//   let connection;
//   try {
//     // Établir la connexion
//     connection = await connectDB();
    
//     // Vérifier si la requête est valide
//     if (!request.body) {
//       return NextResponse.json(
//         { error: 'Request body is required' },
//         { status: 400 }
//       );
//     }

//     // Parser les données avec gestion d'erreur
//     let data;
//     try {
//       data = await request.json();
//     } catch (e) {
//       return NextResponse.json(
//         { error: 'Invalid JSON in request body' },
//         { status: 400 }
//       );
//     }

//     // Validation des données
//     if (!data.title) {
//       return NextResponse.json(
//         { error: 'Le titre est requis' },
//         { status: 400 }
//       );
//     }

//     if (data.title.length < 3) {
//       return NextResponse.json(
//         { error: 'Le titre doit contenir au moins 3 caractères' },
//         { status: 400 }
//       );
//     }

//     // Nettoyer les données
//     const taskData = {
//       title: data.title.trim(),
//       description: data.description ? data.description.trim() : "",
//       status: data.status || "pending"
//     };

//     // Créer la tâche
//     const newTask = await Task.create(taskData);
    
//     return NextResponse.json(
//       { 
//         message: 'Tâche créée avec succès',
//         task: newTask 
//       }, 
//       { status: 201 }
//     );

//   } catch (error) {
//     console.error('Error creating task:', error);
    
//     // Gestion spécifique des erreurs MongoDB
//     if (error instanceof mongoose.Error.ValidationError) {
//       return NextResponse.json(
//         { error: 'Validation error', details: error.errors },
//         { status: 400 }
//       );
//     }

//     return NextResponse.json(
//       { error: 'Erreur lors de la création de la tâche' },
//       { status: 500 }
//     );
//   }
// }

// export async function PUT(request: Request) {
//   try {
//     await connectDB();
//     const data = await request.json();
//     const { id, ...updateData } = data;

//     if (!id) {
//       return NextResponse.json(
//         { error: 'Task ID is required' },
//         { status: 400 }
//       );
//     }

//     const updatedTask = await Task.findByIdAndUpdate(id, updateData, { new: true });
    
//     if (!updatedTask) {
//       return NextResponse.json(
//         { error: 'Task not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(updatedTask);
//   } catch (error) {
//     console.error('Error updating task:', error);
//     return NextResponse.json(
//       { error: 'Failed to update task' },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(request: Request) {
//   try {
//     await connectDB();
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get('id');

//     if (!id) {
//       return NextResponse.json(
//         { error: 'Task ID is required' },
//         { status: 400 }
//       );
//     }

//     const deletedTask = await Task.findByIdAndDelete(id);
    
//     if (!deletedTask) {
//       return NextResponse.json(
//         { error: 'Task not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ message: 'Task deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting task:', error);
//     return NextResponse.json(
//       { error: 'Failed to delete task' },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { Task } from "@/models/Task";

export async function GET() {
  await connectDB();
  const tasks = await Task.find();
  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  await connectDB();
  const data = await request.json();
  const newTask = await Task.create(data);
  return NextResponse.json(newTask, { status: 201 });
}