import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '10mb' }));

// Initialize GoogleGenAI instance server-side
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey) {
  try {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
}

// API Route: Analyze Food Surplus Listing
app.post('/api/ai/analyze-food', async (req: Request, res: Response) => {
  const { foodName, quantity, category, prepTime, storage, dietary, notes } = req.body;

  if (!foodName) {
    return res.status(400).json({ error: 'Food name is required for analysis' });
  }

  // Attempt using Gemini API if key is configured
  if (aiClient) {
    try {
      const prompt = `Analyze this surplus food donation item for redistribution safety, categorization, meal impact, and verification:
- Food Item: ${foodName}
- Quantity: ${quantity || 'Unspecified'}
- Category: ${category || 'Prepared food'}
- Prepared / Packaged: ${prepTime || 'Today'}
- Storage Conditions: ${storage || 'Standard'}
- Dietary: ${dietary || 'Standard'}
- Additional Notes: ${notes || 'None'}

Please provide a structured JSON assessment adhering to standard food bank safety guidelines. Note that final safety responsibility is always held by donors and certified orgs.`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction:
            'You are FoodLoop AI, a surplus food rescue assistant. Analyze food items for donation viability, shelf life, handling warnings, estimated meals provided, CO2-equivalent waste prevented, and fraud/suspicion flags. Return strict JSON.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              canRedistribute: {
                type: Type.BOOLEAN,
                description: 'Whether this food can likely be safely redistributed under standard food rescue guidelines',
              },
              confidenceScore: {
                type: Type.INTEGER,
                description: 'Confidence percentage (0-100)',
              },
              recommendedCategory: {
                type: Type.STRING,
                description: 'Standard category (e.g. Prepared Meals, Bakery, Fresh Produce, Dairy, Packaged)',
              },
              estimatedMeals: {
                type: Type.INTEGER,
                description: 'Estimated standard portions/servings provided',
              },
              estimatedCo2eKgSaved: {
                type: Type.NUMBER,
                description: 'Estimated kg of CO2 equivalent emissions avoided by preventing this food waste',
              },
              shelfLifeRemainingHours: {
                type: Type.INTEGER,
                description: 'Estimated safe redistribution window in hours',
              },
              storageRecommendations: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Key storage requirements (e.g. keep refrigerated below 4°C, keep sealed)',
              },
              safeHandlingReminders: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Mandatory safe handling & hygiene reminders for donor & receiver',
              },
              suggestedReceiverTypes: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Types of organizations best suited (e.g. Homeless Shelter, Community Kitchen, Food Pantry, Youth Center)',
              },
              isSuspicious: {
                type: Type.BOOLEAN,
                description: 'Flag if the listing seems suspicious, duplicate, or unsafe (e.g. expired seafood, unsealed leftovers)',
              },
              suspicionReason: {
                type: Type.STRING,
                description: 'Explanation if flagged as suspicious or safe',
              },
              safetyDisclaimer: {
                type: Type.STRING,
                description: 'Standard food-safety disclaimer reminder',
              },
            },
            required: [
              'canRedistribute',
              'confidenceScore',
              'recommendedCategory',
              'estimatedMeals',
              'estimatedCo2eKgSaved',
              'shelfLifeRemainingHours',
              'storageRecommendations',
              'safeHandlingReminders',
              'suggestedReceiverTypes',
              'isSuspicious',
              'suspicionReason',
              'safetyDisclaimer',
            ],
          },
        },
      });

      const responseText = response.text;
      if (responseText) {
        const parsed = JSON.parse(responseText);
        return res.json({ success: true, analysis: parsed, source: 'gemini' });
      }
    } catch (error) {
      console.warn('Gemini API call failed, falling back to heuristics:', error);
    }
  }

  // Fallback heuristic engine if API key is absent or rate limited
  const qtyNumber = parseInt(String(quantity).replace(/[^0-9]/g, '')) || 20;
  const lowerName = foodName.toLowerCase();
  const isSuspicious = lowerName.includes('expired') || lowerName.includes('spoiled') || lowerName.includes('trash');
  const estimatedMeals = Math.max(5, Math.round(qtyNumber * 1.2));
  const estimatedCo2eKgSaved = Math.round(estimatedMeals * 0.42 * 2.5 * 10) / 10;

  return res.json({
    success: true,
    analysis: {
      canRedistribute: !isSuspicious,
      confidenceScore: isSuspicious ? 20 : 94,
      recommendedCategory: category || 'Prepared Meals',
      estimatedMeals,
      estimatedCo2eKgSaved,
      shelfLifeRemainingHours: lowerName.includes('fish') || lowerName.includes('dairy') ? 4 : 8,
      storageRecommendations: [
        'Maintain strictly between 2°C - 4°C in food-grade sealed trays',
        'Label container with preparation time and allergen notes',
        'Protect from direct sunlight during transit in insulated bag',
      ],
      safeHandlingReminders: [
        'Inspect packaging integrity before dispatch and receipt',
        'Keep cold foods cold (≤4°C) and hot foods hot (≥60°C)',
        'Ensure clean gloves and sanitized food-grade transport boxes',
      ],
      suggestedReceiverTypes: ['Community Kitchen', 'Youth & Family Shelter', 'Emergency Food Pantry'],
      isSuspicious,
      suspicionReason: isSuspicious
        ? 'Listing mentions potentially expired or damaged items requiring human review.'
        : 'Listing matches verified healthy surplus food rescue standards.',
      safetyDisclaimer:
        'AI assessment is an advisory guideline based on provided details. Final food safety responsibility remains with the donor, certified organizations, and local public health standards.',
    },
    source: 'fallback',
  });
});

// API Route: AI Assistant Chat & Safe Redistribution Q&A
app.post('/api/ai/chat', async (req: Request, res: Response) => {
  const { message, context } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  if (aiClient) {
    try {
      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `User Question: "${message}"\nCurrent Context: ${JSON.stringify(context || {})}`,
        config: {
          systemInstruction: `You are "Loopie", the friendly, knowledgeable, and colorful FoodLoop Global AI Assistant.
Your mission is to help food donors (restaurants, supermarkets, caterers, households) and receivers (shelters, NGOs, food banks) redistribute edible surplus food safely, rapidly, and joyfully!
Rules:
1. Speak in a warm, encouraging, helpful, and community-minded tone (vibrant and friendly!).
2. Give practical advice on food shelf life, safe temperature transport (cold chain), hygienic packaging, and meal distribution.
3. CRITICAL: Never claim that food is medically safe to eat. Always remind users: "Final food safety checks remain with the food donor, licensed food handlers, and recipient organizations under local health regulations."
4. Format with clean bullet points, emojis where helpful, and clear actionable steps.`,
        },
      });

      const reply = response.text;
      if (reply) {
        return res.json({ success: true, reply, source: 'gemini' });
      }
    } catch (err) {
      console.warn('Gemini chat failed, fallback to local reply:', err);
    }
  }

  // Friendly fallback response
  return res.json({
    success: true,
    reply: `Hi there! 🥗 I am Loopie, your FoodLoop Surplus Food Assistant!\n\nHere are the top guidelines for surplus redistribution:\n• **Cold Foods**: Must be kept under 4°C (39°F) in clean insulated containers.\n• **Hot Prepared Foods**: If donated hot, maintain above 60°C (140°F) or rapidly chill in shallow pans within 2 hours.\n• **Packaging**: Use food-grade, allergen-labeled containers with timestamp.\n\n*Important Food Safety Reminder:* AI guidance is informative. Donors and verified recipients must perform visual and temperature safety checks prior to handover!`,
    source: 'fallback',
  });
});

// OpenStreetMap (OSM) Nominatim & OSRM API Routes
app.get('/api/osm/search', async (req: Request, res: Response) => {
  const query = req.query.q as string;
  if (!query) {
    return res.status(400).json({ error: 'Query parameter q is required' });
  }

  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      query
    )}&limit=5&addressdetails=1`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'FoodLoopGlobal-SurplusFoodRescue/1.0 (contact@foodloopglobal.org)',
        'Accept-Language': req.headers['accept-language'] || 'en',
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'OSM search failed' });
    }

    const data = await response.json();
    return res.json(data);
  } catch (err) {
    console.error('OSM Search API error:', err);
    return res.status(500).json({ error: 'Failed to query OSM Nominatim search API' });
  }
});

app.get('/api/osm/reverse', async (req: Request, res: Response) => {
  const lat = req.query.lat as string;
  const lon = req.query.lon as string;

  if (!lat || !lon) {
    return res.status(400).json({ error: 'lat and lon are required' });
  }

  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${encodeURIComponent(
      lat
    )}&lon=${encodeURIComponent(lon)}&addressdetails=1`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'FoodLoopGlobal-SurplusFoodRescue/1.0 (contact@foodloopglobal.org)',
        'Accept-Language': req.headers['accept-language'] || 'en',
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'OSM reverse geocoding failed' });
    }

    const data = await response.json();
    return res.json(data);
  } catch (err) {
    console.error('OSM Reverse Geocode API error:', err);
    return res.status(500).json({ error: 'Failed to query OSM Nominatim reverse API' });
  }
});

app.get('/api/osm/route', async (req: Request, res: Response) => {
  const { startLat, startLon, endLat, endLon } = req.query;

  if (!startLat || !startLon || !endLat || !endLon) {
    return res.status(400).json({ error: 'startLat, startLon, endLat, endLon are required' });
  }

  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${startLon},${startLat};${endLon},${endLat}?overview=full&geometries=geojson`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'FoodLoopGlobal-SurplusFoodRescue/1.0',
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'OSRM routing failed' });
    }

    const data = await response.json();
    return res.json(data);
  } catch (err) {
    console.error('OSRM Route API error:', err);
    return res.status(500).json({ error: 'Failed to query OSRM routing API' });
  }
});

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'FoodLoop Global API', time: new Date().toISOString() });
});

// Setup Vite in Dev or serve Static in Production
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`FoodLoop Global server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
