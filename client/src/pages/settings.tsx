import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Facebook } from "lucide-react";

export default function Settings() {
  const [accessToken, setAccessToken] = useState("");
  const [pageId, setPageId] = useState("");
  const { toast } = useToast();

  const handleSave = async () => {
    // TODO: Implement Facebook integration
    toast({
      title: "Settings saved",
      description: "Your Facebook integration settings have been updated.",
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Facebook Integration</CardTitle>
          <CardDescription>
            Connect your Facebook page to enable automatic posting
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="accessToken">Access Token</Label>
            <Input
              id="accessToken"
              type="password"
              value={accessToken}
              onChange={(e) => setAccessToken(e.target.value)}
              placeholder="Enter your Facebook access token"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pageId">Page ID</Label>
            <Input
              id="pageId"
              value={pageId}
              onChange={(e) => setPageId(e.target.value)}
              placeholder="Enter your Facebook page ID"
            />
          </div>

          <Button onClick={handleSave}>
            <Facebook className="h-4 w-4 mr-2" />
            Save Facebook Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
