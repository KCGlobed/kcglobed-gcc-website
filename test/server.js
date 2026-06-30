const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// Mock Database of Questions
const questions = [
  {
    id: 1,
    code: "KCGFARCCE0001",
    text: "Runner Co.'s checkbook balance on December 31, was $20,000. On that date, Runner held the following items in its safe:\n\n- Check payable to Runner worth $8,000, postdated January 3, and not included in the December 31 checkbook balance, in collection of a sale made in December.\n- Check payable to Runner worth $2,000, deposited December 15 and included in the December 31 checkbook balance, but returned by the bank on December 30 stamped \"NSF.\" The check was redeposited on January 2, and cleared on January 9.\n\nIn its December 31, balance sheet what amount should Runner report as cash ?",
    options: ["$28,000", "$18,000", "$26,000", "$20,000"]
  },
  {
    id: 2,
    code: "KCGFARCCE0002",
    text: "Under US GAAP, which of the following is classified as an operating activity on the statement of cash flows?",
    options: [
      "Payment of cash dividends to shareholders",
      "Collection of principal on a note receivable from a borrower",
      "Receipt of interest income on a debt investment",
      "Issuance of common stock for cash"
    ]
  },
  {
    id: 3,
    code: "KCGFARCCE0003",
    text: "A company purchased equipment for $100,000 on January 1, Year 1. The equipment has an estimated useful life of 5 years and a salvage value of $10,000. Under the double-declining-balance method, what is the depreciation expense for Year 2?",
    options: ["$24,000", "$40,000", "$18,000", "$20,000"]
  },
  {
    id: 4,
    code: "KCGFARCCE0004",
    text: "On July 1, Year 1, a company issued $500,000 of 8% bonds at face value. The bonds pay interest semi-annually on June 30 and December 31. What is the amount of interest expense recognized for the year ended December 31, Year 1?",
    options: ["$40,000", "$20,000", "$10,000", "$30,000"]
  },
  {
    id: 5,
    code: "KCGFARCCE0005",
    text: "Which of the following characteristics is a primary fundamental qualitative characteristic of useful financial information under the FASB conceptual framework?",
    options: ["Relevance", "Consistency", "Comparability", "Understandability"]
  }
];

// Session state (in-memory for simplicity)
let submissions = {};

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // Logger
  console.log(`[${method}] ${pathname}`);

  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // 1. API - Get Question by ID (/api/question/1, /api/question/2)
  if (method === 'GET' && pathname.startsWith('/api/question/')) {
    const idParam = pathname.split('/').pop();
    const id = parseInt(idParam, 10);
    const question = questions.find(q => q.id === id);

    if (question) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      // We return the question, and whether it has been submitted already
      const responseData = {
        ...question,
        submitted: !!submissions[id],
        selectedAnswer: submissions[id] || null
      };
      res.end(JSON.stringify(responseData));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: `Question with ID ${idParam} not found.` }));
    }
    return;
  }

  // 2. API - Submit Answer
  if (method === 'POST' && pathname === '/api/submit') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const { questionId, selectedOption } = data;

        if (!questionId || !selectedOption) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Missing questionId or selectedOption' }));
          return;
        }

        // Check if question exists
        const questionExists = questions.some(q => q.id === parseInt(questionId, 10));
        if (!questionExists) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Question not found' }));
          return;
        }

        // Store submission
        submissions[questionId] = selectedOption;

        console.log(`Submitted: Question ${questionId} -> ${selectedOption}`);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          message: `Answer for question ${questionId} submitted successfully.`,
          submissions
        }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
      }
    });
    return;
  }

  // 3. API - Reset Test
  if (method === 'POST' && pathname === '/api/reset') {
    submissions = {};
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, message: 'Test submissions reset.' }));
    return;
  }

  // 4. API - Get Status / Results
  if (method === 'GET' && pathname === '/api/status') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      totalQuestions: questions.length,
      submittedCount: Object.keys(submissions).length,
      submissions
    }));
    return;
  }

  // 5. Static File Server
  let filePath = path.join(__dirname, pathname === '/' ? 'home.html' : pathname);

  // Safety check to prevent directory traversal
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm'
  };

  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>', 'utf-8');
      } else {
        res.writeHead(500);
        res.end(`Sorry, check with the site admin for error: ${error.code} ..\n`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
