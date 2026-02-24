import type { ReactNode } from 'react'
import React from 'react'

import { useProductSpecification } from './context/ProductSpecificationContext'
import { ProductSpecificationValueProvider } from './context/ProductSpecificationValueContext'

const ProductSpecificationValues = ({ children }: { children: ReactNode }) => {
  const specification = useProductSpecification()

  if (!specification) {
    return null
  }

  return (
    <>
      {specification.values.map((value, index) => (
        <ProductSpecificationValueProvider
          key={index}
          value={value}
          isFirst={index === 0}
          isLast={specification.values.length - 1 === index}
        >
          {children}
        </ProductSpecificationValueProvider>
      ))}
    </>
  )
}

export default ProductSpecificationValues
