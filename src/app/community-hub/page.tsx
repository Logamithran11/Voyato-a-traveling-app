
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users, MessageSquare, Heart, Share2, Search, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const communityPosts = [
  {
    id: 1,
    author: { name: "Ravi Sharma", avatar: "https://picsum.photos/seed/ravi/40/40" },
    time: "2 hours ago",
    content: "Just finished a 3-day trip to Hampi. The sunrise from Matanga Hill was breathtaking! Absolutely recommend staying in a local guesthouse near the river.",
    image: "https://picsum.photos/seed/hampi-sunrise/600/400",
    likes: 28,
    comments: 5,
  },
  {
    id: 2,
    author: { name: "Priya Patel", avatar: "https://picsum.photos/seed/priya/40/40" },
    time: "8 hours ago",
    content: "Planning a solo trip to Ladakh in July. Any tips for acclimatization and must-visit monasteries? Also looking for a reliable taxi service from Leh.",
    likes: 15,
    comments: 12,
  },
  {
    id: 3,
    author: { name: "Ankit Desai", avatar: "https://picsum.photos/seed/ankit/40/40" },
    time: "1 day ago",
    content: "Organizing a group bike trip from Manali to Spiti Valley in August. We have 2 slots left. Looking for experienced riders. DM if interested!",
    likes: 42,
    comments: 9,
  }
];

export default function CommunityHubPage() {
  const [newPost, setNewPost] = useState("");

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Button variant="outline" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="text-center">
            <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                <Users className="h-8 w-8" />
            </div>
            <CardTitle className="font-headline text-3xl pt-4">Tourist Community Hub</CardTitle>
            <CardDescription className="text-lg text-muted-foreground pt-2">
            “Travel Together.”
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex w-full max-w-lg mx-auto items-center space-x-2">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search posts, topics, or people..."
                        className="pl-10"
                    />
                </div>
                <Button>Search</Button>
            </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
            {/* Create Post */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><PlusCircle/> Create a Post</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full gap-2">
                        <Textarea placeholder="Share your travel story or ask a question..." value={newPost} onChange={(e) => setNewPost(e.target.value)} />
                        <Button disabled={!newPost}>Post</Button>
                    </div>
                </CardContent>
            </Card>

            {/* Posts Feed */}
            {communityPosts.map(post => (
                <Card key={post.id} className="overflow-hidden">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{post.author.name}</p>
                                <p className="text-xs text-muted-foreground">{post.time}</p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">{post.content}</p>
                        {post.image && (
                            <div className="relative aspect-video rounded-md overflow-hidden">
                                <Image src={post.image} alt="Post image" fill className="object-cover"/>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                        <div className="flex gap-4 text-muted-foreground">
                            <Button variant="ghost" size="sm" className="flex items-center gap-2">
                                <Heart className="h-4 w-4" /> {post.likes}
                            </Button>
                             <Button variant="ghost" size="sm" className="flex items-center gap-2">
                                <MessageSquare className="h-4 w-4" /> {post.comments}
                            </Button>
                        </div>
                        <Button variant="ghost" size="sm" className="flex items-center gap-2">
                            <Share2 className="h-4 w-4" /> Share
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
        <div className="space-y-6">
            <Card>
                <CardHeader><CardTitle>Trending Topics</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                    {["#SoloTravel", "#Goa", "#StreetFood", "#Himalayas", "#SpitiValley"].map(tag => (
                        <Link href="#" key={tag} className="block text-sm text-primary hover:underline">{tag}</Link>
                    ))}
                </CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Find Travel Buddies</CardTitle></CardHeader>
                 <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src="https://picsum.photos/seed/buddy1/40/40" alt="Travel Buddy"/>
                            <AvatarFallback>S</AvatarFallback>
                        </Avatar>
                        <div>
                             <p className="font-semibold text-sm">Sonia Gupta</p>
                             <p className="text-xs text-muted-foreground">Exploring Kerala</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src="https://picsum.photos/seed/buddy2/40/40" alt="Travel Buddy"/>
                            <AvatarFallback>R</AvatarFallback>
                        </Avatar>
                        <div>
                             <p className="font-semibold text-sm">Rahul Singh</p>
                             <p className="text-xs text-muted-foreground">Trekking in Nepal</p>
                        </div>
                    </div>
                    <Button variant="outline" className="w-full">View more</Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
