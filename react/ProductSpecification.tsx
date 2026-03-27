import type { ReactNode } from 'react'
import React, { useMemo } from 'react'

import { useProductSpecificationGroup } from './context/ProductSpecificationGroupContext'
import { ProductSpecificationProvider } from './context/ProductSpecificationContext'

interface ProductSpecificationProps {
  filter?: {
    type: 'hide' | 'show'
    specifications: string[]
  }
  children: ReactNode
}

const defaultFilter: ProductSpecificationProps['filter'] = {
  type: 'hide',
  specifications: [],
}

const ProductSpecificationGroup = ({
  filter = defaultFilter,
  children,
}: ProductSpecificationProps) => {
  const group = useProductSpecificationGroup()
  const specificationsGroup = group?.specifications
  const { type, specifications: filterSpecificationGroups } = filter

  const specifications = useMemo(
    () =>
      specificationsGroup?.filter((spec) => {
        const hasSpecification = filterSpecificationGroups.includes(
          spec.originalName
        )

        if (
          (type === 'hide' && hasSpecification) ||
          (type === 'show' && !hasSpecification)
        ) {
          return false
        }

        return true
      }),
    [specificationsGroup, type, filterSpecificationGroups]
  )

  if (!group) {
    return null
  }

  return (
    <>
      {specifications?.map((spec, index) => (
        <ProductSpecificationProvider key={index} specification={spec}>
          {children}
        </ProductSpecificationProvider>
      ))}
    </>
  )
}

export default ProductSpecificationGroup
