import express from "express";

const router = express.Router();

/**
 * POST /api/ai/health-insight
 * Body:
 * {
 *   logs: [
 *     {
 *       date,
 *       mentalHealth: { stress },
 *       physicalHealth: { sleep },
 *       socialWellBeing: { loneliness }
 *     }
 *   ]
 * }
 */
router.post("/health-insight", async (req, res) => {
  try {
    const { logs } = req.body;

    if (!logs || !Array.isArray(logs) || logs.length === 0) {
      return res.status(400).json({
        success: false,
        error: "Health logs are required"
      });
    }

    let totalStress = 0;
    let totalSleep = 0;
    let totalLoneliness = 0;

    logs.forEach((log) => {
      totalStress += Number(log?.mentalHealth?.stress || 0);
      totalSleep += Number(log?.physicalHealth?.sleep || 0);
      totalLoneliness += Number(log?.socialWellBeing?.loneliness || 0);
    });

    const avgStress = totalStress / logs.length;
    const avgSleep = totalSleep / logs.length;
    const avgLoneliness = totalLoneliness / logs.length;

    const insights = [];

    if (avgStress >= 7) {
      insights.push("Your stress levels are higher than normal.");
    }

    if (avgSleep <= 5) {
      insights.push("Your sleep duration is lower than recommended.");
    }

    if (avgLoneliness >= 6) {
      insights.push("You may be experiencing social isolation.");
    }

    if (insights.length === 0) {
      insights.push("Your health indicators look stable. Keep it up!");
    }

    let riskLevel = "Low";
    if (avgStress >= 7 || avgSleep <= 5 || avgLoneliness >= 6) {
      riskLevel = "Medium";
    }
    if (avgStress >= 8 && avgSleep <= 4) {
      riskLevel = "High";
    }
console.log("✅ AI RESPONSE SENT");

    return res.status(200).json({
      success: true,
      data: {
        riskLevel,
        insights,
        recommendation:
          riskLevel === "High"
            ? "Consider rest, reducing workload, and professional support."
            : "Maintain healthy routines and self-care habits."
      }
      
    });
  } catch (error) {
    console.error("AI Route Error:", error);
    return res.status(500).json({
      success: false,
      error: "AI insight generation failed"
    });
  }
});

/**
 * POST /api/ai/test
 * Simple sanity route
 */
router.post("/test", (req, res) => {
  res.json({
    success: true,
    message: "AI routes are working"
    

  });
});

export default router;
