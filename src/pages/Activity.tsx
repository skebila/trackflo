
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity as ActivityIcon, 
  Clock, 
  User, 
  MessageSquare, 
  GitCommit,
  Plus,
  ArrowRight,
  CheckCircle2,
  Circle,
  AlertCircle
} from 'lucide-react';

const Activity = () => {
  const [activeTab, setActiveTab] = useState('all');

  // Mock activity data
  const activities = [
    {
      id: 1,
      type: 'task_completed',
      user: 'john.doe',
      action: 'completed',
      target: 'Implement Kanban board functionality',
      project: 'TrackFlow Web App',
      timestamp: '2 hours ago',
      details: 'Task moved from In Progress to Done'
    },
    {
      id: 2,
      type: 'task_created',
      user: 'jane.smith',
      action: 'created',
      target: 'Design user authentication flow',
      project: 'TrackFlow Web App',
      timestamp: '4 hours ago',
      details: 'New task added to To Do column'
    },
    {
      id: 3,
      type: 'project_updated',
      user: 'alex.wilson',
      action: 'updated',
      target: 'Mobile App Design',
      project: 'Mobile App Design',
      timestamp: '6 hours ago',
      details: 'Project description and timeline updated'
    },
    {
      id: 4,
      type: 'member_added',
      user: 'sarah.johnson',
      action: 'added',
      target: 'alex.wilson',
      project: 'API Documentation',
      timestamp: '8 hours ago',
      details: 'New team member invited to project'
    },
    {
      id: 5,
      type: 'comment',
      user: 'john.doe',
      action: 'commented on',
      target: 'Fix responsive navigation issues',
      project: 'TrackFlow Web App',
      timestamp: '1 day ago',
      details: 'Added feedback about mobile breakpoints'
    },
    {
      id: 6,
      type: 'task_moved',
      user: 'jane.smith',
      action: 'moved',
      target: 'Create API documentation',
      project: 'API Documentation',
      timestamp: '1 day ago',
      details: 'Task moved from To Do to In Progress'
    },
    {
      id: 7,
      type: 'project_created',
      user: 'sarah.johnson',
      action: 'created',
      target: 'Marketing Website',
      project: 'Marketing Website',
      timestamp: '2 days ago',
      details: 'New project initialized with basic structure'
    },
    {
      id: 8,
      type: 'task_assigned',
      user: 'alex.wilson',
      action: 'assigned',
      target: 'Database Migration',
      project: 'Database Migration',
      timestamp: '3 days ago',
      details: 'Task assigned to john.doe'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'task_completed': return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'task_created': return <Plus className="h-4 w-4 text-blue-600" />;
      case 'task_moved': return <ArrowRight className="h-4 w-4 text-yellow-600" />;
      case 'task_assigned': return <User className="h-4 w-4 text-purple-600" />;
      case 'project_created': return <Circle className="h-4 w-4 text-blue-600" />;
      case 'project_updated': return <AlertCircle className="h-4 w-4 text-orange-600" />;
      case 'member_added': return <User className="h-4 w-4 text-green-600" />;
      case 'comment': return <MessageSquare className="h-4 w-4 text-gray-600" />;
      default: return <ActivityIcon className="h-4 w-4 text-gray-600" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'task_completed': return 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800';
      case 'task_created': return 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800';
      case 'task_moved': return 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800';
      case 'project_created': return 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800';
      case 'project_updated': return 'bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800';
      case 'member_added': return 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800';
      case 'comment': return 'bg-gray-50 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700';
      default: return 'bg-gray-50 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700';
    }
  };

  const formatUserName = (username: string) => {
    return username.split('.').map(part => 
      part.charAt(0).toUpperCase() + part.slice(1)
    ).join(' ');
  };

  const filteredActivities = activities.filter(activity => {
    if (activeTab === 'all') return true;
    if (activeTab === 'tasks') return activity.type.includes('task');
    if (activeTab === 'projects') return activity.type.includes('project');
    if (activeTab === 'team') return activity.type.includes('member') || activity.type === 'comment';
    return true;
  });

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Activity</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track recent changes and updates across all projects
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">12</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Tasks Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Plus className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">8</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">New Tasks</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">24</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Comments</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">5</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Team Updates</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Feed */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ActivityIcon className="h-5 w-5" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full max-w-md grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-6">
                <div className="space-y-4">
                  {filteredActivities.map((activity) => (
                    <div 
                      key={activity.id} 
                      className={`p-4 border-l-4 ${getActivityColor(activity.type)}`}
                    >
                      <div className="flex items-start space-x-3">
                        <img
                          src={`https://api.dicebear.com/8.x/fun-emoji/svg?seed=${activity.user}`}
                          alt={activity.user}
                          className="w-8 h-8 bg-gray-200 mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            {getActivityIcon(activity.type)}
                            <span className="font-medium text-gray-900 dark:text-gray-100">
                              {formatUserName(activity.user)}
                            </span>
                            <span className="text-gray-600 dark:text-gray-400">
                              {activity.action}
                            </span>
                            <span className="font-medium text-gray-900 dark:text-gray-100">
                              {activity.target}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                            <Badge variant="outline" className="text-xs">
                              {activity.project}
                            </Badge>
                            <Clock className="h-3 w-3" />
                            <span>{activity.timestamp}</span>
                          </div>
                          {activity.details && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                              {activity.details}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredActivities.length === 0 && (
                  <div className="text-center py-8">
                    <ActivityIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                      No activity found
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      No recent activity in this category.
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Activity;
