import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [faqs, setFaqs] = useState([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch FAQs from Backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/faqs')
      .then(res => setFaqs(res.data.data || res.data))
      .catch(err => console.error('Error fetching FAQs:', err));
  }, []);

  // Ask AI
  const handleAskAI = async (e) => {
    e.preventDefault();
    if (!question) return;

    setLoading(true);
    setAnswer('');
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/ai/ask', { question });
      setAnswer(res.data.answer);
    } catch (err) {
      console.error('Error asking AI:', err);
      setError(err.response?.data?.message || 'Failed to get response from AI server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '650px', margin: '40px auto', fontFamily: 'sans-serif', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>AI FAQ Assistant</h1>
      
      <form onSubmit={handleAskAI} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="text" 
          value={question} 
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question..."
          style={{ flex: 1, padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button 
          type="submit" 
          disabled={loading}
          style={{ padding: '10px 20px', fontSize: '16px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          {loading ? 'Thinking...' : 'Ask AI'}
        </button>
      </form>

      {error && (
        <div style={{ background: '#ffe6e6', color: '#d9534f', padding: '12px', borderRadius: '6px', marginBottom: '20px' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {answer && (
        <div style={{ background: '#eef6ff', padding: '15px', borderRadius: '6px', marginBottom: '20px', borderLeft: '4px solid #007bff' }}>
          <strong>AI Answer:</strong>
          <p style={{ margin: '8px 0 0 0', whiteSpace: 'pre-wrap' }}>{answer}</p>
        </div>
      )}

      <h2>Frequently Asked Questions</h2>
      <div>
        {faqs.length > 0 ? (
          faqs.map((faq, index) => (
            <div key={index} style={{ border: '1px solid #ddd', padding: '12px', borderRadius: '6px', marginBottom: '10px' }}>
              <h3 style={{ margin: '0 0 6px 0' }}>{faq.question}</h3>
              <p style={{ margin: 0, color: '#555' }}>{faq.answer}</p>
            </div>
          ))
        ) : (
          <p>No FAQs available.</p>
        )}
      </div>
    </div>
  );
}

export default App;