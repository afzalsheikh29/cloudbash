import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Cloud, Code, Database, GitBranch, Monitor, Server } from "lucide-react";

interface SkillCategory {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  skills: { name: string; level: number; }[];
}

export default function Skills() {
  const skillCategories: SkillCategory[] = [
    {
      title: "Cloud Platforms",
      icon: Cloud,
      skills: [
        { name: "Amazon Web Services (AWS)", level: 90 },
        { name: "Microsoft Azure", level: 85 },
        { name: "Google Cloud Platform (GCP)", level: 80 },
      ]
    },
    {
      title: "Infrastructure as Code",
      icon: Code,
      skills: [
        { name: "Terraform", level: 90 },
        { name: "CloudFormation", level: 75 },
        { name: "Ansible", level: 70 },
      ]
    },
    {
      title: "CI/CD & Version Control",
      icon: GitBranch,
      skills: [
        { name: "Jenkins", level: 85 },
        { name: "GitLab CI/CD", level: 80 },
        { name: "GitHub Actions", level: 75 },
      ]
    },
    {
      title: "Containerization",
      icon: Server,
      skills: [
        { name: "Docker", level: 90 },
        { name: "Kubernetes", level: 85 },
        { name: "Docker Compose", level: 80 },
      ]
    },
    {
      title: "Monitoring & Observability",
      icon: Monitor,
      skills: [
        { name: "Prometheus", level: 80 },
        { name: "Grafana", level: 85 },
        { name: "CloudWatch", level: 75 },
      ]
    },
    {
      title: "Databases & Storage",
      icon: Database,
      skills: [
        { name: "PostgreSQL", level: 75 },
        { name: "MySQL", level: 70 },
        { name: "S3 & Cloud Storage", level: 85 },
      ]
    },
  ];

  const additionalSkills = [
    "Linux Administration", "Shell Scripting", "Python Scripting", 
    "AWS Lambda", "EC2", "VPC", "Apache", "Nginx", "n8n Automation", 
    "Make.com", "Flowise", "AI Chatbots"
  ];

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8" data-testid="section-skills">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4" data-testid="text-skills-title">
            Technical Skills
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Expertise across multi-cloud platforms, automation tools, and modern DevOps practices
          </p>
        </div>

        {/* Main Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {skillCategories.map((category, index) => (
            <Card key={index} className="hover-elevate" data-testid={`card-skill-${index}`}>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <category.icon className="h-6 w-6 text-primary" />
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-card-foreground">
                          {skill.name}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                      <Progress 
                        value={skill.level} 
                        className="h-2" 
                        data-testid={`progress-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Skills */}
        <Card className="p-8">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl text-center">Additional Technologies & Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3 justify-center">
              {additionalSkills.map((skill, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="text-sm px-4 py-2 hover-elevate cursor-pointer"
                  data-testid={`badge-skill-${index}`}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}