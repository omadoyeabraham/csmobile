/**
 * Interface defining the structure of page objects
 */

export interface ITradeOrder {
  "businessOffice": string,
  "customerLabel": string,
  "customerName": string,
  "exchange": string,
  "fixMessage": string,
  "fixOrderStatus": string,
  "id": number,
  "instrument":  string,
  "instrumentType":  string,
  "label":  string,
  "limitPrice": string,
  "locked": boolean,
  "name": string,
  "orderBase": string,
  "orderCurrency": string,
  "orderDate": string,
  "orderOrigin": string,
  "orderStatus": string,
  "orderTermLabel": string,
  "orderTermName": string,
  "orderTotal": string,
  "orderType": string,
  "portfolioLabel": string,
  "portfolioName": string,
  "priceType": string,
  "quantityFilled": string,
  "quantityPending": string,
  "quantityRequested": string,
  "securityLabel": string,
  "securityName": string,
  "statusDate": string,
  "systemGenerated": boolean
}