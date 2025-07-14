"use client"

import { z } from "zod"

export const formSchema = z.object({
  title: z.string().min(5, {message: "Title is a least be minimum 5 characters"}),
  body: z.string().min(15,  {message: "Body is a least be minimum 15 characters"}),
})