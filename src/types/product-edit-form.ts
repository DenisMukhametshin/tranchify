import type { editFormSchema } from '@/schemas/edit-form-schema'

import type { z } from 'zod'


export type ProductEditFormValues = z.infer<typeof editFormSchema>

