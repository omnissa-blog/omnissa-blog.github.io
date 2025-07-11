import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, BookOpen } from 'lucide-react';

const trendingTopics = [
  { name: "Artificial Intelligence", posts: 1247 },
  { name: "Web Development", posts: 892 },
  { name: "Climate Change", posts: 634 },
  { name: "Remote Work", posts: 578 },
  { name: "Cryptocurrency", posts: 456 },
  { name: "Mental Health", posts: 423 },
  { name: "Startup Life", posts: 389 },
  { name: "Data Science", posts: 367 }
];

const whoToFollow = [
  {
    name: "Sarah Chen",
    role: "AI Researcher",
    followers: "12.4K",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100"
  },
  {
    name: "Michael Torres",
    role: "Sustainability Expert",
    followers: "8.7K",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100"
  },
  {
    name: "Emily Rodriguez",
    role: "Business Strategist",
    followers: "15.2K",
    avatar: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=100"
  }
];

const readingList = [
  {
    title: "10 JavaScript Tips for Better Code",
    author: "Alex Thompson",
    readTime: "5 min"
  },
  {
    title: "The Future of Work is Here",
    author: "Lisa Wang",
    readTime: "8 min"
  },
  {
    title: "Building Better Teams",
    author: "David Kumar",
    readTime: "6 min"
  }
];

export function TrendingTopics() {
  return (
    <div className="space-y-8">
      {/* Trending Topics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Trending Topics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {trendingTopics.map((topic, index) => (
              <div key={topic.name} className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-bold text-gray-400 w-4">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium group-hover:text-primary transition-colors">
                      {topic.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {topic.posts.toLocaleString()} posts
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Who to Follow */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Who to Follow</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {whoToFollow.map((person) => (
              <div key={person.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <div>
                    <p className="font-medium text-sm">{person.name}</p>
                    <p className="text-xs text-gray-500">{person.role}</p>
                    <p className="text-xs text-gray-400">{person.followers} followers</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs cursor-pointer hover:bg-primary hover:text-white transition-colors">
                  Follow
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reading List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5" />
            <span>Reading List</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {readingList.map((item) => (
              <div key={item.title} className="group cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <p className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2">
                  {item.title}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <p className="text-xs text-gray-500">{item.author}</p>
                  <span className="text-xs text-gray-400">•</span>
                  <p className="text-xs text-gray-500">{item.readTime}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}