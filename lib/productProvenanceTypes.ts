export type ProvenanceVoice = "first-person" | "curated";

export interface ProductProvenance {
  headline?: string;
  acquired?: string;
  worn?: string;
  memory?: string;
  sentiment?: string;
  voice?: ProvenanceVoice;
}
