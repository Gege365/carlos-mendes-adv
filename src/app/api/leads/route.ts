import { NextResponse } from "next/server";
import type { LeadPayload } from "@/lib/roberta";

/**
 * Endpoint preparado para integração futura com Google Sheets.
 * Por enquanto apenas valida e confirma o recebimento do lead.
 */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadPayload;

    if (!body?.answers || typeof body.answers !== "object") {
      return NextResponse.json({ ok: false, error: "Payload inválido" }, { status: 400 });
    }

    // TODO: conectar Google Sheets (Apps Script / API) aqui.
    console.info("[lead]", {
      createdAt: body.createdAt,
      source: body.source,
      nome: body.answers.nome,
      area: body.answers.area,
      cidade: body.answers.cidade,
      whatsapp: body.answers.whatsapp,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Erro ao processar lead" }, { status: 500 });
  }
}
