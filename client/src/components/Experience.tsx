import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Building } from "lucide-react";

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  skills: string[];
}

export default function Experience() {
  const experiences: ExperienceItem[] = [
    {
      title: "DevOps Engineer",
      company: "ATH Infosystems Pvt. Ltd.",
      location: "Noida, IN",
      period: "Sep 2024 – Present",
      description: "Leading AI automation initiatives and multi-cloud infrastructure management",
      achievements: [
        "Built Flowise LLM chatbot for 24/7 lead qualification with instant quotes",
        "Orchestrated n8n workflows for lead extraction, geo-validation, and email follow-ups",
        "Deployed AWS SAM serverless backend with Lambda, DynamoDB, and S3",
        "Containerized apps with Docker/Kubernetes across AWS, Azure, GCP",
        "Built Jenkins and GitLab CI/CD pipelines, cutting deploy time 50%",
        "Implemented Prometheus, Grafana, CloudWatch dashboards",
        "Automated alerts and incident workflows, reducing downtime 30%",
        "Managed multi-cloud environments with 99.9% uptime",
        "Optimized resources to cut cloud costs 25%"
      ],
      skills: ["AI Automation", "AWS SAM", "n8n", "Docker", "Kubernetes", "Jenkins", "GitLab CI/CD", "Prometheus", "Grafana"]
    },
    {
      title: "Cloud DevOps Intern",
      company: "ATH Infosystems Pvt. Ltd.",
      location: "Noida, IN",
      period: "May 2024 – Aug 2024",
      description: "Gained hands-on experience with cloud platforms and DevOps toolchain",
      achievements: [
        "Mastered Linux CLI, user/groups management, and shell scripting",
        "Deployed LAMP stacks with Apache, MySQL, PHP configurations",
        "Installed and integrated DevOps tools with MySQL/PostgreSQL backends",
        "Configured Apache/Nginx reverse proxies, virtual hosts, and SSL",
        "Managed networking: VPCs, subnets, security groups across clouds",
        "Created AWS, Azure, GCP marketplace offers and provisioned instances",
        "Learned multi-cloud setup workflows, IAM roles, and compliance policies"
      ],
      skills: ["Linux", "LAMP Stack", "Apache", "Nginx", "MySQL", "PostgreSQL", "AWS", "Azure", "GCP", "IAM"]
    }
  ];

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30" data-testid="section-experience">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4" data-testid="text-experience-title">
            Professional Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Building scalable cloud infrastructure and automating DevOps workflows
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <Card key={index} className="hover-elevate" data-testid={`card-experience-${index}`}>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-2xl font-bold text-foreground mb-2">
                      {exp.title}
                    </CardTitle>
                    <CardDescription className="text-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Building className="h-4 w-4" />
                        <span className="font-semibold text-foreground">{exp.company}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <p className="text-card-foreground text-lg leading-relaxed">
                  {exp.description}
                </p>

                <div>
                  <h4 className="font-semibold text-foreground mb-3">Key Achievements:</h4>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, achIndex) => (
                      <li key={achIndex} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-card-foreground">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-3">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, skillIndex) => (
                      <Badge 
                        key={skillIndex} 
                        variant="secondary" 
                        className="text-sm"
                        data-testid={`badge-exp-skill-${index}-${skillIndex}`}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}