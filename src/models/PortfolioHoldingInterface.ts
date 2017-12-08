/**
 * Interface contract for a portfolio holding
 *
 * @author Omadoye Abraham
 */
export interface IPortfolioHolding {
  costBasis: string
  gain: string
  marketPrice: string
  marketValue: string
  percentGain: string
  quantityHeld: string
  securityExchange: string
  securityId: number
  securityLabel: string
  securityName: string
  securitySector: string
  securityType: string
  valuation: string
  valueDate: string
}
