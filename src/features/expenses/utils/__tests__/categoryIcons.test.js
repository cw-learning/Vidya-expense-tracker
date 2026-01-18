import { describe, expect, it } from "vitest";
import { EXPENSE_CATEGORIES } from "../../models/expense.model.js";
import { getCategoryColor, getCategoryIcon } from "../categoryIcons.js";

describe("categoryIcons", () => {
	it("returns the correct icon for a known category", () => {
		expect(getCategoryIcon(EXPENSE_CATEGORIES.FOOD)).toBe("🍔");
	});

	it("falls back to OTHER for unknown categories", () => {
		expect(getCategoryIcon("UNKNOWN")).toBe("📌");
		expect(getCategoryColor("UNKNOWN")).toContain("bg-gray");
	});
});
