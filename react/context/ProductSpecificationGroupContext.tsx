import type { ReactNode } from 'react'
import React, { createContext, useContext } from 'react'
import type { ProductTypes } from 'vtex.product-context'

type SpecificationGroup = ProductTypes.SpecificationGroup

const SpecificationGroupContext = createContext<SpecificationGroup | undefined>(
  undefined
)

interface ProductSpecificationGroupProviderProps {
  group: SpecificationGroup
  children: ReactNode
}

export const ProductSpecificationGroupProvider = ({
  group,
  children,
}: ProductSpecificationGroupProviderProps) => {
  return (
    <SpecificationGroupContext.Provider value={group}>
      {children}
    </SpecificationGroupContext.Provider>
  )
}

export const useProductSpecificationGroup = () => {
  const group = useContext(SpecificationGroupContext)

  return group
}
