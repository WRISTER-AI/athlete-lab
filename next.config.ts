import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Wix still generates some booking links on the main website's domain.
    // Keep their paths and query parameters when sending visitors to Wix.
    return [
      "/book-now",
      "/booking-calendar/:path*",
      "/service-page/:path*",
      "/booking-form/:path*",
      "/pricing-plans/:path*",
    ].map((path) => ({
      source: path,
      destination: `https://bookings.theathletelab.net${path}`,
      permanent: false,
    }));
  },
};

export default nextConfig;
