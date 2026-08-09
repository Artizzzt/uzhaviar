/**
 * Scientific fertilizer calculator utility for farming plots.
 *
 * @param {Object} params
 * @param {string} params.cropType - Selected crop type
 * @param {number|string} params.areaOfLand - Acres of land
 * @returns {Object} Calculated fertilizer plan metrics
 */
export const calculateFertilizerPlan = ({ cropType, areaOfLand }) => {
  const area = parseFloat(areaOfLand) || 0;
  
  // Base calculations
  const totalQuantity = Math.round(area * 20 * 10) / 10;
  const estimatedCost = Math.round(totalQuantity * 52);
  const expectedYield = Math.round(area * 1.8 * 10) / 10;

  // Schedule divisions
  const firstDose = Math.round(totalQuantity * 0.6 * 10) / 10;
  const secondDose = Math.round(totalQuantity * 0.4 * 10) / 10;

  // Organic compost recommendation dynamic value
  const organicCompostQuantity = Math.round(area * 500);

  return {
    baseFertilizer: "NPK 20-20-0",
    totalQuantity,
    estimatedCost,
    expectedYield,
    schedule: {
      first: {
        quantity: firstDose,
        stage: "at sowing stage"
      },
      second: {
        quantity: secondDose,
        stage: "at tillering/growth stage"
      }
    },
    organicNote: `Combine with ${organicCompostQuantity} kg organic compost for best results`
  };
};
