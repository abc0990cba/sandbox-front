import './App.css'
import { Button } from './components/ui/button';
// import { Navbar } from './components/ui/navbar';
import { AppSidebar } from './components/app-sidebar';
import { ChartAreaInteractive } from './components/chart-area-interactive';
import { DataTable } from './components/data-table';
import { SectionCards } from './components/section-cards';
import { SiteHeader } from './components/site-header';
import { SidebarProvider, SidebarInset } from './components/ui/sidebar';

import data from "./data.json"

export const getGoogleUrl = (from: string) => {
  const rootUrl = `https://accounts.google.com/o/oauth2/v2/auth`;

  const options = {
    redirect_uri: import.meta.env.VITE_GOOGLE_OAUTH_REDIRECT as string,
    client_id: import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID as string,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    ux_mode: "popup",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
    state: from,
  };

  const qs = new URLSearchParams(options);

  return `${rootUrl}?${qs.toString()}`;
};

function App() {
  const from = window.location.pathname;

  return (
    <>
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
    <Button asChild>
      <a href={getGoogleUrl(from)} target="_blank">Google login</a>
    </Button>
    </>
  )
}

export default App
