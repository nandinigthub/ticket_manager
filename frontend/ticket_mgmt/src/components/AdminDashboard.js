import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar.js';
import axiosInstance from '../axios.js';

const AdminDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [filters, setFilters] = useState({ status: '', priority: '', user: '' });
  const [newTicket, setNewTicket] = useState({ title: '', description: '', priority: 'low' });

  // Fetch tickets based on filters
  const fetchTickets = async () => {
    try {
      const response = await axiosInstance.get('api/tickets/', { params: filters });
      setTickets(response.data);
    } catch (error) {
      console.error('Failed to fetch tickets:', error);
    }
  };

  // Handle creating a new ticket
  const handleCreateTicket = async () => {
    try {
      await axiosInstance.post('api/tickets/', newTicket);
      setNewTicket({ title: '', description: '', priority: 'low' });
      fetchTickets();
    } catch (err) {
      console.error('Failed to create ticket:', err);
    }
  };

  const handleApplyFilters = () => {
    fetchTickets(); 
  };

  // Fetch all tickets initially
  useEffect(() => {
    fetchTickets();
  }, []); 


  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userRole, setUserRole] = useState('admin');


  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar  isAuthenticated={isAuthenticated} userRole={userRole} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 my-6">Admin Dashboard</h2>

        {/* Create Ticket Form */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Create Ticket</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={newTicket.title}
              onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
            <textarea
              placeholder="Description"
              value={newTicket.description}
              onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
            <select
              value={newTicket.priority}
              onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <button
              onClick={handleCreateTicket}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Create Ticket
            </button>
          </div>
        </div>

        {/* Filters Section */}
        <div className="mb-6 flex flex-wrap gap-4">
          <div className="flex-1">
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">Status</option>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          <div className="flex-1">
            <select
              value={filters.priority}
              onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="flex-1">
            <input
              type="text"
              value={filters.user}
              onChange={(e) => setFilters({ ...filters, user: e.target.value })}
              placeholder="Filter by User"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div className="flex-1 w-full sm:w-auto">
            <button
              onClick={handleApplyFilters}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Apply Filter
            </button>
          </div>
        </div>

        {/* Ticket List */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">All Tickets</h3>
          {tickets.length === 0 ? (
            <p className="text-gray-600">No tickets available.</p>
          ) : (
            <ul className="space-y-4">
              {tickets.map((ticket) => (
                <li
                  key={ticket.id}
                  className="flex justify-between items-center border-b pb-2 last:border-b-0"
                >
                  <div>
                    <Link to={`/tickets/${ticket.id}`} className="text-blue-600 hover:underline">
                      <h4 className="font-bold text-gray-800">{ticket.title}</h4>
                    </Link>
                    <p className="text-gray-600">{ticket.description}</p>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-sm ${ticket.priority === 'high'
                          ? 'bg-red-100 text-red-800'
                          : ticket.priority === 'medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                    >
                      {ticket.priority}
                    </span>
                  </div>
                  <span className="text-gray-500">{ticket.status}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
