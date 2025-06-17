
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { UserPlus, Mail, Settings } from 'lucide-react';

const Team = () => {
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('member');

  const teamMembers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@trackflow.dev',
      role: 'Admin',
      status: 'Active',
      username: 'john.doe',
      joinedAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@trackflow.dev',
      role: 'Member',
      status: 'Active',
      username: 'jane.smith',
      joinedAt: '2024-01-18'
    },
    {
      id: 3,
      name: 'Alex Wilson',
      email: 'alex.wilson@trackflow.dev',
      role: 'Member',
      status: 'Active',
      username: 'alex.wilson',
      joinedAt: '2024-01-20'
    },
    {
      id: 4,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@trackflow.dev',
      role: 'Member',
      status: 'Invited',
      username: 'sarah.johnson',
      joinedAt: '2024-02-01'
    }
  ];

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Inviting:', inviteEmail, 'as', inviteRole);
    setInviteOpen(false);
    setInviteEmail('');
    setInviteRole('member');
  };

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'member': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'invited': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Team Members</h1>
            <p className="text-gray-600">
              Manage your team members and their permissions
            </p>
          </div>
          
          <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <UserPlus className="mr-2 h-4 w-4" />
                Invite Member
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Invite Team Member</DialogTitle>
                <DialogDescription>
                  Send an invitation to join your team workspace
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleInvite} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={inviteRole} onValueChange={setInviteRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="member">Member</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setInviteOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    <Mail className="mr-2 h-4 w-4" />
                    Send Invitation
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Team members table */}
        <Card>
          <CardHeader>
            <CardTitle>Team Overview</CardTitle>
            <CardDescription>
              {teamMembers.filter(m => m.status === 'Active').length} active members, {teamMembers.filter(m => m.status === 'Invited').length} pending invitations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Table header */}
              <div className="grid grid-cols-12 gap-4 pb-3 border-b border-gray-200 text-sm font-medium text-gray-500">
                <div className="col-span-4">Member</div>
                <div className="col-span-3">Email</div>
                <div className="col-span-2">Role</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-1">Actions</div>
              </div>

              {/* Table rows */}
              {teamMembers.map((member) => (
                <div key={member.id} className="grid grid-cols-12 gap-4 py-3 border-b border-gray-100 last:border-b-0">
                  <div className="col-span-4 flex items-center space-x-3">
                    <img
                      src={`https://api.dicebear.com/8.x/fun-emoji/svg?seed=${member.username}`}
                      alt={member.name}
                      className="w-10 h-10 bg-gray-200"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{member.name}</div>
                      <div className="text-sm text-gray-500">@{member.username}</div>
                    </div>
                  </div>
                  
                  <div className="col-span-3 flex items-center">
                    <span className="text-gray-900">{member.email}</span>
                  </div>
                  
                  <div className="col-span-2 flex items-center">
                    <Badge variant="secondary" className={getRoleColor(member.role)}>
                      {member.role}
                    </Badge>
                  </div>
                  
                  <div className="col-span-2 flex items-center">
                    <Badge variant="secondary" className={getStatusColor(member.status)}>
                      {member.status}
                    </Badge>
                  </div>
                  
                  <div className="col-span-1 flex items-center">
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Team stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 flex items-center justify-center">
                  <UserPlus className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {teamMembers.filter(m => m.status === 'Active').length}
                  </div>
                  <div className="text-sm text-gray-600">Active Members</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-yellow-100 flex items-center justify-center">
                  <Mail className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {teamMembers.filter(m => m.status === 'Invited').length}
                  </div>
                  <div className="text-sm text-gray-600">Pending Invites</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-100 flex items-center justify-center">
                  <Settings className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {teamMembers.filter(m => m.role === 'Admin').length}
                  </div>
                  <div className="text-sm text-gray-600">Administrators</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Team;
