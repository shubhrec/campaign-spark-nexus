import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { 
  Card, 
  CardContent
} from "@/components/ui/card";
import { generateAIMessages } from '@/lib/api';
import { toast } from '@/components/ui/use-toast';

type MessageGeneratorProps = {
  onSelect: (message: string) => void;
};

export default function MessageGenerator({ onSelect }: MessageGeneratorProps) {
  const [intent, setIntent] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerateClick = async () => {
    if (!intent) {
      toast({
        title: "Missing intent",
        description: "Please enter your campaign intent",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const generatedMessages = await generateAIMessages(intent);
      setMessages(generatedMessages);
    } catch (error) {
      console.error('Error generating messages:', error);
      toast({
        title: "Error",
        description: "Failed to generate messages",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Textarea
          placeholder="Enter your campaign intent (e.g., 'Promote our new summer sale to high-value customers')"
          value={intent}
          onChange={(e) => setIntent(e.target.value)}
          className="min-h-[80px] bg-secondary border-border focus:border-primary"
        />
        
        <Button
          variant="outline"
          onClick={handleGenerateClick}
          disabled={loading}
          className="w-full relative overflow-hidden transition-all duration-200 bg-secondary hover:bg-secondary/80 border-border"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              <span>AI is crafting messages...</span>
            </>
          ) : (
            'Generate Message Ideas'
          )}
        </Button>
      </div>
      
      {messages.length > 0 && (
        <div className="space-y-3">
          {messages.map((message, index) => (
            <Card 
              key={index} 
              className="border border-border bg-secondary animate-fadeIn"
              style={{
                animationDelay: `${index * 150}ms`
              }}
            >
              <CardContent className="p-4 relative">
                <p className="text-sm text-foreground/90">{message}</p>
                <Button 
                  variant="link" 
                  onClick={() => onSelect(message)}
                  className="text-primary mt-2 p-0 hover:text-primary/90"
                >
                  Use this message
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}