export class Utils {
  public static getLogoUrl(logo: string, themeState: string): string {
    return logo.includes("common")
      ? `/logo/${logo}`
      : `/logo/${themeState}/${logo}`;
  }

  public static formatDateTime(isoString: string) {
    const date = new Date(isoString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    const time = date
      .toLocaleString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        // second: "2-digit",
        hour12: true,
      })
      .replace(",", "");
    return `${day}-${month}-${year}, ${time.toLowerCase()}`;
  }
}
