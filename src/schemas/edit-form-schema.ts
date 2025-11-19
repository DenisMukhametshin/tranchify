import { z } from 'zod'

export const editFormSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }),
  price: z.number().positive({ message: 'Price must be a positive number.' }),
  rating: z
    .number()
    .min(0, { message: 'Rating must be at least 0.' })
    .max(5, { message: 'Rating must be at most 5.' })
    .optional(),
  discountPercentage: z
    .number()
    .min(0, { message: 'Discount must be at least 0.' })
    .max(100, { message: 'Discount must be at most 100.' })
    .optional(),
  description: z.string().optional(),
})

