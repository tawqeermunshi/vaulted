"use client"

import { useEffect } from "react"

/** Fires once on mount to record a page view for the demand signal. */
export default function ViewRecorder({ productId }: { productId: string }) {
  useEffect(() => {
    fetch(`/api/demand/${productId}`, { method: "POST" }).catch(() => {})
  }, [productId])

  return null
}
