import { z } from 'zod'

export const filtersSchema = z
  .object({
    search: z
      .string()
      .trim()
      .max(100, { message: 'Keep search terms under 100 characters.' })
      .optional(),
    categories: z.array(z.string()).default([]),
    minPrice: z.number().nonnegative().optional(),
    maxPrice: z.number().nonnegative().optional(),
    rating: z.number().min(0).max(5).optional(),
    discountedOnly: z.boolean().optional(),
    minDiscountPercent: z.number().min(0).max(100).optional(),
  })
  .refine(
    (data) => {
      if (data.maxPrice !== undefined && data.minPrice === undefined) {
        return false
      }

      return true
    },
    {
      message: 'Add a minimum price before setting a maximum.',
      path: ['maxPrice'],
    },
  )
  .refine(
    (data) => {
      if (data.minPrice !== undefined && data.maxPrice !== undefined) {
        return data.maxPrice >= data.minPrice
      }

      return true
    },
    {
      message: 'Max price must be greater than or equal to min price.',
      path: ['maxPrice'],
    },
  )
  .transform((data) => ({
    search: data.search ?? '',
    categories: data.categories,
    minPrice: data.minPrice,
    maxPrice: data.maxPrice,
    rating: data.rating,
    discountedOnly: Boolean(data.discountedOnly),
    minDiscountPercent: data.discountedOnly ? data.minDiscountPercent : undefined,
  }))

