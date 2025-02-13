//mock endpoint
export default function handler(req, res) {
    const events = [
      { id: 1, name: 'Event 1' },
    ];
  
    res.status(200).json(events);
  }