
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AuthButton from "@/components/AuthButton";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

const Index = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 right-4 z-50"
        onClick={toggleTheme}
      >
        {theme === 'dark' ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </Button>
      <div className="container mx-auto px-4 py-16 flex flex-col items-center">
        <div className="text-center max-w-3xl">
          <div className="h-16 w-16 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold text-2xl mx-auto mb-6">
            Xeno
          </div>
          <h1 className="text-4xl font-bold mb-6 text-foreground">Xeno Mini CRM</h1>
          <p className="text-xl text-foreground/60 mb-8">
            Create targeted campaigns, segment your customers, and drive engagement with our powerful CRM platform.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <AuthButton />
            <Link to="/campaigns/create">
              <Button variant="outline">
                Create Campaign
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          <div className="bg-card p-6 rounded-lg border border-border">
            <h2 className="text-xl font-semibold mb-3 text-foreground">Customer Segmentation</h2>
            <p className="text-foreground/60">
              Create targeted segments using our flexible rule builder to reach the right audience.
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-lg border border-border">
            <h2 className="text-xl font-semibold mb-3 text-foreground">Campaign Management</h2>
            <p className="text-foreground/60">
              Create, send and track campaigns with detailed analytics and performance metrics.
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-lg border border-border">
            <h2 className="text-xl font-semibold mb-3 text-foreground">AI-Powered Messages</h2>
            <p className="text-foreground/60">
              Generate personalized campaign messages with our AI assistant.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
