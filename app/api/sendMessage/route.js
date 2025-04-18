export async function POST(req) {
    try {
      const { phoneNumber } = await req.json();
  
      const response = await fetch('https://api.telerivet.com/v1/projects/PJcd2907dd2ebf9c50/messages/send', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa('iYT6x_tAfpquhBPLIcZQFzJEoMzij8r2maVP'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: 'hello world from savin test',
          to_number: phoneNumber,
        }),
      });
  
      const data = await response.json();
      return new Response(JSON.stringify({ success: true, data }), { status: 200 });
    } catch (error) {
      console.error('API error:', error);
      return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
  }
  