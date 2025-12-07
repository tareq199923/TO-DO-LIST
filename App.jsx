import { useState } from 'react';
import { Trash2, Plus, Check, Circle, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const activeTodos = todos.filter(t => !t.completed).length;
  const completedTodos = todos.filter(t => t.completed).length;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        maxWidth: '700px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px',
          color: 'white'
        }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: '800',
            marginBottom: '8px',
            textShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}>
            ✨ My Tasks
          </h1>
          <p style={{
            fontSize: '18px',
            opacity: '0.9'
          }}>
            {activeTodos} active • {completedTodos} completed
          </p>
        </div>

        {/* Main Card */}
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '32px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
        }}>
          {/* Input Section */}
          <div style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '32px'
          }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="What needs to be done?"
              style={{
                flex: '1',
                padding: '16px 20px',
                fontSize: '16px',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                outline: 'none',
                transition: 'all 0.2s',
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
            <button
              onClick={addTodo}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                padding: '16px 32px',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'transform 0.2s',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              <Plus size={20} />
              Add
            </button>
          </div>

          {/* Todo List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {todos.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: '#9ca3af'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>📝</div>
                <p style={{ fontSize: '18px', fontWeight: '500', marginBottom: '8px' }}>
                  No tasks yet!
                </p>
                <p style={{ fontSize: '14px' }}>
                  Add your first task to get started
                </p>
              </div>
            ) : (
              todos.map(todo => (
                <div
                  key={todo.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '20px',
                    background: todo.completed ? '#f9fafb' : '#ffffff',
                    border: '2px solid',
                    borderColor: todo.completed ? '#e5e7eb' : '#f3f4f6',
                    borderRadius: '16px',
                    transition: 'all 0.3s',
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = '#667eea';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = todo.completed ? '#e5e7eb' : '#f3f4f6';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '0',
                      display: 'flex',
                      alignItems: 'center',
                      color: todo.completed ? '#667eea' : '#d1d5db',
                      transition: 'all 0.2s'
                    }}
                  >
                    {todo.completed ? (
                      <CheckCircle2 size={28} strokeWidth={2.5} />
                    ) : (
                      <Circle size={28} strokeWidth={2} />
                    )}
                  </button>
                  
                  <span
                    style={{
                      flex: '1',
                      fontSize: '16px',
                      color: todo.completed ? '#9ca3af' : '#1f2937',
                      textDecoration: todo.completed ? 'line-through' : 'none',
                      transition: 'all 0.3s',
                      fontWeight: '500'
                    }}
                  >
                    {todo.text}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTodo(todo.id);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ef4444',
                      cursor: 'pointer',
                      padding: '8px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      transition: 'all 0.2s',
                      opacity: '0.6'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.opacity = '1';
                      e.currentTarget.style.background = '#fee2e2';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.opacity = '0.6';
                      e.currentTarget.style.background = 'none';
                    }}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Stats Footer */}
          {todos.length > 0 && (
            <div style={{
              marginTop: '32px',
              paddingTop: '24px',
              borderTop: '2px solid #f3f4f6',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: '#6b7280',
              fontSize: '14px'
            }}>
              <div style={{ display: 'flex', gap: '20px' }}>
                <span style={{ fontWeight: '600' }}>
                  ✅ {completedTodos} Completed
                </span>
                <span style={{ fontWeight: '600' }}>
                  📋 {todos.length} Total
                </span>
              </div>
              {completedTodos > 0 && (
                <button
                  onClick={() => setTodos(todos.filter(t => !t.completed))}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#ef4444',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = '#fee2e2'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'none'}
                >
                  Clear Completed
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
