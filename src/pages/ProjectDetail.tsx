
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Share, 
  ChevronDown,
  Circle,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

const ProjectDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('kanban');

  const project = {
    id: 1,
    name: 'TrackFlow Web App',
    description: 'Main web application for project management',
    members: ['john.doe', 'jane.smith', 'alex.wilson']
  };

  const tasks = {
    todo: [
      {
        id: 1,
        title: 'Design user authentication flow',
        label: 'Feature',
        priority: 'high',
        assignee: 'jane.smith'
      },
      {
        id: 2,
        title: 'Set up project structure',
        label: 'Setup',
        priority: 'medium',
        assignee: 'john.doe'
      },
      {
        id: 3,
        title: 'Create API documentation',
        label: 'Documentation',
        priority: 'low',
        assignee: 'alex.wilson'
      }
    ],
    inProgress: [
      {
        id: 4,
        title: 'Implement Kanban board functionality',
        label: 'Feature',
        priority: 'high',
        assignee: 'john.doe'
      },
      {
        id: 5,
        title: 'Fix responsive navigation issues',
        label: 'Bug',
        priority: 'medium',
        assignee: 'jane.smith'
      }
    ],
    done: [
      {
        id: 6,
        title: 'Initial project setup',
        label: 'Setup',
        priority: 'high',
        assignee: 'john.doe'
      },
      {
        id: 7,
        title: 'Design system components',
        label: 'Design',
        priority: 'medium',
        assignee: 'jane.smith'
      }
    ]
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Circle className="h-3 w-3 text-red-500 fill-current" />;
      case 'medium':
        return <Circle className="h-3 w-3 text-yellow-500 fill-current" />;
      case 'low':
        return <Circle className="h-3 w-3 text-green-500 fill-current" />;
      default:
        return <Circle className="h-3 w-3 text-gray-400 fill-current" />;
    }
  };

  const getLabelColor = (label: string) => {
    switch (label.toLowerCase()) {
      case 'feature': return 'bg-blue-100 text-blue-800';
      case 'bug': return 'bg-red-100 text-red-800';
      case 'setup': return 'bg-purple-100 text-purple-800';
      case 'documentation': return 'bg-green-100 text-green-800';
      case 'design': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const TaskCard = ({ task }: { task: any }) => (
    <Card className="mb-3 cursor-pointer hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900 leading-snug">
            {task.title}
          </h4>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className={getLabelColor(task.label)}>
                {task.label}
              </Badge>
              {getPriorityIcon(task.priority)}
            </div>
            
            <img
              src={`https://api.dicebear.com/8.x/fun-emoji/svg?seed=${task.assignee}`}
              alt={task.assignee}
              className="w-6 h-6 bg-gray-200"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const Column = ({ title, tasks, count }: { title: string; tasks: any[]; count: number }) => (
    <div className="flex-1 min-w-80">
      <div className="bg-gray-100 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded">
              {count}
            </span>
          </div>
        </div>
        
        <div className="space-y-3 min-h-96">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
          
          <Button 
            variant="ghost" 
            className="w-full border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 text-gray-600 hover:text-blue-600"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="space-y-6">
        {/* Project header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
              <Button variant="ghost" size="sm">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-gray-600">{project.description}</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex -space-x-2">
              {project.members.map((member, index) => (
                <img
                  key={index}
                  src={`https://api.dicebear.com/8.x/fun-emoji/svg?seed=${member}`}
                  alt={member}
                  className="w-8 h-8 border-2 border-white bg-gray-100"
                />
              ))}
            </div>
            <Button variant="outline" size="sm">
              <Share className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="kanban">Kanban</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>

          <TabsContent value="kanban" className="mt-6">
            <div className="flex space-x-6 overflow-x-auto pb-4">
              <Column title="To Do" tasks={tasks.todo} count={tasks.todo.length} />
              <Column title="In Progress" tasks={tasks.inProgress} count={tasks.inProgress.length} />
              <Column title="Done" tasks={tasks.done} count={tasks.done.length} />
            </div>
          </TabsContent>

          <TabsContent value="activity" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div className="flex items-center space-x-3">
                    <img
                      src="https://api.dicebear.com/8.x/fun-emoji/svg?seed=john.doe"
                      alt="John Doe"
                      className="w-8 h-8 bg-gray-200"
                    />
                    <div>
                      <span className="font-medium">John Doe</span> moved "Implement Kanban board functionality" to In Progress
                      <div className="text-gray-500">2 hours ago</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <img
                      src="https://api.dicebear.com/8.x/fun-emoji/svg?seed=jane.smith"
                      alt="Jane Smith"
                      className="w-8 h-8 bg-gray-200"
                    />
                    <div>
                      <span className="font-medium">Jane Smith</span> completed "Design system components"
                      <div className="text-gray-500">5 hours ago</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <img
                      src="https://api.dicebear.com/8.x/fun-emoji/svg?seed=alex.wilson"
                      alt="Alex Wilson"
                      className="w-8 h-8 bg-gray-200"
                    />
                    <div>
                      <span className="font-medium">Alex Wilson</span> created "Create API documentation"
                      <div className="text-gray-500">1 day ago</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {project.members.map((member, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <img
                        src={`https://api.dicebear.com/8.x/fun-emoji/svg?seed=${member}`}
                        alt={member}
                        className="w-10 h-10 bg-gray-200"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">
                            {member.replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </span>
                          <Badge variant="secondary">Member</Badge>
                        </div>
                        <div className="text-sm text-gray-500">{member}@trackflow.dev</div>
                      </div>
                      <Badge variant="outline" className="text-green-600 border-green-200">
                        Active
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ProjectDetail;
