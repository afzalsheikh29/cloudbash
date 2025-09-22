import { type User, type InsertUser, type Contact, type InsertContact, type Project, type InsertProject, contacts, projects } from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { desc, eq } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact methods
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  
  // Project methods
  createProject(project: InsertProject): Promise<Project>;
  getProjects(): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contacts: Map<string, Contact>;
  private projects: Map<string, Project>;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.projects = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Contact methods
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = { 
      ...insertContact, 
      id, 
      createdAt: new Date() 
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort(
      (a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }

  // Project methods
  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = randomUUID();
    const project: Project = { 
      ...insertProject,
      techStack: insertProject.techStack as string[], // Ensure proper type casting
      id, 
      createdAt: new Date() 
    };
    this.projects.set(id, project);
    return project;
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).sort(
      (a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return Array.from(this.projects.values())
      .filter(project => project.featured === 'true')
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  async updateProject(id: string, updateData: Partial<InsertProject>): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;
    
    const updatedProject: Project = { 
      ...project, 
      ...updateData,
      techStack: updateData.techStack ? updateData.techStack as string[] : project.techStack
    };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  async deleteProject(id: string): Promise<boolean> {
    return this.projects.delete(id);
  }
}

// Supabase/Database Storage Implementation
export class DatabaseStorage implements IStorage {
  // User methods (existing functionality)
  async getUser(id: string): Promise<User | undefined> {
    // TODO: Implement user functionality if needed
    return undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    // TODO: Implement user functionality if needed
    return undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    // TODO: Implement user functionality if needed
    throw new Error("User functionality not implemented yet");
  }

  // Contact methods
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const result = await db.insert(contacts).values(insertContact).returning();
    return result[0];
  }

  async getContacts(): Promise<Contact[]> {
    return await db.select().from(contacts).orderBy(desc(contacts.createdAt));
  }

  // Project methods
  async createProject(insertProject: InsertProject): Promise<Project> {
    const result = await db.insert(projects).values(insertProject).returning();
    return result[0];
  }

  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects).orderBy(desc(projects.createdAt));
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return await db
      .select()
      .from(projects)
      .where(eq(projects.featured, 'true'))
      .orderBy(desc(projects.createdAt));
  }

  async updateProject(id: string, updateData: Partial<InsertProject>): Promise<Project | undefined> {
    const result = await db
      .update(projects)
      .set(updateData)
      .where(eq(projects.id, id))
      .returning();
    
    return result[0];
  }

  async deleteProject(id: string): Promise<boolean> {
    const result = await db.delete(projects).where(eq(projects.id, id)).returning();
    return result.length > 0;
  }
}

// Use database storage in production, memory storage for development/testing
export const storage = process.env.DATABASE_URL 
  ? new DatabaseStorage() 
  : new MemStorage();
