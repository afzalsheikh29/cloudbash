import Navigation from '../Navigation';

export default function NavigationExample() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20 p-8">
        <p className="text-foreground">Navigation component with theme toggle and smooth scrolling</p>
      </div>
    </div>
  );
}