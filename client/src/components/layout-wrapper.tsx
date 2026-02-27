import React, { useEffect } from 'react';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import { Moon, Sun, Globe, LogOut, User, LayoutDashboard, ChevronDown } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  const toggleLang = (lng: string) => i18n.changeLanguage(lng);

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary/20">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-105 transition-transform">
              C
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground">
              Course<span className="text-primary">Hub</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {t('nav.courses')}
            </Link>
            {isAuthenticated && (
              <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {t('nav.dashboard')}
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Globe className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => toggleLang('en')}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => toggleLang('fr')}>Français</DropdownMenuItem>
                <DropdownMenuItem onClick={() => toggleLang('ar')}>العربية</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {/* Auth */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="rounded-full gap-2 pl-2">
                    <img 
                      src={user?.profileImageUrl || `https://ui-avatars.com/api/?name=${user?.firstName || 'U'}&background=random`} 
                      alt="Avatar" 
                      className="w-7 h-7 rounded-full"
                    />
                    <span className="hidden sm:inline-block text-sm font-medium">{user?.firstName || 'User'}</span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <Link href="/dashboard">
                    <DropdownMenuItem className="cursor-pointer">
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      {t('nav.dashboard')}
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => logout()} className="text-destructive cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    {t('nav.logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild className="rounded-full font-semibold shadow-md hover:shadow-lg transition-all">
                <a href="/api/login">{t('nav.login')}</a>
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t py-12 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-6 h-6 rounded-md bg-gradient-brand flex items-center justify-center text-white font-bold text-xs">C</div>
            <span className="font-bold text-lg">CourseHub</span>
          </div>
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} CourseHub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
