export const ActivityLevel = {
    SEDENTARY: 1.2,
    LIGHTLY_ACTIVE: 1.375,
    MODERATELY_ACTIVE: 1.55,
    VERY_ACTIVE: 1.725,
    EXTRA_ACTIVE: 1.9
};

export class NutritionalCalculator {
    static calculate_bmr(weight_kg, height_cm, age_years, is_male) {
        if (weight_kg <= 0 || height_cm <= 0 || age_years <= 0) {
            throw new Error("Weight, height, and age must be positive values.");
        }

        if (is_male) {
            return (10 * weight_kg) + (6.25 * height_cm) - (5 * age_years) + 5;
        } else {
            return (10 * weight_kg) + (6.25 * height_cm) - (5 * age_years) - 161;
        }
    }

    static calculate_tdee(bmr, activity_level_value) {
        return bmr * activity_level_value;
    }

    static calculate_macro_split(tdee, protein_percentage = 0.3, carbs_percentage = 0.4, fat_percentage = 0.3) {
        if (Math.abs(protein_percentage + carbs_percentage + fat_percentage - 1.0) > 1e-6) {
            throw new Error("Macronutrient percentages must sum to 1.0.");
        }

        return {
            protein: (tdee * protein_percentage) / 4.0,
            carbs: (tdee * carbs_percentage) / 4.0,
            fat: (tdee * fat_percentage) / 9.0,
        };
    }
}
