import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ExternalLink, Github, Plus, Save } from "lucide-react";
import { useState, useEffect } from "react";

interface Project {
  id?: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string | null;
  liveUrl?: string | null;
  imageUrl?: string | null;
  featured: string;
  createdAt?: Date | null;
}

export default function Projects() {
  const [showAddProject, setShowAddProject] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    techStack: "",
    githubUrl: "",
    liveUrl: "",
    featured: "false"
  });

  // Load projects on component mount
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const result = await response.json();
      if (result.success) {
        setProjects(result.projects);
      }
    } catch (error) {
      console.error('Failed to load projects:', error);
      // TODO: Remove mock data fallback in production
      setProjects([
        {
          id: "1",
          title: "Multi-Cloud Infrastructure Automation",
          description: "Automated infrastructure deployment across AWS, Azure, and GCP using Terraform. Implemented CI/CD pipelines with Jenkins and GitLab for seamless multi-cloud operations.",
          techStack: ["Terraform", "AWS", "Azure", "GCP", "Jenkins", "GitLab", "Docker"],
          featured: "true",
          githubUrl: null,
          liveUrl: null,
          imageUrl: null,
          createdAt: new Date()
        },
        {
          id: "2",
          title: "AI-Powered Lead Qualification System",
          description: "Built an intelligent chatbot using Flowise for 24/7 lead qualification with automated workflows using n8n for lead processing and email follow-ups.",
          techStack: ["Flowise", "n8n", "AI/LLM", "Make.com", "Node.js", "Python"],
          featured: "true",
          githubUrl: null,
          liveUrl: null,
          imageUrl: null,
          createdAt: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProject = () => {
    setShowAddProject(!showAddProject);
    console.log('Add project form toggled:', !showAddProject);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const projectData = {
        ...newProject,
        techStack: newProject.techStack.split(',').map(tech => tech.trim()).filter(tech => tech.length > 0)
      };

      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Project Added!",
          description: "Your project has been successfully added to the portfolio.",
        });
        
        setNewProject({
          title: "",
          description: "",
          techStack: "",
          githubUrl: "",
          liveUrl: "",
          featured: "false"
        });
        
        setShowAddProject(false);
        await loadProjects(); // Reload projects
      } else {
        throw new Error(result.error || 'Failed to add project');
      }
    } catch (error) {
      console.error('Add project error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewProject = (project: Project) => {
    console.log('Viewing project:', project.title);
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8" data-testid="section-projects">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4" data-testid="text-projects-title">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Showcase of DevOps automation, cloud infrastructure, and AI-powered solutions
          </p>
          
          <Button 
            onClick={handleAddProject}
            variant="outline"
            className="mb-8"
            data-testid="button-add-project"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add LinkedIn Project
          </Button>
        </div>

        {showAddProject && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Add Project from LinkedIn</CardTitle>
              <CardDescription>
                Since we can't directly access LinkedIn, please manually add your project details here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitProject} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Project Title *</label>
                    <Input
                      name="title"
                      value={newProject.title}
                      onChange={handleInputChange}
                      placeholder="Project Title"
                      required
                      data-testid="input-project-title"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Live URL</label>
                    <Input
                      name="liveUrl"
                      value={newProject.liveUrl}
                      onChange={handleInputChange}
                      placeholder="https://example.com"
                      data-testid="input-project-url"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">GitHub URL</label>
                    <Input
                      name="githubUrl"
                      value={newProject.githubUrl}
                      onChange={handleInputChange}
                      placeholder="https://github.com/username/repo"
                      data-testid="input-project-github"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Featured Project</label>
                    <select
                      name="featured"
                      value={newProject.featured}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md"
                      data-testid="select-project-featured"
                    >
                      <option value="false">No</option>
                      <option value="true">Yes</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Description *</label>
                  <Textarea
                    name="description"
                    value={newProject.description}
                    onChange={handleInputChange}
                    placeholder="Describe your project..."
                    className="min-h-24"
                    required
                    data-testid="input-project-description"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Tech Stack *</label>
                  <Input
                    name="techStack"
                    value={newProject.techStack}
                    onChange={handleInputChange}
                    placeholder="React, Node.js, Docker, AWS (comma separated)"
                    required
                    data-testid="input-project-tech"
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    data-testid="button-save-project"
                  >
                    {isSubmitting ? (
                      "Saving..."
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Project
                      </>
                    )}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowAddProject(false)}
                    data-testid="button-cancel-project"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading projects...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card 
                key={project.id || index} 
                className={`hover-elevate cursor-pointer ${project.featured === 'true' ? 'border-primary' : ''}`}
                onClick={() => handleViewProject(project)}
                data-testid={`card-project-${index}`}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-bold text-foreground flex-1">
                      {project.title}
                    </CardTitle>
                    {project.featured === 'true' && (
                      <Badge variant="default" className="ml-2">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-muted-foreground">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, techIndex) => (
                      <Badge 
                        key={techIndex} 
                        variant="secondary" 
                        className="text-xs"
                        data-testid={`badge-project-tech-${index}-${techIndex}`}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-4">
                    {project.githubUrl && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.githubUrl!, '_blank');
                        }}
                        data-testid={`button-github-${index}`}
                      >
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </Button>
                    )}
                    {project.liveUrl && (
                      <Button 
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.liveUrl!, '_blank');
                        }}
                        data-testid={`button-live-${index}`}
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}