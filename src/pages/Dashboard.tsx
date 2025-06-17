
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Users, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const projects = [
    {
      id: 1,
      name: 'TrackFlow Web App',
      description: 'Main web application for project management',
      members: ['john.doe', 'jane.smith', 'alex.wilson'],
      createdAt: '2024-01-15',
      status: 'active'
    },
    {
      id: 2,
      name: 'Mobile App Design',
      description: 'UI/UX design for mobile companion app',
      members: ['jane.smith', 'sarah.johnson'],
      createdAt: '2024-02-01',
      status: 'active'
    },
    {
      id: 3,
      name: 'API Documentation',
      description: 'Comprehensive API documentation and guides',
      members: ['alex.wilson', 'john.doe'],
      createdAt: '2024-01-28',
      status: 'completed'
    },
    {
      id: 4,
      name: 'Marketing Website',
      description: 'Landing page and marketing materials',
      members: ['sarah.johnson'],
      createdAt: '2024-02-10',
      status: 'planning'
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Welcome header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome, John 👋
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your projects today.
          </p>
        </div>

        {/* Projects grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Your Projects</h2>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Project cards */}
            {projects.map((project) => (
              <Link key={project.id} to={`/project/${project.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer border-gray-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg font-semibold text-gray-900">
                          {project.name}
                        </CardTitle>
                        <Badge 
                          variant="secondary" 
                          className={getStatusColor(project.status)}
                        >
                          {project.status}
                        </Badge>
                      </div>
                    </div>
                    <CardDescription className="text-gray-600 line-clamp-2">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{project.members.length} members</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(project.createdAt)}</span>
                      </div>
                    </div>
                    
                    {/* Team member avatars */}
                    <div className="flex -space-x-2 mt-3">
                      {project.members.slice(0, 3).map((member, index) => (
                        <img
                          key={index}
                          src={`https://api.dicebear.com/8.x/fun-emoji/svg?seed=${member}`}
                          alt={member}
                          className="w-8 h-8 border-2 border-white bg-gray-100"
                        />
                      ))}
                      {project.members.length > 3 && (
                        <div className="w-8 h-8 bg-gray-200 border-2 border-white flex items-center justify-center">
                          <span className="text-xs text-gray-600 font-medium">
                            +{project.members.length - 3}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}

            {/* New project card */}
            <Card className="border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center h-48 text-center">
                <div className="w-12 h-12 bg-blue-100 flex items-center justify-center mb-4">
                  <Plus className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">New Project</h3>
                <p className="text-sm text-gray-500">
                  Create a new project to get started
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
