import { tv } from "tailwind-variants";
import { title, subtitle } from "./primitives"; // Update the import path

describe("title TV function", () => {
  it("should apply size variant correctly", () => {
    const smResult = title({ size: "sm" });
    expect(smResult).toContain("text-3xl lg:text-4xl");

    const mdResult = title({ size: "md" });
    expect(mdResult).toContain("text-[2.3rem] lg:text-5xl leading-9");

    const lgResult = title({ size: "lg" });
    expect(lgResult).toContain("text-4xl lg:text-6xl");
  });

  it("should apply color variants with gradient classes", () => {
    const violetResult = title({ color: "violet" });
    expect(violetResult).toContain("from-[#FF1CF7] to-[#b249f8]");
    expect(violetResult).toContain("bg-clip-text text-transparent bg-gradient-to-b");

    const foregroundResult = title({ color: "foreground" });
    expect(foregroundResult).toContain("dark:from-[#FFFFFF] dark:to-[#4B4B4B]");
  });

  it("should apply fullWidth variant", () => {
    const result = title({ fullWidth: true });
    expect(result).toContain("w-full block");
  });

  it("should combine multiple variants correctly", () => {
    const result = title({ size: "lg", color: "blue", fullWidth: true });
    expect(result).toContain("text-4xl lg:text-6xl");
    expect(result).toContain("from-[#5EA2EF] to-[#0072F5]");
    expect(result).toContain("w-full block");
    expect(result).toContain("bg-clip-text text-transparent bg-gradient-to-b");
  });
});

describe("subtitle TV function", () => {
  it("should return base classes without variants", () => {
    const result = subtitle();
    expect(result).toBe("w-full md:w-1/2 my-2 text-lg lg:text-xl text-default-600 block max-w-full !w-full");
  });

  it("should apply fullWidth variant correctly", () => {
    const fullWidthResult = subtitle({ fullWidth: true });
    expect(fullWidthResult).toContain("!w-full");

    const notFullWidthResult = subtitle({ fullWidth: false });
    expect(notFullWidthResult).not.toContain("!w-full");
    expect(notFullWidthResult).toContain("w-full md:w-1/2");
  });
});