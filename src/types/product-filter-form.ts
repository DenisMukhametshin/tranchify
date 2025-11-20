import type { filtersSchema } from '@/schemas/filters-schema'

import type { z } from 'zod'


export type ProductFilterFormValues = z.infer<typeof filtersSchema>

