"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const schema_1 = require("./schema");
const dayjs_1 = __importDefault(require("dayjs"));
async function seed() {
    await _1.db.delete(schema_1.goalsCompletions);
    await _1.db.delete(schema_1.goals);
    const result = await _1.db
        .insert(schema_1.goals)
        .values([
        { title: "Aprender inglês", desiredWeeklyFrequency: 5, description: "1. Utilizar Gemini, 2. Abrir conta no Duolingo" },
        { title: "Exercícios físicos", desiredWeeklyFrequency: 3 },
        { title: "Meditar", desiredWeeklyFrequency: 2 },
    ])
        .returning();
    const startOfWeek = (0, dayjs_1.default)().startOf("week");
    await _1.db.insert(schema_1.goalsCompletions).values([
        { goalId: result[0].id, createdAt: startOfWeek.toDate() },
        { goalId: result[1].id, createdAt: startOfWeek.add(1, "day").toDate() },
    ]);
}
seed().finally(() => {
    _1.client.end();
});
