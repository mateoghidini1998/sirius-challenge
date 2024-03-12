const axios = require("axios");
const scrapeUrl = require("../../utils/scrapeUrl"); 

jest.mock("axios");

describe("scrapeUrl function", () => {
    it("should return the description from the HTML", async () => {
        axios.get.mockResolvedValue({
            data: "<div id='productDescription'><p>This is a test description</p></div>"
        });

        const url = "https://example.com";
        const result = await scrapeUrl(url);

        expect(result).toBe("This is a test description");
    });

    it("should handle errors and throw an error message", async () => {
        axios.get.mockRejectedValue(new Error("Mocked error"));

        const url = "https://example.com";

        await expect(scrapeUrl(url)).rejects.toThrow("Failed to fetch and scrape URL: Mocked error");
    });

    it("should throw an error if no URL is provided", async () => {
        const url = undefined;

        await expect(scrapeUrl(url)).rejects.toThrow("URL is required");
    });
});
