
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ApiDemo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const { toast } = useToast();

  const sampleRequest = `curl -X POST https://api.saaskit.com/v1/users \\
  -H "Authorization: Bearer sk_test_1234..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "plan": "pro"
  }'`;

  const sampleResponse = {
    "id": "usr_1234567890",
    "name": "John Doe",
    "email": "john@example.com",
    "plan": "pro",
    "created_at": "2024-01-15T10:30:00Z",
    "status": "active"
  };

  const handleRunDemo = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResponse(sampleResponse);
      setIsLoading(false);
      toast({
        title: "API Request Successful",
        description: "Demo user created successfully!",
      });
    }, 1500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code has been copied to your clipboard.",
    });
  };

  return (
    <section id="api" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            API Documentation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Try our API right here. See how easy it is to integrate with our platform.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Request */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                API Request
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(sampleRequest)}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="curl" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="curl">cURL</TabsTrigger>
                  <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                  <TabsTrigger value="python">Python</TabsTrigger>
                </TabsList>
                
                <TabsContent value="curl">
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                    <code>{sampleRequest}</code>
                  </pre>
                </TabsContent>
                
                <TabsContent value="javascript">
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                    <code>{`const response = await fetch('https://api.saaskit.com/v1/users', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sk_test_1234...',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    plan: 'pro'
  })
});`}</code>
                  </pre>
                </TabsContent>
                
                <TabsContent value="python">
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                    <code>{`import requests

response = requests.post(
    'https://api.saaskit.com/v1/users',
    headers={
        'Authorization': 'Bearer sk_test_1234...',
        'Content-Type': 'application/json',
    },
    json={
        'name': 'John Doe',
        'email': 'john@example.com',
        'plan': 'pro'
    }
)`}</code>
                  </pre>
                </TabsContent>
              </Tabs>
              
              <Button 
                onClick={handleRunDemo} 
                disabled={isLoading}
                className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Play className="w-4 h-4 mr-2" />
                {isLoading ? "Running..." : "Try it Now"}
              </Button>
            </CardContent>
          </Card>

          {/* Response */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                API Response
                {response && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(JSON.stringify(response, null, 2))}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {response ? (
                <pre className="bg-gray-900 text-blue-400 p-4 rounded-lg text-sm overflow-x-auto animate-fade-in">
                  <code>{JSON.stringify(response, null, 2)}</code>
                </pre>
              ) : (
                <div className="bg-gray-100 p-8 rounded-lg text-center">
                  <p className="text-gray-500">Run the API request to see the response</p>
                </div>
              )}
              
              {response && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 text-sm font-medium">✅ Status: 201 Created</p>
                  <p className="text-green-600 text-sm">User created successfully</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ApiDemo;
