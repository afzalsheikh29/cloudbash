import { Github, Linkedin, Mail, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-card-border py-12 px-4 sm:px-6 lg:px-8" data-testid="footer-main">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Afzal Khan</h3>
            <p className="text-muted-foreground leading-relaxed">
              DevOps Engineer passionate about automating cloud infrastructure, 
              building CI/CD pipelines, and implementing scalable solutions across 
              AWS, Azure, and GCP platforms.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Links</h3>
            <div className="space-y-3">
              <a 
                href="#skills" 
                className="block text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-footer-skills"
              >
                Technical Skills
              </a>
              <a 
                href="#experience" 
                className="block text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-footer-experience"
              >
                Experience
              </a>
              <a 
                href="#projects" 
                className="block text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-footer-projects"
              >
                Projects
              </a>
              <a 
                href="#contact" 
                className="block text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-footer-contact"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Get In Touch</h3>
            <div className="space-y-3 text-muted-foreground">
              <p>Noida, India 201309</p>
              <p>khan29afzal@gmail.com</p>
              <p>+91 91930 01060</p>
              
              <div className="flex space-x-4 pt-4">
                <a
                  href="https://www.linkedin.com/in/afzalkhan29"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-footer-linkedin"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
                <a
                  href="https://github.com/afzalsheikh29"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-footer-github"
                >
                  <Github className="h-6 w-6" />
                </a>
                <a
                  href="mailto:khan29afzal@gmail.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-footer-email"
                >
                  <Mail className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-card-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm text-center sm:text-left">
              © {currentYear} Afzal Khan. All rights reserved.
            </p>
            <p className="text-muted-foreground text-sm flex items-center gap-2">
              Made with <Heart className="h-4 w-4 text-red-500" /> using React & Supabase
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}