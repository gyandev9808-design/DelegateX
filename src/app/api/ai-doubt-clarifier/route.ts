import { NextResponse } from "next/server";

const fallbackReply = (question: string) => {
  const normalized = question.toLowerCase();

  if (/^(hi|hello|hey|who are you)\b/.test(normalized)) {
    return "Hello. I’m DelegateX Clarifier. Ask me about MUN procedure, speeches, caucuses, resolutions, diplomacy, or your country position.";
  }

  if (normalized.includes("what is mun") || normalized.includes("what does mun mean")) {
    return "MUN means Model United Nations. It is an academic simulation where participants represent countries, debate an agenda, negotiate with other delegates, and usually write and vote on draft resolutions.";
  }

  if (normalized.includes("what is gsl") || normalized.includes("general speakers list")) {
    return "The General Speakers List, or GSL, is the main formal debate queue. Delegates speak in turn about the agenda, usually for a fixed time, to explain their country’s position and proposed solutions.";
  }

  if (normalized.includes("moderated caucus")) {
    return "A moderated caucus is a focused, time-limited debate on a specific subtopic. The chair recognizes delegates one at a time, usually for shorter speeches than on the GSL.";
  }

  if (normalized.includes("unmoderated caucus")) {
    return "An unmoderated caucus is an informal negotiation period. Delegates form groups, exchange ideas, and draft working papers or resolutions while following the chair’s time and movement instructions.";
  }

  if (normalized.includes("what is a point of information") || normalized.includes("point of information")) {
    return "A point of information is a brief question directed to a speaker when the rules allow it. Keep it relevant and phrased as a question, not a speech or personal criticism.";
  }

  if (normalized.includes("what is a resolution") || normalized.includes("draft resolution")) {
    return "A draft resolution is a proposed committee decision. It normally contains preambulatory clauses that explain the context and operative clauses that state the actions the committee wants to take.";
  }

  if (normalized.includes("what is a motion")) {
    return "A motion is a formal proposal about committee procedure, such as moving to a moderated caucus, an unmoderated caucus, or voting procedure. The chair handles it under the conference rules.";
  }

  if (normalized.includes("what is veto") || normalized.includes("veto power")) {
    return "A veto is the power to block a decision. In the UN Security Council, each of the five permanent members can veto a substantive resolution; procedural matters use different voting rules.";
  }

  if (normalized.includes("what is abstention") || normalized.includes("abstain")) {
    return "Abstention means choosing neither ‘for’ nor ‘against’ in a vote. Its effect depends on the committee rules; in the Security Council, a permanent member’s abstention does not by itself block a substantive resolution.";
  }

  if (normalized.includes("opening") || normalized.includes("speech")) {
    return "Start with your country’s core interest, move to the crisis, and finish with one clear ask. A strong opening covers what is happening, why it matters to your state, and what action you want the room to take.";
  }

  if (normalized.includes("point of information") || normalized.includes("question")) {
    return "Ask a precise, actionable question instead of a broad challenge. Try: ‘What specific action does the speaker propose to protect civilians while preserving regional stability?’";
  }

  if (normalized.includes("resolution") || normalized.includes("caucus") || normalized.includes("bloc")) {
    return "Frame the shared problem first, then isolate the disagreement. Ask which amendment would address the largest concern while keeping the draft workable for the wider bloc.";
  }

  return "Let’s sharpen it in four steps: first, name the concrete issue; second, identify the actor responsible or able to act; third, define the outcome your delegation wants; and fourth, add the constraint that must be protected. Then use this structure: ‘Given [issue], how can [actor] achieve [outcome] without undermining [principle or interest]?’ This keeps your question specific, diplomatic, and difficult to dismiss.";
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const question = typeof body.question === "string" ? body.question.trim() : "";

    if (!question) return NextResponse.json({ error: "A question is required." }, { status: 400 });

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return NextResponse.json({ answer: fallbackReply(question), source: "local" });

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        temperature: 0.4,
        messages: [
          { role: "system", content: "You are DelegateX Clarifier, a reliable MUN tutor. Answer basic and advanced questions directly, including ordinary factual questions when you know the answer. Explain terms simply, distinguish general MUN practice from conference-specific rules, and say when rules vary or current verification is needed. Never invent facts, sources, quotations, or citations. Keep answers under 160 words and lead with the answer." },
          { role: "user", content: question },
        ],
      }),
    });

    if (!response.ok) return NextResponse.json({ answer: fallbackReply(question), source: "local" });

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content;
    return NextResponse.json({ answer: typeof answer === "string" && answer.trim() ? answer.trim() : fallbackReply(question), source: "ai" });
  } catch {
    return NextResponse.json({ error: "The clarifier could not process that question." }, { status: 500 });
  }
}