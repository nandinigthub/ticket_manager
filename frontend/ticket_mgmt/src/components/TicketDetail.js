import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar.js';
import axiosInstance from '../axios.js';

const TicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [editableTicket, setEditableTicket] = useState(null);

  
  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axiosInstance.get(`api/tickets/${id}/`);
        setTicket(response.data);
        setEditableTicket(response.data);
      } catch (error) {
        console.error('Failed to fetch ticket details:', error);
      }
    };

    fetchTicket();
  }, [id]);

  // Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableTicket({ ...editableTicket, [name]: value });
  };

  // Handle ticket update
  const handleUpdate = async () => {
    try {
      await axiosInstance.patch(`api/tickets/${id}/`, editableTicket);
      alert('Ticket updated successfully');
    } catch (error) {
      console.error('Failed to update ticket:', error);
      alert('Failed to update ticket');
    }
  };

  // Handle ticket deletion
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      try {
        await axiosInstance.delete(`api/tickets/${id}/`);
        alert('Ticket deleted successfully');
        navigate('/admin_dashboard'); 
      } catch (error) {
        console.error('Failed to delete ticket:', error);
        alert('Failed to delete ticket');
      }
    }
  };

  if (!ticket) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <p>Loading ticket details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 my-6">Ticket Details</h2>
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="space-y-4">
            <p>
              <strong>ID:</strong> {ticket.id}
            </p>
            <p>
              <strong>Created By:</strong> {ticket.user || 'N/A'}
            </p>
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={editableTicket.title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={editableTicket.description}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>            
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                name="status"
                value={editableTicket.status}
                onChange={handleChange} 
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Priority</label>
              <select
                name="priority"
                value={editableTicket.priority}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Update Ticket
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Delete Ticket
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
