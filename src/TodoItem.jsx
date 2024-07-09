import React, { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";

function TodoItem({ todo, index, onToggleComplete, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(todo.id, editText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  return (
    <Draggable draggableId={todo.id} index={index}>
      {(provided, snapshot) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white shadow-sm rounded-md p-4 ${snapshot.isDragging ? "bg-gray-50" : ""}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggleComplete(todo.id)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              {isEditing ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="ml-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md p-1"
                />
              ) : (
                <span
                  className={`ml-3 ${todo.completed ? "line-through text-gray-500" : "text-gray-900"}`}
                >
                  {todo.text}
                </span>
              )}
            </div>
            <div>
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleEdit}
                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(todo.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </li>
      )}
    </Draggable>
  );
}

export default TodoItem;
