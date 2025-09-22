import { Button } from "@/components/ui/button";
import { ChevronDown, Download, Github, Linkedin, Mail } from "lucide-react";
import profileImage from "@assets/Afzu_1758540674905.jpg";
import heroBackground from "@assets/generated_images/DevOps_hero_background_cacd5737.png";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    console.log(`Scrolling to ${sectionId}`);
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/assets/Afzal_Khan_Resume_1758540674904.pdf';
    link.download = 'Afzal_Khan_Resume.pdf';
    link.click();
    console.log('Resume download initiated');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(30, 41, 59, 0.85), rgba(30, 41, 59, 0.85)), url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Profile Image */}
        <div className="mb-8">
          <img
            src={profileImage}
            alt="Afzal Khan"
            className="w-48 h-48 rounded-full mx-auto border-4 border-white shadow-2xl object-cover"
            data-testid="img-profile"
          />
        </div>

        {/* Name and Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4" data-testid="text-name">
          Afzal Khan
        </h1>
        
        <div className="text-xl sm:text-2xl lg:text-3xl text-blue-400 mb-6 font-medium" data-testid="text-role">
          DevOps Engineer
        </div>

        {/* Description */}
        <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed" data-testid="text-description">
          Specializing in multi-cloud automation, CI/CD pipelines, and Infrastructure as Code. 
          1+ years of experience optimizing cloud operations across AWS, Azure, and GCP.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            size="lg"
            onClick={() => scrollToSection('contact')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
            data-testid="button-contact"
          >
            <Mail className="mr-2 h-5 w-5" />
            Get In Touch
          </Button>
          
          <Button 
            size="lg"
            variant="outline"
            onClick={handleDownloadResume}
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 px-8 py-3 text-lg"
            data-testid="button-resume"
          >
            <Download className="mr-2 h-5 w-5" />
            Download Resume
          </Button>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-12">
          <a
            href="https://www.linkedin.com/in/afzalkhan29"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-blue-400 transition-colors"
            data-testid="link-linkedin"
          >
            <Linkedin className="h-8 w-8" />
          </a>
          <a
            href="https://github.com/afzalsheikh29"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-blue-400 transition-colors"
            data-testid="link-github"
          >
            <Github className="h-8 w-8" />
          </a>
          <a
            href="mailto:khan29afzal@gmail.com"
            className="text-white/80 hover:text-blue-400 transition-colors"
            data-testid="link-email"
          >
            <Mail className="h-8 w-8" />
          </a>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={() => scrollToSection('skills')}
          className="text-white/60 hover:text-white transition-colors animate-bounce"
          data-testid="button-scroll"
        >
          <ChevronDown className="h-8 w-8 mx-auto" />
        </button>
      </div>
    </section>
  );
}