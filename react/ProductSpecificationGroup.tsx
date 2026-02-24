import type { ReactNode } from 'react'
import React, { useMemo } from 'react'
import { useProduct } from 'vtex.product-context'

import { ProductSpecificationGroupProvider } from './context/ProductSpecificationGroupContext'

interface ProductSpecificationGroupProps {
  filter?: {
    type: 'hide' | 'show'
    specificationGroups: string[]
  }
  children: ReactNode
}

const defaultFilter: ProductSpecificationGroupProps['filter'] = {
  type: 'hide',
  specificationGroups: [],
}

const ProductSpecificationGroup = ({
  filter = defaultFilter,
  children,
}: ProductSpecificationGroupProps) => {
  const { product } = useProduct() ?? {}

  const { type, specificationGroups: filterSpecificationGroups } = filter
  const specificationGroups = useMemo(
    () => product?.specificationGroups ?? [],
    [product]
  )

  const groups = useMemo(
    () =>
      specificationGroups.filter((group) => {
        if (group.originalName === 'allSpecifications') {
          return false
        }

        const hasGroup = filterSpecificationGroups.includes(group.originalName)

        if ((type === 'hide' && hasGroup) || (type === 'show' && !hasGroup)) {
          return false
        }

        return true
      }),
    [specificationGroups, type, filterSpecificationGroups]
  )

  if (!product) {
    return null
  }

  return (
    <>
      {groups.map((group, index) => (
        <ProductSpecificationGroupProvider key={index} group={group}>
          {children}
        </ProductSpecificationGroupProvider>
      ))}
    </>
  )
}

export default ProductSpecificationGroup
