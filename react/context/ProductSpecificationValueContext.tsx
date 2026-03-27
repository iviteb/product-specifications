import type { PropsWithChildren } from 'react'
import React, { useMemo, useContext } from 'react'

interface ProductSpecificationValueProviderProps {
  value: string
  isLast: boolean
  isFirst: boolean
}

const SpecificationValueContext = React.createContext<
  ProductSpecificationValueProviderProps | undefined
>(undefined)

export const ProductSpecificationValueProvider = ({
  value,
  isLast,
  isFirst,
  children,
}: PropsWithChildren<ProductSpecificationValueProviderProps>) => {
  const contextValue = useMemo(() => {
    return {
      value,
      isLast,
      isFirst,
    }
  }, [value, isLast, isFirst])

  return (
    <SpecificationValueContext.Provider value={contextValue}>
      {children}
    </SpecificationValueContext.Provider>
  )
}

export const useProductSpecificationValue = () => {
  const value = useContext(SpecificationValueContext)

  return value
}
