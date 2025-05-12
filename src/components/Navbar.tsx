
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import AuthButton from './AuthButton';

export default function Navbar() {
  return (
    <nav className="border-b border-border bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <Link to="/" className="flex items-center">
                <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold mr-2">X</div>
                <span className="text-xl font-semibold text-foreground">Xeno CRM</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/dashboard"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-foreground/60 hover:border-border hover:text-foreground"
              >
                Dashboard
              </Link>
              <Link
                to="/campaigns"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-foreground/60 hover:border-border hover:text-foreground"
              >
                Campaigns
              </Link>
              <Link
                to="/campaigns/history"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-foreground/60 hover:border-border hover:text-foreground"
              >
                History
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <AuthButton />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
