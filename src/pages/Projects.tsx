
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, Search, Filter, Calendar, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock project data
  const projects = [
    {
      id: 1,
      name: 'TrackFlow Web App',
      description: 'Main web application for project management platform with advanced features',
      members: ['john.doe', 'jane.smith', 'alex.wilson', 'sarah.johnson'],
      createdAt: '2024-01-15',
      status: 'active',
      tasksCount: 24,
      completedTasks: 18
    },
    {
      id: 2,
      name: 'Mobile App Design',
      description: 'UI/UX design for mobile companion app',
      members: ['jane.smith', 'sarah.johnson'],
      createdAt: '2024-02-01',
      status: 'active',
      tasksCount: 12,
      completedTasks: 8
    },
    {
      id: 3,
      name: 'API Documentation',
      description: 'Comprehensive API documentation and developer guides',
      members: ['alex.wilson', 'john.doe'],
      createdAt: '2024-01-28',
      status: 'completed',
      tasksCount: 15,
      completedTasks: 15
    },
    {
      id: 4,
      name: 'Marketing Website',
      description: 'Landing page and marketing materials for product launch',
      members: ['sarah.johnson'],
      createdAt: '2024-02-10',
      status: 'planning',
      tasksCount: 8,
      completedTasks: 2
    },
    {
      id: 5,
      name: 'Database Migration',
      description: 'Migrate legacy database to new infrastructure',
      members: ['john.doe', 'alex.wilson'],
      createdAt: '2024-02-15',
      status: 'active',
      tasksCount: 6,
      completedTasks: 3
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
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'completed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'planning': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getProgressPercentage = (completed: number, total: number) => {
    return Math.round((completed / total) * 100);
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Projects</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage and organize your team projects
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterStatus === 'all' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('all')}
              size="sm"
            >
              All
            </Button>
            <Button
              variant={filterStatus === 'active' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('active')}
              size="sm"
            >
              Active
            </Button>
            <Button
              variant={filterStatus === 'completed' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('completed')}
              size="sm"
            >
              Completed
            </Button>
            <Button
              variant={filterStatus === 'planning' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('planning')}
              size="sm"
            >
              Planning
            </Button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Link key={project.id} to={`/project/${project.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-gray-200 dark:border-gray-700 dark:bg-gray-800">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {project.name}
                      </CardTitle>
                      <Badge variant="secondary" className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </div>
                  </div>
                  <CardDescription className="text-gray-600 dark:text-gray-400 line-clamp-2">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                      <span>Progress</span>
                      <span>{getProgressPercentage(project.completedTasks, project.tasksCount)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2">
                      <div 
                        className="bg-blue-600 h-2" 
                        style={{ width: `${getProgressPercentage(project.completedTasks, project.tasksCount)}%` }}
                      />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
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
                  <div className="flex -space-x-2">
                    {project.members.slice(0, 4).map((member, index) => (
                      <img
                        key={index}
                        src={`https://api.dicebear.com/8.x/fun-emoji/svg?seed=${member}`}
                        alt={member}
                        className="w-8 h-8 border-2 border-white dark:border-gray-800 bg-gray-100"
                      />
                    ))}
                    {project.members.length > 4 && (
                      <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center">
                        <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                          +{project.members.length - 4}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}

          {/* New project card */}
          <Card className="border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors cursor-pointer">
            <CardContent className="flex flex-col items-center justify-center h-48 text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                <Plus className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">New Project</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Create a new project to get started
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No projects found</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Projects;
