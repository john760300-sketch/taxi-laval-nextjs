import { NextResponse } from "next/server";
import { calculateFare, calculateRaccompagnementFare } from "@/lib/fare";
import { routeBetween } from "@/lib/routing";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { origin, destination, datetime, service } = body || {};

    if (!origin || !destination) {
      return NextResponse.json(
        { error: "origin and destination are required" },
        { status: 400 }
      );
    }

    const route = await routeBetween(origin, destination);
    if (!route) {
      return NextResponse.json(
        {
          error:
            "Impossible de calculer l'itinéraire. Vérifiez les adresses (ex. ajoutez « Laval, QC »).",
        },
        { status: 400 }
      );
    }

    // Raccompagnement = 2× CTQ day meter (no night detection, no UberX/Lyft comparison)
    // Regular taxi = max(UberX peak, ceil(CTQ meter jour/nuit))
    const fare =
      service === "raccompagnement"
        ? calculateRaccompagnementFare(route.distanceKm, route.durationMin)
        : calculateFare(route.distanceKm, route.durationMin, datetime || null);

    return NextResponse.json({
      ...fare,
      origin,
      destination,
      datetime: datetime || new Date().toISOString(),
    });
  } catch (err) {
    console.error("Fare API error:", err);
    return NextResponse.json(
      { error: "Erreur serveur — réessayez." },
      { status: 500 }
    );
  }
}
