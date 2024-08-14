import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Cat } from 'lucide-react';

const fetchCatFact = async () => {
  const response = await fetch('https://catfact.ninja/fact');
  if (!response.ok) {
    throw new Error('Failed to fetch cat fact');
  }
  return response.json();
};

const CatFactCard = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['catFact'],
    queryFn: fetchCatFact,
  });

  if (isLoading) return <Skeleton className="h-[100px] w-full" />;
  if (error) return <p>Error loading cat fact</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cat className="h-6 w-6" />
          Cat Fact
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{data.fact}</p>
      </CardContent>
    </Card>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">All About Cats</h1>
        
        <div className="grid gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Why Cats Make Great Pets</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>Independent nature</li>
                <li>Low maintenance</li>
                <li>Affectionate companions</li>
                <li>Great for small living spaces</li>
                <li>Natural pest control</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Popular Cat Breeds</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Badge variant="secondary">Siamese</Badge>
              <Badge variant="secondary">Persian</Badge>
              <Badge variant="secondary">Maine Coon</Badge>
              <Badge variant="secondary">Bengal</Badge>
              <Badge variant="secondary">Sphynx</Badge>
              <Badge variant="secondary">British Shorthair</Badge>
            </CardContent>
          </Card>

          <div className="grid sm:grid-cols-2 gap-6">
            <Card className="overflow-hidden">
              <img src="https://placekitten.com/500/300" alt="Cute kitten" className="w-full h-48 object-cover" />
              <CardContent className="p-4">
                <p className="text-sm text-gray-600">A curious kitten exploring its surroundings</p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <img src="https://placekitten.com/501/300" alt="Sleepy cat" className="w-full h-48 object-cover" />
              <CardContent className="p-4">
                <p className="text-sm text-gray-600">A contented cat taking a peaceful nap</p>
              </CardContent>
            </Card>
          </div>

          <CatFactCard />
        </div>
      </div>
    </div>
  );
};

export default Index;