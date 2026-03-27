import type { ReactNode } from 'react'
import React, { createContext, useContext } from 'react'
import type { ProductTypes } from 'vtex.product-context'

type Specification = ProductTypes.ProductSpecification

const SpecificationContext = createContext<Specification | undefined>(undefined)

type ProductSpecificationProviderProps = {
  specification: Specification
  children: ReactNode
}

export const ProductSpecificationProvider = ({
  specification,
  children,
}: ProductSpecificationProviderProps) => {
  return (
    <SpecificationContext.Provider value={specification}>
      {children}
    </SpecificationContext.Provider>
  )
}

export const useProductSpecification = () => {
  const specification = useContext(SpecificationContext)

  return specification
}
