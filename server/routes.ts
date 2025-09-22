import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertProjectSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contacts", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.json({ success: true, contact });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          error: "Invalid input data", 
          details: error.errors 
        });
      }
      console.error('Error creating contact:', error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to submit contact form" 
      });
    }
  });

  // Get all contacts (for admin view)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json({ success: true, contacts });
    } catch (error) {
      console.error('Error fetching contacts:', error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to fetch contacts" 
      });
    }
  });

  // Create a new project
  app.post("/api/projects", async (req, res) => {
    try {
      const validatedData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(validatedData);
      res.json({ success: true, project });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          error: "Invalid project data", 
          details: error.errors 
        });
      }
      console.error('Error creating project:', error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to create project" 
      });
    }
  });

  // Get all projects
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json({ success: true, projects });
    } catch (error) {
      console.error('Error fetching projects:', error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to fetch projects" 
      });
    }
  });

  // Get featured projects only
  app.get("/api/projects/featured", async (req, res) => {
    try {
      const projects = await storage.getFeaturedProjects();
      res.json({ success: true, projects });
    } catch (error) {
      console.error('Error fetching featured projects:', error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to fetch featured projects" 
      });
    }
  });

  // Update a project
  app.put("/api/projects/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertProjectSchema.partial().parse(req.body);
      const project = await storage.updateProject(id, validatedData);
      
      if (!project) {
        return res.status(404).json({ 
          success: false, 
          error: "Project not found" 
        });
      }
      
      res.json({ success: true, project });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          error: "Invalid project data", 
          details: error.errors 
        });
      }
      console.error('Error updating project:', error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to update project" 
      });
    }
  });

  // Delete a project
  app.delete("/api/projects/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteProject(id);
      
      if (!deleted) {
        return res.status(404).json({ 
          success: false, 
          error: "Project not found" 
        });
      }
      
      res.json({ success: true, message: "Project deleted successfully" });
    } catch (error) {
      console.error('Error deleting project:', error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to delete project" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
