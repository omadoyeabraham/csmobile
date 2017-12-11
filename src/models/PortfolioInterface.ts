import { IPortfolioHolding } from "./PortfolioHoldingInterface";

/**
 * Interface contract for a user's portfolio
 */
export interface IPortfolio
{
  accountNo: string,
  active: boolean
  availableCash: {
    currency: string,
    amount: string
  }
  availableCredit: {
    currency: string,
    amount: string
  }
  clearingHouseNo: string,
  costBasis: {
    currency: string,
    amount: string
  }
  currentValuation: {
    currency: string,
    amount: string
  }
  customerId: number
  dateOpened: string
  id: number
  label: string
  marginCallValue: {
    currency: string,
    amount: string
  }
  marginEquityValue: {
    currency: string,
    amount: string
  }
  marginMinMaintainValue: {
    currency: string,
    amount: string
  }
  marginPortfolioValue: {
    currency: string,
    amount: string
  }
  marginTradingPower: {
    currency: string,
    amount: string
  }
  name: string
  percGain: number
  portfolioClass: string
  portfolioHoldings?: Array<IPortfolioHolding>
  portfolioType: string
  securityExchange: string

  gainOrLoss?: number

}
