"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGoal = createGoal;
const db_1 = require("src/db");
const schema_1 = require("src/db/schema");
async function createGoal({ title, description, desiredWeeklyFrequency, }) {
    const result = await db_1.db
        .insert(schema_1.goals)
        .values({ title, description, desiredWeeklyFrequency })
        .returning();
    const goal = result[0];
    return { goal };
}
